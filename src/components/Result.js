import React, { Fragment, useEffect, useState } from 'react';
import ResultModal from './ResultModal';

const Result = ({ appear, name, text, url, length, term }) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    appear()
  }, [appear])

  const toggleModal = e => {
    setModal(!modal)
  }

  return (
    <Fragment>
      <div
        className="result"
        onClick={e => toggleModal(e)}
        >
            {length} results from {name}
          <i className="fas fa-chevron-right" onClick={e => toggleModal(e)}/>
      </div>
      {modal ? <ResultModal closeModal={toggleModal} text={text} name={name} url={url} length={length} term={term} /> : <Fragment></Fragment>}
    </Fragment>
    )
}

export default Result;
