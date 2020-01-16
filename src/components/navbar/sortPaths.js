import React from 'react';
import axios from 'axios';


export default class SortedPathsList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            paths: [],
            searchWord: props.searchWord,
        };

    }

    componentWillMount = () => {
        axios.get("https://edument-backend.herokuapp.com/")
        .then(res => {
          const result = res.data;
          let paths = Object.keys(result).map(function(key) {
            return result[key]["path"];
          });
          const sortedPaths = this.filterPaths(paths);
          this.setState = ({paths: sortedPaths});
        });
    }

    filterPaths = (paths) => {
        const searchWord = this.state.searchWord;
        paths = paths.filter((path) => {
          return path.toLowerCase().search(searchWord.toLowerCase()) !== -1;
        });
        paths.sort(function (a, b) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        return paths;
    }
    render (){
        if (this.state.searchWord){
            return(
                <div className="searchResults">
                {
                    this.state.searchedPaths.map(path  => 
                      <div>
                      <h1>hej</h1>
                      <div className="searchResult">{path}</div>
                      </div>
                )}  
                </div>  
            )
        } else {
            return(
                <div>nothing is being searched yet</div>
            )
        }


    }
}