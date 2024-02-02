import img_header from "../assets/header.jpg";
import img_product1 from "../assets/product1.jpg";
import img_product2 from "../assets/product2.jpg";
import img_product3 from "../assets/product3.jpg";
import img_product4 from "../assets/product4.jpg";

const Home = () => {
  return (
    <main className="font-primary">
      <section className="relative h-[635px] overflow-hidden flex items-center justify-center">
        <img src={img_header} alt="" />
        <div className="absolute text-white text-center">
          <p className="text-5xl font-bold mb-[18px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <p className="text-4xl font-medium shadow-tertiary drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
            One-stop Platform community for Agents and Operator in Thailand.
          </p>
        </div>
      </section>
      <section className="max-w-[1596px] mx-auto">
        <div className="mt-[48px] mb-[24px] text-4xl font-bold text-second text-center">
          Lorem ipsum
        </div>
        <div className="grid grid-cols-4 gap-[24px]">
          <div className="text-center rounded-[8px] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col items-center">
            <img
              src={img_product1}
              alt=""
              className="h-[272px] w-max rounded-t-[8px]"
            />
            <div className="mt-[8px] mb-[11px] w-[293px]">
              <p className="text-lg font-bold text-second mb-[8px]">
                Lorem ipsum
              </p>
              <p className="text-sm font-normal">
                One-stop Platform community for <br />
                Agents and Operator in Thailand.
              </p>
            </div>
            <button className="bg-first text-white text-base font-semibold px-[16px] h-[48px] rounded-[33px] mb-[18px] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
              Buy package
            </button>
          </div>
          <div className="text-center w-[380px] rounded-[8px] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col items-center">
            <img
              src={img_product2}
              alt=""
              className="h-[272px] w-max rounded-t-[8px]"
            />
            <div className="mt-[8px] mb-[11px] w-[293px]">
              <p className="text-lg font-bold text-second mb-[8px]">
                Lorem ipsum
              </p>
              <p className="text-sm font-normal">
                One-stop Platform community for <br />
                Agents and Operator in Thailand.
              </p>
            </div>
            <button className="bg-first text-white text-base font-semibold px-[16px] h-[48px] rounded-[33px] mb-[18px] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
              Buy package
            </button>
          </div>
          <div className="text-center w-[380px] rounded-[8px] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col items-center">
            <img
              src={img_product3}
              alt=""
              className="h-[272px] w-max rounded-t-[8px]"
            />
            <div className="mt-[8px] mb-[11px] w-[293px]">
              <p className="text-lg font-bold text-second mb-[8px]">
                Lorem ipsum
              </p>
              <p className="text-sm font-normal">
                One-stop Platform community for <br />
                Agents and Operator in Thailand.
              </p>
            </div>
            <button className="bg-first text-white text-base font-semibold px-[16px] h-[48px] rounded-[33px] mb-[18px] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
              Buy package
            </button>
          </div>
          <div className="text-center w-[380px] rounded-[8px] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col items-center">
            <img
              src={img_product4}
              alt=""
              className="h-[272px] w-max rounded-t-[8px]"
            />
            <div className="mt-[8px] mb-[11px] w-[293px]">
              <p className="text-lg font-bold text-second mb-[8px]">
                Lorem ipsum
              </p>
              <p className="text-sm font-normal">
                One-stop Platform community for <br />
                Agents and Operator in Thailand.
              </p>
            </div>
            <button className="bg-first text-white text-base font-semibold px-[16px] h-[48px] rounded-[33px] mb-[18px] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
              Buy package
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Home;
