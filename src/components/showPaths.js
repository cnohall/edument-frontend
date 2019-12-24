import React from 'react';
import shortid from 'shortid';
import ShowOnePath from './showOnePath';


export default function ShowPaths (props) {
    const data = props.data;
    let {paths, currentPaths} = analyzePaths(data);
    if (!isEmpty(paths)) {
        console.log(paths);
        return (
            <div className="paths">
            {currentPaths.map(path =>
                <ShowOnePath key={shortid.generate()} path={path}/>
            )}
            </div>
        )
    } else { 
        return (
            <div></div>
        )
    }
}

function analyzePaths(data) {
    let paths = {};
    const currentPaths = [];
    console.log(data)
    for (let i = 0; i < data.length; i++){
        const pathName = data[i].path; 
        const relevantPath = pathName.split("/", 1);
        if(!paths[relevantPath]){
            paths[relevantPath] = [pathName];
            currentPaths.push(relevantPath)
        } else {
            paths[relevantPath].push(pathName)
        }
    }
    return {paths, currentPaths}
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}