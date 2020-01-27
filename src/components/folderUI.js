import React from 'react';
import axios from 'axios';
// import {useForm} from "react-hook-form";

// const proxy = "https://cors-anywhere.herokuapp.com/";
export default function FolderUI (props) {
    let {folderOrFileName, currentNode, handleClickedPath} = props;

    const [deleted, setdeleted] = React.useState(false); 



    const checkIfClickable = (folderOrFileName) => {
        if (folderOrFileName[0][0]){
            return "onePath"
        } else {
            return "unclickable"
        }
    }

    const handleClick = (path, currentNode, handleClickedPath) => {
        handleClickedPath(path, currentNode);
    }

    const deleteFolderOrFile = (folderOrFileName) => {
        console.log(folderOrFileName)
        console.log("This should be deleted: " + folderOrFileName)
        axios.post('https://edument-backend.herokuapp.com/path/delete', {path: folderOrFileName})
        .then(res => {
          console.log(res);
          setdeleted(true);
        })
    }

    const changeFolderOrFile = (folderOrFileName) => {
        console.log("This should be changed: " + folderOrFileName)
    }

    let mainDivClassName = checkIfClickable(currentNode[folderOrFileName])
    return (
        <div className={mainDivClassName} >
        <h3>
            {folderOrFileName}
        </h3>
        {mainDivClassName === "onePath" && <i className="material-icons" onClick={() =>handleClick(folderOrFileName, currentNode, handleClickedPath)}>
            folder_open
        </i>}
        <i className="material-icons" onClick={()=>deleteFolderOrFile(folderOrFileName)}>
            delete
        </i>
        <i className="material-icons" onClick={()=>changeFolderOrFile(folderOrFileName)}>
            create
        </i>
        {mainDivClassName === "onePath" && deleted && <p className="error"> This folder and everything inside it has now been deleted</p>}
        {mainDivClassName !== "onePath" && deleted && <p className="error"> This file has now been deleted</p>}
        </div>

    )
    
}

