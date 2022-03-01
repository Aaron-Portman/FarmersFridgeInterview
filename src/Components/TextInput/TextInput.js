import React from 'react'
import "./TextInput.css"
import {useState} from "react"
export default function TextInput(props) {

  const [displayInput, setDisplayInput] = useState(true)

  // dictionaries used to track all the occurrences of possible suffixes
  let suffixLToOccurrencesDict = {}
  let suffixLZToOccurrencesDict = {}
  let suffixEVMToOccurrencesDict = {}
  let suffixZQToOccurrencesDict = {}
  let suffixPZLAToOccurrencesDict = {}
  let suffixPZLAZToOccurrencesDict = {}
  let suffixEZLToOccurrencesDict = {}
  
  // main function that parses data
  const handleData = (e) => {
    setDisplayInput(false)
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      let parsedData = parseData(text)
      props.setResults(parsedData)
      props.setPastResults({
        text,
        parsedData
      })
    };
    reader.readAsText(e.target.files[0])
    
  }
  // does the actual parsing and figuring out of if a word is a root
  const parseData = (text) => {
    let top25 = []
    let suffixesToRemove = ["L", "LZ", "EVM", "ZQ"]
    let suffixesToSub = [["PZL", "A"], ["PZL", "AZ"],["EZL", "R"]]
    let allWordsDict = {}
    let possibleRoots = []
    let textArr = text.split(" ")
    textArr.forEach((e) => {
      let hadAValidSuffix = false
      let word = e.replace(/[^a-zA-Z]+/g, '')
      if(word === null || word === undefined || word === ""){
        return
      }
  
      suffixesToSub.forEach((suffix)=>{
        if(word.endsWith(suffix[0])){
          word = word.substring(0, word.length-suffix[0].length) + suffix[1]
          addToSuffixOccurencesDict(word, suffix[0])
          possibleRoots.push(word)
          hadAValidSuffix = true
        } 
      })
      suffixesToRemove.forEach((suffix) =>{
        if(word.endsWith(suffix)){
          word = word.substring(0, word.length-suffix.length)
          addToSuffixOccurencesDict(word, suffix)
          possibleRoots.push(word)
          hadAValidSuffix = true
        } 
      })
      if(!hadAValidSuffix){
        if(!allWordsDict[word]){
          allWordsDict[word] = 1
        } else {
          allWordsDict[word]++
        }
      }
      

    })
    //if key in more than one OccDict == root
    possibleRoots.forEach((possibleRoot) => {
      let rootInfo = checkIfRoot(possibleRoot)
      let isRoot = rootInfo[0]
      let whereIsRoot = rootInfo[1]
      if(isRoot){
        // covers the need to append a string to end of certain roots
        for(let i = 0; i < suffixesToSub.length; i++){
          if(whereIsRoot[i] == 1){
            possibleRoot = possibleRoot + suffixesToSub[i][1]
            if(!allWordsDict[possibleRoot]){
              allWordsDict[possibleRoot] = 1
            } else {
              allWordsDict[possibleRoot]++
            }
          }
        }
        // normal root that doesn't require adding letters but no double counting
        if(suffixLToOccurrencesDict[possibleRoot] && !allWordsDict[possibleRoot]){
          allWordsDict[possibleRoot] += suffixLToOccurrencesDict[possibleRoot]
        }
        if(suffixLZToOccurrencesDict[possibleRoot] && !allWordsDict[possibleRoot]){
          allWordsDict[possibleRoot] += suffixLZToOccurrencesDict[possibleRoot]
        }
        if(suffixEVMToOccurrencesDict[possibleRoot] && !allWordsDict[possibleRoot]){
          allWordsDict[possibleRoot] += suffixEVMToOccurrencesDict[possibleRoot]
        }
        if(suffixZQToOccurrencesDict[possibleRoot] && !allWordsDict[possibleRoot]){
          allWordsDict[possibleRoot] += suffixZQToOccurrencesDict[possibleRoot]
        }
        if(suffixPZLAToOccurrencesDict[possibleRoot] && !allWordsDict[possibleRoot]){
          allWordsDict[possibleRoot] += suffixPZLAToOccurrencesDict[possibleRoot]
        }
        if(suffixPZLAZToOccurrencesDict[possibleRoot] && !allWordsDict[possibleRoot]){
          allWordsDict[possibleRoot] += suffixPZLAZToOccurrencesDict[possibleRoot]
        }
        if(suffixEZLToOccurrencesDict[possibleRoot] && !allWordsDict[possibleRoot]){
          allWordsDict[possibleRoot] += suffixEZLToOccurrencesDict[possibleRoot]
        }
      } else {
        if(!allWordsDict[possibleRoot]){
          allWordsDict[possibleRoot] = 1
        } else {
          allWordsDict[possibleRoot]++
        }
      }
    })
    top25 = get25(allWordsDict)
    return top25
  }
  //determines if word is a word or just happens to end in valid suffix
  const checkIfRoot = (word) => {
    let numOccurencesInDicts = 0
    let needToSubLetterArr = [0,0,0]
    let loc = 0
    if(suffixLToOccurrencesDict[word]){
      numOccurencesInDicts++
    }

    if(suffixLZToOccurrencesDict[word]){
      numOccurencesInDicts++
    } 

    if(suffixEVMToOccurrencesDict[word]){
      numOccurencesInDicts++
    } 

    if(suffixZQToOccurrencesDict[word]){
      numOccurencesInDicts++
    } 

    if(suffixEZLToOccurrencesDict[word]){
      numOccurencesInDicts++
      needToSubLetterArr[loc]++
    } 
    loc++
    if(suffixPZLAToOccurrencesDict[word]){
      numOccurencesInDicts++
      needToSubLetterArr[loc]++
    } 
    loc++
    if(suffixPZLAZToOccurrencesDict[word]){
      numOccurencesInDicts++
      needToSubLetterArr[loc]++
    }
    return [numOccurencesInDicts >= 2, needToSubLetterArr]
  }
  //tracks occurrences of potential root words
  const addToSuffixOccurencesDict = (word, suffix) =>{
    switch(suffix) {
      case "L":
        suffixLToOccurrencesDict[word] = suffixLToOccurrencesDict[word]
          ? suffixLToOccurrencesDict[word] + 1 
          : 1
        break;
      case "LZ":
        suffixLZToOccurrencesDict[word] = suffixLZToOccurrencesDict[word]
        ? suffixLZToOccurrencesDict[word] + 1 
        : 1
        break;     
      case "EVM":
        suffixEVMToOccurrencesDict[word] = suffixEVMToOccurrencesDict[word]
        ? suffixEVMToOccurrencesDict[word]+ 1 
        : 1
        break;  
      case "ZQ":
        suffixZQToOccurrencesDict[word] = suffixZQToOccurrencesDict[word]
        ? suffixZQToOccurrencesDict[word]+ 1 
        : 1
        break;
      case "EZL":
        suffixEZLToOccurrencesDict[word] = suffixEZLToOccurrencesDict[word]
        ? suffixEZLToOccurrencesDict[word]+ 1 
        : 1
        break;
      case "PZL":
        suffixPZLAToOccurrencesDict[word] = suffixPZLAToOccurrencesDict[word]
        ? suffixPZLAToOccurrencesDict[word]+ 1 
        : 1
        break;

    }
  }
  //returns the top 25 words
  const get25 = (dict) => {
    var items = Object.keys(dict).map(
      (key) => { 
        if(key) {
          return [key, dict[key]]
        }
      })
    //sorts by # of occurences in descending order
    items.sort(
      (first, second) => { return second[1] - first[1] }
    )
    return items.slice(0,25)
  }

  return (
      <div className="fileUpload">
        {displayInput?
        <form>
          <input type="file" title="No File Chosen" className="custom-file-input" accept=".txt" onChange={(e) => handleData(e)}/>
          <p>Drag your files here or click in this area.</p>
        </form>
        : 
        <form className='displayingDataInput'>
        </form>
        }
      </div>
  )
}
