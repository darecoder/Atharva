import React,{useEffect} from 'react';
import Navbar from './Components/Layout/navbar';
import Home from "./Components/home"
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import "react-toggle/style.css"
import './App.css';
import MapState from "./Context/Map/MapState.js"
import AlertState from "./Context/Alert/AlertState.js"

function App() {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });
  return (
    <AlertState>
    <MapState>
    <div className="App">
      <Navbar/>
      <Home/>
    </div>
    </MapState>
    </AlertState>

  );
}

export default App;
