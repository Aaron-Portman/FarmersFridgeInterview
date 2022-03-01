import React from 'react'

export default function PastResults(props) {
  return (
    <div className="PastResults">
        <ul className="resultsList">
            {props.pastResults.map((results) => {
            <li>
                {/* <div className="contents">
                    File: {results.fileName}
                    Top Word: {results.top25[0]}
                    Stop Word Setting: {results.stopWordSetting}
                </div> */}
                <div className="displayButton">
                    <button className="selectPastResultsButton">
                        View Full Results
                    </button>
                </div>
            </li>
            })}
        </ul>
    </div>
  )
}
