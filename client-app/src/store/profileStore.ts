import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed, reaction } from "mobx";
import { IProfile } from "../models/profile";
import { api } from "../services";
import { toast } from "react-toastify";
import { IPhoto } from "../models/photo";
import { IUpdateProfileForm } from "../models/updateProfileForm";

export default class ProfileStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.activeTab,
      activeTab => {
        if (activeTab === 3 || activeTab === 4) {
          const predicate = activeTab === 3 ? "followers" : "following";
          this.loadFollowings(predicate);
        } else {
          this.followings = [];
        }
      }
    );
  }

  @observable profile: IProfile | null = null;
  @observable loadingProfile: boolean = false;
  @observable uploadingPhoto: boolean = false;
  @observable updatingPhoto: string = "";
  @observable deletingPhoto: string = "";
  @observable updatingProfile: boolean = false;
  @observable updatingFollowing: boolean = false;
  @observable loadingFollowings: boolean = false;
  @observable followings: IProfile[] = [];
  @observable activeTab: number = 0;

  @computed get isCurrentUser() {
    if (this.rootStore.userStore.user && this.profile) {
      return this.rootStore.userStore.user.userName === this.profile.userName;
    } else {
      return false;
    }
  }

  @action setActiveTab = (index: number) => (this.activeTab = index);

  @action loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await api.Profile.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingProfile = false;
      });
      console.log(error);
    }
  };

  @action uploadPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const photo = await api.Profile.uploadPhoto(file);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos.push(photo);
          if (photo.isMain && this.rootStore.userStore.user) {
            this.rootStore.userStore.user.image = photo.url;
            this.profile.image = photo.url;
          }
        }
        this.uploadingPhoto = false;
      });
    } catch (error) {
      console.log(error);
      toast.error("Problem uploading photo");
      runInAction(() => {
        this.uploadingPhoto = false;
      });
    }
  };

  @action setMainPhoto = async (photo: IPhoto) => {
    this.updatingPhoto = photo.id;
    try {
      await api.Profile.setMainPhoto(photo.id);
      runInAction(() => {
        if (this.rootStore.userStore.user) {
          this.rootStore.userStore.user.image = photo.url;
        }
        if (this.profile) {
          this.profile.image = photo.url;
          const currentMain = this.profile.photos.find(x => x.isMain);
          const newMain = this.profile.photos.find(x => x.id === photo.id);
          if (currentMain) {
            currentMain.isMain = false;
          }
          if (newMain) {
            newMain.isMain = true;
          }
        }
        this.updatingPhoto = "";
      });
    } catch (error) {
      console.log(error);
      toast.error("Problem updating photo");
      runInAction(() => {
        this.updatingPhoto = "";
      });
    }
  };

  @action deletePhoto = async (photo: IPhoto) => {
    this.deletingPhoto = photo.id;
    try {
      await api.Profile.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos = this.profile.photos.filter(
            x => x.id !== photo.id
          );
        }
        this.deletingPhoto = "";
      });
    } catch (error) {
      console.log(error);
      toast.error("Problem deleting photo");
      runInAction(() => {
        this.deletingPhoto = "";
      });
    }
  };

  @action updateProfile = async (updateProfileForm: IUpdateProfileForm) => {
    this.updatingProfile = true;
    try {
      await api.Profile.updateProfile(updateProfileForm);
      runInAction(() => {
        if (this.profile) {
          this.profile.displayName = updateProfileForm.displayName;
          this.profile.bio = updateProfileForm.bio;
        }
        if (this.rootStore.userStore.user) {
          this.rootStore.userStore.user.displayName =
            updateProfileForm.displayName;
        }
        this.updatingProfile = false;
      });
    } catch (error) {
      console.log(error);
      toast.error("Problem updating profile");
      runInAction(() => {
        this.updatingProfile = false;
      });
    }
  };

  @action follow = async (username: string) => {
    this.updatingFollowing = true;
    try {
      api.Profile.follow(username);
      runInAction(() => {
        if (this.profile) {
          this.profile.following = true;
          this.profile.followersCount++;
        }
        this.updatingFollowing = false;
      });
    } catch (error) {
      console.log(error);
      toast.error("Problem updating following");
      runInAction(() => {
        this.updatingFollowing = false;
      });
    }
  };

  @action unfollow = async (username: string) => {
    this.updatingFollowing = true;
    try {
      api.Profile.unfollow(username);
      runInAction(() => {
        if (this.profile) {
          this.profile.following = false;
          this.profile.followersCount--;
        }
        this.updatingFollowing = false;
      });
    } catch (error) {
      console.log(error);
      toast.error("Problem updating following");
      runInAction(() => {
        this.updatingFollowing = false;
      });
    }
  };

  @action loadFollowings = async (predicate: string) => {
    this.loadingFollowings = true;
    try {
      if (this.profile) {
        const profiles = await api.Profile.listFollowings(
          this.profile.userName,
          predicate
        );
        runInAction(() => {
          this.followings = profiles;
        });
      } else {
        toast.error("user not defined");
      }
      runInAction(() => {
        this.loadingFollowings = false;
      });
    } catch (error) {
      console.log(error);
      toast.error("Problem loading followings");
      runInAction(() => {
        this.loadingFollowings = false;
      });
    }
  };
}
