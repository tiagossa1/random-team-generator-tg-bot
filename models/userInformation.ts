import { getUserFullName } from "../utils/user.utils.js";

class UserInformation {
  constructor(id, userName, firstName, lastName) {
    this.id = id ?? null;
    this.userName = userName ?? "no username available";
    this.firstName = firstName ?? "";
    this.lastName = lastName ?? "";
    this.fullName = getUserFullName(this.firstName, this.lastName);
  }
}

export default UserInformation;
