import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import image_login from "../assets/login.png";

const NavBar = () => {
  const { user, setUser } = useUser();

  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setUser({
      urlPicture: "",
      email: "",
      password: "",
      companyName: "",
      taxID: 0,
      fullname: "",
      country: "",
      phoneNumber: 0,
      website: "",
      address: "",
      state: "",
      subDistrict: "",
      city: "",
      zipcode: 0,
    });
    setToggle(false);
  };

  return (
    <nav className="shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="grid items-center mx-auto h-[80px] max-w-[1596px] shadow-primary">
        <ul className="grid grid-cols-3">
          <li>
            <Link to="/">
              <div className="flex items-center justify-center w-[64px] h-[64px] bg-black rounded-full font-bold text-white text-sm font-secondary">
                LOGO
              </div>
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <div className="font-semibold text-xl font-primary text-first underline">
              HOME
            </div>
          </li>
          <li className="relative flex justify-end items-center">
            <Link to="/signin" className={`${user.urlPicture ? "hidden" : "visible"}`}>
              <div className="flex items-center justify-center w-[141px] h-[48px] rounded-full bg-first text-xl shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] font-semibold text-white font-primary">
                Sign in
              </div>
            </Link>
            <div
              className={`${
                user.urlPicture ? "visible" : "hidden"
              } flex justify-end items-center`}
              onClick={() => setToggle((prev) => (prev ? false : true))}
            >
              <div className="flex items-center justify-center w-[64px] h-[64px] rounded-full overflow-hidden mr-[10px]">
                <img src={user.urlPicture} alt="" />
              </div>
              <div>
                <img src={image_login} alt="" />
              </div>
            </div>
            <div
              className={`${
                toggle && user.urlPicture ? "visible" : "hidden"
              } absolute right-0 top-[80px] z-10 bg-white w-[160px] h-[165px px-[17px] pt-[14px] pb-[14px] rounded-[8px] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]`}
            >
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full overflow-hidden mb-[4px]">
                  <img src={user.urlPicture} alt="" />
                </div>
                <div className="text-sm font-bold mb-[7px]">{user.fullname}</div>
              </div>
              <hr className="mb-[7px] bg-first" />
              <div className="text-first text-lg font-medium cursor-pointer">
                Profile
              </div>
              <div
                className="text-first text-lg font-medium cursor-pointer"
                onClick={handleClick}
              >
                Logout
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
