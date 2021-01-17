import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlgorithmsService } from '../algorithms.service';
import { Svr } from './svr';
import { environment } from '../../environments/environment';
interface FilesListResp {
  files: Array<string>;
}

@Component({
  selector: 'app-svr',
  templateUrl: './svr.component.html',
  styleUrls: ['./svr.component.css']
})
export class SvrComponent implements OnInit {
  apiUrl = environment.apiUrl;
  svrForm;
  output;
  listUploads = [];

  constructor(
    private formBuilder: FormBuilder,
    private svrService: AlgorithmsService<Svr>,
  ) { }

  ngOnInit(): void {
    this.svrForm = this.formBuilder.group({
      train_path: '',
      test_path: '',
      prediction_train_output_path: '',
      prediction_test_output_path: '',
      kernel: 'rbf',
      gamma: 'auto',
      degree: 3,
      coef0: 0.0,
      tol: 1e-3,
      C: 1.0,
      epsilon: 0.001,
      shrinking: true,
      cache_size: 200,
      verbose: false,
      max_iter: 200,
      use_wiener: false,
      wiener_n: null
    });
    this.svrService.listUploads().subscribe((s: FilesListResp) => {
      this.listUploads = s.files;
    });
  }

  onSubmit(customerData) {
    // Process checkout data here
    if (!customerData) {
      return;
    }
    const svr: Svr = { ...customerData };


    this.svrService.submit(svr, 'svr')
      .subscribe(output => {
        this.output = output;
        console.warn(JSON.stringify(output));
      });
  }

}
