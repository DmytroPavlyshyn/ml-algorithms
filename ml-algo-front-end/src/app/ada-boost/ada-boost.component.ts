import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AlgorithmsService} from '../algorithms.service';
import {AdaBoost} from './ada-boost';
import {environment} from '../../environments/environment';
import {TemplateItem} from "../template/templateItem";

interface FilesListResp {
  files: Array<string>;
}

@Component({
  selector: 'app-ada-boost',
  template: `
    <app-template [subRoute]="'process'" [type]="'ada-boost'" [items]=fields></app-template>
  `,
  styleUrls: ['./ada-boost.component.css']
})
export class AdaBoostComponent implements OnInit {
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
      default: {
        type: 'int',
        value: '50'
      },
      type: ['int'],
      options: {
        subProperty: 'ada_boost_args'
      }
    },
    {
      name: 'learning_rate',
      description: 'learning_rate',
      default: {
        type: 'float',
        value: '1'
      },
      type: ['float'],
      options: {
        subProperty: 'ada_boost_args'
      }
    },
    {
      name: 'loss',
      description: 'loss',
      default: {
        type: 'option',
        value: 'linear'
      },
      type: ['option'],
      options: {
        subProperty: 'ada_boost_args',
        optionValues: ['linear', 'square', 'exponential']
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
        subProperty: 'ada_boost_args',
      }
    },
    {
      name: 'criterion',
      description: 'criterion',
      default: {
        type: 'option',
        value: 'mse'
      },
      type: ['option'],
      options: {
        subProperty: 'decision_tree_args',
        optionValues: ["mse", "friedman_mse", "mae", "poisson"]
      }
    },
    {
      name: 'splitter',
      description: 'splitter',
      default: {
        type: 'option',
        value: 'best'
      },
      type: ['option'],
      options: {
        subProperty: 'decision_tree_args',
        optionValues: ["best", "random"]
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
        subProperty: 'decision_tree_args'
      }
    },
    {
      name: 'min_samples_split',
      description: 'min_samples_split',
      default: {
        type: 'int',
        value: 2
      },
      type: ['int', 'float'],
      options: {
        subProperty: 'decision_tree_args'
      }
    }, {
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
      name: 'random_state',
      description: 'random_state',
      default: {type: 'int', value: null},
      type: ['int'],
      options: {subProperty: 'arguments'}
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
      name: 'min_impurity_split',
      description: 'min_impurity_split',
      default: {
        type: 'float',
        value: null
      },
      type: ['float'],
      options: {
        subProperty: 'arguments'
      },
    },
    {
      name: 'ccp_alpha',
      description: 'ccp_alpha',
      default: {
        type: 'float',
        value: '0.0'
      },
      type: ['float'],
      options: {
        subProperty: 'arguments'
      }
    },
    // {
    //   name: 'class_weight',
    //   description: 'class_weight',
    //   default: {
    //     type: 'float',
    //     value: null
    //   },
    //   type: ['dict, list of dict'],
    //   options: {
    //     subProperty: 'arguments'
    //   }
    // },
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
