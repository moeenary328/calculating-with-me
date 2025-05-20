'use client';

import { useState, useEffect } from 'react';
import { FaPlusCircle, FaTrashAlt, FaDownload } from 'react-icons/fa';

export default function CreditMemoPage() {
  const [customerName, setCustomerName] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [items, setItems] = useState([{ description: '', qty: 1, price: 0 }]);
  const [total, setTotal] = useState(0);

  // Set date on client only
  useEffect(() => {
    setDate(new Date().toISOString().split('T')[0]);
  }, []);

  // Recalculate total
  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.qty * item.price, 0));
  }, [items]);

  const handleItemChange = (i, field, v) => {
    const updated = [...items];
    updated[i][field] = field === 'description' ? v : Number(v) || 0;
    setItems(updated);
  };

  const addItem = () =>
    setItems([...items, { description: '', qty: 1, price: 0 }]);
  const removeItem = (i) =>
    items.length > 1 && setItems(items.filter((_, idx) => idx !== i));

  const downloadMemo = () => {
    let txt = `CREDIT MEMO\n\nCustomer: ${customerName}\nInvoice: ${invoiceNo}\nDate: ${date}\nReason: ${reason}\n\nItems:\n`;
    txt += items
      .map(
        (it, i) =>
          `${i + 1}. ${it.description} – Qty: ${it.qty}, Price: $${it.price.toFixed(
            2
          )}`
      )
      .join('\n');
    txt += `\n\nTotal: $${total.toFixed(2)}`;

    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'credit-memo.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow rounded">
        <h1 className="text-2xl font-bold text-center mb-6">Credit Memo Generator</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            suppressHydrationWarning
            className="border p-2 rounded"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <input
            suppressHydrationWarning
            className="border p-2 rounded"
            placeholder="Invoice Number"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
          />
          <input
            suppressHydrationWarning
            type="date"
            className="border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            suppressHydrationWarning
            className="border p-2 rounded"
            placeholder="Reason for Credit"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <h2 className="text-xl font-semibold mb-2">Items</h2>
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center mb-3">
            <input
              suppressHydrationWarning
              className="flex-1 border p-2 rounded"
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                handleItemChange(i, 'description', e.target.value)
              }
            />
            <input
              suppressHydrationWarning
              type="number"
              className="w-20 border p-2 rounded text-center"
              value={item.qty}
              onChange={(e) => handleItemChange(i, 'qty', e.target.value)}
            />
            <input
              suppressHydrationWarning
              type="number"
              step="0.01"
              className="w-24 border p-2 rounded text-center"
              value={item.price}
              onChange={(e) => handleItemChange(i, 'price', e.target.value)}
            />
            <button
              suppressHydrationWarning
              onClick={() => removeItem(i)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}

        <button
          suppressHydrationWarning
          onClick={addItem}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <FaPlusCircle className="mr-2" /> Add Item
        </button>

        <div className="text-right font-bold text-lg mb-6">
          Total: <span>${total.toFixed(2)}</span>
        </div>

        <button
          suppressHydrationWarning
          onClick={downloadMemo}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded flex items-center justify-center gap-2"
        >
          <FaDownload /> Download Credit Memo
        </button>
      </div>
      <article className="mt-10 prose prose-indigo">
  <h2>How to Use the Credit Memo Generator</h2>
  <ol>
    <li>
      <strong>Fill in Customer Details:</strong>  
      Enter the customer’s name in “Customer Name,” the original invoice number in “Invoice Number,”  
      select the date of issue, and type a brief “Reason for Credit” (e.g. “Returned goods,” “Billing error”).
    </li>
    <li>
      <strong>Add Your Line Items:</strong>  
      For each product or service, enter a short description, the quantity being credited,  
      and the unit price. Click “Add Item” to include additional lines, or the trash icon to remove one.
    </li>
    <li>
      <strong>Verify the Total:</strong>  
      As you update items, the “Total” field recalculates automatically.  
      Double-check this amount before downloading.
    </li>
    <li>
      <strong>Download Your Memo:</strong>  
      Click “Download Credit Memo” to save a plain-text (or PDF, if configured) file of your memo.  
      You can print it or attach it to an email.
    </li>
    <li>
      <strong>Keep Records:</strong>  
      File the saved memo in your accounting system and send a copy to your customer  
      so their accounts reflect the adjustment.
    </li>
  </ol>
</article>
    </main>
  );
}
