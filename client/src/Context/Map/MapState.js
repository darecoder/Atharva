import React,{useReducer,useContext} from 'react';
import MapContext from "./mapContext";
import MapReducer from "./mapReducer";
import axios from 'axios';
import AlertContext from "../Alert/alertContext"
import {
    MAP_LOADING,
    LOAD_GEODATA,
    LAYER_LOADING,
    SET_FILTER,
    LOAD_DIST_INFO,
    SET_TYPE,
    GET_HOTSPOT,
    DIST_INFO_LOADING,
    SET_CURRLOC
} from "../types"
var geobuf=require("geobuf");
var Pbf=require("pbf");
var Buffer = require('buffer/').Buffer


const MapState=(props)=>{
    const initialState={
      loading:false,
      geodata:{},
      type:"NO2",
      layerLoading:true,
      distInfoLoading:false,
      filter:{
        week:1,
        month:"January",
        year:2020,
        pollutant:"CO"
      },
      hotspot:[],
      distInfo:[],
      curr_loc:{
        state:"",
        district:"",
        lat:0,
        long:0
      }
    }
    const alertContext=useContext(AlertContext);

    const [state,dispatch]=useReducer(MapReducer,initialState);

    const setLoading=(isLoading)=>{
		dispatch({type:MAP_LOADING,payload:isLoading});
    }

    const setLayerLoading=(isLoading)=>{
      dispatch({type:LAYER_LOADING,payload:isLoading})
    }

    const setFilter=(f)=>{
      dispatch({type:SET_FILTER,payload:f});
    }

    const loadDistInfo=async(lat,long)=>{
      const response=await axios.get(`/api/distinfo?lat=${lat}&long=${long}`)
      dispatch({type:LOAD_DIST_INFO,payload:response.data});
      set_currloc(lat,long);
      set_distInfoLoading(false);
    }

    const setType=(t)=>{
    dispatch({type:SET_TYPE,payload:t});
    }

    const set_currloc=async(lat,long)=>{
        const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + long + "," + lat + ".json?types=district&access_token=pk.eyJ1IjoidXJ2YXNoaTA3IiwiYSI6ImNqeWVnczJvOTAxMHAzY3FpMzR1YXNyangifQ.90CUMwZJnAtdjZAyQwc5sw"
        const res = await axios.get(url);
        var data={}
        if(res.data.features.length==0){
          data.district="";
          data.state="";
          data.lat=lat;
          data.long=long;
        }else{
        data={
          district: res.data.features[0].text,
          state: res.data.features[0]["context"][0].text,
          lat:lat,
          long:long
        }
      }
        dispatch({type:SET_CURRLOC,payload:data})
    }

    const loadGeodata=async(week,month,year,type)=>{
      setLayerLoading(true);
      setLoading(true);
      var response=await axios.get('/api?week='+week+"&month="+month+"&year="+year+"&type="+type, {
        responseType: 'arraybuffer'
      })
      var data =response.data;
      data = geobuf.decode(new Pbf(data));
      if(data==="Invalid Request"){
      alertContext.setalert(data,"danger");
      setLoading(false);
      dispatch({type:LOAD_GEODATA,payload:{}})
      }else if(data.features.length==0){
      alertContext.setalert("No Data Found","danger");
      setLoading(false);
      dispatch({type:LOAD_GEODATA,payload:data})
      }
        else{
       dispatch({type:LOAD_GEODATA,payload:data})
       setLayerLoading(false)
       setTimeout(()=>{
        setLoading(false);
       },3000)
      }

    }
    const get_hotspot=async()=>{
      const response=await axios.get("/api/hotspot");
      dispatch({type:GET_HOTSPOT,payload:response.data})
    }
    const set_distInfoLoading=(v)=>{
      dispatch({type:DIST_INFO_LOADING,payload:v})
    }

    return (<MapContext.Provider value={{
        loading:state.loading,
        layerLoading:state.layerLoading,
        geodata:state.geodata,
        filter:state.filter,
        distInfo:state.distInfo,
        type:state.type,
        hotspot:state.hotspot,
        distInfoLoading:state.distInfoLoading,
        curr_loc:state.curr_loc,
        set_distInfoLoading,
        setLayerLoading,
        setLoading,
        loadGeodata,
        setFilter,
        loadDistInfo,
        setType,
        get_hotspot,
        set_currloc
			}}>
            {props.children}
	</MapContext.Provider>)
}
export default MapState;