import React from 'react';
import shortid from 'shortid';
import FolderUI from './folderUI';
import TreeNode from './treenode'
import Empty from './messages/empty'

export default class MainUI extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentNode: {},
            clickedPath: false,
            isLoading: false
        };
        this.organizeNodes = this.organizeNodes.bind(this);
    }

    componentWillMount = () => {
        this.organizeNodes(this.props.currentNode);
    }

    organizeNodes = (node) =>{
        let currentNode = node;
        const children = currentNode.children;
        let nodes = {};
        let nextNode;
        for (let i = 0; i < children.length; i ++){
            nextNode = children[i];
            if (!nodes[nextNode.value]){
                nodes[nextNode.value] = [nextNode.children]
            } else {
                nodes[nextNode.value].push(nextNode.children);
            }
        }
        this.setState({currentNode: nodes, isLoading:false})
    }

    handleClickedPath = (clickedPath, relevantNodes) => {
        const children = relevantNodes[clickedPath];
        //If there are no children just return
        //This means that there are no deeper levels on the 
        if(!children[0][0]){
            return;
        }

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
        let {currentNode} = this.state;
         if (!this.isEmpty(currentNode)) {
            return (
                <div>
                <div className="paths">
                {Object.keys(currentNode).map(onePath => 
                    <FolderUI key={shortid.generate()} 
                    handleClickedPath={this.handleClickedPath} 
                    currentNode={currentNode} 
                    folderOrFileName={onePath}
                    />
                )}
                </div>
                </div>
            )
        } else {
            return (
                <Empty/>
            )
    
        }
    }
}