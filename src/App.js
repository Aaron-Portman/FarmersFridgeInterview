import logo from "./logo.png"
import './App.css';
import PastResults from "./Components/PastResults/PastResults"
import TextInput from "./Components/TextInput/TextInput"
import Results from "./Components/Results/Results"
import React, { Component } from 'react'



export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      pastResults: []
    }

  }
  //Clears local storage history
  clearHistory = (e) =>{
    console.log("clearing history")
    this.state.pastResults = []
    localStorage.clear()
  }
  //Incomplete, when complete this function would maintain the local storage of the 10 most recent queries
  setPastResults = (obj) => {
    let curResults = obj
    let pastResults = localStorage.getItem("pastResults")
    if(pastResults){
      this.state.pastResults.push(pastResults)
      if(this.state.pastResults && this.state.pastResults.length < 10) {
        this.state.pastResults.push(curResults)
      } else if(this.state.pastResults && this.state.pastResults.length == 10) {
        this.state.pastResults.shift()
        this.state.pastResults.push(curResults)
      }
    }
    localStorage.setItem("pastResults", this.state.pastResults)
  }
  // sets the current results from inputted text
  setResults = (results) => {
    if(results){
      if(this.state.pastResults.length > 10){
        this.state.pastResults.shift()
      }
      this.state.pastResults.push(results)
      this.setState({
        results
      })
    }
  }

  render() {
    return <div className="app">
      <div className="header">
        <div className="logo">
          <img src={logo} alt="Farmer's Fridge Logo"/>
        </div>
        <div className="title">
          <h2>Farmer's Fridge Frequency Analysis Tool</h2>
        </div>
      </div>
      <div className="body">
        <div className="clearHistory">
          <button className="clearHistoryButton" onClick={(e) => this.clearHistory()}>
            Clear History
          </button>
        </div>
        <div className="textInput">
          <TextInput setResults = {this.setResults} setPastResults = {this.setPastResults}/>
        </div>
        {this.state.results && this.state.results.length > 0? 
        <div className="results">
          <Results results = {this.state.results}/>
        </div>
        : null}
        {this.state.pastResults && this.state.pastResults.length > 0? 
        <div className="pastResults">
          <PastResults pastResults = {this.state.pastResults}/>
        </div>
        : null}
      </div>
    </div>
  }
}