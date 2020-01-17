import React from 'react';
import axios from 'axios';
import {useForm} from "react-hook-form";
// import SortedPathsList from "./sortPaths"

export default function DeletePaths () {
  const {register, handleSubmit, errors} = useForm();
  const errorMessage = "You need to write something";
  const [message, setmessage] = React.useState(''); 
  // const [greeting, searchWord] = React.useState('');
  // const state = {
  //   searchWord : "",
  //   list : "",
  // };

  // const updateSearchword = (event) => {
  //   state.searchWord = event.target.value;
  //   state.list = <SortedPathsList searchWord={state.searchWord}/>;
  // }
  

  const onSubmit = (data) => {
    console.log(data)
    const deletePath = data.deletePath;
    console.log(deletePath)
    axios.post('https://edument-backend.herokuapp.com/path/delete', {path: deletePath})
    .then(res => {
      setmessage("You've successfully deleted the path: " + data.deletePath);
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
        <input type="text" placeholder="Pathname..." name="deletePath" ref={register ({required:true})} />
        <input className="button" type="submit" value="Delete"/> 
      </form>
      {errors.deletePath && <p className="error"> {errorMessage}</p>}
      {message && <p className="error"> {message}</p>}
    </div>
    </div>
  )
}

