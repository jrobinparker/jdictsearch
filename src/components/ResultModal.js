import React from 'react';
import { createPortal } from 'react-dom';

const ResultModal = ({ closeModal, length, name, text, term, url }) => {
  return createPortal(
    <div className="result-modal">
      <div className="modal-card">
        <div className="modal-card-header">
          {name}: {length} results for "{term}"
          <i className="fas fa-times modal-close" onClick={e => closeModal(e)} />
        </div>
        <div className="modal-body">
          {text.map(t => <p>{t}</p>)}
        </div>
      </div>
    </div>
    ,
    document.querySelector('#result-modal')
  )
};

export default ResultModal;
