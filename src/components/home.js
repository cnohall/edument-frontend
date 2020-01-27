import React from 'react';
import ShowPaths from './showPaths';
import shortid from 'shortid';
import axios from 'axios'
import Loading from './simple/loading'
// import TreeNode from './treenode'

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      allPaths: [],
      currentPath: {},
      loadingDone: false,
    };
}

  componentDidMount = () => {
      axios.get(`https://edument-backend.herokuapp.com/path/find/`)
          .then(res => {
            let allPaths = [];
            for (let i = 0; i < res.data.length; i++){
              allPaths.push(res.data[i].path);
            }
            this.setState({ loadingDone:true, allPaths})
            // console.log(res.data)
            // let nodes = this.setUpNodes(res.data)
            // this.setState({ loadingDone:true, nodes})
      });
  }

  // setUpNodes = (data) => { 
  //   const nodes = new TreeNode("Main Folder")
  //   let previousNode, thisNode;
  //   for (let i = 0; i < data.length; i++){
  //     const pathName = data[i].path; 
  //     const seperatedPathName = pathName.split("/");
  //     previousNode = new TreeNode(seperatedPathName[0]);
  //     nodes.children.push(previousNode)
  //     for (let j = 1; j < seperatedPathName.length; j++){
  //       thisNode = new TreeNode(seperatedPathName[j]);
  //       previousNode.children.push(thisNode)
  //       previousNode = thisNode;
  //     }
  //   }
  //   return nodes;
  // }

  // seperatePathNames = (data, depth) =>{
  //   const folders = {};
  //   for (let i = 0; i < data.length; i++){
  //       const originalPathName = data[i].path; 
  //       const seperatedPathName = originalPathName.split("/")[depth];
  //       folders[seperatedPathName] = seperatedPathName;
  //   }
  //   return folders;
  // }

  render(){
    let {allPaths, loadingDone} = this.state;
    if (loadingDone){
      return (
        <div>
          <ShowPaths key={shortid.generate()} allPaths={allPaths}/>
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
