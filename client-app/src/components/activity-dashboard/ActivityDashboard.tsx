import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "../activity-list/ActivityList";
import ActivityDetails from "../activity-details/ActivityDetails";
import ActivityForm from "../activity-form/ActivityForm";
import { ActivityStore } from "../../store";
import { observer } from "mobx-react-lite";

const ActivityDashboard: React.FC = () => {
  const { selectedActivity, editMode } = useContext(ActivityStore);
  const id: string = selectedActivity ? selectedActivity.id : "0";

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails />
        )}
        {editMode && <ActivityForm key={id} />}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
