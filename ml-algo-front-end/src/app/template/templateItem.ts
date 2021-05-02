interface DefaultValue {
  type: string;
  value?: any;
}

export interface TemplateItem {
  name: string;
  description: string;
  type: Array<string>;
  default: DefaultValue;
  isRequired?: boolean;
  options?: any;
}
