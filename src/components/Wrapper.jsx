import React from 'react';
import '../App.css';
import '../index.css';

const Wrapper = ({children}) => {
  return (
    <div className='wrapper'>{children}</div>
  )
}

export default Wrapper