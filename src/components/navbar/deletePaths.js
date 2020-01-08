import React from 'react';
import axios from 'axios';
import {useForm} from "react-hook-form";


export default function DeletePaths () {
  const {register, handleSubmit, errors} = useForm();
  const errorMessage = "You need to write something";
  
  const onSubmit = (data) => {
    console.log(data)
    const deletePath = data.deletePath;
    console.log(deletePath)
    axios.post('https://edument-backend.herokuapp.com/delete', {path: deletePath})
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
    <h2 className="logo">Delete a path</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Pathname..." name="deletePath" ref={register ({required:true})}/>
        <input className="button" type="submit" value="Delete a path"/> 
        {errors.deletePath && <p className="error"> {errorMessage}</p>}
      </form>
    </div>
    </div>
  )
}
