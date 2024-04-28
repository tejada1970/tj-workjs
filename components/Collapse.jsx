import React from 'react';
import { useState } from 'react';

const Collapse = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className={`overflow-hidden w-full bg-slate-100 bottom-0 absolute left-0 z-10`}>
      <div className=
      {`
        overflow-hidden max-h-0 
        ${isOpen
        ? 'max-h-[300px] ease-in duration-1000' 
        : 'max-h-0 ease-out duration-1000'}
      `}
      >
        {props.children}
      </div>
      <div className=''>
        <button onClick={toggleCollapse} className={props.bgButton}>
          <span className={props.colorSpan}>
            {isOpen ? 'Cerrar' : 'Leer...'}
          </span> 
        </button>
      </div>
    </div>
  )
}
export default Collapse