import React from "react";
import { IActivity } from "../../models/activity";
import { List, ListItem, Grid } from "semantic-ui-react";
import { ActivityList } from '../activity-list/ActivityList';

interface IProps {
  activities: IActivity[];
}

export const ActivityDashboard: React.FC<IProps> = ({ activities }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities}/>
      </Grid.Column>
    </Grid>
  );
};
