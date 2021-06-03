import {Component, OnInit} from '@angular/core';
import {TemplateItem} from '../template/templateItem';

@Component({
  selector: 'app-test-algo',
  // templateUrl: './test-algo.component.html',
  template: `
    <app-template [subRoute]="'process'" [type]="'svr'" [items]=fields></app-template>
  `,
  styleUrls: ['./test-algo.component.css']
})
export class TestAlgoComponent implements OnInit {

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
      name: 'kernel',
      description: 'Kernel',
      default: {
        type: 'option',
        value: 'rbf'
      },
      type: ['option'],
      options: {
        subProperty: 'arguments',
        optionValues: [
          'linear', 'poly', 'rbf', 'sigmoid', 'precomputed'
        ]
      }
    },
    {
      name: 'degree',
      description: 'Degree',
      default: {
        type: 'int',
        value: '3'
      },
      type: ['int'],
      options: {
        subProperty: 'arguments',
      }
    },
    {
      name: 'gamma',
      description: 'Gamma',
      default: {
        type: 'option',
        value: 'scale'
      },
      type: ['option', 'float'],
      options: {
        subProperty: 'arguments',
        optionValues: [
          'scale', 'auto'
        ]
      }
    },
    {
      name: 'coef0',
      description: 'coef0',
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
      name: 'C',
      description: 'C',
      default: {
        type: 'float',
        value: '1.0'
      },
      type: ['float'],
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
      name: 'shrinking',
      description: 'shrinking',
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
      name: 'cache_size',
      description: 'cache_size',
      default: {
        type: 'float',
        value: '200'
      },
      type: ['float'],
      options: {
        subProperty: 'arguments'
      }
    },
    {
      name: 'verbose',
      description: 'verbose',
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
      name: 'max_iter',
      description: 'max_iter',
      default: {
        type: 'int',
        value: -1
      },
      type: ['int'],
      options: {
        subProperty: 'arguments'
      }
    }
  //  nonlinear inputs extension:
  //  wiener_n:

  ];

  constructor() {
  }


  ngOnInit(): void {
  }

}
