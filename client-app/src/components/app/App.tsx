import React, { useState, useEffect, Fragment }   from 'react';
import axios from 'axios';
import { List, ListItem, Container } from 'semantic-ui-react';
import { IActivity } from './../../models/Activity';
import { NavBar } from '../navbar/NavBar';


const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => setActivities(response.data));
  },[]);

  return (
    <Fragment>
      <NavBar />
      <Container style={{paddingTop: "7em"}}>
        <List>
          { activities.map((item) => <ListItem key={item.id}>{item.title}</ListItem>) }
        </List>
      </Container>
    </Fragment>
  );
}

export default App;
