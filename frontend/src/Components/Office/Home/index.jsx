import React from "react";

function Home() {
  return (
    <div className="p-8 max-with overflow-x-hidden">
    <p className="font-medium  text-3xl ">Welcome!</p>
    
    <section className="my-4 max-w-fit">
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-1">
            <div className="bg-white shadow-xl rounded-lg px-16 py-6">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">Batches</p>
                </div>
                <p className="text-green-400 text-2xl leading-none mb-0">00</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white shadow-2xl rounded-lg px-16 py-6">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-sm text-gray-600 uppercase leading-4">Teachers</p>
                </div>
                <p className="text-green-400 text-2xl leading-none mb-0">00</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white shadow-2xl rounded-lg px-16 py-6">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-sm text-gray-600 uppercase leading-4">Students</p>
                </div>
                <p className="text-green-400 text-2xl leading-none mb-0">00</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white shadow-2xl rounded-lg px-16 py-6">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-sm text-gray-600 uppercase leading-4">Active Batches</p>
                </div>
                <p className="text-green-400 text-2xl leading-none mb-0">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="overflow-auto shadow-xl">
    <div className="w-full  p-3 rounded-xl">
      <h6 className="mb-3 text-xl text-gray-800">Last payment</h6>
      <div>
        <div className="">
          <div className="flex justify-between flex-nowrap" style={{ whiteSpace: 'nowrap' }}>
            <div className="mx-2 flex flex-col gap-5">
              <span className="text-gray-500" >Order id</span>
              <span className="text-gray-900" >-</span>
            </div>
            <div className="mx-2 flex flex-col gap-5">
              <span className="text-gray-500" >Invoice</span>
              <span className="text-gray-900" >-</span>
            </div>
            <div className="mx-2 flex flex-col gap-5">
              <span className="text-gray-500" >Receipt</span>
              <span className="text-gray-900" >-</span>
            </div>
            <div className="mx-2 flex flex-col gap-5">
              <span className="text-gray-500" >Amount</span>
              <span className="text-gray-900" >-</span>
            </div>
            <div className="mx-2 flex flex-col gap-5">
              <span className="text-gray-500" >Id</span>
              <span className="text-gray-900" >-</span>
            </div>
            <div className="mx-2 flex flex-col gap-5">
              <span className="text-gray-500" >Name</span>
              <span className="text-gray-900" >-</span>
            </div>
            <div className="mx-2 flex flex-col gap-5">
              <span className="text-gray-500" >Type</span>
              <span className="text-gray-900" >-</span>
            </div>
            <div className="mx-2 flex flex-col gap-5">
              <span className="text-gray-500" >Date</span>
              <span className="text-gray-900" >-</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  


  <div className="">
  <h5 className="mb-4 self-start">Quick Actions</h5>
  <div className="card shadow mb-0 my-2">
  <a href="/office/batches/add-batch" className="card-body text-black cursor-pointer">
    <div className="">
      <div className="me-2 flex justify-between items-center">
        <p className="text-sm uppercase text-gray-600 mb-0">Host new Batch</p>
        <img src="/static/icon/arrow-right.svg" alt="add" />
      </div>
    </div>
  </a>
</div>

  <div className="card shadow mb-0 my-2">
    <a href="/office/teachers/add-teacher" className="card-body text-black cursor-pointer">
      <div className="">
        <div className="me-2 flex justify-between items-center">
          <p className="text-sm uppercase text-gray-600 mb-0">Add teacher</p>
          
        </div>
      </div>
    </a>
  </div>
  <div className="card shadow mb-0 my-2">
    <a href="add-student" className="card-body text-black cursor-pointer">
      <div className="">
        <div className="me-2 flex justify-between items-center">
          <p className="text-sm uppercase text-gray-600 mb-0">Add Student</p>
        </div>
      </div>
    </a>
  </div>
</div>


    
  </div>
  );
}

export default Home;
