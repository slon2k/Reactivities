import { observable, action, computed, configure } from "mobx";
import { IUser, IUserForm } from "../models/user";
import { api } from "../services";

configure({ enforceActions: "always" });

export default class UserStore {
  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user
  };

  @action login = async (credentials: IUserForm) => {
    try {
      const user = await api.User.login(credentials);
      this.user = user;
    } catch (error) {
      console.log(error);
    }
  }
}