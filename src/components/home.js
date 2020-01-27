import React from 'react';
import axios from 'axios'
import shortid from 'shortid';

import MainUI from './mainUI';
import TreeNode from './treenode'
import Loading from './messages/loading'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mainNode: {},
      currentNode: {},
      loadingDone: false,
      currentPath: "",
    }
  } 
  //THis is used to return back to the original screen
  home = () => {
    this.forceUpdate();
    // this.setState({currentNode: this.state.mainNode, currentPath: ""})
  }

  componentDidMount() {
    //Fetching paths
    this.setState({ loadingDone: false });
    axios.get('https://edument-backend.herokuapp.com/path/')
    .then(res => {
      let mainNode = this.createNodes(res.data)
      this.setState({ currentNode: mainNode, loadingDone: true, mainNode})
    });
  }


createNodes = (paths) => { 
  const mainNode = new TreeNode("Main Folder")
  let thisNode, nextNode;
  //Go through each path
  for (let i = 0; i < paths.length; i++){
    //Seperate the pathnames at "/"
    const pathName = paths[i].path; 
    const seperatedPathName = pathName.split("/");
    thisNode = new TreeNode(seperatedPathName[0]);
    //add every new node to mainNode
    mainNode.children.push(thisNode)
    //Add every new node to the correct node
    for (let j = 1; j < seperatedPathName.length; j++){
      nextNode = new TreeNode(seperatedPathName[j]);
      thisNode.children.push(nextNode)
      thisNode = nextNode;
    }
  }
  return mainNode;
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
          <MainUI key={shortid.generate()} currentPath={currentPath} currentNode={currentNode} />
        </div>  
        </div>  
        );
      } else {
        return (
          <Loading/>
        )
      }
    }
}

export default Home;
