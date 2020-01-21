import React, { useContext, useEffect, useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import ActivityList from "../activity-list/ActivityList";
import { StoreContext } from "../../store";
import { observer } from "mobx-react-lite";
import Loading from "../loading/Loading";

const ActivityDashboard: React.FC = () => {
  const Store = useContext(StoreContext);
  const {
    loadActivities,
    loading,
    setPage,
    page,
    totalPages
  } = Store.activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const loadNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadActivities().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loading && page === 0) {
    return <Loading content="Loading activities ..." />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
        <Button
          floated="right"
          content="More ..."
          positive
          onClick={loadNext}
          disabled={totalPages === page + 1}
          loading={loadingNext}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <h3>Filters</h3>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
