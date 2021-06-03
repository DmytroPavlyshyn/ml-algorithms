import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AlgorithmsService} from '../algorithms.service';
import {Mlp} from './mlp';
import {environment} from '../../environments/environment';
import {TemplateItem} from "../template/templateItem";

interface FilesListResp {
  files: Array<string>;
}

@Component({
  selector: 'app-mlp',
  template: `
    <app-template [subRoute]="'process'" [type]="'mlp'" [items]=fields></app-template>

  `,
  styleUrls: ['./mlp.component.css']
})
export class MlpComponent implements OnInit {

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
      name: 'hidden_layer_sizes',
      description: 'hidden_layer_sizes',
      default: {
        type: 'tuple',
        value: [100]
      },
      type: ['tuple'],
      options: {
        subProperty: 'arguments',
        arrayType: 'int'
      }
    },
    {
      name: 'activation',
      description: 'Activation',
      default: {
        type: 'option',
        value: 'relu'
      },
      type: ['option'],
      options: {
        optionValues: [
          'identity', 'logistic', 'tanh', 'relu'
        ],
        subProperty: 'arguments',
      }
    },
    {
      name: 'solver',
      description: 'Solver',
      default: {
        type: 'option',
        value: 'adam'
      },
      type: ['option'],
      options: {
        subProperty: 'arguments',
        optionValues: [
          'lbfgs', 'sgd', 'adam'
        ]
      }
    },
    {
      name: 'alpha',
      description: 'Alpha',
      default: {
        type: 'float',
        value: '0.0001'
      },
      type: ['float'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'batch_size',
      description: 'Batch size',
      default: {
        type: 'option',
        value: 'auto'
      },
      type: ['option', 'int'],
      options: {
        optionValues: ['auto'],
        subProperty: 'arguments'
      }
    },
    {
      name: 'learning_rate',
      description: 'Learning rate',
      default: {
        type: 'option',
        value: 'constant'
      },
      type: ['option'],
      options: {
        optionValues: ['constant', 'invscaling', 'adaptive'],
        subProperty: 'arguments'
      }
    },
    {
      name: 'learning_rate_init',
      description: 'Learning rate init',
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
      name: 'power_t',
      description: 'power_t',
      default: {
        type: 'float',
        value: '0.5'
      },
      type: ['float'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'max_iter',
      description: 'max_iter',
      default: {
        type: 'int',
        value: '200'
      },
      type: ['int'],
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
      name: 'tol',
      description: 'tol',
      default: {type: 'float', value: "" + 1e-4},
      type: ['float'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'verbose',
      description: 'verbose',
      default: {type: 'checkbox', value: false},
      type: ['checkbox'],
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
      name: 'momentum',
      description: 'momentum',
      default: {type: 'float', value: '0.9'},
      type: ['float'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'nesterovs_momentum',
      description: 'nesterovs_momentum',
      default: {type: 'checkbox', value: true},
      type: ['checkbox'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'early_stopping',
      description: 'early_stopping',
      default: {type: 'checkbox', value: false},
      type: ['checkbox'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'validation_fraction',
      description: 'validation_fraction',
      default: {type: 'float', value: '0.1'},
      type: ['float'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'beta_1',
      description: 'beta_1',
      default: {type: 'float', value: '0.9'},
      type: ['float'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'beta_2',
      description: 'beta_2',
      default: {type: 'float', value: '0.999'},
      type: ['float'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'epsilon',
      description: 'epsilon',
      default: {type: 'float', value: '0.00000001'},
      type: ['float'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'n_iter_no_change',
      description: 'n_iter_no_change',
      default: {type: 'int', value: '10'},
      type: ['int'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'max_fun',
      description: 'max_fun',
      default: {type: 'int', value: '15000'},
      type: ['int'],
      options: {subProperty: 'arguments'}
    },
    {
      name: 'max_fun',
      description: 'max_fun',
      default: {type: 'int', value: '15000'},
      type: ['int'],
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
