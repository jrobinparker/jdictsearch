import React from 'react';
import { createPortal } from 'react-dom';
import {
  StyledResultModal,
  StyledResultModalCard,
  StyledResultModalCardHeader,
  StyledResultModalCardBody,
  StyledResultModalClose,
} from './ResultModal.styles';

const ResultModal = ({ closeModal, length, name, text, term }) => {
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
    document.querySelector('#result-modal'),
  );
};

export default ResultModal;
