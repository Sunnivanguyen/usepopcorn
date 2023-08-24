import { useState } from "react";

function Box({ children, isLoading }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={isLoading ? "loading-container" : "box"}>
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

export default Box;
