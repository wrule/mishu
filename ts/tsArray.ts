
import { ArrayField } from '../proto/array';
import { TsField } from './tsField';

export class TsArray extends ArrayField implements TsField {
  constructor(
    name: string,
    element: TsField,
  ) {
    super(name, element);
  }

  public get Element() {
    return this.element as TsField;
  }

  public Merge(tsField: TsField) {
    return { } as any;
  }
}
