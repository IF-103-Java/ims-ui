import {Role} from "./role.model";

export class User {
  id: bigint;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  password: string;
  accountName: string;
}
