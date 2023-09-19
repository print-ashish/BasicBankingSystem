
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Customer.css'

export default function Customer() {
  const [customerslist, setCustomersList] = useState([]);

  useEffect(() => {
    axios.get('/showcustomers')
      .then((response) => {
        setCustomersList(response.data); // Assuming your API returns an array of customers
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });
  }, []);
  return (
  <div>
    <table>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Email</th>
          <th>Balance</th>
          <th>Account Number</th>
          <th>Show Details</th>
         
        </tr>
      </thead>
      <tbody>
        {customerslist.map((customer, index) => (
          <tr className="table-row" key={index}>
            <td>{customer.username}</td>
            <td>@{customer.email}</td>
            <td>{customer.balance}</td>
            <td>{customer.accountno} </td>
            <td> <Link to={`/Transfer?id=${customer.accountno}`}><button id='viewcust'>View</button></Link></td>
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}
