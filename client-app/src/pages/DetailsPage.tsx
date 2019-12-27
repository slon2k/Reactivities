import React, { useContext, useEffect } from "react";
import ActivityDetails from "../components/activity-details/ActivityDetails";
import { Segment } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { ActivityStore } from "../store";
import Loading from "../components/loading/Loading";
import { observer } from "mobx-react-lite";

interface IParams {
  id: string
}

const DetailsPage : React.FC<RouteComponentProps<IParams>> = ({match}) => {
  const {loadActivity, selectedActivity: activity, loading} = useContext(ActivityStore);
  const { id } = match.params;

  useEffect(() => {
    loadActivity(id)
  }, [loadActivity, id, activity]);

  if (loading || !activity ) {
    return <Loading content="Loading activity ..."/>
  }

  return (
    <Segment>
      <ActivityDetails activity={activity}/>      
    </Segment>
  
  );
};

export default observer(DetailsPage);
