import {Injectable} from '@angular/core';
import {TemplateItem} from './template/templateItem';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestAlgorithmModel} from "./models/request-algorithm-model";


@Injectable({
  providedIn: 'root'
})
export class TemplateFormService {

  constructor() {
  }

  toFormGroup(templateItems: TemplateItem[]): FormGroup {
    const group: any = {};
    templateItems.forEach(templateItem => {
      group[templateItem.name] = templateItem.default.type !== 'array' && templateItem.default.type !== 'tuple' ?
        this.createFormControl(templateItem, templateItem.default.value, templateItem.default.type)
        : this.createFormArray(templateItem);
    });
    return new FormGroup(group);
  }

  toRequestModel(type: string, formGroup: FormGroup, templateItems: TemplateItem[]): RequestAlgorithmModel {
    const model: any = {};
    model.type = type;
    model.arguments = [];
    for (const templateItem of templateItems) {
      const control = formGroup.get(templateItem.name);
      if (control) {
        const subprops = templateItem.options && templateItem.options.subProperty;

        let obj = {
          "name": templateItem.name,
          "value": control.value,
          "type": templateItem.default.type
        }
        if (subprops) {
          obj['subProps'] = subprops;
        }
        if (obj.type == 'array' || obj.type == 'tuple') {
          obj['arrayType'] = templateItem.options.arrayType
        }
        model.arguments.push(obj);
      }
    }
    return model;
  }

  createFormControl(item: TemplateItem, value: any, type: any): FormControl {
    const formControl = new FormControl(this.castToType(value, type));
    const validators = [];
    if (item.isRequired) {
      validators.push(Validators.required);
    }
    formControl.setValidators(validators);
    return formControl;
  }

  createFormArray(item: TemplateItem): FormArray {
    return new FormArray(item.default.value.map(s =>
      this.createFormControl(item, s, item.options.arrayType)));
  }

  castToType(value: any, type: string): any {
    let castedValue;
    switch (type) {
      default:
        castedValue = value;
    }
    return castedValue;
  }
}
