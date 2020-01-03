import { observable, action, computed, runInAction } from "mobx";
import { IUser, IUserForm } from "../models/user";
import { api } from "../services";
import { RootStore } from "./rootStore";
import { history } from "../";

export default class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user
  };

  @action login = async (credentials: IUserForm) => {
    try {
      const user = await api.User.login(credentials);
      runInAction("Login", () => this.user = user);
      history.push("/activities");
      console.log(user);
    } catch (error) {
      throw error;
    }
  }
}