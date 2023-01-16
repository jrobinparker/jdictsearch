import { createPortal } from 'react-dom';
import {
  StyledResultModal,
  StyledResultModalCard,
  StyledResultModalCardHeader,
  StyledResultModalCardBody,
  StyledResultModalClose,
} from './ResultModal.styles';

interface ResultModalProps {
  closeModal: Function;
  length: number;
  name: string;
  text: string[];
  term: string
}

const ResultModal = ({ closeModal, length, name, text, term }: ResultModalProps) => {
  return createPortal(
    <StyledResultModal>
      <StyledResultModalCard>
        <StyledResultModalCardHeader>
          {name}: {length} results for "{term}"
          <StyledResultModalClose 
            onClick={() => closeModal()} 
          />
        </StyledResultModalCardHeader>
        <StyledResultModalCardBody>
          {text.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </StyledResultModalCardBody>
      </StyledResultModalCard>
    </StyledResultModal>,
    document.querySelector('#result-modal') as Element | DocumentFragment,
  );
};

export default ResultModal;
