import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../navbar/NavBar";
import Loading from "../loading/Loading";
import { ActivityStore } from "../../store";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import ActivitiesPage from "../../pages/ActivitiesPage";
import CreatePage from "../../pages/CreatePage";
import EditPage from "../../pages/EditPage";
import DetailsPage from "../../pages/DetailsPage";

const App = () => {

  const activityStore = useContext(ActivityStore);
  const { loadActivities, loading } = activityStore;

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loading) {
    return <Loading content="Loading activities ..." />;
  }

  return (
    <Fragment>
<<<<<<< HEAD
      <NavBar />
      <Container style={{ paddingTop: "7em" }}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/activities" component={ActivitiesPage} />
        <Route path="/activities/:id" render={({ match }) => <DetailsPage id={String(match.params.id)} />} />
        <Route path="/create" component={FormPage} />
      </Container>
=======
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => {
          return (
            <Fragment>
              <NavBar />
              <Container style={{ paddingTop: "7em" }}>
              <Switch>
                <Route exact path="/activities" component={ActivitiesPage} />
                <Route path="/activities/:id" component={DetailsPage} />
                <Route path="/create" component={CreatePage} />
                <Route path="/edit/:id" component={EditPage} />                
              </Switch>  
              </Container>
            </Fragment>
          );
        }}
      />
>>>>>>> b7e280b5ce90034223321d4b4b1ead887af2b15e
    </Fragment>
  );
};

export default observer(App);
