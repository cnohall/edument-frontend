// import React from 'react';
// import shortid from 'shortid';
// import ShowOnePath from './showOnePath';
// import { Redirect, Link } from "react-router-dom";
// import axios from 'axios'

// import Loading from './simple/loading'
// import NoMatch from './simple/nomatch'

// export default class ShowPathsURL extends React.Component {
//     constructor(props){
//         super(props)
//         let path = props.match.params[0];
//         this.state = {
//             path,
//             FileOrFolderNames: {},
//             pathClicked: false,
//             isLoading: true,
//             returnToHomepage: false,
//         };
//         this.seperatePathNames = this.seperatePathNames.bind(this);
//     }

//     componentDidMount = (props) => {
//         let path = this.state.path;
//         let depth = this.findFolderDepth(path)
//         axios.get(`https://edument-backend.herokuapp.com/path/find${path}`)
//             .then(res => {
//             const FileOrFolderNames = this.seperatePathNames(res.data, depth);
//             this.setState({ isLoading: false, FileOrFolderNames})
//         });
//     }

//     // componentDidUpdate(props) {
//     //     console.log(props)
//     //     let path = props.match.params[0];
//     //     let depth = this.findFolderDepth(path)
//     //     axios.get(`https://edument-backend.herokuapp.com/path/find${path}`)
//     //         .then(res => {
//     //         console.log(res.data)
//     //         const FileOrFolderNames = this.seperatePathNames(res.data, depth);
//     //         this.setState({ loadingDone: true, FileOrFolderNames})
//     //     });
//     // }
      
    
//     home = () => {
//         this.setState({ returnToHomepage: true})
//     }

//     seperatePathNames = (data, depth) =>{
//         const FileOrFolderNames = {};
//         for (let i = 0; i < data.length; i++){
//             const originalPathName = data[i].path; 
//             const seperatedPathName = originalPathName.split("/")[depth];
//             FileOrFolderNames[seperatedPathName] = seperatedPathName;
//         }
//         return FileOrFolderNames;
//     }

//     findFolderDepth = (string) => {
//         return string.split("/").length - 1;
//      }


//     isEmpty = (obj) => { 
//         for(var key in obj) {
//             if(obj.hasOwnProperty(key))
//                 return false;
//         }
//         return true;
//     }

//     render(props){
//         let {returnToHomepage, isLoading, path, FileOrFolderNames, pathClicked} = this.state;

//         if (isLoading){
//             return(
//                 <Loading/>
//             )
//         }
//         else if (returnToHomepage) {
//             return (
//               <Redirect className="link" to="/"></Redirect>
//             )
//         }
//         else if (pathClicked) {
//             return (
//             <Redirect to={`${path}`}/>
//             );
//         }
//          else if (!this.isEmpty(FileOrFolderNames)) {
//             return (
//                 <div className="tabWindow">
//                 <div id="tabinfo">
//                 <i className="material-icons" onClick={()=>this.home()}> home </i>
//                 <i className="material-icons" onClick={()=>this.home()}> keyboard_backspace </i>
//                 <div className="paths">
//                 {Object.keys(FileOrFolderNames).map(onePath => 
//                     <ShowOnePath key={shortid.generate()} handleClickedPath={this.handleClickedPath} FileOrFolderName={onePath} path={path}/>
//                 )}
//                 </div>
//                 </div>
//                 </div>
//             )
//         } else {
//             return (
//                 <NoMatch/>
//             )
//         } 
//     }
// }

