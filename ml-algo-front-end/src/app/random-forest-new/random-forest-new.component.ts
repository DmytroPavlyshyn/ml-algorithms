import {Component, OnInit} from '@angular/core';
import {TemplateItem} from '../template/templateItem';

@Component({
  selector: 'app-random-forest-new',
  template: `
    <app-template [subRoute]="'grrn'" [items]=fields></app-template>
  `,
  styleUrls: ['./random-forest-new.component.css']
})
export class RandomForestNewComponent implements OnInit {

  fields: Array<TemplateItem> = [
    {
      name: 'some_string',
      description: 'number_text_array',
      type: ['array', 'text', 'number'],
      default: {
        type: 'array',
        value: [1, 2, 3, 4, 5]
      },
      options: {
        arrayType: 'number'
      }
    },
    {
      name: 'one_more',
      description: 'number_text_array',
      type: ['array', 'text', 'number'],
      default: {
        type: 'array',
        value: [1, 2, 3]
      },
      isRequired: true,
      options: {
        arrayType: 'number'
      }
    },
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
      type: ['upload'],
    },
    {
      name: 'sigma',
      description: 'Sigma',
      default: {
        type: 'number',
        value: 0.5
      },
      type: ['number'],
    },
    {
      name: 'use_wiener',
      description: 'use_wiener',
      default: {
        type: 'checkbox',
        value: false
      },
      type: ['checkbox'],
    }
  ];

  constructor() {
  }


  ngOnInit(): void {
  }

}
