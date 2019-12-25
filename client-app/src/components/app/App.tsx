import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../../models/activity";
import { NavBar } from "../navbar/NavBar";
import { ActivityDashboard } from "../activity-dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const selectActivity = (id: string) => {
    setEditMode(false);
    const index = activities.findIndex(item => item.id === id);
    if (index > -1) {
      setSelectedActivity(activities[index]);
    }
  };

  const clearSelectedActivity = () => {
    setSelectedActivity(null);
  };

  const createActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const updateActivity = (activity: IActivity) => {
    setActivities([...activities.filter(item => item.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const deleteActivity = (id: string) => {
    const index = activities.findIndex(item => item.id === id);
    if (index > -1) {
      setActivities([...activities.filter(item => item.id !== id)]);
    }
    if (selectedActivity && selectedActivity.id === id) {
      clearSelectedActivity();
    }  
  }

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        const activities: IActivity[] = [];
        response.data.forEach(item => {
          item.date = item.date.split(".")[0];
          activities.push(item);
        });
        setActivities(activities);
      });
  }, []);

  return (
    <Fragment>
      <NavBar setEditMode={setEditMode} clearSelectedActivity={clearSelectedActivity}/>
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
        />
      </Container>
    </Fragment>
  );
};

export default App;
