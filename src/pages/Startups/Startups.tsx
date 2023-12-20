/* eslint-disable @typescript-eslint/no-explicit-any */
import InputType from "../../components/InputType/InputType";
import Spinner from "../../components/Spinner/Spinner";
import Startup from "../../components/Startup/Startup";
import { useGetStartupsQuery } from "../../redux/api/apiSlice";
import {
  filterIndustry,
  searchStartup,
} from "../../redux/features/startup/startupSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { IStartup } from "../../types/globalType";

const Startups = () => {
  const dispatch = useAppDispatch();
  const { searchTerm, industry } = useAppSelector((state) => state.startup);

  const { data: startups, isLoading } = useGetStartupsQuery(
    {
      searchTerm,
      ...(industry && { industry }),
    },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 30000,
    }
  );

  const industryList = startups?.data?.map(
    (startup: IStartup) => startup.industry
  );

  const uniqueIndustries = industryList
    ? industryList.filter(
        (value: any, index: any, self: any) => self.indexOf(value) === index
      )
    : [];

  if (isLoading) {
    return <Spinner />;
  }

  const handleSearch = (e: { target: { value: string } }) => {
    dispatch(searchStartup(e.target.value));
  };

  const handleIndustryFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClearFilters = () => {
    dispatch(searchStartup("")); // Reset search term
    dispatch(filterIndustry("")); // Reset industry filter
  };

  return (
    <div className="max-w-[1280px] min-h-[53vh] mx-auto gap-10">
      <div className="flex flex-col px-10 lg:px-0">
        <div className="flex flex-wrap justify-center gap-5 px-10 mt-10 lg:px-0">
          <InputType
            label="Search"
            id="search"
            placeholder="Search by name..."
            type="text"
            name="search"
            labelClassName="hidden"
            className="border py-1 px-2 rounded border-gray-800 w-[150px] sm:w-[200px] md:w-auto"
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-5 px-10 lg:px-0">
          <form
            className="my-10 lg:w-5/12 items-center h-[50px]"
            onSubmit={handleIndustryFilter}
          >
            <div className="flex w-full gap-5 lg:justify-center">
              <div className="flex flex-col ">
                <select
                  name="industry"
                  id="industry"
                  className="w-full px-2 py-1 border border-gray-800 rounded"
                  onChange={(e) => dispatch(filterIndustry(e.target.value))}
                  value={industry}
                >
                  <option value="">All</option>
                  {uniqueIndustries.map((industry: string, index: number) => (
                    <option key={index} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex">
                <button type="submit" className="mx-2 btn btn-sm">
                  Apply filter
                </button>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-10">
        <div className="flex flex-wrap justify-center gap-5 px-10 mb-10 lg:px-0">
          {startups?.data?.map((startup: IStartup) => (
            <Startup key={startup._id} startup={startup} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Startups;
