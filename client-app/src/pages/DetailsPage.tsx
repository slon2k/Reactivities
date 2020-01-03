import React, { useContext, useEffect } from "react";
import ActivityDetails from "../components/activity-details/ActivityDetails";
import { Segment } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { StoreContext } from "../store";
import Loading from "../components/loading/Loading";
import { observer } from "mobx-react-lite";

interface IParams {
  id: string
}

const DetailsPage : React.FC<RouteComponentProps<IParams>> = ({match}) => {
  const Store = useContext(StoreContext);
  const {loadActivity, selectedActivity: activity, loading} = Store.activityStore;
  const { id } = match.params;

  useEffect(() => {
    loadActivity(id)
  }, [loadActivity, id, activity]);

  if (loading) {
    return <Loading content="Loading activity ..."/>
  }

  if (!activity) return <h2>Activity not found</h2>;

  return (
    <Segment>
      <ActivityDetails activity={activity}/>      
    </Segment>
  
  );
};

export default observer(DetailsPage);
