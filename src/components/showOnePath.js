import React from 'react';
import axios from 'axios';
// import { Redirect } from "react-router-dom";
// import shortid from 'shortid';
// import ShowPaths from './showPaths';

export default class ShowfolderOrFile extends React.Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            newPath: "",
            pathClicked: false,
            deleted: false,
        };
        this.deleteFolderOrFile = this.deleteFolderOrFile.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    folderNotPresent = () => {
        
    }

    checkIfFolderOrFile = () => {
        if (true){
            return "folder"
        } else {
            return "file"
        }
    }
    
    handleClick = () => {
        // let newPath = this.props.path + "/" + clickedFolder;
        this.setState({pathClicked: true});
    }

    deleteFolderOrFile = () => {
        const pathToDelete = this.props.path + '/' + this.props.folder
        console.log("This should be deleted: " + pathToDelete)
        axios.post('https://edument-backend.herokuapp.com/path/delete', {pathToDelete})
        .then(res => {
          this.setState({deleted: true})
          console.log(res);
        })
    }

    changeFolderOrFile = (path) => {
        const pathToUpdate = this.props.path + '/' + this.props.folder
        console.log("This should be changed: " + pathToUpdate)
    }

    render (){
        let {pathClicked, deleted} = this.state;
        let path = this.props.path;
        let mainDivClassName = this.checkIfFolderOrFile()
        return (
            <div className={mainDivClassName} >
            <h3 >
                {path}
            </h3>
            {mainDivClassName === "folder" && <i className="material-icons" onClick={() => this.handleClick()}>
                folder_open
            </i>}
            <i className="material-icons" onClick={()=>this.deleteFolderOrFile()}>
                delete
            </i>
            <i className="material-icons" onClick={()=>this.changeFolderOrFile()}>
                create
            </i>
            {mainDivClassName === "onePath" && deleted && <p className="error"> This folder and everything inside it has now been deleted</p>}
            {mainDivClassName !== "onePath" && deleted && <p className="error"> This file has now been deleted</p>}
            </div>

        )
    }
}


 