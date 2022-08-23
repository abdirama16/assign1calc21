import React from 'react';
import Textfit from 'react-textfit';
import '../App.css';
import '../index.css';

const Layar = ({val}) => {
  return (
    <Textfit className='layar' mode='single' max={70}>{val}</Textfit>
  )
}

export default Layar