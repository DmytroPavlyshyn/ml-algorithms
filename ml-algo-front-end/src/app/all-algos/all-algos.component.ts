import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KeyValue } from '@angular/common';
import { AlgorithmsService } from '../algorithms.service';
import { AllAlgos } from './all-algos';
import { environment } from '../../environments/environment';
interface FilesListResp {
  files: Array<string>;
}

@Component({
  selector: 'app-all-algos',
  templateUrl: './all-algos.component.html',
  styleUrls: ['./all-algos.component.css']
})
export class AllAlgosComponent implements OnInit {

  apiUrl = environment.apiUrl;
  allAlgoForm;
  output;
  listUploads = [];

  // Order by descending property key
  keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }
  constructor(
    private formBuilder: FormBuilder,
    private service: AlgorithmsService<any>,
  ) { }

  ngOnInit(): void {
    this.allAlgoForm = this.formBuilder.group({
      train_path: '',
      test_path: '',
      use_wiener: false,
      wiener_n: null,

      grrn_sigma: 0.1,

      svr_kernel: 'rbf',
      svr_gamma: 'auto',
      svr_degree: 3,
      svr_coef0: 0,
      svr_tol: 0.001,
      svr_C: 1,
      svr_epsilon: 0.001,
      svr_shrinking: true,
      svr_cache_size: 200,
      svr_verbose: false,
      svr_max_iter: 200,

      sgd_loss: 'squared_loss',
      sgd_penalty: 'l2',
      sgd_alpha: 0.0001,
      sgd_l1_ratio: 0.15,
      sgd_fit_intercept: true,
      sgd_max_iter: 1000,
      sgd_tol: 1e-3,
      sgd_shuffle: true,
      sgd_verbose: 0,
      sgd_epsilon: 0.1,
      sgd_learning_rate: 'invscaling',
      sgd_eta0: 0.01,
      sgd_power_t: 0.25,
      sgd_early_stopping: false,
      sgd_validation_fraction: 0.1,
      sgd_n_iter_no_change: 5,
      sgd_warm_start: false,
      sgd_average: 'false',

      'ada-boost_criterion': 'mse',
      'ada-boost_splitter': 'best',
      'ada-boost_max_depth': null,
      'ada-boost_min_samples_split': '2',
      'ada-boost_min_samples_leaf': '1',
      'ada-boost_min_weight_fraction_leaf': 0.0,
      'ada-boost_max_features': null,
      'ada-boost_max_leaf_nodes': null,
      'ada-boost_min_impurity_decrease': 0.0,
      'ada-boost_min_impurity_split': null,
      'ada-boost_ccp_alpha': 0.0,
      'ada-boost_n_estimators': 50,
      'ada-boost_learning_rate': 1.0,
      'ada-boost_loss': 'linear',

      'random-forest_n_estimators': 100,
      'random-forest_criterion': 'mse',
      'random-forest_max_depth': null,
      'random-forest_min_samples_split': '2',  // int, float
      'random-forest_min_samples_leaf': '1',  // int, float
      'random-forest_min_weight_fraction_leaf': 0.0,
      'random-forest_max_features': 'auto',  // int, float, string
      'random-forest_max_leaf_nodes': null,
      'random-forest_min_impurity_decrease': 0.0,
      'random-forest_min_impurity_split': null,
      'random-forest_bootstrap': true,
      'random-forest_oob_score': false,
      'random-forest_n_jobs': null,
      'random-forest_verbose': 0,
      'random-forest_warm_start': false,
      'random-forest_ccp_alpha': 0.0, // float >= 0.0
      'random-forest_max_samples': null, // int or float

      mlp_hidden_layer_sizes: '100',
      mlp_activation: 'relu',
      mlp_solver: 'adam',
      mlp_alpha: 0.0001,
      mlp_batch_size: 'auto',  // int or string
      mlp_learning_rate: 'constant',
      mlp_learning_rate_init: 0.001,
      mlp_power_t: 0.5,
      mlp_max_iter: 200,
      mlp_shuffle: true,
      mlp_tol: 1e-4,
      mlp_verbose: false,
      mlp_warm_start: false,
      mlp_momentum: 0.9,
      mlp_nesterovs_momentum: true,
      mlp_early_stopping: false,
      mlp_validation_fraction: 0.1,
      mlp_beta_1: 0.9,
      mlp_beta_2: 0.999,
      mlp_epsilon: 1e-8,
      mlp_n_iter_no_change: 10,
      mlp_max_fun: 15000,
    });

    this.service.listUploads().subscribe((s: FilesListResp) => {
      this.listUploads = s.files;
      console.log(s.files);
    });
  }

  onSubmit(customerData) {
    // Process checkout data here
    if (!customerData) {
      return;
    }
    customerData.mlp_hidden_layer_sizes = customerData.mlp_hidden_layer_sizes != null ?
      (customerData.mlp_hidden_layer_sizes.split(',').map(s => Number(s))) : null;

    console.log(customerData);
    const obj = this.process(customerData);
    console.log(obj);
    // let allAlgos = { ...obj };
    const lookupTable = {
      grrn: 'General regression neural network',
      svr: 'Epsilon-Support Vector Regression',
      sgd: 'Stochastic Gradient Descent',
      'ada-boost': 'Ada Boost',
      'random-forest': 'Random Forest',
      mlp: 'Multi-layer Perceptron'
    };

    this.service.submit(obj, 'all')
      .subscribe(output => {
        Object.keys(lookupTable).forEach(key => {
          // tslint:disable-next-line: no-string-literal
          output['stats_per_processor'][lookupTable[key]] = output['stats_per_processor'][key];
          // tslint:disable-next-line: no-string-literal
          delete output['stats_per_processor'][key];
        });
        this.output = output;

        console.warn(JSON.stringify(output));
      });
  }

  process(form) {
    let obj = {};
    const boxing = ['grrn', 'svr', 'sgd', 'ada-boost', 'random-forest', 'mlp'];
    for (let key of Object.keys(form)) {
      const [prefix, mainData] = this.ends_with_any(key, boxing);
      if (prefix != null) {
        if (obj[prefix] == null) {
          obj[prefix] = {};
        }
        obj[prefix][mainData] = form[key];
      } else {
        obj[mainData] = form[key];
      }
    }
    boxing.forEach(prefix => {
      const nestedObj = obj[prefix];
      nestedObj.train_path = form['train_path'];
      nestedObj.test_path = form['test_path'];
      nestedObj.use_wiener = form['use_wiener'];
      nestedObj.wiener_n = form['wiener_n'];
    })
    return obj;
  }

  ends_with_any(key, boxing) {
    const prefix = key.split('_')[0]
    if (boxing.includes(prefix)) {
      const mainData = key.replace(prefix + '_', '');
      return [prefix, mainData];
    }
    else {
      return [null, key];
    }
  }

}
