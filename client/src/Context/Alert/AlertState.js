import React,{useReducer} from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
	SET_ALERT,
	REMOVE_ALERT
	   } from '../types';
const AlertState=(props)=>{
	const initialState={
		alert:null
	}
	const [state,dispatch]=useReducer(AlertReducer,initialState)
	const setalert=(msg,text)=>{
			const a={
			msg:msg,
			text:text
		}
		dispatch({type:SET_ALERT,payload:a})
	setTimeout(()=>{
		dispatch({type:REMOVE_ALERT})
	}
		,5000);
	}
	
	
	
	return (<AlertContext.Provider value={{
		alert:state.alert,
		setalert
			}}
	>{props.children}
	</AlertContext.Provider>)
}
export default AlertState;