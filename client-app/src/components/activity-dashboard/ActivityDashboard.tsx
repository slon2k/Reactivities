import React from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "../activity-list/ActivityList";

const ActivityDashboard: React.FC = () => {

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h3>Filters</h3>
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
