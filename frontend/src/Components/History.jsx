
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Customer.css'

export default function Customer() {
  const [history, sethistory] = useState([]);

  useEffect(() => {
    axios.get('/showhistory')
      .then((response) => {
        sethistory(response.data); // Assuming your API returns an array of customers
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
          <th>Sender</th>
          <th>Amount</th>
          <th>Date Time</th>
          <th>Receiver</th>
         
        </tr>
      </thead>
      <tbody>
        {history.map((item, index) => (
          <tr className="table-row" key={index}>
            <td>{item.sender}</td>
            <td>{item.amount}</td>
            <td>{item.datetime}</td>
            <td>{item.receiver} </td>
            
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}
