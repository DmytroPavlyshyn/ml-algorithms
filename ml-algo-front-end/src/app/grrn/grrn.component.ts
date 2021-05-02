import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AlgorithmsService} from '../algorithms.service';
import {Grrn} from './grrn';
import {environment} from '../../environments/environment';

interface FilesListResp {
  files: Array<string>;
}


@Component({
  selector: 'app-grrn',
  templateUrl: './grrn.component.html',
  styleUrls: ['./grrn.component.css']
})

export class GrrnComponent implements OnInit {

  apiUrl = environment.apiUrl;
  grrnForm;
  output;
  listUploads = [];

  constructor(
    private formBuilder: FormBuilder,
    private grrnService: AlgorithmsService<Grrn>,
  ) {
  }

  ngOnInit(): void {
    this.grrnForm = this.formBuilder.group({
      train_path: '',
      test_path: '',
      sigma: 0.1,
      use_wiener: false,
      wiener_n: null
    });
    this.grrnService.listUploads().subscribe((s: FilesListResp) => {
      this.listUploads = s.files;
    });

  }

  onSubmit(customerData) {
    // Process checkout data here
    if (!customerData) {
      return;
    }
    const grrn: Grrn = {...customerData};

    this.grrnService.submit(grrn, 'grrn')
      .subscribe(output => {
        this.output = output;
        console.warn(JSON.stringify(output));
      });
  }

}
