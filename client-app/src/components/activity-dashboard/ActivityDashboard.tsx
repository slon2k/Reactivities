import React from "react";
import { IActivity } from "../../models/activity";
import { Grid } from "semantic-ui-react";
import { ActivityList } from "../activity-list/ActivityList";
import { ActivityDetails } from "../activity-details/ActivityDetails";

interface IProps {
  activities: IActivity[];
}

export const ActivityDashboard: React.FC<IProps> = ({ activities }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} />
      </Grid.Column>
      <Grid.Column width={6}>
        {activities.length > 0 && <ActivityDetails activity={activities[0]} />}
      </Grid.Column>
    </Grid>
  );
};
