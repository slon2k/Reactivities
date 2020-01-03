import React, { useEffect, useContext } from "react";
import ActivityForm from "../components/activity-form/ActivityForm";
import { RouteComponentProps } from "react-router-dom";
import { StoreContext } from "../store";
import { observer } from "mobx-react-lite";
import Loading from "../components/loading/Loading";

interface IParams {
  id: string
}

const EditPage : React.FC<RouteComponentProps<IParams>> = ({match}) => {
  const Store = useContext(StoreContext);
  const {loadActivity, selectedActivity: activity, loading} = Store.activityStore;
  const { id } = match.params;

  useEffect(() => {
    loadActivity(id)
  }, [loadActivity, id, activity]);

  if (loading || !activity ) {
    return <Loading content="Loading activity ..."/>
  }
  
  return <ActivityForm activity={activity}/>;
};

export default observer(EditPage);
