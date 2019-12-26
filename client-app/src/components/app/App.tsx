import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../navbar/NavBar";
import ActivityDashboard from "../activity-dashboard/ActivityDashboard";
import Loading from "../loading/Loading";
import { ActivityStore } from "../../store";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import ActivitiesPage from "../../pages/ActivitiesPage";
import FormPage from "../../pages/FormPage";
import DetailsPage from "../../pages/DetailsPage";

const App = () => {
  const activityStore = useContext(ActivityStore);
  const {
    loadActivities,
    loading,
    activityRegistry
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
        <Route exact path="/" component={HomePage}/>
        <Route path="/activities" component={ActivitiesPage}/>
        <Route path="/activities/:id" />
        <Route path="/create" component={FormPage}/>
      </Container>
    </Fragment>
  );
};

export default observer(App);
