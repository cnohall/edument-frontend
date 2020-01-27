import React from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import ShowPaths from './showPaths';
import shortid from 'shortid';
import TreeNode from './treenode'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      returnToHomepage: false,
      currentNode: {},
      loadingDone: false,
      currentPath: "",
    }
  } 
  home = () => {
    this.setState({ returnToHomepage: true})
  }

  componentDidMount() {
    //Fetching paths
    this.setState({ loadingDone: false });
    axios.get('https://edument-backend.herokuapp.com/path/')
    .then(res => {
      console.log(res.data)
      let currentNode = this.analyzeData(res.data)
      this.setState({ currentNode, loadingDone: true})
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
    const { currentPath, currentNode, returnToHomepage, loadingDone} = this.state;
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
        } else if (returnToHomepage) {
          return (
            <Link className="link" to="/"></Link>
          )
        } else {
          return (
            <div className="tabWindow">
            <div id="tabinfo">
            <h1>Loading...</h1>
            </div>
            </div>
          )

        }
      }
}

export default Home;
