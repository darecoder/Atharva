import React, { useState,useContext } from 'react';
import MapContext from "../../Context/Map/mapContext"

const Filter = ({ leftdrawerclass, setLeftDrawerClass, setisOpen }) => {
    
    const mapContext=useContext(MapContext);
    const [filter,setFilter]=useState({
        week:1,
        month:"January",
        year:2020,
        pollutant:"NO2"
    })

    const {loadGeodata,setType}=mapContext;

    const onFilterChange = (e) => {
        setFilter({
            ...filter, [e.target.name]: e.target.value
        });
        
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setType(filter.pollutant);
        loadGeodata(filter.week,filter.month,filter.year,filter.pollutant);
    }

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const week = [1, 2, 3, 4, 5];
    const year = [2020];
    const pollutants = ["NO2", "SO2", "CO", "O3"]

    return (
        <div className={leftdrawerclass}>
            <div className="filter-data">
                <span className="filter-heading">
                    <span>Filter</span>
                </span>
                <span className="filter-close">
                    <i onClick={
                        () => {
                            setLeftDrawerClass("side-drawer-left")
                            setisOpen(false);
                        }
                    } className="material-icons">close</i>
                </span>
                <div className="content">
                    <form onSubmit={onSubmit}>
                        <div className="filter-by-time">
                            <label>
                                <b>Select Week :</b>
                                <div className="input-field browser-default">
                                <select name="week" value={filter.week} onChange={onFilterChange}>
                {week.map(w => <option key={w} value={w}>{w}</option>)}
                                </select>
                                </div>
                            </label>
                            <label>

                                <b>Select Month: </b>
                                <div className="input-field browser-default">
                                <select name="month" value={filter.month} onChange={onFilterChange}>
                                      {months.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                                </div>
                            </label>
                            <label>
                                Select Year:
                                <div className="input-field browser-default">
                                    <select name="year" value={filter.year} onChange={onFilterChange}>
                {year.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                                </div>
                            </label>
                        </div>
                        <div className="filter-by-pollutant">
                            <label>
                                <b>Select Pollutant :</b>
                                <div className="input-field browser-default">
                                <select name="pollutant" value={filter.pollutant} onChange={onFilterChange}>
                {pollutants.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                                </div>
                            </label>
                        </div>
                        <div className="filter-apply">
                            <button className="btn" type="submit" name="action">Apply </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Filter;