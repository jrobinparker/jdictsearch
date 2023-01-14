import React, { useEffect, useRef, useState } from "react";
import ResultModal from "../ResultModal/ResultModal";
import { StyledResult } from "./Result.styles";

const Result = ({ name, text, url, length, term }) => {
  const [modal, setModal] = useState(false);
  const resultRef = useRef(null);

  useEffect(() => {
    resultRef.current.className = `${resultRef.current.className} slide-top`;
  }, [resultRef]);

  const displayModal = modal && (
    <ResultModal
      closeModal={() => setModal(!modal)}
      text={text}
      name={name}
      url={url}
      length={length}
      term={term}
    />
  );

  return (
    <>
      <StyledResult ref={resultRef} onClick={() => setModal(!modal)}>
        {length} results from {name}
        <i className="fas fa-chevron-right" onClick={() => setModal(!modal)} />
      </StyledResult>
      {displayModal ?? <></>}
    </>
  );
};

export default Result;
