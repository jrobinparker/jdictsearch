import { useEffect, useRef, useState, MutableRefObject, ReactElement } from "react";
import ResultModal from "../ResultModal/ResultModal";
import { StyledResult } from "./Result.styles";

interface ResultProps {
  name: string;
  text: string[];
  length: number;
  term: string;
}


const Result = ({ name, text, length, term }: ResultProps) => {
  const [modal, setModal] = useState<boolean>(false);
  const resultRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    if (resultRef.current) resultRef.current.className = `${resultRef.current.className} slide-top`;
  }, [resultRef]);

  const displayModal: ReactElement | false = modal && (
    <ResultModal
      closeModal={() => setModal(!modal)}
      text={text}
      name={name}
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
