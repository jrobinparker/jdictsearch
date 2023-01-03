import React from "react";
import { createPortal } from "react-dom";

const ResultModal = ({ closeModal, length, name, text, term, url }) => {
  return createPortal(
    <div className="result-modal">
      <div className="modal-card">
        <div className="modal-card-header">
          {name}: {length} results for "{term}"
          <i
            className="fas fa-times modal-close"
            onClick={() => closeModal()}
          />
        </div>
        <div className="modal-body">
          {text.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>
      </div>
    </div>,
    document.querySelector("#result-modal")
  );
};

export default ResultModal;
