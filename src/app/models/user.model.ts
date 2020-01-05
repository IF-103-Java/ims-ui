import {Role} from "./role.model";

export class User {
  id: bigint;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  password: string;
  accountName: string;
}
