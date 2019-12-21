import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    values: []
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/values")
      .then(response => {
        console.log(response);
        this.setState({ values: response.data })
      });
    }

  render() {
    const { values } = this.state;
    
    return(
      <div>
        <h2>App</h2>
        <ul>
          { values.map((value : any) => <li key={value.id}>{value.name}</li>) }         
        </ul>
      </div>
    )
  }
}

export default App;
