import {AssociateType} from "./associate-type.enum";
import {Address} from "./address";

export class Associate {
  id: number;
  accountId: number;
  name: string;
  email: string;
  phone: string;
  additionalInfo: string;
  type: AssociateType;
  addressDto: Address;
}

