import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import useRazorpay from "react-razorpay";
import { useNavigate } from 'react-router-dom';
import { razorpaykeyId } from '../../../Constants/Constant';
import Cookies from "js-cookie";
import { message } from "antd";

import { getFeeDetailsAPI, feePaymentAPI,verifyPaymentAPI, getPaymentDetailsAPI } from '../../../Services/StudentService';



function Payment() {

  const batchId = useSelector(state => state.studentData.studentData[0]?.batch)
  const [feeDetails, setFeeDetails] = useState({ totalFee: "", pendingFee: "", installmentAmount: "" })
  const [selectedOption, setSelectedOption] = useState('One time settlement');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState([])
  const [feeClosed, setFeeClosed] = useState(false)

  const Razorpay = useRazorpay();
  const navigate = useNavigate()

  useEffect(() => {
    if(batchId !== undefined) {
      const headers = {
        headers: {
          Authorization: Cookies.get('studentToken')
        }
      }

      getFeeDetailsAPI(batchId, headers).then((response) => {
        if(response.status===200) {
          if(response.data.pendingFee<1){
            setFeeClosed(true)
          }    
          setFeeDetails(response.data)    
        }

      }).catch((error) => {
        console.log(error)
      })
    }
  },[batchId,isModalOpen])

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: Cookies.get('studentToken')
      }
    }

    getPaymentDetailsAPI(headers).then((response) => {
      setPaymentDetails(response.data.paymentDetails)
    })
  },[isModalOpen])

  const openModal = () => {
    setIsModalOpen(true);
}

const closeModal = () => {
    setIsModalOpen(false);
}

const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
};

const handlePayment = () =>{
  console.log('hi')
  let option
  if(selectedOption === 'One time settlement')
  option = "One time"
  else
  option = 'Installment'
    const headers = {
      headers: {
        Authorization: Cookies.get('studentToken')
      }
    }
  feePaymentAPI(batchId, {option}, headers).then((res) => {
    console.log(res.data.order.amount)
    const options = {
      key: razorpaykeyId,
      amount: res.data.order.amount,
      currency: "INR",
      name: "Educampus",
      description: "Test Transaction",
      image: "/images/logo.png",
      order_id: res.data.order.id,
      handler: function (response) {

          verifyPayment(response, res.data);
      },
      prefill: {
          name: "Educampus",
          email: "educampus33@gmail.com",
          contact: "9999999999",
      },
      notes: {
          address: "Razorpay Corporate Office",
      },
      theme: {
          color: "#28a745",
      },
  };
  const rzp1 = new Razorpay(options)

  rzp1.on('payment.failed', function () {
    message.error('Paymen failed')
    navigate('/student/payments')
  })
  rzp1.open()
  })
}

