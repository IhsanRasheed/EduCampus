import React,{useState, useEffect} from 'react'
import BaseTable from "../../Common/BaseTable";
import { paymentDataAPI } from '../../../Services/OfficeService';


function Payment() {

  let count =1;
    const [paymentData, setPaymentData] = useState([])
    console.log(paymentData)
    useEffect(() => {
      const headers = {
          headers: {
              Authorization: localStorage.getItem("officeToken")
          }
      }
      paymentDataAPI(headers).then((response) => {
          if (response.status === 200) {
              setPaymentData(response.data.paymentData)
          }
      }).catch((err) => {
          console.log(err)
      })
  },[])

  const columns = [
    {
      name: "Id",
      selector: (row) => row.registerId,
      sortable:true
   },
   {
    name: "Name",
    selector: (row) => row.name,
},
{
  name: "Batch",
  selector: (row) => row.batch,
},
{
  name: "Reference ID",
  selector: (row) => row._id,
},
{
  name: "Amount",
  selector: (row) => row.amount,
},
{
  name: "Date",
  selector: (row) => {
    const dateString = row.createdAt;
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
   
},
{
  name: "Type",
  selector: (row) => row.type,
},
{
  name: "Status",
  selector: (row) => row.status,
},
  ]

  return (

   
          <BaseTable
      columns={columns}
      data={paymentData}
      title={<h1 className="font-semibold text-4xl">Payments   </h1>}
      
  />

  )
}

export default Payment