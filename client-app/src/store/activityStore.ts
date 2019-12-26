import { observable, action } from "mobx";
import { createContext } from "react";
import { IActivity } from "../models/activity";
import { api } from "../services";

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable loading = false;
  @observable submitting = false;
  @observable editMode = false;
  @observable selectedActivity: IActivity | null = null;

  @action loadActivities = async () => {
    this.loading = true;
    try {
      var response = await api.Activities.list();
      response.forEach(item => {
        item.date = item.date.split(".")[0];
        this.activities.push(item);
      });
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  @action selectActivity = (id: string) => {
    const index = this.activities.findIndex(item => item.id === id);
    if (index > -1) {
      this.selectedActivity = this.activities[index];
    }
  };

  @action clearSelectedActivity = () => {
    this.selectedActivity = null;
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      var response = await api.Activities.create(activity);
      this.activities.push(activity);
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
      var response = await api.Activities.update(activity);
      this.activities = [...this.activities.filter(item => item.id !== activity.id),
        activity];
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
    try {
      var response = await api.Activities.delete(id);
      this.activities = [...this.activities.filter(item => item.id !== id)]
      if (this.selectedActivity && this.selectedActivity.id === id) {
        this.clearSelectedActivity();
      }
    } catch (error) {
      console.log(error);
    }
  };

  @action setEditMode = (mode: boolean) => {
    this.editMode = mode;
  }
}

export default createContext(new ActivityStore());
