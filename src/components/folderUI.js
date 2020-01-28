import React from 'react';
import axios from 'axios';
import {useForm} from "react-hook-form";

export default function FolderUI (props) {
    
    let {folderOrFileName, currentNode, handleClickedPath} = props;
    const [deleted, setdeleted] = React.useState(false); 
    const [updated, setupdated] = React.useState(false); 
    const {register, handleSubmit, errors} = useForm();
    const errorMessage = "You need to write something";
    const checkIfClickable = (folderOrFileName) => {
        if (folderOrFileName[0][0]){
            return "onePath"
        } else {
            return "unclickable"
        }
    }

    const onSubmit = (data) => {
        const pathToUpdate = props.path + props.folderOrFileName;
        const updateTo = data.newPath
        axios.get('https://edument-backend.herokuapp.com/path/')
        .then(res => {
            let pathsInfo = res.data;
            let pathsToUpdate = pathsInfo.filter(obj => obj.path.startsWith(pathToUpdate))
            for (let i = 0; i < pathsToUpdate.length; i++){
                let updatingPath = pathsToUpdate[i].path;
                pathsToUpdate[i].path = updatingPath.replace(props.folderOrFileName, updateTo);
                axios.post('https://edument-backend.herokuapp.com/path/update', {data : pathsToUpdate[i]})
                .then(res => {
                    console.log(res)
                    if(res.status === 200){
                        setupdated(true);
                    }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
        });
      }

    const handleClick = (path, currentNode, handleClickedPath) => {
        handleClickedPath(path, currentNode);
    }

    const deleteFolderOrFile = (data) => {
        const pathToDelete = props.path + props.folderOrFileName;
        axios.get('https://edument-backend.herokuapp.com/path/')
        .then(res => {
            let pathsInfo = res.data;
            let pathsToDelete = pathsInfo.filter(obj => obj.path.startsWith(pathToDelete))
            for (let i = 0; i < pathsToDelete.length; i++){
                console.log(pathsToDelete[i])
                axios.post('https://edument-backend.herokuapp.com/path/delete', {data : pathsToDelete[i]})
                .then(res => {
                    console.log(res)
                    if(res.status === 200){
                        setdeleted(true);
                    }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
        });
        
        // console.log(folderOrFileName)
        // console.log("This should be deleted: " + folderOrFileName)
        // axios.post('https://edument-backend.herokuapp.com/path/delete', {path: folderOrFileName})
        // .then(res => {
        //   console.log(res);
        //   if(res.status === 200){
        //     setdeleted(true);
        //     }
        // })
    }

    let mainDivClassName = checkIfClickable(currentNode[folderOrFileName])
    return (
        <div className={mainDivClassName} >
        <h1>
            {folderOrFileName}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input className="formInput" type="text" placeholder={folderOrFileName} name="newPath" ref={register ({required:true})}/>
            <input className="button" type="submit" value="Update"/> 
            {errors.newPath && <p className="error"> {errorMessage}</p>}
        </form>
        {mainDivClassName === "onePath" && <i className="material-icons" onClick={() =>handleClick(folderOrFileName, currentNode, handleClickedPath)}>
            folder_open
        </i>}
        <i className="material-icons" onClick={()=>deleteFolderOrFile(folderOrFileName)}>
            delete
        </i>
        {mainDivClassName === "onePath" && deleted && <p className="error"> This folder and everything inside it has now been deleted</p>}
        {mainDivClassName !== "onePath" && deleted && <p className="error"> This file has now been deleted</p>}
        {mainDivClassName === "onePath" && updated && <p className="error"> The folder name has now been updated</p>}
        {mainDivClassName !== "onePath" && updated && <p className="error"> This file  name has now been updated</p>}
        </div>

    )
    
}

