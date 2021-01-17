import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlgorithmsService } from '../algorithms.service';
import { AdaBoost } from './ada-boost';
import { environment } from '../../environments/environment';
interface FilesListResp {
  files: Array<string>;
}
@Component({
  selector: 'app-ada-boost',
  templateUrl: './ada-boost.component.html',
  styleUrls: ['./ada-boost.component.css']
})
export class AdaBoostComponent implements OnInit {
  apiUrl = environment.apiUrl;
  adaBoostForm;
  output;
    listUploads = [];

  constructor(
    private formBuilder: FormBuilder,
    private adaBoostService: AlgorithmsService<AdaBoost>,
  ) { }

  ngOnInit(): void {
    this.adaBoostForm = this.formBuilder.group({
      train_path: '',
      test_path: '',
      prediction_train_output_path: '',
      prediction_test_output_path: '',
      criterion: 'mse',
      splitter: 'best',
      max_depth: null,
      min_samples_split: '2',
      min_samples_leaf: '1',
      min_weight_fraction_leaf: 0.0,
      max_features: null,
      max_leaf_nodes: null,
      min_impurity_decrease: 0.0,
      min_impurity_split: null,
      ccp_alpha: 0.0,
      n_estimators: 50,
      learning_rate: 1.0,
      loss: 'linear',
      use_wiener: false,
      wiener_n: null
    });
    this.adaBoostService.listUploads().subscribe((s: FilesListResp) => {
      this.listUploads = s.files;
    });
  }

  onSubmit(customerData) {
    // Process checkout data here
    if (!customerData) {
      return;
    }
    const adaBoost: AdaBoost = { ...customerData };


    this.adaBoostService.submit(adaBoost, 'ada-boost')
      .subscribe(output => {
        this.output = output;
        console.warn(JSON.stringify(output));
      });
  }
}
