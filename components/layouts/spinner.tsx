import React from "react";

const Spinner = () => {
  return (
    <div className="screen_loader animate__animated absolute inset-0 z-[60] grid place-content-center bg-[#fff] bg-opacity-80">
      <span className="m-auto mb-10 inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-transparent border-l-primary align-middle"></span>
    </div>
  );
};

export default Spinner;
