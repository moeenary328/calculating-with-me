'use client';
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function InvoiceCreator() {
  const [isClient, setIsClient] = useState(false);
  const invoiceRef = useRef();

  const [invoice, setInvoice] = useState({
    number: 'INV-001',
    date: new Date().toLocaleDateString(),
    from: 'Your Business',
    to: 'Client Name',
    items: [{ desc: 'Service', qty: 1, rate: 1000 }],
    tax: 17
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateItem = (i, field, value) => {
    const newItems = [...invoice.items];
    newItems[i][field] = value;
    setInvoice({...invoice, items: newItems});
  };

  const addItem = () => {
    setInvoice({...invoice, items: [...invoice.items, {desc: '', qty: 1, rate: 0}]});
  };

  const total = invoice.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  const taxAmount = total * (invoice.tax / 100);
  const grandTotal = total + taxAmount;

  const downloadPdf = async () => {
    if (!invoiceRef.current) return;
    
    const canvas = await html2canvas(invoiceRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${invoice.number}.pdf`);
  };

  if (!isClient) {
    return null; // Prevent hydration mismatch
  }

  return (
    <>
      <Head>
        <title>Free PKR Invoice Generator | Create Professional Receipt</title>
        <meta name="description" content="Generate free professional invoices in PKR for your Pakistani business. Free online invoice creator with tax calculation." />
        <meta name="keywords" content="PKR invoice, receipt generator, Pakistan invoice, free invoice maker, tax invoice, free unlimeted" />
      </Head>

      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">PKR Invoice Generator</h1>
        
        <div className="flex gap-4 mb-6">
          <button 
            onClick={downloadPdf}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Download PDF
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <input 
              className="w-full p-2 border rounded"
              value={invoice.to}
              onChange={(e) => setInvoice({...invoice, to: e.target.value})}
              placeholder="Client Name"
            />
            
            {invoice.items.map((item, i) => (
              <div key={i} className="grid grid-cols-3 gap-2">
                <input
                  className="p-2 border rounded"
                  value={item.desc}
                  onChange={(e) => updateItem(i, 'desc', e.target.value)}
                  placeholder="Description"
                />
                <input
                  type="number"
                  className="p-2 border rounded"
                  value={item.qty}
                  onChange={(e) => updateItem(i, 'qty', +e.target.value)}
                />
                <input
                  type="number"
                  className="p-2 border rounded"
                  value={item.rate}
                  onChange={(e) => updateItem(i, 'rate', +e.target.value)}
                  placeholder="PKR"
                />
              </div>
            ))}
            
            <button 
              onClick={addItem}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Item
            </button>
          </div>

          <div className="bg-white p-6 shadow-lg" ref={invoiceRef}>
            <div className="flex justify-between mb-8">
              <h2 className="text-xl font-bold">{invoice.from}</h2>
              <div>
                <p className="font-bold">INVOICE #{invoice.number}</p>
                <p>Date: {invoice.date}</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="font-bold">Bill To:</p>
              <p>{invoice.to}</p>
            </div>

            <table className="w-full mb-6">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2">Qty</th>
                  <th className="text-right py-2">Rate (PKR)</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2">{item.desc || 'Item'}</td>
                    <td className="text-right py-2">{item.qty}</td>
                    <td className="text-right py-2">{item.rate.toFixed(2)}</td>
                    <td className="text-right py-2">{(item.qty * item.rate).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right space-y-2">
              <p>Subtotal: {total.toFixed(2)} PKR</p>
              <p>Tax ({invoice.tax}%): {taxAmount.toFixed(2)} PKR</p>
              <p className="font-bold text-lg">Total: {grandTotal.toFixed(2)} PKR</p>
            </div>
          </div>
        </div>

        {/* User Guide Section */}
        <div className="mt-12 space-y-8">
          <h2 className="text-xl font-bold">How to Use This Invoice Generator</h2>
          
          <article className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">1. Enter Client Information</h3>
            <p className="text-gray-700">
              Start by entering your client's name in the "Client Name" field at the top of the form. 
              This will automatically update in the invoice preview on the right side.
            </p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">2. Add Invoice Items</h3>
            <p className="text-gray-700">
              For each product or service, fill in the description, quantity, and rate in PKR. 
              You can add multiple items by clicking the "Add Item" button. 
              The invoice will automatically calculate subtotals and totals for all items.
            </p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">3. Download Your Invoice</h3>
            <p className="text-gray-700">
              Once your invoice looks correct in the preview, click the "Download PDF" button to 
              save a professional PDF version of your invoice. The PDF will be named with your 
              invoice number for easy reference.
            </p>
          </article>
        </div>
      </div>
    </>
  );
}