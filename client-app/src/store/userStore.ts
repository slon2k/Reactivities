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
    return !!this.user;
  };

  @action login = async (credentials: IUserForm) => {
    try {
      const user = await api.User.login(credentials);
      runInAction("Login", () => (this.user = user));
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push("/activities");
    } catch (error) {
      throw error;
    }
  };

  @action register = async (values: IUserForm) => {
    try {
      const user = await api.User.register(values);
      runInAction(() => (this.user = user));
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push("/activities");      
    } catch (error) {
      throw error;     
    }
  }

  @action getUser = async () => {
    try {
      const user = await api.User.current();
      runInAction(() => {this.user = user})
    } catch (error) {
      console.log(error);
    }
  }

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push("/");
  };
}
