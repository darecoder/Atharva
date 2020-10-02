import React,{useContext} from "react";
import MapContext from "../Context/Map/mapContext"

const Scale=({stop})=>{
    const mapContext=useContext(MapContext);
    const {type}=mapContext;
    const arr=[1,2,3];
    return(
        <div>
        {
         stop[type].map((s,indx)=>{
         return(<div key={indx}>
             <div style={
                 {backgroundColor:s[1],display:"inline-block",borderRadius: "20%",width: "10px",height: "10px",marginRight: "5px",opacity:"0.8"}}>
             </div>
         <span style={{color:"white",zIndex:"2000"}}>{indx===0?`0 - ${s[0]}`:stop[type][indx-1][0]+" - "+s[0]}</span>
         </div>)
         })
        }
        <div style={{color:"white",marginTop:"1%"}}>Units: * 10^20 molec/m2</div>
        </div>
    )
}
export default Scale;