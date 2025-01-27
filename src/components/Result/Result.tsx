import { useEffect, useRef, useState, ReactElement } from "react";
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
  const resultRef = useRef<HTMLDivElement | null>(null);

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
        {length === 1 ? `${length} result` : `${length} results`} from {name}
        <i className="fas fa-chevron-right" onClick={() => setModal(!modal)} />
      </StyledResult>
      {displayModal ?? <></>}
    </>
  );
};

export default Result;
