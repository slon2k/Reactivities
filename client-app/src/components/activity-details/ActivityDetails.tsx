import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { ActivityStore } from "../../store";
import { observer } from "mobx-react-lite";
import { IActivity } from "../../models/activity";
import ActivityDetailsHeader from "./activity-details-header/ActivityDetailsHeader";
import ActivityDetailsInfo from "./activity-details-info/ActivityDetailsInfo";
import ActivityDetailsChat from "./activity-details-chat/ActivityDetailsChat";
import ActivityDetailsSidebar from "./activity-details-sidebar/ActivityDetailsSidebar";

interface IProps {
  activity: IActivity;
}

const ActivityDetails: React.FC<IProps> = ({ activity }) => {
  const { clearSelectedActivity, submitting } = useContext(ActivityStore);

  const { id } = activity;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader />
        <ActivityDetailsInfo />
        <ActivityDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailsSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
