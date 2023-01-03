import React, { Fragment, useEffect, useState } from "react";
import ResultModal from "./ResultModal";

const Result = ({ appear, name, text, url, length, term }) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    appear(5);
  }, [appear]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const displayModal = modal && (
    <ResultModal
      closeModal={toggleModal}
      text={text}
      name={name}
      url={url}
      length={length}
      term={term}
    />
  );

  return (
    <Fragment>
      <div className="result" onClick={() => toggleModal()}>
        {length} results from {name}
        <i className="fas fa-chevron-right" onClick={() => toggleModal()} />
      </div>
      {displayModal ?? <Fragment></Fragment>}
    </Fragment>
  );
};

export default Result;
