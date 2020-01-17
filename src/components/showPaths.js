import React from 'react';
import shortid from 'shortid';
import ShowOnePath from './showOnePath';
import TreeNode from './treenode'

export default class ShowPaths extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            clickedPath: false,
            currentMainNode: props.currentNode,
            currentPath: props.currentPath,
            isLoading: false
        };
        this.organizeNodes = this.organizeNodes.bind(this);
        // this.handleClickedPath = this.handleClickedPath.bind(this);
    }

    componentWillMount = () => {
        this.organizeNodes(this.props.currentNode);
    }

    organizeNodes = (node) =>{
        let currentMainNode = node;
        const children = currentMainNode.children;
        let nodes = {};
        let currentNode;
        for (let i = 0; i < children.length; i ++){
            currentNode = children[i];
            if (!nodes[currentNode.value]){
                nodes[currentNode.value] = [currentNode.children]
            } else {
                nodes[currentNode.value].push(currentNode.children);
            }
        }
        this.setState({currentMainNode: nodes, isLoading:false})
    }

    handleClickedPath = (clickedPath, relevantNodes) => {
        const children = relevantNodes[clickedPath];
        //If there are no children just return
        //This means that there are no deeper levels on the 
        if(!children[0][0]){
            return;
        }
        const pathToAdd = this.state.currentPath + clickedPath + "/";
        this.setState({isLoading:true, currentPath: pathToAdd})
        //Create a new node and set it to the main node
        const newNode = new TreeNode(clickedPath);
        for (let i = 0; i < children.length; i++){
            newNode.children.push(children[i][0])
        }
        this.organizeNodes(newNode);
    }

    isEmpty = (obj) => { 
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    render(){
        let {currentMainNode, currentPath} = this.state;
         if (!this.isEmpty(currentMainNode)) {
             console.log(this.state.currentPath)
            return (
                <div>
                <div className="paths">
                {Object.keys(currentMainNode).map(onePath => 
                    <ShowOnePath key={shortid.generate()} onClickedPath={this.handleClickedPath} 
                    relevantNodes={currentMainNode} FileOrFolderName={onePath} currentPath={currentPath}/>
                )}
                </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>There are no files nor any folders</h1>
                </div>
            )
    
        }
    }
}