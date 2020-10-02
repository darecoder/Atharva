import {MAP_LOADING,LAYER_LOADING, LOAD_GEODATA,SET_FILTER, LOAD_DIST_INFO, SET_TYPE, GET_HOTSPOT, DIST_INFO_LOADING,SET_CURRLOC} from '../types'

export default (state,action)=>{
  switch(action.type){
      case MAP_LOADING:
          return {
              ...state,
              loading:action.payload
          }
      case GET_HOTSPOT:
        return{
          ...state,
          hotspot:action.payload,
        }
      case LAYER_LOADING:
        return{
          ...state,
          layerLoading:action.payload
        }
      case DIST_INFO_LOADING:{
        return {
          ...state,
          distInfoLoading:action.payload
        }
      }
      case LOAD_GEODATA:
        return{
          ...state,
          geodata:action.payload,
        }
      case SET_FILTER:
        return{
          ...state,
          filter:action.payload
        }
      case SET_TYPE:
        return{
          ...state,
          type:action.payload
        }
      case LOAD_DIST_INFO:
        return{
          ...state,
          distInfo:action.payload
        }
      case SET_CURRLOC:
        return{
          ...state,
          curr_loc:action.payload
        }
      default:
        return state;
  }
}