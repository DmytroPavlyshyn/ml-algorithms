import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlgorithmsService } from '../algorithms.service';
import { Sgd } from './sgd';
import { environment } from '../../environments/environment';
interface FilesListResp {
  files: Array<string>;
}

@Component({
  selector: 'app-sgd',
  templateUrl: './sgd.component.html',
  styleUrls: ['./sgd.component.css']
})
export class SgdComponent implements OnInit {
  apiUrl = environment.apiUrl;
  sgdForm;
  output;
  listUploads = [];

  constructor(
    private formBuilder: FormBuilder,
    private svrService: AlgorithmsService<Sgd>,
  ) { }

  ngOnInit(): void {
    this.sgdForm = this.formBuilder.group({
      train_path: '',
      test_path: '',
      prediction_train_output_path: '',
      prediction_test_output_path: '',
      loss: 'squared_loss',
      penalty: 'l2',
      alpha: 0.0001,
      l1_ratio: 0.15,
      fit_intercept: true,
      max_iter: 1000,
      tol: 1e-3,
      shuffle: true,
      verbose: 0,
      epsilon: 0.1,
      learning_rate: 'invscaling',
      eta0: 0.01,
      power_t: 0.25,
      early_stopping: false,
      validation_fraction: 0.1,
      n_iter_no_change: 5,
      warm_start: false,
      average: 'false',
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

    const sgd: Sgd = { ...customerData };


    this.svrService.submit(sgd, 'sgd')
      .subscribe(output => {
        this.output = output;
        console.warn(JSON.stringify(output));
      });
  }

}
