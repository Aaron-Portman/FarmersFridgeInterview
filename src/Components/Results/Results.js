import React, {useEffect, useState} from 'react'
import "./Results.css"


export default function Results(props) {

  return (

    <div className='listResultsContainer'>
        <ul className='listResults'>
           {props.results.map((word)=> <li key = {word} style={{color: "white"}}>{word[0]}: {word[1]}</li>)}
        </ul>
    </div>
  )
}
