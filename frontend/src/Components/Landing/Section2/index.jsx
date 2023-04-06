import React from "react";

function Section2() {
  return (
    <div className="bg-white  grid md:grid-cols-2 md:flex md:items-center  ">
      <div className="mx-8">
        <img className="block md:hidden object-cover w-full" src="./images/section2-1.svg" alt="" />
        <img className="hidden md:block object-cover w-full h-full" src="./images/section2.svg" alt="" />
      </div>

      <div className="flex flex-wrap m-2 w-4/5 ">
        <div className="w-full sm:w-1/2 lg:w-2/4 mt-8">
          <img className="bg-[#d2ffea] px-4 py-4 rounded-lg mb-4" src="/images/practical.svg" alt="" />
          <p className="font-bold text-lg">Practical learning</p>
          <p >The only costs are for standard school fee and voluntary field trips.</p>
        </div>

        <div className="w-full sm:w-1/2 lg:w-2/4 mt-8">
          <img className="bg-[#d2ffea] px-4 py-4 rounded-lg mb-4" src="/images/note.svg" alt="" />
          <p className="font-bold text-lg">Meaningful Education</p>
          <p>Many of our Connections Academy schools have additional accreditations.</p>
        </div>

        <div className="w-full sm:w-1/2 lg:w-2/4 mt-8">
          <img className="bg-[#d2ffea] px-4 py-4 rounded-lg mb-4" src="/images/book.svg" alt="" />
          <p className="font-bold text-lg">Best curriculum</p>
          <p>Our curriculum prepares students to go further in life by giving them support.</p>
          
        </div>

        <div className="w-full sm:w-1/2 lg:w-2/4 mt-8">
          <img className="bg-[#d2ffea] px-4 py-4 rounded-lg mb-4" src="/images/network.svg" alt="" />
          <p className="font-bold text-lg">Social interaction</p>
          <p>Students at Connections Academy collaborate on projects together.</p>
          
        </div>
      </div>
    </div>
  );
}

export default Section2;
