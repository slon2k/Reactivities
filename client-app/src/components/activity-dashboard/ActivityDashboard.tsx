import React from "react";
import { IActivity } from "../../models/activity";
import { Grid } from "semantic-ui-react";
import { ActivityList } from "../activity-list/ActivityList";
import { ActivityDetails } from "../activity-details/ActivityDetails";
import { ActivityForm } from "../activity-form/ActivityForm";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
}

export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectedActivity,
  selectActivity
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity !== null && (
          <ActivityDetails activity={selectedActivity} />
        )}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
};
