import { observable, action, computed, runInAction } from "mobx";
import { IActivity } from "../models/activity";
import { api } from "../services";
import { history } from "../";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { IAttendee } from "../models/attendee";
import { IUser } from "../models/user";

export default class ActivityStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable activityRegistry = new Map<string, IActivity>();
  @observable loading = false;
  @observable submitting = false;
  @observable selectedActivity: IActivity | null = null;
  @observable deleting = new Set<string>();

  @computed get activitiesByDate() {
    const activities = Array.from<IActivity>(this.activityRegistry.values());
    return this.groupActivitiesByDate(activities);
  }

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );

    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date!.toISOString().split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  }

  @action loadActivities = async () => {
    const user = this.rootStore.userStore.user!;
    this.loading = true;
    try {
      const response = await api.Activities.list();
      runInAction("loading", () => {
        response.forEach(item => {
          item.date = new Date(item.date!);
          item.isGoing = item.attendees.some(a => a.userName === user.userName);
          item.isHost = item.attendees.some(
            a => a.userName === user.userName && a.isHost
          );
          this.activityRegistry.set(item.id, item);
        });
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction("loading error", () => {
        this.loading = false;
      });
    }
  };

  @action loadActivity = async (id: string) => {
    const activity = this.activityRegistry.get(id);
    if (activity !== undefined) {
      this.selectActivity(id);
    } else {
      this.loading = true;
      try {
        const response = await api.Activities.details(id);
        runInAction("loading activity", () => {
          response.date =
            response.date !== null ? new Date(response.date) : null;
          this.activityRegistry.set(response.id, response);
          this.selectActivity(id);
          this.loading = false;
        });
      } catch (error) {
        runInAction("loading activity error", () => {
          this.loading = false;
        });
        console.log(error);
      }
    }
  };

  @action selectActivity = (id: string) => {
    const activity = this.activityRegistry.get(id);
    if (activity !== undefined) {
      this.selectedActivity = activity;
    }
  };

  @action clearSelectedActivity = () => {
    this.selectedActivity = null;
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await api.Activities.create(activity);
      runInAction("Creating", () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
        this.selectedActivity = activity;
        history.push(`/activities/${activity.id}`);
      });
    } catch (error) {
      console.log(error);
      runInAction("Creating error", () => {
        this.submitting = false;
        toast.error("Unable to create activity: ", error);
      });
    }
  };

  @action updateActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await api.Activities.update(activity);
      runInAction("Updating", () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
        this.selectedActivity = activity;
        history.push(`/activities/${activity.id}`);
      });
    } catch (error) {
      console.log(error);
      runInAction("Updating error", () => {
        this.submitting = false;
        toast.error("Unable to update activity: ", error);
      });
    }
  };

  @action deleteActivity = async (id: string) => {
    this.deleting.add(id);
    try {
      await api.Activities.delete(id);
      runInAction("Deleting", () => {
        this.activityRegistry.delete(id);
        this.deleting.delete(id);
        if (this.selectedActivity && this.selectedActivity.id === id) {
          this.clearSelectedActivity();
        }
      });
    } catch (error) {
      console.log(error);
      runInAction("Deleting error", () => {
        this.deleting.delete(id);
      });
    }
  };

  @action attendActivity = async () => {
    const attendee = this.createAttendee(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      if (this.selectedActivity) {
        await api.Activities.attend(this.selectedActivity.id);
        runInAction(() => {
          if (this.selectedActivity) {
            this.selectedActivity.attendees.push(attendee);
            this.selectedActivity.isGoing = true;
            this.activityRegistry.set(
              this.selectedActivity.id,
              this.selectedActivity
            );
          }
          this.loading = false;
        });
      }
    } catch (error) {
      runInAction(() => {
        toast.error("Unable to update activity");
        this.loading = false;
      });
    }
  };

  @action cancelAttendance = async () => {
    this.loading = true;
    try {
      if (this.selectedActivity) {
        await api.Activities.unattend(this.selectedActivity.id);
      }
      runInAction(() => {
        if (this.selectedActivity) {
          this.selectedActivity.attendees = this.selectedActivity.attendees.filter(
            a => a.userName !== this.rootStore.userStore.user!.userName
          );
          this.selectedActivity.isGoing = false;
          this.activityRegistry.set(
            this.selectedActivity.id,
            this.selectedActivity
          );
        }
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        toast.error("Unable to update activity");
        this.loading = false;
      });
    }
  };

  createAttendee = (user: IUser): IAttendee => {
    return {
      displayName: user.displayName,
      isHost: false,
      image: user.image || "",
      userName: user.userName
    };
  };
}
