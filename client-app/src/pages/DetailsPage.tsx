import React from "react";
import ActivityDetails from "../components/activity-details/ActivityDetails";
import { IActivity } from "../models/activity";

const DetailsPage = (activity: IActivity) => {
  return <ActivityDetails activity={activity} />;
};

export default DetailsPage;
