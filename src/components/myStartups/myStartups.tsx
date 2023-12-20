/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useGetMyStartupsQuery } from "../../redux/api/apiSlice";
import { IStartup } from "../../types/globalType";
import Spinner from "../Spinner/Spinner";
import Startup from "../Startup/Startup";

const MyStartups = () => {
  const { data, isLoading } = useGetMyStartupsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const startups: IStartup[] | undefined = data?.data;

  return (
    <div className="max-w-[1280px] min-h-[53vh] mx-auto px-10 lg:px-0">
      <h2 className="pt-5 text-2xl font-semibold">
        My Startups{" "}
        <span className="text-sm">
          [{startups !== undefined ? startups?.length : 0}]
        </span>
      </h2>
      <div className="my-10 ">
        {!isLoading ? (
          startups !== undefined && startups.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-5">
              {startups?.map((startup: IStartup) => (
                <Startup key={startup._id} startup={startup} />
              ))}
            </div>
          ) : (
            <div className="py-3">
              <hr />
              <p className="py-5 text-center">No Startup added by you yet</p>
            </div>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default MyStartups;
