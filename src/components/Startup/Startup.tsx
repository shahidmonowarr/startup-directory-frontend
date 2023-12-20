/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStartup } from "../../types/globalType";
import "./Startup.css";

import { useState } from "react";
import { CiCalendar } from "react-icons/ci";

interface IProps {
  startup: IStartup;
}

const Startup = ({ startup }: IProps) => {
  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);
  const {
    name,
    city,
    startingYear,
    fundingAmount,
    industry,
    founders,
    noOfEmployees,
  } = startup;

  return (
    <div className="card-container xs:w-[200px] sm:w-[300px] bg-gray-100 rounded-xl overflow-hidden">
      <div className="px-8">
        <p className="mt-2 text-sm text-gray-600">{city}</p>
        <h1 className="text-2xl font-bold text-red-500">{name}</h1>
        <p className="flex items-center gap-2 text-sm">
          <CiCalendar />
          <span className="text-gray-600 ">{startingYear}</span>
        </p>

        <p className="flex items-center gap-2">
          Funding:
          <span className="text-gray-600 ">
            {fundingAmount ? fundingAmount : "Not Mentioned"}
          </span>
        </p>
        <p className="flex items-center gap-2">{industry}</p>
      </div>
      <div className="relative flex items-center justify-center p-8 ">
        <div className="absolute flex flex-col items-center justify-center w-full h-full gap-3">
          <div className="text-black">
            <button
              className="text-lg text-black btn hover:text-black"
              onClick={() => setShowModal(true)}
            >
              See Details
            </button>
            {showModal ? (
              <>
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                  <div className="relative w-auto max-w-3xl mx-auto my-6">
                    {/*content*/}
                    <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                        <h3 className="text-3xl font-semibold text-red-500">
                          {name}
                        </h3>
                        <button
                          className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative flex-auto p-6">
                        <p className="flex items-center gap-2">
                          <CiCalendar />
                          {startingYear}
                        </p>
                        <h3 className="text-lg font-bold md:text-3xl">
                          {industry}
                        </h3>
                        <p>
                          Founded By:{" "}
                          <span className="text-lime-600">{founders}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          Funding:
                          <span className="text-gray-600 ">
                            {fundingAmount ? fundingAmount : "Not Mentioned"}
                          </span>
                        </p>
                        <p className="text-base text-gray-600">
                          Location: {city}
                        </p>
                        <p className="text-base text-gray-600">
                          No. Of Employee:{" "}
                          {noOfEmployees ? noOfEmployees : "Not Mentioned"}
                        </p>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                        <button
                          className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Startup;
