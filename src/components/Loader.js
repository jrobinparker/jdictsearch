import React from 'react';

const Loader = () => {
  return (
    <div className="progress" style={{ marginTop: '-25px', width: '97%' }}>
        <div className="indeterminate"></div>
    </div>
  )
}

export default Loader;
