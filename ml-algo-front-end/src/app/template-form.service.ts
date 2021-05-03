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
      group[templateItem.name] = templateItem.default.type !== 'array' ?
        this.createFormControl(templateItem, templateItem.default.value, templateItem.default.type)
        : this.createFormArray(templateItem);
    });
    return new FormGroup(group);
  }

  toRequestModel(type: string, formGroup: FormGroup, templateItems: TemplateItem[]): RequestAlgorithmModel {
    const model: any = {};
    model.type = type;
    for (const templateItem of templateItems) {
      const control = formGroup.get(templateItem.name);
      if (control) {
        const subprops =  templateItem.options && templateItem.options.subProperty;
        if (subprops) {
          if (!model[subprops]) {
            model[subprops] = {};
          }
          model[subprops][templateItem.name] = control.value;
        } else {
          model[templateItem.name] = control.value;
        }
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
    if (!value) {
      return null;
    }
    let castedValue;
    switch (type) {
      case 'number':
        castedValue = parseFloat(value);
        break;
      default:
        castedValue = value;
    }
    return castedValue;
  }
}
