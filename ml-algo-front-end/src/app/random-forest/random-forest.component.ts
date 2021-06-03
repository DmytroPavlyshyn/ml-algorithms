import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AlgorithmsService} from '../algorithms.service';
import {RandomForest} from './random-forest';
import {environment} from '../../environments/environment';
import {TemplateItem} from "../template/templateItem";

interface FilesListResp {
  files: Array<string>;
}


@Component({
  selector: 'app-random-forest',
  template: `
    <app-template [subRoute]="'process'" [type]="'random-forest'" [items]=fields></app-template>`,
  styleUrls: ['./random-forest.component.css']
})
export class RandomForestComponent implements OnInit {

  fields: Array<TemplateItem> = [
    {
      name: 'train_path',
      description: 'Training data',
      default: {
        type: 'upload',
      },
      isRequired: true,
      type: ['upload'],
    },
    {
      name: 'test_path',
      description: 'Testing data',
      default: {
        type: 'upload',
      },
      isRequired: true,
      type: ['upload'],
    },
    {
      name: 'n_estimators',
      description: 'n_estimators',
      default: {type: 'int', value: '100'},
      type: ['int'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'criterion',
      description: 'Criterion',
      default: {
        type: 'option',
        value: 'mse'
      },
      type: ['option'],
      options: {
        optionValues: [
          "mse", "mae"
        ],
        subProperty: 'arguments',
      }
    },
    {
      name: 'max_depth',
      description: 'max_depth',
      default: {
        type: 'int',
        value: null
      },
      type: ['int'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'min_samples_split',
      description: 'min_samples_split',
      default: {
        type: 'int',
        value: '2'
      },
      type: ['int', 'float'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'min_samples_leaf',
      description: 'min_samples_leaf',
      default: {
        type: 'int',
        value: '1'
      },
      type: ['int', 'float'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'min_weight_fraction_leaf',
      description: 'min_weight_fraction_leaf',
      default: {
        type: 'float',
        value: '0.0'
      },
      type: ['float'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'max_features',
      description: 'max_features',
      default: {
        type: 'option',
        value: 'auto'
      },
      type: ['option', 'int', 'float'],
      options: {
        optionValues: ["auto", "sqrt", "log2"],
        subProperty: 'arguments'
      }
    },
    {
      name: 'max_leaf_nodes',
      description: 'max_leaf_nodes',
      default: {
        type: 'int',
        value: null
      },
      type: ['int'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'min_impurity_decrease',
      description: 'min_impurity_decrease',
      default: {
        type: 'float',
        value: '0.0'
      },
      type: ['float'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'bootstrap',
      description: 'bootstrap',
      default: {
        type: 'checkbox',
        value: true
      },
      type: ['checkbox'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'oob_score',
      description: 'oob_score',
      default: {
        type: 'checkbox',
        value: false
      },
      type: ['checkbox'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'n_jobs',
      description: 'n_jobs',
      default: {type: 'int', value: null},
      type: ['int'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'random_state',
      description: 'random_state',
      default: {type: 'int', value: null},
      type: ['int'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'verbose',
      description: 'verbose',
      default: {type: 'int', value: '0'},
      type: ['int'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'warm_start',
      description: 'warm_start',
      default: {type: 'checkbox', value: false},
      type: ['checkbox'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'ccp_alpha',
      description: 'ccp_alpha',
      default: {type: 'float', value: 0.0},
      type: ['float'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'max_samples',
      description: 'max_samples',
      default: {type: 'float', value: null},
      type: ['int', 'float'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'use',
      description: 'Nonlinear inputs extension',
      default: {type: 'checkbox', value: false},
      type: ['checkbox'],
      options: {subProperty: 'wiener'}
    },
    {
      name: 'n',
      description: 'Wiener n',
      default: {type: 'int', value: '2'},
      type: ['int'],
      options: {subProperty: 'wiener'}
    },
  ];

  constructor() {
  }


  ngOnInit(): void {
  }
}
