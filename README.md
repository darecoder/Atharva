# Team: FreshlyBuilt 
# PSID: NM394
**PS : To develop AI/ML-based software to identify/analyze:**
      **1. Location of hot spots.
       2. The long-term occurrence of hot spots and changes.**

<img src=https://github.com/pandafy/NM394_FreshlyBuilt/blob/master/Images/logo2.svg height=130px width=450px>

## ATHARVA : Autoregressive Trend analysis & Hypercritical Air pollution Ranging & Visualisation Application

We have developed ATHARVA which is a user friendly Web application that can be used by common people to gain the knowledge about hotspots of India and their changes.

<img src=https://github.com/pandafy/NM394_FreshlyBuilt/blob/master/Images/webapp%20SS.png height=450px width=850px>


#### Link to PPT: 
https://www.canva.com/design/DAEDV70XfpA/Qmn-R7Y6_iSq63JsldarnQ/view?utm_content=DAEDV70XfpA&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton#1

#### Idea Short Video: 
https://drive.google.com/file/d/1jaEzWIA169S9Ln3C83RpgdI0CYdDdkm3/view?usp=sharing

#### Tweet Link: 
https://twitter.com/darecoder/status/1285983011855454208

**Features in our application Atharva:**

* District-wise plotting Heatmap for each pollutant analyzation and visualization
* Coordinate basis Hotspots and Coldspots detection
* Graphical Analysis of concentration of pollutants at each hotspot 
* Filters available for querying various pollutants on the map for any week.
* Plotting shifts in HotSpots over a specific period of time
* Analyzing those shifts by plotting backward trajectories and verifying it using meteorological data.
* Two modes for visualization: Dark mode & Daylight


## Steps to setup project(ATHARVA) locally
 
### For Linux OS:

1. **NPM install**
```
npm install
npm run clientinstall
```
2. **Install Postgres & Postgis using apt**

* Create new user and database
* Switch to postgresql cli mode then, grant superuser privileges to your newly created user. (ALTER USER your_username WITH SUPERUSER;)
* Start postgres by running: `systemctl start postgresql`
* Replace `user`, `password`, `database` with the `user`, `password`, `database`  (name) created above in knexfile.js.

3. **Run knex migrate:latest**

```
knex seed:run
npm run dev
```

## Updates for each mentoring & evaluation round

### 1st mentoring & evaluation round:
 
 * Fetched the sentinel-5p data 
 * Performed data mining and data preprocessing
 * Plotted Hotspots district-wise using spatial auto-correlation
 
### 2nd mentoring round:
 
 * Analysed the movement of Hotspots
 * Plotted backward trajectory by using metrelogical data set 
 * Depicted the shifts in hotspot over a period of time .
 
 
 ## Tools and Technologies used 
 
 * Sentinel-5P Pre-Operations Data Hub (data source)
 * HARP (for fetching Sentinel5p data)
 * PYSAL (for spatial relationship to detect hotspots, coldspots)
 * ESDA (for exploratory analysis of spatial data)
 * GEOPANDAAS (to work with geospatial data and geojson data)
 * METEX (for determining trajectories through backtracking analysis of metreological data)
 * NCEP/NCAR (data source for metreological data needed for trajectories)
 * React,Node.js,Express.js,Postgis,PostgreSQL (for our Web Application)

## ATHARVA UI:
<img src=https://github.com/pandafy/NM394_FreshlyBuilt/blob/master/Images/UI%203.png height=450px width=850px>

<img src=https://github.com/pandafy/NM394_FreshlyBuilt/blob/master/Images/UI%201.png height=450px width=850px>

<img src=https://github.com/pandafy/NM394_FreshlyBuilt/blob/master/Images/UI%202.png height=450px width=850px>


## YouTube Video:
[![ATHARVA NM394_FreshlyBuilt](https://github.com/pandafy/NM394_FreshlyBuilt/blob/master/Images/thumbnail2.JPG)](https://www.youtube.com/watch?v=2SwHh8aCRgE "ATHARVA")

### January, 2020 Clusters & Cluster centers:
<img src=https://github.com/pandafy/NM394_FreshlyBuilt/blob/master/Images/Jan%201.jpeg height=400px width=400px>        <img src=https://github.com/pandafy/NM394_FreshlyBuilt/blob/master/Images/Jan%20centers.jpeg height=400px width=400px>

### February, 2020 Clusters & Cluster centers:
<img src=https://github.com/pandafy/NM394_FreshlyBuilt/blob/master/Images/Feb%201.jpeg height=400px width=400px>        <img src=https://github.com/pandafy/NM394_FreshlyBuilt/blob/master/Images/Feb%20centers.jpeg height=400px width=400px>

### Change in HotSpots & Moving HotSpots:
<img src=https://github.com/pandafy/NM394_FreshlyBuilt/blob/master/Images/Final%20centers.jpeg height=400px width=400px>     <img src=https://github.com/pandafy/NM394_FreshlyBuilt/blob/master/Images/Final%20Shifts.jpeg height=400px width=400px>

## HotSpot Trajectories:
<img src=https://github.com/pandafy/NM394_FreshlyBuilt/blob/master/Images/WhatsApp%20Image%202020-08-03%20at%2015.19.49.jpeg
 height=500px width=500px>

