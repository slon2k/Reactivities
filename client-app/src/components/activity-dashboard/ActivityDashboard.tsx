import React, { useContext, useEffect, useState } from "react";
import { Grid, Button, Loader } from "semantic-ui-react";
import ActivityList from "../activity-list/ActivityList";
import { StoreContext } from "../../store";
import { observer } from "mobx-react-lite";
import Loading from "../loading/Loading";
import InfiniteScroll from "react-infinite-scroller";
import ActivityFilters from "../activity-filters/ActivityFilters";

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
        <InfiniteScroll
          pageStart={0}
          loadMore={loadNext}
          hasMore={!loadingNext && (page + 1 < totalPages)}
          initialLoad={false}
        >
          <ActivityList />
        </InfiniteScroll>
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>      
      <Grid.Column width={10}>
        <Loader active={loadingNext}/>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
