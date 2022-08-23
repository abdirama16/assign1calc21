import React from 'react';
import '../App.css';
import '../index.css';

const Btn = ({className, val, onClick}) => {
  return (
    <button className={className} onClick={onClick}>{val}</button>
  )
}

export default Btn