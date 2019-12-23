import React from 'react';
import './App.css';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      data : [],
    }
  } 

  componentDidMount() {
    //Fetching paths
    this.setState({ isLoading: true });
    axios.get('https://edument-backend.herokuapp.com/')
    .then(res => {
      console.log(res)
      this.setState({ data: res.data, isLoading: false })
    });
}
  render(){

    const { data, isLoading} = this.state;
    //If the paths still haven't been fetched show a message that says Loading...
    if (isLoading) {
      return (
      <div>
      <h1>Loading ...</h1>
      </div>
      );
    //Else show the data
    } else {
      return (
        <div>
        {data.map(data =>
          <h1> {data.path} </h1>
        )}
        </div>
        );
    }
  }
}

export default App;
