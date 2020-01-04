import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../navbar/NavBar";
import Loading from "../loading/Loading";
import { StoreContext } from "../../store";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import ActivitiesPage from "../../pages/ActivitiesPage";
import CreatePage from "../../pages/CreatePage";
import EditPage from "../../pages/EditPage";
import DetailsPage from "../../pages/DetailsPage";
import NotFound from "../../pages/NotFound";
import { ToastContainer } from "react-toastify";
import LoginForm from "../login-form/LoginForm";

const App = () => {
  const Store = useContext(StoreContext);
  const { loadActivities, loading } = Store.activityStore;
  const { setApploaded, token, appLoaded } = Store.commonStore;
  const { getUser } = Store.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setApploaded());
    } else {
      setApploaded()
    }
  }, [getUser, setApploaded, token]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (!appLoaded) {
    return <Loading content="Loading application ..." />;
  }

  if (loading) {
    return <Loading content="Loading activities ..." />;
  }

  return (
    <Fragment>
      <ToastContainer position="bottom-right" />
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
                  <Route path="/login" component={LoginForm} />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </Fragment>
          );
        }}
      />
    </Fragment>
  );
};

export default observer(App);
