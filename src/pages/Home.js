import React from 'react';
//import {Link } from 'react-router-dom';
import Back from '../assets/back.avif';
import '../styles/Home.css';
import { useState ,useEffect} from 'react';
function Home() {
  const [data, setData] = useState(null)
  const [print, setPrint] = useState(false)

  useEffect(()=>{
    fetch("/summarize").then(
      res=>res.json()
      ).then(
        data=>{
        setData(data)
        console.log(data)
      })

  })

  function getData(val) {
    setData(val.target.value)
    setPrint(false)
  }
  return (
    <div className='home' style={{backgroundImage: `url(${Back})`}}>
      <div 
      className='headerContainer' >
        <h1>SummarEaze</h1>
        <p>Text Summarisation in Malayalam</p>
        <input className='textArea' type="text" onChange={getData} />
        <br/>
        <br/>
      <button onClick={()=>setPrint(true)}>Summarise</button> 
      {
          print ? 
          <p>{data}</p> 
          : null
        }
      </div>
    </div>
  )
}

export default Home