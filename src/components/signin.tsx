import image_mail from "../assets/mail.png";
import image_pass from "../assets/pass.png";
import image_see from "../assets/show.png";
import image_toggle from "../assets/toggle.png";
import image_close from "../assets/close.png";
import image_upload from "../assets/pic.png";
import "./signin.css";
import { useRef, useState, ChangeEvent, MouseEvent } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { User } from "../type/type";

const SignIn = () => {
  const pictureRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (!urlPicture) {
      pictureRef.current!.click();
    }
  };

  const [isShown, setIsShown] = useState(false);
  const [preview, setPreview] = useState(false);

  const { setUser } = useUser();

  const [fullname, setfullname] = useState<User["name"]>("");
  const [urlPicture, setUrlPicture] = useState<User["url"]>("");

  const setNameinputHanndler = (event: ChangeEvent<HTMLInputElement>) => {
    setfullname(event.target.value);
  };

  const setPictureInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    setUrlPicture(URL.createObjectURL(event.target.files[0]));
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!fullname && !urlPicture) {
      alert("Pleace Input Fullname and Picture");
      return;
    }
    setUser({
      name: fullname,
      url: urlPicture,
    });
  };

  return (
    <div className="font-primary mt-[42px] w-[1263px] m-auto">
      <form action="" className="mx-auto w-[1128px]">
        <div className="flex justify-center mb-[24px]">
          <div
            className="flex justify-center items-center w-[150px] h-[150px] border-[1px] border-third rounded-full overflow-hidden"
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            onClick={handleImageClick}
          >
            {urlPicture ? (
              <img src={urlPicture} alt="" className="" />
            ) : (
              <img src={image_upload} alt="" />
            )}
            <input
              type="file"
              ref={pictureRef}
              className="hidden"
              accept="image/*"
              onChange={setPictureInputHandler}
            />
            {isShown && urlPicture && (
              <div className="absolute w-[150px] h-[150px] rounded-full bg-eighth text-3xl">
                <div className="flex justify-between px-[30px] items-center w-[150px] h-[150px] t-[10px] text-white">
                  <RiDeleteBin7Line
                    className="cursor-pointer"
                    onClick={() => setUrlPicture("")}
                  />
                  <MdOutlineRemoveRedEye
                    onClick={() => setPreview((prev) => (prev ? false : true))}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className={`${
            preview ? "visible" : "hidden"
          } fixed z-10 top-0 left-0 w-full h-full flex justify-center items-center bg-eighth`}
        >
          <div className="relative flex justify-center items-center bg-white w-[452px] h-[424px] rounded-[8px]">
            <div className="w-[434px] h-[404px] flex justify-center items-center">
              <img src={urlPicture} alt="" />
            </div>
            <img
              src={image_close}
              alt=""
              className="absolute top-[23.5px] right-[23.5px] cursor-pointer "
              onClick={() => setPreview((prev) => (prev ? false : true))}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[24px]">
          <div className="relative grid gap-[6px]">
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              className="rounded-[4px] border-[1px] h-[44px] pl-[48px] text-lg border-sixth shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)]"
              type="email"
              placeholder="Enter your Email"
            />
            <img
              src={image_mail}
              alt=""
              className="absolute top-[41px] left-[14px]"
            />
          </div>

          <div className="relative grid gap-[6px]">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="rounded-[4px] border-[1px] h-[44px] pl-[44px] text-lg border-sixth shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)]"
            />
            <img
              src={image_pass}
              alt=""
              className="absolute top-[41px] left-[14px]"
            />
            <img
              src={image_see}
              alt=""
              className="absolute top-[46px] right-[28px]"
            />
          </div>

          <div className="relative grid gap-[6px]">
            <label htmlFor="password">Confirmed Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="rounded-[4px] border-[1px] h-[44px] pl-[44px] text-lg border-sixth shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)]"
            />
            <img
              src={image_pass}
              alt=""
              className="absolute top-[41px] left-[14px]"
            />
            <img
              src={image_see}
              alt=""
              className="absolute top-[46px] right-[28px]"
            />
          </div>
        </div>

        <hr className="mt-[32px] mb-[32px]" />

        <div className="font-semibold text-xl text-fourth">Information</div>

        <div className="grid grid-cols-3 gap-[24px]">
          <div className="grid mt-[8px] gap-[6px]">
            <label htmlFor="companyname" className="">
              Company Name
            </label>
            <input
              className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth"
              type="text"
              placeholder="Enter company name"
            />
          </div>

          <div className="grid mt-[8px] gap-[6px]">
            <label htmlFor="taxid" className="">
              Tax ID
            </label>
            <input
              className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth"
              type="text"
              placeholder="Enter Tax ID"
            />
          </div>

          <div className="grid mt-[8px] gap-[6px]">
            <label htmlFor="fullname" className="">
              Full Name
            </label>
            <input
              className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth"
              type="text"
              placeholder="Enter Full name"
              value={fullname}
              onChange={setNameinputHanndler}
            />
          </div>

          <div className="relative grid mt-[8px] gap-[6px]">
            <label htmlFor="country" className="">
              Country
            </label>
            <select
              name="country"
              id=""
              className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg"
            >
              <option value="thailand" selected>
                Thailand
              </option>
              <option value="thailand">TEST 1</option>s
              <option value="thailand">TEST 2</option>
            </select>
            <img
              src={image_toggle}
              alt=""
              className="absolute top-[50px] right-[19px]"
            />
          </div>

          <div className="relative grid mt-[8px] gap-[6px]">
            <label htmlFor="phone" className="">
              Phone Number
            </label>
            <div className="flex justify-between">
              <select
                name="phone"
                id=""
                className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg w-[93px]"
              >
                <option value="thailand" selected>
                  +66
                </option>
                <option value="thailand">TEST 1</option>
                <option value="thailand">TEST 2</option>
              </select>
              <img
                src={image_toggle}
                alt=""
                className="absolute top-[50px] left-[64px]"
              />
              <input
                className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth w-[259px]"
                type="text"
                placeholder="Enter Phone number"
              />
            </div>
          </div>

          <div className="grid mt-[8px] gap-[6px]">
            <label htmlFor="website" className="">
              Website
            </label>
            <input
              className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth"
              type="text"
              placeholder="Enter website"
            />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_2.05fr] gap-[24px] mt-[24px]">
          <div className="flex flex-col mt-[8px] gap-[6px]">
            <label htmlFor="website" className="">
              Website
            </label>
            <textarea
              name=""
              id=""
              cols={30}
              rows={4}
              className="rounded-[4px] border-[1px] pl-[12px] text-lg border-sixth py-[9px] h-[150px]"
              placeholder="Enter Address"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-[24px]">
            <div className="relative grid mt-[8px] gap-[6px]">
              <label htmlFor="country" className="">
                State/Province
              </label>
              <select
                name="state"
                id=""
                className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg text-seventh"
              >
                <option value="" disabled selected>
                  Choose Province
                </option>
                <option value="thailand">TEST 1</option>
                <option value="thailand">TEST 2</option>
                <option value="thailand">TEST 3</option>
              </select>
              <img
                src={image_toggle}
                alt=""
                className="absolute top-[50px] right-[19px]"
              />
            </div>

            <div className="relative grid mt-[8px] gap-[6px]">
              <label htmlFor="country" className="">
                Sub-District
              </label>
              <select
                name="sub-district"
                id=""
                className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg text-seventh"
              >
                <option value="" disabled selected>
                  Choose Sub-District
                </option>
                <option value="thailand">TEST 1</option>
                <option value="thailand">TEST 2</option>
                <option value="thailand">TEST 3</option>
              </select>
              <img
                src={image_toggle}
                alt=""
                className="absolute top-[50px] right-[19px]"
              />
            </div>

            <div className="relative grid mt-[8px] gap-[6px]">
              <label htmlFor="country" className="">
                City/District
              </label>
              <select
                name="city"
                id=""
                className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg text-seventh"
              >
                <option value="" disabled selected>
                  Choose District
                </option>
                <option value="thailand">TEST 1</option>
                <option value="thailand">TEST 2</option>
                <option value="thailand">TEST 3</option>
              </select>
              <img
                src={image_toggle}
                alt=""
                className="absolute top-[50px] right-[19px]"
              />
            </div>

            <div className="grid mt-[8px] gap-[6px]">
              <label htmlFor="zipcode" className="">
                Zip Code
              </label>
              <input
                className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth"
                type="text"
                placeholder="Enter Zip Code"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mx-[40px] my-[49px]">
          <Link
            to="/"
            className="flex justify-center items-center bg-third text-white text-xl font-semibold w-[160px] h-[48px] rounded-full shadow-[0_4px_8px_4px_rgba(0,0,0,0.16)]"
          >
            Cancle
          </Link>

          <button
            className="bg-fifth text-white text-xl font-semibold w-[160px] h-[48px] rounded-full shadow-[0_4px_8px_4px_rgba(0,0,0,0.16)]"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default SignIn;
