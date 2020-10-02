import React, { Fragment } from "react";
import spinner from "../../assets/loader2.gif"
const Spinner=()=>{
    return(
    <Fragment>
        <img src={spinner} alt ="..." style={{width:'80%',height:"70%",margin:'auto',display:'block'}}/>
    </Fragment>
    )
}
export default Spinner;