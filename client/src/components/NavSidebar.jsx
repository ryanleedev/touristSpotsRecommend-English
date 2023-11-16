/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
// import Icon from "awesome-react-icons";
import React, { useState, useEffect } from "react";
import DatePicker from "sassy-datepicker";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import areaLists from "../json/areaLists.json"
import tourlistTop20s from "../json/tourlistTop20s.json"
import Dropdown from "./Dropdown";
import '../styles/Dropdown.css'
import axios from "axios";
import '../styles/main.css'
import reactStringReplace from 'react-string-replace'




export const NavSidebar = (props) => {


  //  달력 날짜 선택
  const today = new Date()
  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // 날짜 포맷 변경
  const selectDate =
  year + '-' + ('00' + month.toString()).slice(-2) + '-' + ('00' + day.toString()).slice(-2);

  const minDate = new Date(new Date().setDate(new Date().getDate()));
  const maxDate = new Date(new Date().setDate(new Date().getDate() + 10));


// 달력: 일정 선택
  function Calendar() {
    const onChange = (date) => {
      setDropdownVisibility(!dropdownVisibility)
      const dateDiff = Math.ceil((date.getTime()-today.getTime())/(1000*60*60*24))
      setDate(date);
      props.setSelectDate(dateDiff);
      props.setDate(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate());
        
    };

    return <DatePicker onChange={onChange} selected={date} minDate={minDate} maxDate={maxDate} />;
  }//end of Calendar 


  // 지역 선택
  const [areaCode, setAreaCode] = useState('');
  const [area, setArea] = useState('');

  function selectArea(e) {
    setAreaCode(e.target.id);
    setArea(e.target.firstChild.data);
    props.setAreaCode(e.target.id);
    props.setDate(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate())
  }


  // 드롭다운
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [dropdownVisibility2, setDropdownVisibility2] = useState(false);


  // 관광지리스트 업데이트
  const [tourlists, setTourlist] = useState(tourlistTop20s);

  const getUseApi = async () => {
    try {
      await axios({
        method: 'get', 
        // url:'https://lazyoff-psgja2.run.goorm.io/', 
        url:'http://localhost:5000/',
        params:{
        area:areaCode, 
        date:selectDate
        }
      })
      .then((res)=>{
        setTourlist(res.data)
        props.setTourlist(res.data)
      })
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
    }
  };// end of getUseApi 


  // 관광지리스트 id
  function selectSpotId(e) {
    props.setSpotId(e.target.id);
  } // end of selectSpotId


// 일정 및 지역 선택 제출
  function submit(){
    if (areaCode in [0,1,2,3,4,5,6,7,8,9,10,11]){
      getUseApi();
      props.setSearch(true);
      setTitle(month+"월 "+day+"일 추천 관광지")
    } else {
      alert("Select Region please!");
    }
      
  }; //end of submit

  // 리스트 제목
  const [title, setTitle] = useState('JEJU island tourist spots Top20')



  return (
    <React.Fragment>
      <div
        id='sidebar'
        className={``}
        // className={`fixed inset-y-0 left-0 z-30 w-1\/2 transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0`}
        style={{padding:"0px 30px 0px 0px"}}
      >
        <div className="">
        {/* <div className="flex items-center justify-center mt-10 text-center py-6"> */}
          {/* <div  */}
          
          <div style={{display:"flex"}}>
          <div className="" style={{width:"120px",height:"100%", padding:"20px 0px 0px 0px"}}> 

            <img src={`/logoCut.jpg`} onClick={()=>(window.location.href="/")}></img>
          {/* google translate button */}
          <div id="google_translate_element"></div>
          </div>
          

          <div style={{padding:"0px 0px 0px 0px"}}>
            <div id='select' style={{width:"268px", fontSize:"25px"}}>
              <div id='calendar'>
                <div style={{border:"1px solid #E0E0E0", borderRadius:"10px", padding:"2px 10px 2px 10px" }} onClick={e => setDropdownVisibility(!dropdownVisibility)}>
                  📆 Date &nbsp; {year + '-' + month + '-' + day}
                </div>  
                <Dropdown visibility={dropdownVisibility}>
                  <Calendar/>
                </Dropdown>
              </div>
              <div id='jejuArea' style={{textAlign:"left", top:"85px"}}> 
                <div style={{border:"1px solid #E0E0E0", borderRadius:"10px", padding:"2px 5px 2px 5px", margin:"8px 0px "}} onClick={e => setDropdownVisibility2(!dropdownVisibility2)}> 
 
                     🚩 Area &nbsp; {area}
                </div> 
                <Dropdown visibility={dropdownVisibility2} style={{zIndex:"2"}}>
                  <ul>
                    {
                      areaLists.map(areaList =>
                        <li 
                          style={{textAlign:"center", fontSize:"20px", margin:"5px", borderRadius:"15px", backgroundColor:"#E0F7FA"}}
                          id={areaList.areaCode} 
                          key={areaList.areaCode} 
                          onClick={e => {selectArea(e);setDropdownVisibility2(!dropdownVisibility2)}}>{areaList.area}
                        </li>
                        )
                      }
                  </ul>
                </Dropdown>
              </div>
              <div 
                id="submitButton"
                className="rounded-l-lg rounded-r-lg"              
                style={{margin:"10px", backgroundColor:'#80DEEA', fontSize:"20px", textAlign:"center" }} onClick={()=>(submit())}><b>Find tourist spots</b></div>
            </div> 
          </div>
        </div>
        </div>

        
        <div id={`recomend`} className=""
        style={{fontSize: '20px'}}>
          <b>
            <p 
              id='sidebarTitle'
              style={{ fontSize: '23px', textAlign:"center", padding:"5px 0px 5px 0px"}}
            >
              {title}
            </p>
          </b>
          <div
            className={``}
            // className={`fixed inset-y-0 left-0 z-30 w-1\/2  overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0`}
            style={{width:"400px", height:"60vh", position:"absolute", overflowY: "scroll", }}
            // style={{height:"68vh", position:"absolute", overflowY: "scroll", }}
            > 
            <ul>
              {
                tourlists.map((tourlist,i) =>
                  <li id={tourlist.subtitle} key={tourlist.contentsid} onClick={e => selectSpotId(e)}>
                    <div 
                      className="rounded-l-lg rounded-r-lg text-right m-2 p-3 w-auto"
                      style={{height:"100px", width:"33vw", backgroundColor:"#DEEBF7" ,maxWidth:"430px"}} 
                      id={tourlist.subtitle}  >
                      <img id={tourlist.subtitle} src={tourlist.Imgpath} 
                      style={{height:"70px", width:"130px", position:"absolute", textAlign:"right" }}
                      ></img>
                      <b>
                      <p id={tourlist.subtitle} style={{padding:"0px 0px 0px 130px",display:"block", width:"340px", height:"80px"}} >No.{i+1} {tourlist.subtitle}</p>
                      </b>
                      <p style={{padding:"0px 0px 0px 130px", marginTop:"-28px", fontSize:"18px"}} >{reactStringReplace(tourlist.tag2, ', ', (match, i) => (
                          '/')).join("")}</p>
                    </div>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
