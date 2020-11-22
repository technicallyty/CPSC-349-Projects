import React from 'react'
import './App.css';

const Slot = ({id, fill, handleClick, loser}) => {
    return (
        <div className="grid-item" onClick={()=>{handleClick(id)}} style={{backgroundColor: fill, opacity: loser ? 0.2 : 1}} />
    )
}

export default Slot
