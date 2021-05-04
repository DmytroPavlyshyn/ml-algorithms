import {Component, Input, OnInit} from '@angular/core';
import {TemplateItem} from './templateItem';
import {FormGroup} from '@angular/forms';
import {TemplateFormService} from '../template-form.service';
import {AlgorithmsService} from '../algorithms.service';

interface FilesListResp {
  files: Array<string>;
}

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  @Input() items: Array<TemplateItem>;
  @Input() subRoute: string;
  @Input() type: string;
  output;
  outputString;
  jsonPayload;
  isSubmitted = false;
  form: FormGroup;
  listUploads = [];

  constructor(private templateFormService: TemplateFormService,
              private algoService: AlgorithmsService<any>
  ) {
  }

  ngOnInit(): void {
    this.algoService.listUploads().subscribe((s: FilesListResp) => {
      this.listUploads = s.files;
    });
  }

  onInputTypeChange(item: TemplateItem, value: string): void {
    this.form = null;
    if (value === 'array') {
      item.default.value = [null];
    } else {
      item.default.value = null;
    }
    item.default.type = value;
  }

  onValueChange(formGr: FormGroup, item: TemplateItem): void {
    item.default.value = formGr.get(item.name).value;
  }

  onArrayItemAdd(formGr: FormGroup, item: TemplateItem): void {
    this.form = null;
    item.default.value.push(null);
  }

  validate(): boolean {

    if (this.form == null) {
      this.initializeForm();
    }
    return true;

  }

  initializeForm(): void {
    setTimeout(() => {
      this.form = this.templateFormService.toFormGroup(this.items);
    }, 10);
  }

  onSubmit() {
    // Process checkout data here
    if (!this.form.valid) {
      this.isSubmitted = true;
    } else {

      this.jsonPayload = JSON.stringify(this.templateFormService.toRequestModel(this.type, this.form, this.items));

      this.algoService.submit(this.jsonPayload, this.subRoute)
        .subscribe(output => {
          this.output = output;
          this.outputString = JSON.stringify(output)
          console.warn(JSON.stringify(output, null, 2));
        });
      this.isSubmitted = false;
    }
  }

}
