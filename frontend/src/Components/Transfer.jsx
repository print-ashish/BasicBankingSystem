import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './Transfer.css';
import { useNavigate } from "react-router-dom";


function TransferPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  
  const [customer, setcustomer] = useState();
  const [receivername, setreceivername] = useState();
  const [receiveracno, setreceiveracno] = useState();
  const [amount, setamount] = useState();
  const [senderid, setsenderid] = useState(0);
 

  const transfermoney = ()=>
  {
    console.log("transferring money from ", senderid);

    axios
        .post("/transfermoney", { senderacno: senderid , receivername , receiveracno ,amount}) // Put the request body inside the parentheses
        .then((response) => {
          
             // Assuming your API returns an array of customers
            console.log(response)
             if(response.data.errormsg)
            {
              alert(response.data.errormsg)
              return
            }
            else{
            //  console.log(response.data[0].username)
            navigate("/customers")
             alert("money transferred successfully")
            }


        })
        .catch((error) => {
          // alert("Enter valid account number")
          console.error("Error fetching customer data:", error);
        });
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    var id = searchParams.get("id");
    setsenderid(id)

    if (id) {
      // Do something with the id (e.g., store it in state or use it in your component)
      console.log("ID from query string:", id);

      axios
        .post("/findcustomer", { accountno: id }) // Put the request body inside the parentheses
        .then((response) => {
            setcustomer(response.data); // Assuming your API returns an array of customers
            console.log(customer[0].username)
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
        });
    }
  }, [location]);

  if(!customer)
  {
    return null
  }
  return (
    <>


    <div className="transfer">


  
    <div className="customerdetails">
        <h1>{customer[0].username}</h1>
        <h3>Current Balance : ${customer[0].balance}</h3>
    </div>
    <div className="transfercard">
    <h3>Transfer to:</h3>
        <input type="text" placeholder="Name"  onChange={(e)=>{setreceivername(e.target.value)}}/>
        <input type="text" placeholder="Account number" onChange={(e)=>{setreceiveracno(e.target.value)}} />
        <input type="text" placeholder="Enter amount"  onChange={(e)=>{setamount(e.target.value)}} />
    </div>
    <div className="tranferbtn">
        <button onClick={()=>
        {
          transfermoney()
        }}>Transfer</button>
    </div>

    </div>
    </>
  )
}

export default TransferPage;
