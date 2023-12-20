/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";

interface ISpinner {
  className?: string | null | undefined;
}

const Spinner = ({
  className,
}: ISpinner & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div
      className={`flex justify-center items-center w-full h-[50vh] ${className}`}
    >
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
};

export default Spinner;
