import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlgorithmsService } from '../algorithms.service';
import { Mlp } from './mlp';
import { environment } from '../../environments/environment';
interface FilesListResp {
  files: Array<string>;
}

@Component({
  selector: 'app-mlp',
  templateUrl: './mlp.component.html',
  styleUrls: ['./mlp.component.css']
})
export class MlpComponent implements OnInit {

  apiUrl = environment.apiUrl;
  mlpForm;
  output;
  isEnabled = true;
  listUploads = [];

  constructor(
    private formBuilder: FormBuilder,
    private svrService: AlgorithmsService<Mlp>,
  ) { }

  ngOnInit(): void {
    this.mlpForm = this.formBuilder.group({
      train_path: '',
      test_path: '',
      hidden_layer_sizes: '100',
      activation: 'relu',
      solver: 'adam',
      alpha: 0.0001,
      batch_size: 'auto',  // int or string
      learning_rate: 'constant',
      learning_rate_init: 0.001,
      power_t: 0.5,
      max_iter: 200,
      shuffle: true,
      tol: 1e-4,
      verbose: false,
      warm_start: false,
      momentum: 0.9,
      nesterovs_momentum: true,
      early_stopping: false,
      validation_fraction: 0.1,
      beta_1: 0.9,
      beta_2: 0.999,
      epsilon: 1e-8,
      n_iter_no_change: 10,
      max_fun: 15000,
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


    customerData.hidden_layer_sizes = customerData.hidden_layer_sizes != null ?
      (customerData.hidden_layer_sizes.split(',').map(s => Number(s))) : null;

    const mlp: Mlp = { ...customerData };
    if (this.isEnabled) {
      this.mlpForm.disable();
      this.isEnabled = false;
      this.svrService.submit(mlp, 'mlp')
        .subscribe(output => {
          this.output = output;
          this.mlpForm.enable();
          this.isEnabled = true;
          console.warn(JSON.stringify(output));
        });
    }
  }

}
