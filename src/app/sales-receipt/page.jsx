// app/sales-receipt-invoice/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { FaReceipt, FaDownload, FaPlus, FaTrash, FaInfoCircle, FaStore, FaUser, FaFileInvoiceDollar } from 'react-icons/fa';

export default function SalesReceiptInvoiceGenerator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [receipt, setReceipt] = useState({
    invoiceNumber: '',
    date: '',
    dueDate: '',
    paymentMethod: 'Cash',
    business: {
      name: '',
      address: '',
      phone: '',
      email: '',
      taxId: ''
    },
    customer: {
      name: '',
      address: '',
      phone: '',
      email: ''
    },
    items: [
      { id: 1, description: '', quantity: 1, unitPrice: 0, total: 0 }
    ],
    subtotal: 0,
    taxRate: 10,
    taxAmount: 0,
    discount: 0,
    shipping: 0,
    grandTotal: 0,
    notes: 'Payment due within 15 days. Thank you for your business!',
    terms: '1. Late payments are subject to 1.5% monthly interest.\n2. All sales are final.'
  });

  // Initialize component
  useEffect(() => {
    setIsMounted(true);
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 15);
    
    setReceipt(prev => ({
      ...prev,
      invoiceNumber: `INV-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`,
      date: today.toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0]
    }));

    return () => setIsMounted(false);
  }, []);

  // SEO Configuration
  useEffect(() => {
    if (!isMounted) return;

    document.title = "Professional Sales Receipt Invoice Generator | Create & Download";
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.name = "description";
    metaDesc.content = "Generate professional sales receipt invoices with automatic calculations. Free online tool with tax, discount, and shipping options. Download as PDF.";
    document.head.appendChild(metaDesc);

    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.rel = "canonical";
    canonical.href = window.location.href;
    document.head.appendChild(canonical);

    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Sales Receipt Invoice Generator free",
      "description": "Create free professional sales receipt invoices with automatic tax and discount calculations",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(canonical);
      if (metaDesc.parentNode) document.head.removeChild(metaDesc);
    };
  }, [isMounted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setReceipt(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      const numericValue = ['taxRate', 'discount', 'shipping'].includes(name) 
        ? parseFloat(value) || 0 
        : value;
      
      setReceipt(prev => {
        const subtotal = prev.items.reduce((sum, item) => sum + (item.total || 0), 0);
        const taxAmount = subtotal * (numericValue / 100);
        const grandTotal = subtotal + taxAmount - (prev.discount || 0) + (prev.shipping || 0);
        
        return {
          ...prev,
          [name]: numericValue,
          subtotal,
          taxAmount: name === 'taxRate' ? taxAmount : prev.taxAmount,
          grandTotal: ['taxRate', 'discount', 'shipping'].includes(name) ? grandTotal : prev.grandTotal
        };
      });
    }
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...receipt.items];
    
    newItems[index] = { 
      ...newItems[index], 
      [name]: name === 'description' ? value : parseFloat(value) || 0
    };

    if (name === 'quantity' || name === 'unitPrice') {
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    }

    const subtotal = newItems.reduce((sum, item) => sum + (item.total || 0), 0);
    const taxAmount = subtotal * (receipt.taxRate / 100);
    const grandTotal = subtotal + taxAmount - (receipt.discount || 0) + (receipt.shipping || 0);

    setReceipt(prev => ({
      ...prev,
      items: newItems,
      subtotal,
      taxAmount,
      grandTotal
    }));
  };

  const addItem = () => {
    setReceipt(prev => ({
      ...prev,
      items: [...prev.items, { 
        id: prev.items.length + 1, 
        description: '', 
        quantity: 1, 
        unitPrice: 0, 
        total: 0 
      }]
    }));
  };

  const removeItem = (index) => {
    const newItems = receipt.items.filter((_, i) => i !== index);
    const subtotal = newItems.reduce((sum, item) => sum + (item.total || 0), 0);
    const taxAmount = subtotal * (receipt.taxRate / 100);
    const grandTotal = subtotal + taxAmount - (receipt.discount || 0) + (receipt.shipping || 0);
    
    setReceipt(prev => ({
      ...prev,
      items: newItems,
      subtotal,
      taxAmount,
      grandTotal
    }));
  };

  const generatePdf = async () => {
    if (!isMounted || isGenerating) return;
    setIsGenerating(true);

    try {
      // Validate required fields
      if (!receipt.business.name || !receipt.customer.name || receipt.items.some(item => !item.description)) {
        alert('Please fill in all required fields (Business Name, Customer Name, and all Item Descriptions)');
        return;
      }

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 840]); // Slightly taller page for invoice
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Header
      page.drawText('SALES RECEIPT INVOICE', {
        x: 50,
        y: 800,
        size: 20,
        font: boldFont,
        color: rgb(0.2, 0.4, 0.6)
      });

      // Business Info (Left)
      page.drawText(receipt.business.name, { x: 50, y: 770, size: 12, font: boldFont });
      page.drawText(receipt.business.address, { x: 50, y: 750, size: 10, font: regularFont });
      if (receipt.business.phone) {
        page.drawText(`Phone: ${receipt.business.phone}`, { x: 50, y: 730, size: 10, font: regularFont });
      }
      if (receipt.business.email) {
        page.drawText(`Email: ${receipt.business.email}`, { x: 50, y: 710, size: 10, font: regularFont });
      }
      if (receipt.business.taxId) {
        page.drawText(`Tax ID: ${receipt.business.taxId}`, { x: 50, y: 690, size: 10, font: regularFont });
      }

      // Invoice Details (Right)
      page.drawText(`Invoice #: ${receipt.invoiceNumber}`, { x: 400, y: 770, size: 10, font: regularFont });
      page.drawText(`Date: ${receipt.date}`, { x: 400, y: 750, size: 10, font: regularFont });
      page.drawText(`Due Date: ${receipt.dueDate}`, { x: 400, y: 730, size: 10, font: regularFont });
      page.drawText(`Payment Method: ${receipt.paymentMethod}`, { x: 400, y: 710, size: 10, font: regularFont });

      // Customer Info
      page.drawText('BILL TO:', { x: 50, y: 660, size: 12, font: boldFont });
      page.drawText(receipt.customer.name, { x: 50, y: 640, size: 10, font: regularFont });
      if (receipt.customer.address) {
        page.drawText(receipt.customer.address, { x: 50, y: 620, size: 10, font: regularFont });
      }
      if (receipt.customer.phone) {
        page.drawText(`Phone: ${receipt.customer.phone}`, { x: 50, y: 600, size: 10, font: regularFont });
      }
      if (receipt.customer.email) {
        page.drawText(`Email: ${receipt.customer.email}`, { x: 50, y: 580, size: 10, font: regularFont });
      }

      // Items Table Header
      page.drawLine({
        start: { x: 50, y: 560 },
        end: { x: 550, y: 560 },
        thickness: 1,
        color: rgb(0, 0, 0),
      });

      page.drawText('Description', { x: 50, y: 545, size: 10, font: boldFont });
      page.drawText('Qty', { x: 350, y: 545, size: 10, font: boldFont });
      page.drawText('Unit Price', { x: 400, y: 545, size: 10, font: boldFont });
      page.drawText('Total', { x: 500, y: 545, size: 10, font: boldFont });

      // Items
      let yPos = 530;
      receipt.items.forEach(item => {
        page.drawText(item.description, { x: 50, y: yPos, size: 9, font: regularFont });
        page.drawText(item.quantity.toString(), { x: 350, y: yPos, size: 9, font: regularFont });
        page.drawText(`$${item.unitPrice.toFixed(2)}`, { x: 400, y: yPos, size: 9, font: regularFont });
        page.drawText(`$${item.total.toFixed(2)}`, { x: 500, y: yPos, size: 9, font: regularFont });
        yPos -= 15;
      });

      // Totals
      page.drawLine({
        start: { x: 50, y: yPos - 10 },
        end: { x: 550, y: yPos - 10 },
        thickness: 1,
        color: rgb(0, 0, 0),
      });

      yPos -= 30;

      page.drawText(`Subtotal:`, { x: 400, y: yPos, size: 10, font: regularFont });
      page.drawText(`$${receipt.subtotal.toFixed(2)}`, { x: 500, y: yPos, size: 10, font: regularFont });
      yPos -= 15;

      if (receipt.taxRate > 0) {
        page.drawText(`Tax (${receipt.taxRate}%):`, { x: 400, y: yPos, size: 10, font: regularFont });
        page.drawText(`$${receipt.taxAmount.toFixed(2)}`, { x: 500, y: yPos, size: 10, font: regularFont });
        yPos -= 15;
      }

      if (receipt.discount > 0) {
        page.drawText(`Discount:`, { x: 400, y: yPos, size: 10, font: regularFont });
        page.drawText(`-$${receipt.discount.toFixed(2)}`, { x: 500, y: yPos, size: 10, font: regularFont });
        yPos -= 15;
      }

      if (receipt.shipping > 0) {
        page.drawText(`Shipping:`, { x: 400, y: yPos, size: 10, font: regularFont });
        page.drawText(`$${receipt.shipping.toFixed(2)}`, { x: 500, y: yPos, size: 10, font: regularFont });
        yPos -= 15;
      }

      page.drawText(`Total Due:`, { x: 400, y: yPos - 5, size: 12, font: boldFont });
      page.drawText(`$${receipt.grandTotal.toFixed(2)}`, { x: 500, y: yPos - 5, size: 12, font: boldFont });

      // Notes & Terms
      if (receipt.notes) {
        page.drawText('Notes:', { x: 50, y: yPos - 40, size: 10, font: boldFont });
        page.drawText(receipt.notes, { 
          x: 50, 
          y: yPos - 55, 
          size: 9, 
          font: regularFont,
          maxWidth: 500,
          lineHeight: 12
        });
      }

      if (receipt.terms) {
        page.drawText('Terms & Conditions:', { x: 50, y: yPos - 100, size: 10, font: boldFont });
        page.drawText(receipt.terms, { 
          x: 50, 
          y: yPos - 115, 
          size: 9, 
          font: regularFont,
          maxWidth: 500,
          lineHeight: 12
        });
      }

      // Footer
      page.drawText('Thank you for your business!', { 
        x: 200, 
        y: 50, 
        size: 12, 
        font: boldFont,
        color: rgb(0.2, 0.4, 0.6)
      });

      // Download PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sales_receipt_${receipt.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);

    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again or check your inputs.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
          <div className="h-96 bg-gray-200 rounded mb-8"></div>
        </div>
      </div>
    );
  }

  const isFormValid = receipt.business.name && receipt.customer.name && 
                     receipt.items.every(item => item.description) &&
                     !isGenerating;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center mb-8 bg-blue-50 p-6 rounded-lg">
        <FaFileInvoiceDollar className="text-4xl text-blue-600 mr-4" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Sales Receipt Invoice Generator</h1>
          <p className="text-gray-600">Create professional sales receipt invoices with automatic calculations</p>
        </div>
      </div>

      {/* How to Use */}
      <div className="bg-white rounded-xl shadow-lg mb-12">
        <div className="bg-blue-600 text-white p-4 rounded-t-xl">
          <h2 className="text-xl font-bold flex items-center">
            <FaInfoCircle className="mr-2" /> How to Create a Sales Receipt Invoice
          </h2>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <FaStore className="text-2xl text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">1. Enter Business Info</h3>
                <p className="text-sm text-gray-600">Add your business details and tax information</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaUser className="text-2xl text-green-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">2. Add Customer Info</h3>
                <p className="text-sm text-gray-600">Enter customer details and billing information</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaReceipt className="text-2xl text-purple-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">3. List Items & Download</h3>
                <p className="text-sm text-gray-600">Add products/services, set taxes, and download PDF</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Form */}
      <div className="bg-white rounded-xl shadow-lg mb-12">
        <div className="bg-blue-600 text-white p-4 rounded-t-xl">
          <h2 className="text-xl font-bold flex items-center">
            <FaFileInvoiceDollar className="mr-2" /> Invoice Details
          </h2>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Business Info */}
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-bold text-lg mb-4 text-blue-600">Your Business *</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Business Name *</label>
                  <input
                    type="text"
                    name="business.name"
                    value={receipt.business.name}
                    onChange={handleChange}
                    placeholder="Your Business Name"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Business Address</label>
                  <input
                    type="text"
                    name="business.address"
                    value={receipt.business.address}
                    onChange={handleChange}
                    placeholder="123 Business St, City"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="text"
                      name="business.phone"
                      value={receipt.business.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="business.email"
                      value={receipt.business.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tax ID</label>
                  <input
                    type="text"
                    name="business.taxId"
                    value={receipt.business.taxId}
                    onChange={handleChange}
                    placeholder="Tax Identification Number"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
            
            {/* Customer Info */}
            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-bold text-lg mb-4 text-green-600">Customer *</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Customer Name *</label>
                  <input
                    type="text"
                    name="customer.name"
                    value={receipt.customer.name}
                    onChange={handleChange}
                    placeholder="Customer Name"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Customer Address</label>
                  <input
                    type="text"
                    name="customer.address"
                    value={receipt.customer.address}
                    onChange={handleChange}
                    placeholder="456 Customer Ave, Town"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="text"
                      name="customer.phone"
                      value={receipt.customer.phone}
                      onChange={handleChange}
                      placeholder="Customer Phone"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="customer.email"
                      value={receipt.customer.email}
                      onChange={handleChange}
                      placeholder="Customer Email"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-1">Invoice # *</label>
              <input
                type="text"
                name="invoiceNumber"
                value={receipt.invoiceNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-50"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date *</label>
              <input
                type="date"
                name="date"
                value={receipt.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due Date *</label>
              <input
                type="date"
                name="dueDate"
                value={receipt.dueDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment Method *</label>
              <select
                name="paymentMethod"
                value={receipt.paymentMethod}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Check">Check</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Items Section */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4 text-blue-600">Items Sold *</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border">Description *</th>
                    <th className="p-3 text-left border">Quantity</th>
                    <th className="p-3 text-left border">Unit Price ($)</th>
                    <th className="p-3 text-left border">Total ($)</th>
                    <th className="p-3 text-left border"></th>
                  </tr>
                </thead>
                <tbody>
                  {receipt.items.map((item, index) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 border">
                        <input
                          type="text"
                          name="description"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full p-2 border rounded"
                          required
                        />
                      </td>
                      <td className="p-3 border">
                        <input
                          type="number"
                          name="quantity"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full p-2 border rounded"
                          min="1"
                          required
                        />
                      </td>
                      <td className="p-3 border">
                        <input
                          type="number"
                          name="unitPrice"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full p-2 border rounded"
                          min="0"
                          step="0.01"
                          required
                        />
                      </td>
                      <td className="p-3 border">
                        <div className="p-2 font-medium">${item.total.toFixed(2)}</div>
                      </td>
                      <td className="p-3 border">
                        {receipt.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700 p-2"
                            title="Remove item"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={addItem}
              className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center"
            >
              <FaPlus className="mr-2" /> Add Item
            </button>
          </div>

          {/* Totals Section */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={receipt.notes}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="2"
                  placeholder="Payment instructions or thank you message"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Terms & Conditions</label>
                <textarea
                  name="terms"
                  value={receipt.terms}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                  placeholder="Payment terms, return policy, etc."
                />
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span className="font-medium">${receipt.subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span>Tax Rate:</span>
                <div className="flex items-center">
                  <input
                    type="number"
                    name="taxRate"
                    value={receipt.taxRate}
                    onChange={handleChange}
                    className="w-16 p-1 border rounded"
                    min="0"
                    step="0.1"
                  />
                  <span className="ml-1">%</span>
                </div>
              </div>

              {receipt.taxRate > 0 && (
                <div className="flex justify-between mb-2">
                  <span>Tax Amount:</span>
                  <span className="font-medium">${receipt.taxAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between mb-2">
                <span>Discount:</span>
                <input
                  type="number"
                  name="discount"
                  value={receipt.discount}
                  onChange={handleChange}
                  className="w-24 p-1 border rounded"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <input
                  type="number"
                  name="shipping"
                  value={receipt.shipping}
                  onChange={handleChange}
                  className="w-24 p-1 border rounded"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total Due:</span>
                <span className="text-green-600">${receipt.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-end">
            <button
              onClick={generatePdf}
              disabled={!isFormValid}
              className={`px-6 py-3 rounded-lg flex items-center ${isFormValid ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              {isGenerating ? (
                'Generating Invoice...'
              ) : (
                <>
                  <FaDownload className="mr-2" /> Download Sales Receipt Invoice
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <article className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaInfoCircle className="mr-2 text-blue-500" /> Why Sales Receipt Invoices Matter
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Legal documentation for sales transactions</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Essential for accounting and tax compliance</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Professional appearance builds customer trust</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Clear record for returns and warranty claims</span>
            </li>
          </ul>
        </article>

        <article className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaFileInvoiceDollar className="mr-2 text-green-500" /> What to Include in a Sales Receipt Invoice
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Complete business and customer information</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Detailed list of items with prices and quantities</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Clear payment terms and due date</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Tax calculations and any applicable discounts</span>
            </li>
          </ul>
        </article>
      </div>

      {/* SEO Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Free Online Sales Receipt Invoice Generator | Create Professional Invoices for Your Business</p>
        <p className="mt-2">© {new Date().getFullYear()} Sales Receipt Invoice Generator. All rights reserved.</p>
      </footer>
    </div>
  );
}