import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../../models/activity";
import { NavBar } from "../navbar/NavBar";
import { ActivityDashboard } from "../activity-dashboard/ActivityDashboard";
import * as api from "../../services/api";
import { Loading } from "../loading/Loading";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
    setSubmitting(true);
    api.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    });
  };

  const updateActivity = (activity: IActivity) => {
    setSubmitting(true);
    api.Activities.update(activity).then(() => {
      setActivities([
        ...activities.filter(item => item.id !== activity.id),
        activity
      ]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    });
  };

  const deleteActivity = (id: string) => {
    api.Activities.delete(id).then(() => {
      setActivities([...activities.filter(item => item.id !== id)]);
      if (selectedActivity && selectedActivity.id === id) {
        clearSelectedActivity();
      }
    });
  };

  useEffect(() => {
    api.Activities.list().then(response => {
      const activities: IActivity[] = [];
      response.forEach(item => {
        item.date = item.date.split(".")[0];
        activities.push(item);
      });
      setActivities(activities);
    }).then(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading content="Loading activities ..."/>
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

export default App;
