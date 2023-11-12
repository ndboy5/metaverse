import React from "react";

const NavBar2 = () => {
  return (
    <div className="Property1Default w-96 h-16 bg-black bg-opacity-30 backdrop-blur-lg justify-between items-center inline-flex">
      <div className="Frame3 w-96 self-stretch px-8 justify-start items-center gap-4 flex">
        <div className="Frame48096419 w-28 h-10 px-4 bg-neutral-900 rounded-lg border border-zinc-900 justify-between items-center flex">
          <div className="Menu justify-center items-center gap-1 flex">
            <div className="Explore text-white text-sm font-normal font-['Aeonik']">
              Explore
            </div>
          </div>
          <div className="UserInterfaceExplore w-6 h-6 relative">
            <div className="Rectangle3468147 w-2 h-2 left-[3px] top-[3px] absolute bg-fuchsia-400 rounded-sm" />
            <div className="Rectangle3468149 w-2 h-2 left-[3px] top-[12px] absolute bg-fuchsia-400 rounded-sm" />
            <div className="Rectangle3468148 w-2 h-4 left-[13px] top-[3px] absolute bg-fuchsia-400 rounded-sm" />
          </div>
        </div>
        <div className="Menu w-36 px-3 rounded-lg border justify-center items-center gap-1 flex">
          <div className="Marketplaces text-white text-sm font-normal font-['Aeonik']">
            Marketplaces
          </div>
          <div className="ArrowsDownArrow w-6 h-6 relative" />
        </div>
        <div className="Menu w-20 px-3 rounded-lg border justify-center items-center gap-2 flex">
          <div className="Academy text-white text-sm font-normal font-['Aeonik']">
            Academy
          </div>
        </div>
        <div className="Input w-28 h-10 px-3 py-1.5 bg-neutral-800 rounded-xl shadow justify-start items-center gap-2 flex">
          <div className="Search w-4 h-4 relative" />
        </div>
      </div>
      <div className="Frame48096416 w-48 self-stretch px-6 py-1 flex-col justify-center items-center inline-flex">
        <div className="Logo w-36 h-9 relative">
          <div className="ClipPathGroup w-10 h-9 left-0 top-0 absolute">
            <div className="ClipPathGroup w-10 h-9 left-0 top-[-0px] absolute">
              <img
                className="Rectangle w-10 h-9 left-0 top-0 absolute"
                src="https://via.placeholder.com/40x36"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="Frame48096417 w-96 self-stretch pr-8 justify-end items-center gap-5 flex">
        <div className="Menu h-10 px-3 rounded-lg border flex-col justify-center items-center gap-1 inline-flex">
          <div className="BuyMetaverse text-fuchsia-400 text-sm font-normal font-['Aeonik']">
            Buy Metaverse
          </div>
          <div className="Line111 self-stretch h-px border border-fuchsia-400"></div>
        </div>
        <div className="Menu h-10 px-3 rounded-lg border flex-col justify-center items-center gap-1 inline-flex">
          <div className="WorkInMetaverse text-fuchsia-400 text-sm font-normal font-['Aeonik']">
            Work In Metaverse
          </div>
          <div className="Line111 w-28 h-px border border-fuchsia-400"></div>
        </div>
        <div className="Button justify-start items-start flex">
          <div className="Button w-24 px-3 rounded-lg justify-center items-center gap-2 flex">
            <div className="Button text-fuchsia-400 text-sm font-medium font-['Aeonik'] leading-tight tracking-tight">
              Sign In
            </div>
            <div className="UserInterfaceLogout w-4 h-4 relative" />
          </div>
        </div>
        <div className="Button w-20 px-4 bg-gradient-to-l from-pink-400 via-purple-400 to-teal-600 rounded-lg justify-center items-center gap-2 flex">
          <div className="Button text-white text-sm font-medium font-['Aeonik'] leading-tight tracking-tight">
            Register
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar2;
