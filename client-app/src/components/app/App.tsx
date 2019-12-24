import React, { useState, useEffect }   from 'react';
import axios from 'axios';
import { Header, Icon, List, ListItem } from 'semantic-ui-react';

const App = () => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/values")
      .then(response => setValues(response.data));
  },[]);

  return (
    <div>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        { values.map((value : any) => <ListItem key={value.id}>{value.name}</ListItem>) }
      </List>
    </div>
  );
}

export default App;
