import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlgorithmsService } from '../algorithms.service';
import { RandomForest } from './random-forest';
import { environment } from '../../environments/environment';
interface FilesListResp {
  files: Array<string>;
}


@Component({
  selector: 'app-random-forest',
  templateUrl: './random-forest.component.html',
  styleUrls: ['./random-forest.component.css']
})
export class RandomForestComponent implements OnInit {

  apiUrl = environment.apiUrl;
  randomForestForm;
  output;
  listUploads = [];

  constructor(
    private formBuilder: FormBuilder,
    private randomForestService: AlgorithmsService<RandomForest>,
  ) { }

  ngOnInit(): void {
    this.randomForestForm = this.formBuilder.group({
      train_path: '',
      test_path: '',
      prediction_train_output_path: '',
      prediction_test_output_path: '',
      n_estimators: 100,
      criterion: 'mse',
      max_depth: null,
      min_samples_split: '2',  // int, float
      min_samples_leaf: '1',  // int, float
      min_weight_fraction_leaf: 0.0,
      max_features: 'auto',  // int, float, string
      max_leaf_nodes: null,
      min_impurity_decrease: 0.0,
      min_impurity_split: null,
      bootstrap: true,
      oob_score: false,
      n_jobs: null,
      verbose: 0,
      warm_start: false,
      ccp_alpha: 0.0, // float >= 0.0
      max_samples: null, // int or float
      use_wiener: false,
      wiener_n: null
    });
    this.randomForestService.listUploads().subscribe((s: FilesListResp) => {
      this.listUploads = s.files;
    });
  }

  onSubmit(customerData) {
    // Process checkout data here
    if (!customerData) {
      return;
    }
    const adaBoost: RandomForest = { ...customerData };


    this.randomForestService.submit(adaBoost, 'random-forest')
      .subscribe(output => {
        this.output = output;
        console.warn(JSON.stringify(output));
      });
  }
}
