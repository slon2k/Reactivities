import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../navbar/NavBar";
import ActivityDashboard from "../activity-dashboard/ActivityDashboard";
import Loading from "../loading/Loading";
import { ActivityStore } from "../../store";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);
  const {
    loadActivities,
    loading,
  } = activityStore;

  useEffect(() => {
    loadActivities();
  }, [activityStore]);

  if (loading) {
    return <Loading content="Loading activities ..." />;
  }

  return (
    <Fragment>
      <NavBar />
      <Container style={{ paddingTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
