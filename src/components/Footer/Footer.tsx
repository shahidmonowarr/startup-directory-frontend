import { BsFillSendFill } from "react-icons/bs";
import { LuInstagram } from "react-icons/lu";
import {
  TbBrandDiscordFilled,
  TbBrandFacebookFilled,
  TbBrandTwitterFilled,
} from "react-icons/tb";
import logo from "./../../assets/logo.png";

const Footer = () => {
  return (
    <div>
      <div className="bg-black">
        <div className="max-w-[1280px]  px-4 mx-auto pt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Startups</h1>
              <ul className="py-3 text-gray-400">
                <li>Name</li>
                <li>City</li>
                <li>Starting Year</li>
                <li>Industry</li>
              </ul>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Contact</h1>
              <p className="py-3 text-gray-400">
                Stay in touch with everything ChapterOne, follow us on social
                media and learn about new promotions.
              </p>
              <div className="flex gap-3 text-2xl text-gray-400">
                <TbBrandFacebookFilled />
                <TbBrandTwitterFilled />
                <LuInstagram />
                <TbBrandDiscordFilled />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">News & Update</h1>
              <p className="py-3 text-gray-400">
                We’d love it if you subscribed to our newsletter! You’ll love it
                too.
              </p>
              <div className="flex justify-between px-3 py-2 border border-gray-400 rounded ">
                <input
                  className="text-white bg-transparent outline-none"
                  type="text"
                  placeholder="Email..."
                />
                <button className="text-2xl text-gray-400">
                  <BsFillSendFill />
                </button>
              </div>
            </div>
            <div>
              <img src={logo} className="h-full w-auto mt-[-40px]" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800">
        <div className="max-w-[1280px] mx-auto text-white text-center py-8 uppercase">
          &copy; {new Date().getFullYear()} Startup Directory. All Right
          Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
