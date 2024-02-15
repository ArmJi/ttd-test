import image_mail from "../assets/mail.png";
import image_pass from "../assets/pass.png";
import image_see from "../assets/show.png";
import image_close from "../assets/close.png";
import image_upload from "../assets/pic.png";
import "./signin.css";
import { useRef, useState, ChangeEvent, MouseEvent } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { User, FormError } from "../type/type";


const SignIn = () => {
  // USE CONTEXT
  const { setUser } = useUser();

  // STATE FOR DATA OF FORM
  const [userForm, setUserForm] = useState<User>({
    url: "",
    email: "",
    password: "",
    confirmPass: "",
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

  // STATE FOR INFORMATION ERROR OF FORM
  const [formError, setFormError] = useState<FormError>({
    url: "",
    email: "",
    password: "",
    confirmPass: "",
    companyName: "",
    taxID: "",
    fullname: "",
    country: "",
    phoneNumber: "",
    website: "",
    address: "",
    state: "",
    subDistrict: "",
    city: "",
    zipcode: "",
  });

  // FUNCTION EVENT ON CHANGE OF FORM INPUT
  // ON CHANGE OF SIMPLE INPUT
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserForm({
      ...userForm,
      [event.target.name]: event.target.value,
    });
    if (!event.target.value) {
      setFormError({
        ...formError,
        [event.target.name]: "Required",
      });
    } else {
      setFormError({
        ...formError,
        [event.target.name]: "",
      });
    }
  };

  // ON CHANGE OF EMAIL INPUT
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserForm({
      ...userForm,
      [event.target.name]: event.target.value,
    });

    if (!event.target.value) {
      setFormError({
        ...formError,
        [event.target.name]: "Required",
      });
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value)
    ) {
      setFormError({
        ...formError,
        [event.target.name]: "Invalid email address",
      });
    } else {
      setFormError({
        ...formError,
        [event.target.name]: "",
      });
    }
  };

  // STATE FOR SHOW HIDDEN OF PASS
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);

  // ON CHANGE OF PASS INPUT
  const handlePassChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserForm({
      ...userForm,
      [event.target.name]: event.target.value,
    });

    if (!event.target.value) {
      setFormError({
        ...formError,
        [event.target.name]: "Required",
      });
    } else if (!/.{8,}/.test(event.target.value)) {
      setFormError({
        ...formError,
        [event.target.name]: "Minimum of 8 characters",
      });
    } else if (
      !/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/.test(event.target.value)
    ) {
      setFormError({
        ...formError,
        [event.target.name]: "Uppercase, lowercase letters and one number",
      });
    } else {
      setFormError({
        ...formError,
        [event.target.name]: "",
      });
    }
  };

  // ON CHANGE OF CONFIRM PASS INPUT
  const handleConfirmPassChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserForm({
      ...userForm,
      [event.target.name]: event.target.value,
    });
    if (event.target.value !== userForm.password) {
      setFormError({
        ...formError,
        [event.target.name]: "Password and Confirm should the same",
      });
    } else {
      setFormError({
        ...formError,
        [event.target.name]: "",
      });
    }
  };

  // ON CHANGE OF TEXT AREA INPUT
  const handleTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserForm({
      ...userForm,
      address: event.target.value,
    });
    if (!event.target.value) {
      setFormError({
        ...formError,
        [event.target.name]: "Required",
      });
    } else {
      setFormError({
        ...formError,
        [event.target.name]: "",
      });
    }
  };

  // FUNCTION UPLOAD PICTURE
  const pictureRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (!userForm.url) {
      pictureRef.current!.click();
    }
  };

  const [isShown, setIsShown] = useState<boolean>(false);
  const [preview, setPreview] = useState<boolean>(false);

  const setPictureHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      setFormError({
        ...formError,
        [event.target.name]: "Required",
      });
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      const readerURL = reader.result;
      if (typeof readerURL === "string") {
        setUserForm({
          ...userForm,
          url: readerURL,
        });
      }
    };
  };

  // FUNCTION SUBMIT FORM
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (
      userForm.url &&
      userForm.email &&
      userForm.password &&
      userForm.confirmPass &&
      userForm.confirmPass &&
      userForm.companyName &&
      userForm.taxID &&
      userForm.fullname &&
      userForm.country &&
      userForm.phoneNumber &&
      userForm.website &&
      userForm.address &&
      userForm.state &&
      userForm.city &&
      userForm.zipcode
    ) {
      setUser(userForm);
      location.href = "/";
    } else {
      alert("Pleace fill out the information completely");
    }
  };

  return (
    <div className="font-primary mt-[42px] w-[1263px] m-auto">
      <form action="" className="mx-auto w-[1128px]">
        <div className="flex justify-center mb-[24px]">
          <div
            className="flex justify-center items-center w-[150px] h-[150px] border-[1px] border-third rounded-full overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            onClick={handleImageClick}
          >
            {userForm.url ? (
              <img src={userForm.url} alt="" />
            ) : (
              <img src={image_upload} alt="" />
            )}
            <input
              type="file"
              name="url"
              ref={pictureRef}
              className="hidden"
              accept="image/*"
              onChange={setPictureHandler}
            />
            {isShown && userForm.url && (
              <div className="absolute w-[150px] h-[150px] rounded-full bg-eighth text-3xl">
                <div className="flex justify-between px-[30px] items-center w-[150px] h-[150px] t-[10px] text-white">
                  <RiDeleteBin7Line
                    className="cursor-pointer"
                    onClick={() => {
                      setUserForm({
                        ...userForm,
                        url: "",
                      });
                      pictureRef.current!.value = "";
                    }}
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
              <img src={userForm.url} alt="" />
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
            <label htmlFor="email">Email</label>
            <input
              className="rounded-[4px] border-[1px] h-[44px] pl-[48px] text-lg border-sixth shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)]"
              type="email"
              placeholder="Enter your Email"
              name="email"
              onChange={handleEmailChange}
            />
            <img
              src={image_mail}
              alt=""
              className="absolute top-[41px] left-[14px]"
            />
            <p className="text-red-500 absolute bottom-[-25px] text-sm">
              {formError.email}
            </p>
          </div>

          <div className="relative grid gap-[6px]">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="rounded-[4px] border-[1px] h-[44px] pl-[44px] text-lg border-sixth shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)]"
              name="password"
              onChange={handlePassChange}
            />
            <img
              src={image_pass}
              alt=""
              className="absolute top-[41px] left-[14px]"
            />
            <img
              src={image_see}
              alt=""
              className="absolute top-[46px] right-[28px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
            <p className="text-red-500 absolute bottom-[-25px] text-sm">
              {formError.password}
            </p>
          </div>

          <div className="relative grid gap-[6px]">
            <label htmlFor="confirmPass">Confirmed Password</label>
            <input
              type={showConfirmPass ? "text" : "password"}
              placeholder="Enter your password"
              className="rounded-[4px] border-[1px] h-[44px] pl-[44px] text-lg border-sixth shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)]"
              name="confirmPass"
              onChange={handleConfirmPassChange}
            />
            <img
              src={image_pass}
              alt=""
              className="absolute top-[41px] left-[14px]"
            />
            <img
              src={image_see}
              alt=""
              className="absolute top-[46px] right-[28px] cursor-pointer"
              onClick={() => setShowConfirmPass((prev) => !prev)}
            />
            <p className="text-red-500 absolute bottom-[-25px] text-sm">
              {formError.confirmPass}
            </p>
          </div>
        </div>

        <hr className="mt-[32px] mb-[32px]" />

        <div className="font-semibold text-xl text-fourth">Information</div>

        <div className="grid grid-cols-3 gap-[24px]">
          <div className="grid mt-[8px] gap-[6px] relative">
            <label htmlFor="companyname">Company Name</label>
            <input
              className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth"
              type="text"
              placeholder="Enter company name"
              name="companyName"
              onChange={handleChange}
            />
            <p className="text-red-500 absolute bottom-[-25px] text-sm">
              {formError.companyName}
            </p>
          </div>

          <div className="grid mt-[8px] gap-[6px] relative">
            <label htmlFor="taxid">Tax ID</label>
            <input
              className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth"
              type="text"
              placeholder="Enter Tax ID"
              name="taxID"
              onChange={handleChange}
            />
            <p className="text-red-500 absolute bottom-[-25px] text-sm">
              {formError.taxID}
            </p>
          </div>

          <div className="grid mt-[8px] gap-[6px] relative">
            <label htmlFor="fullname">Full Name</label>
            <input
              className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth"
              type="text"
              placeholder="Enter Full name"
              name="fullname"
              onChange={handleChange}
            />
            <p className="text-red-500 absolute bottom-[-25px] text-sm">
              {formError.fullname}
            </p>
          </div>

          <div className="relative grid mt-[8px] gap-[6px]">
            <label htmlFor="country">Country</label>
            <input
              className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth"
              type="text"
              placeholder="Enter Country"
              name="country"
              onChange={handleChange}
            />
            <p className="text-red-500 absolute bottom-[-25px] text-sm">
              {formError.country}
            </p>
          </div>

          <div className="relative grid mt-[8px] gap-[6px]">
            <label htmlFor="phonenumber">Phone Number</label>
            <input
              className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth"
              type="text"
              placeholder="Enter Phone number"
              name="phoneNumber"
              onChange={handleChange}
            />
            <p className="text-red-500 absolute bottom-[-25px] text-sm">
              {formError.phoneNumber}
            </p>
          </div>

          <div className="relative grid mt-[8px] gap-[6px]">
            <label htmlFor="website">Website</label>
            <input
              className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth"
              type="text"
              placeholder="Enter website"
              name="website"
              onChange={handleChange}
            />
            <p className="text-red-500 absolute bottom-[-25px] text-sm">
              {formError.website}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_2.05fr] gap-[24px] mt-[24px]">
          <div className="relative flex flex-col mt-[8px] gap-[6px]">
            <label htmlFor="website">Address</label>
            <textarea
              id=""
              cols={30}
              rows={4}
              className="rounded-[4px] border-[1px] pl-[12px] text-lg border-sixth py-[9px] h-[150px]"
              placeholder="Enter Address"
              name="address"
              onChange={handleTextArea}
            ></textarea>
            <p className="text-red-500 absolute bottom-[-25px] text-sm">
              {formError.address}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-[24px]">
            <div className="relative grid mt-[8px] gap-[6px]">
              <label htmlFor="state">State/Province</label>
              <input
                className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth"
                type="text"
                placeholder="Enter State/Provine"
                name="state"
                onChange={handleChange}
              />
              <p className="text-red-500 absolute bottom-[-25px] text-sm">
                {formError.state}
              </p>
            </div>

            <div className="relative grid mt-[8px] gap-[6px]">
              <label htmlFor="subDistrict">Sub-District</label>
              <input
                className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth"
                type="text"
                placeholder="Enter Sub-District"
                name="subDistrict"
                onChange={handleChange}
              />
              <p className="text-red-500 absolute bottom-[-25px] text-sm">
                {formError.subDistrict}
              </p>
            </div>

            <div className="relative grid mt-[8px] gap-[6px]">
              <label htmlFor="City">City/District</label>
              <input
                className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth"
                type="text"
                placeholder="Enter City/District"
                name="city"
                onChange={handleChange}
              />
              <p className="text-red-500 absolute bottom-[-25px] text-sm">
                {formError.city}
              </p>
            </div>

            <div className="relative grid mt-[8px] gap-[6px]">
              <label htmlFor="zipcode">Zip Code</label>
              <input
                className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth"
                type="text"
                placeholder="Enter Zip Code"
                name="zipcode"
                onChange={handleChange}
              />
              <p className="text-red-500 absolute bottom-[-25px] text-sm">
                {formError.zipcode}
              </p>
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
