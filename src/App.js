import React from 'react';
import './App.css';
import axios from 'axios'

import AddPath from './components/addPath'
import ShowPaths from './components/showPaths';
import shortid from 'shortid';
import TreeNode from './components/treenode'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      originalNode: {},
      currentNode: {},
      loadingDone: false,
      currentPath: "",
    }
  } 
  home = () => {
    this.setState({currentNode: this.state.originalNode, currentPath: ""})
  }

  componentDidMount() {
    //Fetching paths
    this.setState({ loadingDone: false });
    axios.get('https://edument-backend.herokuapp.com/')
    .then(res => {
      let currentNode = this.analyzeData(res.data)
      this.setState({ currentNode, loadingDone: true, originalNode: currentNode})
    });
  }

analyzeData = (data) => { 
  const currentNode = new TreeNode("Main Folder")
  let previousNode, thisNode;
  for (let i = 0; i < data.length; i++){
    const originalPathName = data[i].path; 
    const seperatedPathName = originalPathName.split("/");
    previousNode = new TreeNode(seperatedPathName[0]);
    currentNode.children.push(previousNode)
    for (let j = 1; j < seperatedPathName.length; j++){
      thisNode = new TreeNode(seperatedPathName[j]);
      previousNode.children.push(thisNode)
      previousNode = thisNode;
    }
  }
  return currentNode;
}



  render(){
    const { currentPath, currentNode, loadingDone} = this.state;
    if (loadingDone) {
          return (
            <div>
              <button className="button" onClick={()=>this.home()}>Home</button>
              <AddPath/>
              <ShowPaths key={shortid.generate()} currentPath={currentPath} currentNode={currentNode} />
            </div>  
            );
        } else {
          return (
            <div>
            <h1>Loading ...</h1>
            </div>
          )

        }
      }
}

export default App;
