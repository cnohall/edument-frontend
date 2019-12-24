import React from 'react';

export default function ShowOnePath (props) {
    console.log(props);
    const path = props.path;
    return (
        <div onClick={printHello} className="onePath">
        <h1>
            {path}
        </h1>
        </div>
    )
}

function printHello (){
    console.log("hello");
}