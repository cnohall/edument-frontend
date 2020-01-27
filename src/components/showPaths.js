import React from 'react';
import shortid from 'shortid';
import ShowOnePath from './showOnePath';

// import Empty from './simple/empty'

export default class ShowPaths extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            alreadyShowedPaths: {},
            pathsToShow: [],
            currentPath: "",
        };
    }
    
    emptyAlreadyShowedPaths = () => {
        this.setState({alreadyShowedPaths: {}})
    }

    pathsToShow(){
        let allPaths = this.props.allPaths;
        let currentPath = this.state.currentPath;
        
    }

    render(){
        let {allPaths} = this.props;
        let emptyAlreadyShowedPaths = this.emptyAlreadyShowedPaths;
        let {alreadyShowedPaths} = this.state;
            return (
                <div className="tabWindow">
                <div id="tabinfo">
                <div className="paths">
                {allPaths.map((item, key) =>
                    <ShowOnePath key={shortid.generate()} path={item} alreadyShowedPaths={alreadyShowedPaths} emptyAlreadyShowedPaths={emptyAlreadyShowedPaths}/>
                )}

                </div>
                </div>
                </div>
            )
        // } else {
        //     return (
        //         <Empty/>
        //     )
        // } 
    }
}

