import React, { useState, Fragment, useRef, useContext, useEffect } from 'react'
import MapGL, { Source, Layer, FullscreenControl, NavigationControl, Marker } from 'react-map-gl';
import Toggle from 'react-toggle'
import Spinner from "./Layout/spinner"

import Geocoder from 'react-map-gl-geocoder';
import MapContext from "../Context/Map/mapContext"
import Alert from "./Layout/alert.js"
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Scale from "./Scale"
import marker from "../assets//marker.png"





const MyMap = ({ setDrawerClass ,layer, setViewportMap2}) => {
  const [viewport, setViewport] = useState({
    latitude: 28.7041,
    longitude: 77.1025,
    zoom: 5,
    bearing: 0,
    pitch: 0
  });

  const mapRef = useRef(null);

  const stop = {
    CO: [
      [1, "yellow"],
      [2, "#ed8a2d"],
      [3, "#baed2d"],
      [4, "#ed2d33"],
      // [5, "#ed2d33"]
    ],
    NO2: [
      [1, "yellow"],
      [2, "#ed8a2d"],
      [3, "#baed2d"],
      // [4, "#2d70ed"],
      [4, "#ed2d33"]
    ],
    SO2: [
      [0.01, "yellow"],
      [0.02, "#ed8a2d"],
      [0.03, "#baed2d"],
      [0.04, "#2d70ed"],
      [0.05, "#ed2d33"]
    ],
    O3: [
      [0.01, "yellow"],
      [0.02, "#ed8a2d"],
      [0.03, "#baed2d"],
      [0.04, "#2d70ed"],
      [0.05, "#ed2d33"]
    ]
  }

  const [mapStyle, setmapStyle] = useState(false);

  const mapContext = useContext(MapContext);
  const { loading, setLoading, layerLoading, 
    get_hotspot,hotspot,loadGeodata, geodata, type,
    set_distInfoLoading, filter, loadDistInfo } = mapContext;

  const Light = () => {
    return (
      <Fragment>
        <i className="material-icons">brightness_5</i>
      </Fragment>
    )
  }



  const handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }

    return setViewport({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }

  useEffect(() => {
    loadGeodata("", "", "", "");
    get_hotspot();
  }, []);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {loading && (<div className="loader">
        <Spinner />
      </div>)}
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100wh"
        height="89.35vh"
        mapStyle={mapStyle ? "mapbox://styles/mapbox/streets-v11" : "mapbox://styles/mapbox/dark-v9"}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken="pk.eyJ1IjoidXJ2YXNoaTA3IiwiYSI6ImNqeWVnczJvOTAxMHAzY3FpMzR1YXNyangifQ.90CUMwZJnAtdjZAyQwc5sw"
      >
        <Alert />

        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken="pk.eyJ1IjoidXJ2YXNoaTA3IiwiYSI6ImNqeWVnczJvOTAxMHAzY3FpMzR1YXNyangifQ.90CUMwZJnAtdjZAyQwc5sw"
        />
        {!layerLoading && (
        <Source id="conc-density" type="geojson" data={geodata}>
          <Layer
            id="conc-density"
            type="fill"
            source="conc-density"
            layout={{}}
            paint={
              {
                "fill-color": {
                  property: type,
                  stops: stop[type]
                  //  [
                  //   [0.01, "yellow"],
                  //   [0.02, "#ed8a2d"],
                  //   [0.03, "#baed2d"],
                  //   [0.04, "#2d70ed"],
                  //   [0.05, "#ed2d33"]

                  // ]
                },
                "fill-opacity": 0.5
              }

            } />
        </Source>)}

        {!layerLoading && layer==="hotspot"?hotspot.map((h,index)=>{
          return <div key={index} onClick={()=>{
            set_distInfoLoading(true)
            setDrawerClass("side-drawer open");
            loadDistInfo(h.lat,h.long)

          }}><Marker  latitude={h.lat} longitude={h.long} offsetLeft={-20} offsetTop={-10}>
            <img src={marker}/>
          </Marker></div>
        }):<div></div>
        //   <Marker latitude={28.7041} longitude={77.1025} offsetLeft={-20} offsetTop={-10}>
        //   <img src={marker}/>
        // </Marker>
        
}
  
        {!loading && layer === "coldspot" &&(
          <div>

          </div>
        )}

        <div style={{ position: 'absolute', right: 20, top: "10%" }}>
          <Toggle
            defaultChecked={false}
            icons={{
              checked: <Light />,
              unchecked: null,
            }}
            onChange={() => {
              setmapStyle(!mapStyle)
              setLoading(true)
              setTimeout(() => {
                setLoading(false)
              }, 5000)
            }}
          />
        </div>
         


        {!loading && (<div style={{ position: 'absolute', right: 20, top: "15%" }}>
          <FullscreenControl />
        </div>
        )}


        {!loading && (
          <div style={{ position: 'absolute', right: 20, top: "20%" }}>
            <NavigationControl showCompass={false} />
          </div>)}
        {!loading && (<div
          style={{
            position: 'absolute', right: "15%", top: "60%",
            backgroundColor: "black",
            padding: "1em",
            borderRadius: "5px",
            opacity: "0.7",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            lineHeight: "18px",
            height: "140px",
            marginBottom: "40px",
            width: "120px",
            backgroundColor: "black",
            color: "white"
          }}>
          <Scale stop={stop} />
        </div>)}

      </MapGL>

    </div>
  )
}
export default MyMap;