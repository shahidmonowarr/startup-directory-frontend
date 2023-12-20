/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { format } from "date-fns";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { usePostStartupMutation } from "../../redux/api/apiSlice";
import { IStartup } from "../../types/globalType";
import InputType from "../InputType/InputType";

const StartupForm = () => {
  const [name, setName] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  // array of strings
  const [founders, setFounders] = useState<string>("");
  const [startingYear, setStartingYear] = useState<string>("");
  const [fundingAmount, setFundingAmount] = useState<string>("");
  const [noOfEmployees, setNoOfEmployees] = useState<string>("");

  const handleDate = (e: { target: { value: string | number | Date } }) => {
    const date = format(new Date(e.target.value), "PP");
    setStartingYear(date);
  };

  const [postStartup, { isLoading, isError, isSuccess, error }] =
    usePostStartupMutation();

  if (isSuccess && !isLoading) {
    toast.success("Successfully added the Startup", { id: "success" });
  }

  if (isError && error) {
    toast.error("Something went wrong");
  }

  const handleAddStartup = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (
      name === "" ||
      industry === "" ||
      city === "" ||
      founders === "" ||
      startingYear === "" ||
      fundingAmount === "" ||
      noOfEmployees === ""
    ) {
      toast.error("Please, fill up all fields");
      return;
    }

    const startupData: Partial<IStartup> = {
      name,
      industry,
      city,
      founders: founders.split(","),
      startingYear,
      fundingAmount: parseInt(fundingAmount),
      noOfEmployees: parseInt(noOfEmployees),
    };

    await postStartup(startupData);
    e.currentTarget.reset();
  };

  return (
    <div>
      <div className="lg:w-[50%] mx-auto ">
        <div className="p-10 mx-10 bg-gray-100 rounded-lg">
          <div className="flex justify-center"></div>
          <h2 className="my-5 text-2xl font-bold text-center">
            Fill the Startup details
          </h2>
          <form className="flex flex-col gap-3" onSubmit={handleAddStartup}>
            {/* Switch statement */}
            <div className="flex flex-col">
              <InputType
                label="Name"
                id="name"
                placeholder="Name"
                type="text"
                name="name"
                labelClassName="hidden"
                className="px-2 py-1 border border-gray-800 rounded"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <InputType
                label="Industry"
                id="industry"
                placeholder="Industry"
                type="text"
                name="industry"
                labelClassName="hidden"
                className="px-2 py-1 border border-gray-800 rounded"
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <InputType
                label="City"
                id="city"
                placeholder="City"
                type="text"
                name="city"
                labelClassName="hidden"
                className="px-2 py-1 border border-gray-800 rounded"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <InputType
                label="Founders"
                id="founders"
                placeholder="Founders"
                type="text"
                name="founders"
                labelClassName="hidden"
                className="px-2 py-1 border border-gray-800 rounded"
                onChange={(e) => setFounders(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <InputType
                label="Starting Year"
                id="startingYear"
                placeholder="Starting Year"
                type="date"
                name="startingYear"
                labelClassName="hidden"
                className="px-2 py-1 border border-gray-800 rounded"
                onChange={handleDate}
              />
            </div>
            <div className="flex flex-col">
              <InputType
                label="Funding Amount"
                id="fundingAmount"
                placeholder="Funding Amount"
                type="text"
                name="fundingAmount"
                labelClassName="hidden"
                className="px-2 py-1 border border-gray-800 rounded"
                onChange={(e) => setFundingAmount(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <InputType
                label="No Of Employees"
                id="noOfEmployees"
                placeholder="No Of Employees"
                type="text"
                name="noOfEmployees"
                labelClassName="hidden"
                className="px-2 py-1 border border-gray-800 rounded"
                onChange={(e) => setNoOfEmployees(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-md" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Startup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StartupForm;
