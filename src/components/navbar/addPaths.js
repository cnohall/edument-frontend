import React from 'react';
import axios from 'axios';
import {useForm} from "react-hook-form";


export default function AddPaths () {
  const {register, handleSubmit, errors} = useForm();
  const errorMessage = "You need to write something";
  
  const onSubmit = (data) => {
    console.log(data)
    const newPath = data.newPath;
    console.log(newPath)
    axios.post('https://edument-backend.herokuapp.com/add', {path: newPath})
    .then(res => {
      console.log(res);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="tabWindow">
    <div id="tabinfo">
    <h2 className="logo">Add a path</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Pathname..." name="newPath" ref={register ({required:true})}/>
        <input className="button" type="submit" value="Add a path"/> 
        {errors.newPath && <p className="error"> {errorMessage}</p>}
      </form>
    </div>
    </div>
  )
}

