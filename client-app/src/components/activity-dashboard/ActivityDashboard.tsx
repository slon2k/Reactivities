import React from "react";
import { IActivity } from "../../models/activity";
import { Grid } from "semantic-ui-react";
import { ActivityList } from "../activity-list/ActivityList";
import { ActivityDetails } from "../activity-details/ActivityDetails";
import { ActivityForm } from "../activity-form/ActivityForm";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  clearSelectedActivity: () => void;
  selectedActivity: IActivity | null;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectedActivity,
  clearSelectedActivity,
  selectActivity,
  editMode,
  setEditMode
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            setEditMode={setEditMode}
            clearSelectedActivity={clearSelectedActivity}
          />
        )}
        {editMode && <ActivityForm setEditMode={setEditMode} activity={selectedActivity}/>}
      </Grid.Column>
    </Grid>
  );
};
