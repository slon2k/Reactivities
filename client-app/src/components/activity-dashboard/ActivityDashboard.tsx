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
  createActivity: (activity: IActivity) => void;
  updateActivity: (activity: IActivity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectedActivity,
  clearSelectedActivity,
  selectActivity,
  editMode,
  setEditMode,
  createActivity,
  updateActivity,
  deleteActivity,
  submitting
}) => {
  const id: string = selectedActivity ? selectedActivity.id : "0";

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            setEditMode={setEditMode}
            clearSelectedActivity={clearSelectedActivity}
            submitting={submitting}
          />
        )}
        {editMode && (
          <ActivityForm
            key={id}
            setEditMode={setEditMode}
            activity={selectedActivity}
            createActivity={createActivity}
            updateActivity={updateActivity}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
