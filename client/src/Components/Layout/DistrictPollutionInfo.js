import React, { useState, useContext, useEffect } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import MapContext from "../../Context/Map/mapContext"
import CanvasJSReact from "../../assets/canvasjs.react"
import loader from "../../assets/loader.gif"
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const image = new Image(30, 30);
image.src = "https://upload.wikimedia.org/wikipedia/commons/c/c5/Red_Arrow_Up.png";
const images = ['myImage', image];






const DistrictPollutionInfo = ({ drawerclass, setDrawerClass, shift_geojson, traj,viewportMap2,setViewportMap2 }) => {
  const mapContext = useContext(MapContext);
  const { distInfo, distInfoLoading,curr_loc} = mapContext;
  const [viewport, setViewport] = useState({
    latitude: 28.7041,
    longitude: 77.1025,
    zoom: 5,
    bearing: 0,
    pitch: 0
  });  

  useEffect(()=>{
    if(distInfo.length!=0){
     setViewport({
       ...viewport,
       latitude:curr_loc.lat,
       longitude:curr_loc.long,
       zoom:7
     })
    }
  },[curr_loc])
  var options_NO2 = {
    theme: "dark2",
    animationEnabled: true,
    title: {
      text: "NO2"
    },
    axisY: {
      title: "NO2 concentration(molec/m2)*10^20",
      includeZero: false
    },
    toolTip: {
      shared: true
    },
  }


  var data_NO2 = [];

  if (distInfo.length !== 0) {

    // every gas needs to have 3 data which has datapoints for each week

    for (var i = 0; i < distInfo.length; i++) {
      if (i == 0) {
        data_NO2.push({
          type: "spline",
          name: "MIN_NO2",
          showInLegend: true,
          dataPoints: [{
            y: distInfo[i].MIN_NO2,
            label: distInfo[i].week + " " + distInfo[i].month + " " + distInfo[i].year
          }]
        },
          {
            type: "spline",
            name: "MAX_NO2",
            showInLegend: true,
            dataPoints: [{
              y: distInfo[i].NO2,
              label: distInfo[i].week + " " + distInfo[i].month + " " + distInfo[i].year
            },]
          },
          {
            type: "spline",
            name: "MEAN_NO2",
            showInLegend: true,
            dataPoints: [{
              y: distInfo[i].MEAN_NO2,
              label: distInfo[i].week + " " + distInfo[i].month + " " + distInfo[i].year
            },]
          }
        );
      } else {
        data_NO2[0]["dataPoints"].push({
          y: distInfo[i].MIN_NO2,
          label: distInfo[i].week + " " + distInfo[i].month + " " + distInfo[i].year
        })
        data_NO2[1]["dataPoints"].push({
          y: distInfo[i].NO2,
          label: distInfo[i].week + " " + distInfo[i].month + " " + distInfo[i].year
        });
        data_NO2[2]["dataPoints"].push({
          y: distInfo[i].MEAN_NO2,
          label: distInfo[i].week + " " + distInfo[i].month + " " + distInfo[i].year
        })
      }

    }
  }
  options_NO2["data"] = data_NO2;
 
  return (
    <div className={drawerclass}>
      {distInfoLoading ? <img style={{ width: '50px', height: "50px", margin: 'auto', display: 'block' }} src={loader} /> :
        (<div className="info-data">
          <span className="info-heading">
            <span>{curr_loc.district + " ," + curr_loc.state}</span>
            <span className="info-close">
              <i onClick={
                () => {
                  setDrawerClass("side-drawer")
                }
              } className="material-icons">close</i>
            </span>
          </span>
          <div className="content">
            <div className="plot">
              <CanvasJSChart options={options_NO2} />
            </div>
            {/* <div className="plot">
      <CanvasJSChart  options = {options_SO2}/>
      </div>
      <div className="plot">
      <CanvasJSChart options = {options_O3}/>
      </div> */}
            <MapGL {...viewport}
              width="100wh"
              height="40vh"
              mapStyle="mapbox://styles/mapbox/dark-v9"
              onViewportChange={nextViewport => setViewport(nextViewport)}
              mapboxApiAccessToken="pk.eyJ1IjoidXJ2YXNoaTA3IiwiYSI6ImNqeWVnczJvOTAxMHAzY3FpMzR1YXNyangifQ.90CUMwZJnAtdjZAyQwc5sw"
            >
              <Source id="shift_circle" type="geojson" data={shift_geojson}>
                <Layer
                  id="shift_circle"
                  type="circle"
                  source="shift_circle"
                  layout={{}}
                  paint={
                    {
                      'circle-radius': {
                        'base': 1,
                        'stops': [
                          [12, 5],
                          [22, 180]
                        ]
                      },
                      'circle-color': [
                        'match',
                        ['get', 'cluster'],
                        0,
                        'red',
                        1,
                        '#223b53',
                        2,
                        '#e55e5e',
                        3,
                        '#3bb2d0',
                        4,
                        '#fbb03b',
                        5,
                        '#223b53',
                        6,
                        '#e55e5e',
                        7,
                        '#3bb2d0',
                        8,
                        '#fbb03b',
                        9,
                        '#223b53',
                        10,
                        '#e55e5e',
                        /* other */ '#ccc'
                      ]
                    }}
                />
              </Source >
              <Source id="traj" type="geojson" data={traj}>
                <Layer id="traj"
                  type="line"
                  source="traj"
                  layout={{}}
                  paint={
                    {
                      'line-width': 2,
                      'line-color': '#007cbf'
                    }
                  } />
              </Source>
  
              
            </MapGL>
          </div>
        </div>)

      }

    </div>
  )

}
export default DistrictPollutionInfo;