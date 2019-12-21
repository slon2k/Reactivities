import React, { Component}  from 'react';
import './App.css';
import axios from 'axios';
import { Header, Icon, List, ListItem } from 'semantic-ui-react';

class App extends Component {
  state = {
    values: []
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/values")
      .then(response => {
        this.setState({ values: response.data })
      });
    }

  render() {
    const { values } = this.state;
    
    return(
      <div>
          <Header as='h2'>
            <Icon name='users' />
            <Header.Content>Reactivities</Header.Content>
          </Header>
          <List>
            { values.map((value : any) => <ListItem key={value.id}>{value.name}</ListItem>) }
          </List>
      </div>
    )
  }
}

export default App;
