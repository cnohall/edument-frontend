import React from 'react';
import axios from 'axios'

export default class ShowfolderOrFileName extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            folderOrFileName: props.FileOrFolderName,
            clickedPath: props.onClickedPath,
            relevantNodes: props.relevantNodes,
            currentPath: props.currentPath,
            deleted: false,
        };
        this.deleteFolderOrFile = this.deleteFolderOrFile.bind(this);
        
    }

    checkIfClickable = (folderOrFileName) => {
        if (folderOrFileName[0][0]){
            return "onePath"
        } else {
            return "unclickable"
        }
    }

    deleteFolderOrFile = (relevantPath) => {
        console.log("This should be deleted: " + relevantPath)
        axios.post('https://edument-backend.herokuapp.com/path/delete', {path: relevantPath})
        .then(res => {
          this.setState({deleted: true})
          console.log(res);
        })
    }

    changeFolderOrFile = (relevantPath) => {
        console.log("This should be changed: " + relevantPath)
    }

    render (){
        let {currentPath, folderOrFileName, relevantNodes, clickedPath, deleted} = this.state;
        const relevantPath = currentPath + folderOrFileName;
        let mainDivClassName = this.checkIfClickable(relevantNodes[folderOrFileName])
        return (
            <div className={mainDivClassName} >
            <h3 >
                {folderOrFileName}
            </h3>
            {mainDivClassName === "onePath" && <i className="material-icons" onClick={() =>handleClick(folderOrFileName, relevantNodes, clickedPath)}>
                folder_open
            </i>}
            <i className="material-icons" onClick={()=>this.deleteFolderOrFile(relevantPath)}>
                delete
            </i>
            <i className="material-icons" onClick={()=>this.changeFolderOrFile(relevantPath)}>
                create
            </i>
            {mainDivClassName === "onePath" && deleted && <p className="error"> This folder and everything inside it has now been deleted</p>}
            {mainDivClassName !== "onePath" && deleted && <p className="error"> This file has now been deleted</p>}
            </div>

        )
    }
}

function handleClick (path, relevantNodes, clickedPath){
    clickedPath(path, relevantNodes);
}