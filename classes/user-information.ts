import { getUserFullName } from "../utils/user.js";

class UserInformation {
  id: number | null;
  userName: string;
  firstName: string;
  lastName: string;
  fullName: string;

  constructor(
    id: number | null,
    userName: string,
    firstName: string,
    lastName: string
  ) {
    this.id = id ?? null;
    this.userName = userName ?? "no username available";
    this.firstName = firstName ?? "";
    this.lastName = lastName ?? "";
    this.fullName = getUserFullName(this.firstName, this.lastName);
  }
}

export default UserInformation;
