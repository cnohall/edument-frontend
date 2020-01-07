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
      mainNode: {},
      loadingDone: false,
    }
  } 
  home = () => {
    this.setState({mainNode: this.state.originalNode})
  }

  componentDidMount() {
    //Fetching paths
    this.setState({ loadingDone: false });
    axios.get('https://edument-backend.herokuapp.com/')
    .then(res => {
      let mainNode = this.analyzeData(res.data)
      this.setState({ mainNode, loadingDone: true, originalNode: mainNode})
    });
  }

  analyzePaths = (data) => { 
    let originalPaths = {};
    const currentPaths = [];
    for (let i = 0; i < data.length; i++){
        const pathName = data[i].path; 
        const relevantPath = pathName.split("/", 1);
        if(!originalPaths[relevantPath]){
            originalPaths[relevantPath] = [pathName];
            currentPaths.push(relevantPath)
        } else {
            originalPaths[relevantPath].push(pathName)
        }
    }
    return {originalPaths, currentPaths}
  }

analyzeData = (data) => { 
  const mainNode = new TreeNode("Main Folder")
  let previousNode, thisNode;
  for (let i = 0; i < data.length; i++){
    const originalPathName = data[i].path; 
    const seperatedPathName = originalPathName.split("/");
    previousNode = new TreeNode(seperatedPathName[0]);
    mainNode.children.push(previousNode)
    for (let j = 1; j < seperatedPathName.length; j++){
      thisNode = new TreeNode(seperatedPathName[j]);
      previousNode.children.push(thisNode)
      previousNode = thisNode;
    }
  }
  return mainNode;
}

  render(){
    const { mainNode, loadingDone} = this.state;
    if (loadingDone) {
          return (
            <div>
              <button className="button" onClick={()=>this.home()}>Home</button>
              <AddPath/>
              <ShowPaths key={shortid.generate()} mainNode={mainNode} />
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
