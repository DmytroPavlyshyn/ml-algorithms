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
        type: 'number',
        value: '3'
      },
      type: ['number'],
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
      type: ['option', 'number'],
      options: {
        subProperty: 'arguments',
        optionValues: [
          'scale', 'auto'
        ]
      }
    },
    // {
    //   name: 'some_string',
    //   description: 'number_text_array',
    //   type: ['array', 'text', 'number'],
    //   default: {
    //     type: 'array',
    //     value: [1, 2, 3, 4, 5]
    //   },
    //   options: {
    //     arrayType: 'number'
    //   }
    // }
  ];

  constructor() {
  }


  ngOnInit(): void {
  }

}
