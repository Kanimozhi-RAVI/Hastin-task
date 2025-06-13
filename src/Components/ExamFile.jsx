import React, { useState } from 'react'

function ExamFile() {

const [count , setCount] = useState("0")

const handleChange = () => {
   
    
    setCount(count + 1)
}
const hand = () =>{
setCount( count - 1)
}

  return (
    <div>
        <h1>My Button to click to counter</h1>
        <h1>My Button {count} </h1>

        <button onClick={handleChange}>Increase the count</button>
        <button onClick={hand}>Decrease the count</button>

      
    </div>
  )
}

export default ExamFile
