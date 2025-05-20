"use client";  
  
import { useState, useEffect } from "react";  
import { FaFileInvoiceDollar } from "react-icons/fa";  
  
export default function CreditNoteGenerator() {  
  const [creditNote, setCreditNote] = useState({  
    creditNoteNumber: "",  
    date: "",  
    customerName: "",  
    amount: "",  
    reason: "",  
  });  
  
  const [generated, setGenerated] = useState(false);  
  const [isMounted, setIsMounted] = useState(false); // To ensure client-side rendering  
  
  // Ensure the component is mounted before rendering  
  useEffect(() => {  
    setIsMounted(true);  
  }, []);  
  
  const handleChange = (e) => {  
    const { name, value } = e.target;  
    setCreditNote({ ...creditNote, [name]: value });  
  };  
  
  const handleGenerate = (e) => {  
    e.preventDefault();  
    setGenerated(true);  
  };  
  
  const handleReset = () => {  
    setCreditNote({  
      creditNoteNumber: "",  
      date: "",  
      customerName: "",  
      amount: "",  
      reason: "",  
    });  
    setGenerated(false);  
  };  
  
  // Prevent rendering on the server  
  if (!isMounted) {  
    return null;  
  }  
  
  return (  
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">  
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">  
        <div className="flex items-center mb-6">  
          <FaFileInvoiceDollar className="text-blue-500 text-3xl mr-3" />  
          <h1 className="text-2xl font-bold text-orange-400">  
            Credit Note Generator  
          </h1>  
        </div>  
        {!generated ? (  
          <form onSubmit={handleGenerate}>  
            <div className="mb-4">  
              <label  
                htmlFor="creditNoteNumber"  
                className="block text-gray-700 font-medium mb-2"  
              >  
                Credit Note Number  
              </label>  
              <input  
                type="text"  
                id="creditNoteNumber"  
                name="creditNoteNumber"  
                value={creditNote.creditNoteNumber}  
                onChange={handleChange}  
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"  
                required  
              />  
            </div>  
            <div className="mb-4">  
              <label  
                htmlFor="date"  
                className="block text-gray-700 font-medium mb-2"  
              >  
                Date  
              </label>  
              <input  
                type="date"  
                id="date"  
                name="date"  
                value={creditNote.date}  
                onChange={handleChange}  
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"  
                required  
              />  
            </div>  
            <div className="mb-4">  
              <label  
                htmlFor="customerName"  
                className="block text-gray-700 font-medium mb-2"  
              >  
                Customer Name  
              </label>  
              <input  
                type="text"  
                id="customerName"  
                name="customerName"  
                value={creditNote.customerName}  
                onChange={handleChange}  
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"  
                required  
              />  
            </div>  
            <div className="mb-4">  
              <label  
                htmlFor="amount"  
                className="block text-amber-700 font-medium mb-2"  
              >  
                Amount  
              </label>  
              <input  
                type="number"  
                id="amount"  
                name="amount"  
                value={creditNote.amount}  
                onChange={handleChange}  
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"  
                required  
              />  
            </div>  
            <div className="mb-4">  
              <label  
                htmlFor="reason"  
                className="block text-gray-700 font-medium mb-2"  
              >  
                Reason  
              </label>  
              <textarea  
                id="reason"  
                name="reason"  
                value={creditNote.reason}  
                onChange={handleChange}  
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"  
                required  
              />  
            </div>  
            <button  
              type="submit"  
              className="w-full bg-amber-950 text-white font-medium py-2 rounded-lg hover:bg-amber-400 hover:text-black transition"  
            >  
              Generate Credit Note  
            </button>  
          </form>  
        ) : (  
          <div>  
            <h2 className="text-xl font-bold text-gray-700 mb-4">  
              Credit Note Preview  
            </h2>  
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">  
              <p>  
                <span className="font-medium">Credit Note Number:</span>{" "}  
                {creditNote.creditNoteNumber}  
              </p>  
              <p>  
                <span className="font-medium">Date:</span> {creditNote.date}  
              </p>  
              <p>  
                <span className="font-medium">Customer Name:</span>{" "}  
                {creditNote.customerName}  
              </p>  
              <p>  
                <span className="font-medium">Amount:</span> ${creditNote.amount}  
              </p>  
              <p>  
                <span className="font-medium">Reason:</span> {creditNote.reason}  
              </p>  
            </div>  
            <button  
              onClick={handleReset}  
              className="mt-4 w-full bg-gray-500 text-white font-medium py-2 rounded-lg hover:bg-gray-600 transition"  
            >  
              Reset  
            </button>  
          </div>  
        )}  
      </div>  
     
      <br />
       
  <ul>  
    <li>  
      <strong><h1>How to Use a Credit Note Generator Tool</h1></strong>
      <h2>
        this tool is very small tool for all persons . this is free tool to generate Credit Note for free. unlimited free access in your life.
        <hr /><br />
         <strong className=" text-amber-700 items-center">
             fill this form: Credit Note Number
        </strong>
        <hr /><br />
         <strong className=" text-pink-600 text-center">
             fill this form: Date & Customer Name
        </strong>
        <hr /><br />
        <strong className=" text-emerald-700 text-center">
             fill this form: Amount & Reason
        </strong>
      </h2>
    </li>  
     
  </ul>  
    </div>  
  );  
}  