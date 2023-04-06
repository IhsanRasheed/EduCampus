import React from "react";

function Section1() {
  return (
    <>
      <div className="bg-white  grid md:grid-cols-2 md:flex md:items-center justify-between my-3">
      <div className=" bg-no-repeat bg-top"
          style={{ backgroundImage: "url('/images/head.svg')",
          backgroundSize: "" }}>
          <p className="text-5xl font-bold max-w-lg">
            Discover best classes for the best learning
          </p>
          <p className="text-lg max-w-lg text-gray-600 my-5">
            We designed Connections Academy to give students all across the
            nation a public school that lets them learn.
          </p>
      </div>

        <div  >
        <img className="hidden md:block object-cover w-full h-full" src="./images/hero.svg" alt="" />
        </div>
      </div>

      <div className="flex justify-around px-2 ">
        <div class="hidden lg:block text-[#4f4f4f]">
          <h3 className="font-bold text-4xl">400+</h3>
          <p >
            Universities worldwide that partner with us
          </p>
        </div>
        <div class="">
          <img src="/images/partners.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default Section1;
