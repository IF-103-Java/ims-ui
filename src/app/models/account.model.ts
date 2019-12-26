import {AccountType} from "./accountType.model";

export class Item {

  id: bigint;
  name: string;
  typeId: bigint;
  type: AccountType;
  createdDate: Date;
  active: boolean;

}
