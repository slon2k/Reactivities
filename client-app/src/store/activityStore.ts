import { observable, action, computed } from "mobx";
import { createContext } from "react";
import { IActivity } from "../models/activity";
import { api } from "../services";

class ActivityStore {
  @observable activityRegistry = new Map<string, IActivity>()
  @observable loading = false;
  @observable submitting = false;
  @observable editMode = false;
  @observable selectedActivity: IActivity | null = null;
  @observable deleting = new Set<string>();

  @computed get activitiesByDate() {
    const activities = Array.from<IActivity>(this.activityRegistry.values());
    return activities.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
  } 

  @action loadActivities = async () => {
    this.loading = true;
    try {
      const response = await api.Activities.list();
      response.forEach(item => {
        item.date = item.date.split(".")[0];
        this.activityRegistry.set(item.id, item);
      });
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  @action selectActivity = (id: string) => {
    const activity = this.activityRegistry.get(id);
    if (activity !== undefined ) {
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
      this.activityRegistry.set(activity.id, activity);
      this.submitting = false; 
      this.selectedActivity = activity;
      this.editMode = false;     
    } catch (error) {
      console.log(error);
      this.submitting = false;
      this.editMode = false;
    }
  };

  @action updateActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await api.Activities.update(activity);
      this.activityRegistry.set(activity.id, activity);
      this.submitting = false;
      this.selectedActivity = activity;
      this.editMode = false;        
    } catch (error) {
      console.log(error);
      this.submitting = false;
      this.editMode = false;    
    }
  };

  @action deleteActivity = async (id: string) => {
    this.deleting.add(id);
    try {
      const response = await api.Activities.delete(id);
      this.activityRegistry.delete(id);
      this.deleting.delete(id);
      if (this.selectedActivity && this.selectedActivity.id === id) {
        this.clearSelectedActivity();
      }
    } catch (error) {
      console.log(error);
      this.deleting.delete(id);
    }
  };

  @action setEditMode = (mode: boolean) => {
    this.editMode = mode;
  }
}

export default createContext(new ActivityStore());
