export type FieldSize = 'SMALL' | 'MEDIUM' | 'LARGE' | 'XL';
export type ViewType = 'CREATE' | 'EDIT' | 'VIEW';
export type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'select'
  | 'checkbox'
  | 'textarea';

export interface Field {
  id: string;
  label: string;
  type: FieldType;
  size: FieldSize;

  required?: boolean; // text, number, date, select, checkbox
  minLength?: number; // text, textarea
  maxLength?: number; // text, textarea
  min?: number; // number
  max?: number; // number
  // placeholder?: string; // text, textarea

  options?: string[]; // select field
  defaultValue?: boolean;
}

export interface Row {
  id: string;
  fields: Field[];
}

export interface Section {
  id: string;
  label: string;
  collapsed: boolean;
  rows: Row[];
}

export interface FormMetadata {
  title: string;
  viewType: ViewType;
  sections: Section[];
}
