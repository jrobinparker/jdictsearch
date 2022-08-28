import React, { useEffect, useState } from "react";

const Icon = ({ clear, search, loading }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(loading);
  }, [status, loading]);

  return (
    <div className="icon-container">
      {status === "inactive" ? (
        <i className="fas fa-search icon" onClick={search} />
      ) : status === "loading" ? (
        <i className="fas fa-spinner spin-animation icon" />
      ) : status === "loaded" ? (
        <i className="fas fa-times icon" onClick={clear} />
      ) : (
        <i className="fas fa-search icon" onClick={search} />
      )}
    </div>
  );
};

export default Icon;