const verifyPayment = (payment, details) => {

  const headers = {
    headers: {
      Authorization: Cookies.get('studentToken')
    }
  }
  verifyPaymentAPI( {payment, details}, headers).then((response) => {
    if(response.status === 200) {
      message.success('Successfully completed Payment')
      setIsModalOpen(false)
    }
  }).catch(() => {
    message.error('Payment failed')
    setIsModalOpen(false)
  })

}


  return (
    <div>
      <div className='px-2'>


      <div className="flex justify-end">
      {feeClosed ? (
  <div className="container flex justify-center">
    <h3 className='text font-semibold text-2xl'>You successfully closed your entire course fee</h3>
  </div>
) : (
  <button
    onClick={openModal}
    className="btn bg-green-500 text-white me-3 mb-2 p-2 rounded-lg"
  >
    Complete your Payment
  </button>
)}
{isModalOpen && (
  <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ModalPayment">
    <div className="bg-white p-8 rounded-lg max-w-500 max-h-80vh overflow-auto relative break-words">
      <span className=" text-gray-500 absolute top-10 right-10 text-2xl font-bold cursor-pointer" onClick={closeModal}>&times;</span>
      <div className='container mt-4'>
        <div className='flex items-center justify-center  mb-4'>
          <p><strong>Fee payment</strong></p>
        </div>
        <div className='table-responsive'>

        <table className="table border-collapse ">
  <tbody>
    <tr>
      <th className='mr-8'>Choose an option</th>
      <td className="px-4 py-">
        <div >
          <label className="flex  space-x-2">
            <input
              type="radio"
              name="options"
              value="One time settlement"
              checked={selectedOption === "One time settlement"}
              onChange={handleOptionChange}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="text-gray-700 font-medium">
              One time settlement
            </span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="options"
              value="Installment"
              checked={selectedOption === "Installment"}
              onChange={handleOptionChange}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="text-gray-700 font-medium">
              Installment
            </span>
          </label>
        </div>
      </td>
    </tr>
    <tr>
      <th >Total course fee</th>
      <td className="px-4 py-2">₹ {feeDetails?.totalFee}</td>
    </tr>
    <tr>
      <th >Pending amount</th>
      <td className="px-4 py-2">₹ {feeDetails?.pendingFee}</td>
    </tr>
    <tr>
      <th>Amount to pay now</th>
      <td className="px-4 py-2 ">₹ {
        selectedOption === "One time settlement" ?
          feeDetails?.pendingFee :
          feeDetails?.installmentAmount
      }</td>
    </tr>
  </tbody>
</table>


          <div className='flex justify-center mt-4'>
            <button onClick={handlePayment} className='btn bg-green-500 text-white me-3 mb-2 p-2 rounded-lg'>Make payment</button>
          </div>

        </div>

      </div>
    </div>
  </div>
)}
        </div>


        <div className='flex flex-wrap justify-between items-center'>

<div className='w-full md:w-1/2 lg:w-5/12 px-4 py-6 border-2 border-gray-900 rounded-lg mt-12'>
  <div className='flex justify-center items-center mt-3'>
    <h5 className='underline font-semibold text-xl'>Payment history</h5>
  </div>
  <div className='mt-4'>
    {feeDetails.pendingFee > 1 && (
      <p className='font-bold'>
        Remaining amount to pay: ₹{feeDetails.pendingFee}
      </p>
    )}
  </div>
  <div className='mt-1 table-responsive'>
    {paymentDetails.length !== 0 ? (
      <table className='w-full table-auto'>
        <thead>
          <tr>
            <th className='border' >NO</th>
            <th className='border px-2 py-2'>Reference ID</th>
            <th className='border px-2 py-2'>Date</th>
            <th className='border px-2 py-2'>Amount</th>
            <th className='border px-2 py-2'>Status</th>
          </tr>
        </thead>
        <tbody>
          {paymentDetails.map((obj, index) => {
            const date = obj.createdAt;
            const paidDate = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const readableDate = paidDate.toLocaleDateString('en-US', options);
            return (
              <tr key={obj._id}>
                <td className='border' >{index + 1}</td>
                <td className='border px-2 py-2'>{obj._id}</td>
                <td className='border py-2'>{readableDate}</td>
                <td className='border px-2 py-2'>{obj.amount}</td>
                <td className='border px-2 py-2 text-green-600 font-bold'>
                  {obj.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : (
      <div className='mt-5 flex justify-center items-center'>
        <h3>You have no payment history</h3>
      </div>
    )}
  </div>
</div>

<div className='w-full md:w-1/2 lg:w-7/12 px-4 py-6 mt-12'>
  <div className='flex justify-center items-center mt-3  border-gray-900 rounded-lg'>
    <h5 className='underline font-semibold text-xl'>Fee structure</h5>
  </div>
  <div className='mt-4 px-16'>
    <p className=' text-lg.font-normal.leading-9'>
      Your entire course fee is {feeDetails.totalFee}. We offer two payment
      options for your fee. a one-time settlement or installment payments. If
      you choose to pay in installments, you will be required to make four
      payments in total. If you start with installment payments and later
      decide to switch to a one-time settlement, you will have the option to
      pay the remaining balance in full as a one-time payment.
    </p>
  </div>
</div>

</div>




      </div>
    </div>
  )
}

export default Payment