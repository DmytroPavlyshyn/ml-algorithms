import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {

  @Input() predictedDataPath: string;
  @Input() actualDataPath: string;

  constructor(
    private http: HttpClient
  ) {

  }

  isImageLoading: boolean;
  imageToShow: any;

  ngOnInit(): void {
    this.getImageFromService();
  }


  getImage(imageUrl: string): Observable<Blob> {

    const params = new HttpParams().set('predictedDataPath', this.predictedDataPath)
      .set('actualDataPath', this.actualDataPath);
    return this.http
      .get(imageUrl, {
        responseType: 'blob',
        params
      }, );
  }


  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService() {
    const yourImageUrl = 'http://localhost:8000/visualize/plot';
    this.isImageLoading = true;
    this.getImage(yourImageUrl).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }


}
