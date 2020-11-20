import React from 'react'
import './App.css';

const Slot = ({id, fill, handleClick}) => {
    return (
        <div className="grid-item" onClick={()=>{handleClick(id)}} style={{backgroundColor: fill}}>
            {id}
        </div>
    )
}

export default Slot
