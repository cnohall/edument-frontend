import React from 'react';

export default class ShowOnePath extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            path: props.path,
            clickedPath: props.onClickedPath,
            relevantNodes: props.relevantNodes,
        }
    }



    render (){
        let {path, relevantNodes, clickedPath} = this.state;
        return (
            <div onClick={() =>handleClick(path, relevantNodes, clickedPath)} className="onePath">
            <h1>
                {path}
            </h1>
            </div>
        )
    }
}

function handleClick (path, relevantNodes, clickedPath){
    clickedPath(path, relevantNodes);
}