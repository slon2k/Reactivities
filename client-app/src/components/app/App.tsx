import React, { useState, useEffect }   from 'react';
import axios from 'axios';
import { Header, Icon, List, ListItem } from 'semantic-ui-react';
import { IActivity } from './../../models/Activity';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => setActivities(response.data));
  },[]);

  return (
    <div>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        { activities.map((item) => <ListItem key={item.id}>{item.title}</ListItem>) }
      </List>
    </div>
  );
}

export default App;
