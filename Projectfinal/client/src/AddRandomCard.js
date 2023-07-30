import React from "react"
export const AddRandomCard = (props) => {


    
    return(
        <div className="input-group">
     <h1>Click Here To add a Random Card</h1>
     <button type="button" className="btn btn-success" 
     onClick={() => {
        props.addRandomQuote(true);
      }}
     >Add</button>
    </div>
    )
}