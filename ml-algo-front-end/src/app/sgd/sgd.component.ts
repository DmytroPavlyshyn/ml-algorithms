import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AlgorithmsService} from '../algorithms.service';
import {Sgd} from './sgd';
import {environment} from '../../environments/environment';
import {TemplateItem} from "../template/templateItem";

interface FilesListResp {
  files: Array<string>;
}

@Component({
  selector: 'app-sgd',
  template: `
    <app-template [subRoute]="'process'" [type]="'sgd'" [items]=fields></app-template>
  `,
  styleUrls: ['./sgd.component.css']
})
export class SgdComponent implements OnInit {
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
      name: 'loss',
      description: 'loss',
      default: {
        type: 'option',
        value: 'squared_loss'
      },
      type: ['option'],
      options: {
        subProperty: 'arguments',
        optionValues: [
          'squared_loss',
          'huber',
          'epsilon_insensitive',
          'squared_epsilon_insensitive'
        ]
      }
    },
    {
      name: 'penalty',
      description: 'penalty',
      default: {
        type: 'option',
        value: 'l2'
      },
      type: ['option'],
      options: {
        optionValues: [
          'l2', 'l1', 'elasticnet'
        ],
        subProperty: 'arguments',
      }
    },
    {
      name: 'alpha',
      description: 'alpha',
      default: {
        type: 'float',
        value: '0.0001'
      },
      type: ['float'],
      options: {
        subProperty: 'arguments',
      }
    },
    {
      name: 'l1_ratio',
      description: 'l1_ratio',
      default: {
        type: 'float',
        value: '0.15'
      },
      type: ['float'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'fit_intercept',
      description: 'fit_intercept',
      default: {
        type: 'checkbox',
        value: true
      },
      type: ['checkbox'],
      options: {
        optionValues: ['checkbox'],
        subProperty: 'arguments'
      }
    },
    {
      name: 'max_iter',
      description: 'max_iter',
      default: {
        type: 'int',
        value: '1000'
      },
      type: ['int'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'tol',
      description: 'tol',
      default: {
        type: 'float',
        value: '0.001'
      },
      type: ['float'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'shuffle',
      description: 'shuffle',
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
      name: 'shuffle',
      description: 'shuffle',
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
      name: 'verbose',
      description: 'verbose',
      default: {
        type: 'int',
        value: '0'
      },
      type: ['int'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'epsilon',
      description: 'epsilon',
      default: {
        type: 'float',
        value: '0.1'
      },
      type: ['float'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'random_state',
      description: 'random_state',
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
      name: 'learning_rate',
      description: 'learning_rate',
      default: {
        type: 'option',
        value: 'invscaling'
      },
      type: ['int'],
      options: {
        optionValues: [
          'constant',
          'optimal',
          'invscaling',
          'adaptive',
        ],
        subProperty: 'arguments'
      }
    },
    {
      name: 'eta0',
      description: 'eta0',
      default: {
        type: 'float',
        value: '0.01'
      },
      type: ['float'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'power_t',
      description: 'power_t',
      default: {
        type: 'float',
        value: '0.25'
      },
      type: ['float'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'early_stopping',
      description: 'early_stopping',
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
      name: 'validation_fraction',
      description: 'validation_fraction',
      default: {
        type: 'float',
        value: '0.1'
      },
      type: ['float'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'n_iter_no_change',
      description: 'n_iter_no_change',
      default: {
        type: 'int',
        value: '5'
      },
      type: ['int'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'warm_start',
      description: 'warm_start',
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
      name: 'average',
      description: 'average',
      default: {
        type: 'checkbox',
        value: false
      },
      type: ['checkbox', 'int'],
      options: {
        subProperty: 'arguments'
      }
    },
  ];

  constructor() {
  }


  ngOnInit(): void {
  }

}
