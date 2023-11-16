/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import ReactWeather, { useVisualCrossing } from 'react-open-weather';
import { render } from "@testing-library/react";
import axios from "axios";
import weatherInfo from "../json/area_code4weather.json"
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.css'




// 서버에서 getWeatherApi로 문제 없는지 확인 
export function Weather(props) {
  const lat = 33.499275950318584;
  const lng = 126.53248752501834;

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const [date, setDate] = useState(year + '-' + month + '-' + day);

  const [tempmax, setTempmax] = useState();
  const [tempmin, setTempmin] = useState();
  const [icon, setIcon] = useState();
  const [humidity, setHumidity] = useState();
  const [feelslike, setFeelslike] = useState();
  const [uvindex, setUvindex] = useState();
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();

  const imgSrc = "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/" + icon + ".png";
  const imgSrcCloths = (() => {
    switch (icon) {
      case "clear-day":
        return 'https://image.musinsa.com/mfile_s01/2021/06/05/c89329e33eb631637963eaa7b2ef13e6.jpg.4';
      case "rain":
        return 'https://image.musinsa.com/mfile_s01/2020/08/20/902da7b8df0406b02780060750b8b796183134.jpg.thumb.jpg.4';
      case "showers-day":
        return 'https://image.musinsa.com/mfile_s01/2021/07/15/2902786ceb34bf8d260461280e7fdd7e.jpg.4';
      case "partly-cloudy-day":
        return 'https://image.musinsa.com/mfile_s01/2021/05/21/fd481cf33b9e3c854d9c64dc5d8e13d6083554.jpg.thumb.jpg.4';
      default:
        return 'https://image.musinsa.com/mfile_s01/2021/06/03/43f8964b2e3a8c4c23e9fbcdfda94134190544.jpg.thumb.jpg.4';
    }
  })


  // visualcrossing 날씨api 날씨 예보 불러오기
  const getWeatherApi = async () => {
    try {
      await axios({
        method: 'get',
        url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/` + weatherInfo[props.areaCode].latitude + `,` + weatherInfo[props.areaCode].longtitude,
        params: {
          unitGroup: `metric`,
          include: `fcst%2Cobs%2Chistfcst%2Cstats%2Cdays`,
          key: 'HVE5VWBRQ3L4M45Y4D67MJSHK',//`MTFPJPBAU2PLUC8E2W3JRZLPT`,
          contentType: `json`,
        }
      })
        .then((res) => {
          setTempmax(res.data.days[props.selectDate].tempmax);
          setTempmin(res.data.days[props.selectDate].tempmin);
          setIcon(res.data.days[props.selectDate].icon);
          setHumidity(res.data.days[props.selectDate].humidity);
          setFeelslike(res.data.days[props.selectDate].feelslike);
          setUvindex(res.data.days[props.selectDate].uvindex);
          setSunrise(res.data.days[props.selectDate].sunrise);
          setSunset(res.data.days[props.selectDate].sunset);
          setDate(props.date);
        })
    } catch (error) {
      console.log(error)
    }
  };//end of getWeatherApi 


  useEffect(() => {
    if (props.search === false) {
      return;
    } else {
      getWeatherApi()
      props.setSearch(false)
    }; //end of if문
  }, [props.search]) //end of useEffect


  //   초기 날씨 
  const getWeatherApiFirst = async () => {
    try {
      await axios({
        method: 'get',
        url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/` + lat + `,` + lng + `/today`,
        params: {
          unitGroup: `metric`,
          include: `current`,
          key: `HVE5VWBRQ3L4M45Y4D67MJSHK`, //`MTFPJPBAU2PLUC8E2W3JRZLPT`,
          contentType: `json`,
        }
      })
        .then((res) => {
          setTempmax(res.data.days[0].tempmax)
          setTempmin(res.data.days[0].tempmin)
          setIcon(res.data.days[0].icon)
          setHumidity(res.data.days[0].humidity)
          setFeelslike(res.data.days[0].feelslike)
          setUvindex(res.data.days[0].uvindex)
          setSunrise(res.data.days[0].sunrise)
          setSunset(res.data.days[0].sunset)
        })
    } catch (error) {
      console.log(error)
    }
  }; //end of getWeatherApiFirst 


  useEffect(() => {
    getWeatherApiFirst()
  }, [])


  return (
    <div style={{ width: "65vw" }}>

      <div style={{ height: "180px", width: "65vw", color: "#4B515D", borderRadius: "35px", 
                  display: "flex", fontFamily: "Gamja Flower", border:"1px solid", borderColor:"lightgray",
                  justifyContent:"space-between", padding:"20px 20px"}}>
        <div className="" style={{ fontSize: "20px" }}>
          {date}
        </div>


        <ul style={{ fontSize: "1.4rem" }}>
          <li>Feels like &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {feelslike}ºc</li>
          <li>Humidity  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {humidity}%</li>
          <li>UV index &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {uvindex * 10}%</li>
          <li>Sunrise/Sunset    &nbsp;&nbsp;  {sunrise}/{sunset}</li>
        </ul>

          <ul style={{textAlign:"center", alg:"center"}}>
            <li><img src={imgSrc} width="70px" alt="weather icon"></img></li>
            <li style={{fontSize:"30px"}}>{tempmax}ºc/{tempmin}ºc</li>
            <li>{icon}</li>
          </ul>

      </div>


    </div>
  )
};


export default Weather;