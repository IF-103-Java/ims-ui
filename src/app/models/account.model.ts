import {AccountType} from './accountType.model';

export class Account {

  id: bigint;
  name: string;
  typeId: bigint;
  type: AccountType;
  createdDate: Date;
  active: boolean;

}
