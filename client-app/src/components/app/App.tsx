import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../../models/activity";
import { NavBar } from "../navbar/NavBar";
import { ActivityDashboard } from "../activity-dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const selectActivity = (id: string) => {
    const index = activities.findIndex(item => item.id === id);
    if (index > -1) {
      setSelectedActivity(activities[index]);
    }
  };

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => setActivities(response.data));
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{ paddingTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={selectActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
