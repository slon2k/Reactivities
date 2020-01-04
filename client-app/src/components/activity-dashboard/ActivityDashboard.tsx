import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "../activity-list/ActivityList";
import { StoreContext } from "../../store";
import { observer } from "mobx-react-lite";
import Loading from "../loading/Loading";

const ActivityDashboard: React.FC = () => {
  const Store = useContext(StoreContext);
  const { loadActivities, loading } = Store.activityStore;
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loading) {
    return <Loading content="Loading activities ..." />;
  }

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

export default observer(ActivityDashboard);
