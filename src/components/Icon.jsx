import React, { useEffect, useState } from "react";

const Icon = ({ clear, search, loading }) => {
  const [displayIcon, setDisplayIcon] = useState("fa-search");

  useEffect(() => {
    if (loading === "inactive") setDisplayIcon("fa-search");
    if (loading === "loading") setDisplayIcon("fa-spinner spin-animation");
    if (loading === "loaded") setDisplayIcon("fa-times");
  }, [loading]);

  return (
    <div className="icon-container" onClick={loading !== "loaded" ? search : clear}>
      <i className={`fas ${displayIcon} icon`} />
    </div>
  );
};

export default Icon;
