import { IField } from './field';
import { EType } from './type';
import { StringHash } from './utils/stringHash';

export class UnionField implements IField {
  public constructor(
    name: string,
    members: IField[],
  ) {
    this.Name = name;
    this.Type = EType.Union;
    this.members = members;
  }

  public readonly Name: string;

  public readonly Type: EType;

  private members: IField[];

  public get Members() {
    return this.members;
  }

  public Hash() {
    return StringHash(
      this.Members
        .map((member) => member.Hash())
        .join('|')
    );
  }

  public Equal(field: IField): boolean {
    return this.Type === field.Type;
  }

  public Compare(field: IField): number {
    return this.Type === field.Type ? 1 : 0;
  }

  public Contain(field: IField): boolean {
    return this.Type === field.Type;
  }

  public Merge(field: IField): IField {
    return { } as any;
  }

  public Diff(field: IField): any[] {
    return [];
  }
}
