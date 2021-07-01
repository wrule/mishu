import { IField } from './field';
import { EType } from './type';
import { StringHash } from './utils';

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
    const members = this.Members.slice(0);
    members.sort((a, b) => a.Hash().localeCompare(b.Hash()));
    return StringHash(
      members
        .map((member) => member.Hash())
        .join('|')
    );
  }

  public Equal(field: IField): boolean {
    return this.Hash() === field.Hash();
  }

  public Compare(field: IField): number {
    return this.Type === field.Type ? 1 : 0;
  }

  public Contain(field: IField): boolean {
    if (field.Type === EType.Union) {
      const unionField = field as UnionField;
      return unionField.Members.every((member1) => (
        this.Members.some((member2) => member2.Contain(member1))
      ));
    } else {
      return this.Members.some((member) => member.Contain(field));
    }
  }

  public Merge(field: IField): IField {
    return { } as any;
  }

  public Diff(field: IField): any[] {
    return [];
  }
}