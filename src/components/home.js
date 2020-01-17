import React from 'react';
import axios from 'axios'

import ShowPaths from './showPaths';
import shortid from 'shortid';
import TreeNode from './treenode'

class Home extends React.Component {
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
    axios.get('https://edument-backend.herokuapp.com/path/')
    .then(res => {
      console.log(res.data)
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
            <div className="tabWindow">
            <div id="tabinfo">
                <i className="material-icons" onClick={()=>this.home()}>
                    home
                </i>
                <i className="material-icons" onClick={()=>this.home()}>
                  keyboard_backspace
                </i>
              <ShowPaths key={shortid.generate()} currentPath={currentPath} currentNode={currentNode} />
            </div>  
            </div>  
            );
        } else {
          return (
            <div className="tabWindow">
            <div id="tabinfo">
            <h1>Loading ...</h1>
            </div>
            </div>
          )

        }
      }
}

export default Home;
