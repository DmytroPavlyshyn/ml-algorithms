import {HttpClient, HttpEventType, HttpHeaderResponse, HttpResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {Component} from "@angular/core";
import {finalize} from "rxjs/operators";
import {AlgorithmsService} from "../algorithms.service";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.css"]
})
export class FileUploadComponent {


  requiredFileType: string = "json";

  fileName = '';
  uploadProgress: number;
  uploadSub: Subscription;

  constructor(
    private http: HttpClient,
    private algorithmsService: AlgorithmsService<object>,
    private notifier: NotifierService,
  ) {
  }

  onFileSelected(event) {
    console.log(event)
    const file: File = event[0];

    if (file) {
      this.fileName = file.name;
      let upload$ = this.algorithmsService.postFile(file);

      this.uploadSub = upload$
        .pipe(
          finalize(() => this.reset())
        )
        .subscribe(event => {
            console.log(event)
            if (event.type == HttpEventType.UploadProgress) {
              this.uploadProgress = Math.round(100 * (event.loaded / event.total));
            } else if ((event instanceof HttpResponse) &&
              event.status == 200 &&
              event.type == HttpEventType.Response) {

              this.notifier.notify("success", "File was successfully uploaded ")
            }
          },
          (error) => {
            this.notifier.notify("error", "Error occurred, please try again in a few seconds...")

          }
        )
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
    this.notifier.notify("warning", "Uploading was cancelled")

  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }


}
