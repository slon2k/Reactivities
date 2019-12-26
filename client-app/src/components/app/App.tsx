import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import { NavBar } from "../navbar/NavBar";
import { ActivityDashboard } from "../activity-dashboard/ActivityDashboard";
import { Loading } from "../loading/Loading";
import { ActivityStore } from "../../store";
import { observer } from "mobx-react-lite";

const App = () => {
  const {
    activities,
    loadActivities,
    loading,
    selectedActivity,
    submitting,
    editMode, 
    selectActivity,
    clearSelectedActivity,
    createActivity,
    updateActivity,
    deleteActivity,
    setEditMode
  } = useContext(ActivityStore);

  useEffect(() => {
    loadActivities();
  }, [ActivityStore]);

  if (loading) {
    return <Loading content="Loading activities ..." />;
  }

  return (
    <Fragment>
      <NavBar
        setEditMode={setEditMode}
        clearSelectedActivity={clearSelectedActivity}
      />
      <Container style={{ paddingTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={selectActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          clearSelectedActivity={clearSelectedActivity}
          createActivity={createActivity}
          updateActivity={updateActivity}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
};

export default observer(App);
