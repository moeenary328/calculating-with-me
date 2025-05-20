// app/proforma-invoice/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { FaFileInvoice, FaDownload, FaPlus, FaTrash, FaGlobe, FaHandshake, FaShippingFast, FaBoxes, FaMoneyBillWave } from 'react-icons/fa';

export default function ProformaInvoiceGenerator() {
  const [isMounted, setIsMounted] = useState(false);
  const [invoice, setInvoice] = useState(() => ({
    number: '',
    date: '',
    seller: {
      name: '',
      address: '',
      email: '',
      phone: '',
      taxId: ''
    },
    buyer: {
      name: '',
      address: '',
      email: '',
      phone: ''
    },
    items: [
      { description: '', quantity: 1, unit: 'pcs', unitPrice: 0, amount: 0 }
    ],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    paymentTerms: '50% advance, 50% before shipment',
    deliveryTerms: 'FOB Shipping Point',
    validity: '30 days',
    notes: 'This is a proforma invoice and not a demand for payment'
  }));

  // Initialize after component mounts
  useEffect(() => {
    setIsMounted(true);
    const today = new Date();
    setInvoice(prev => ({
      ...prev,
      number: `PRO-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`,
      date: today.toISOString().split('T')[0]
    }));
  }, []);

  // Set SEO metadata after mount
  useEffect(() => {
    if (!isMounted) return;
    
    const metaDescription = "Generate professional proforma invoices for international trade. Free online tool for exporters and importers to create preliminary commercial invoices.";
    
    document.title = "Free Proforma Invoice Generator | Create Free Export Documents";
    
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = "description";
      document.head.appendChild(metaTag);
    }
    metaTag.content = metaDescription;

    // Cleanup function
    return () => {
      if (metaTag && document.head.contains(metaTag)) {
        document.head.removeChild(metaTag);
      }
    };
  }, [isMounted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setInvoice(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setInvoice(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...invoice.items];
    newItems[index] = { 
      ...newItems[index], 
      [name]: name === 'description' || name === 'unit' ? value : Number(value)
    };
    
    if (name === 'quantity' || name === 'unitPrice') {
      newItems[index].amount = newItems[index].quantity * newItems[index].unitPrice;
    }
    
    const subtotal = newItems.reduce((sum, item) => sum + item.amount, 0);
    const total = subtotal + invoice.shipping + invoice.tax;
    
    setInvoice(prev => ({
      ...prev,
      items: newItems,
      subtotal,
      total
    }));
  };

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { description: '', quantity: 1, unit: 'pcs', unitPrice: 0, amount: 0 }
      ]
    }));
  };

  const removeItem = (index) => {
    const newItems = invoice.items.filter((_, i) => i !== index);
    const subtotal = newItems.reduce((sum, item) => sum + item.amount, 0);
    const total = subtotal + invoice.shipping + invoice.tax;
    
    setInvoice(prev => ({
      ...prev,
      items: newItems,
      subtotal,
      total
    }));
  };

  const generatePdf = async () => {
    if (!isMounted) return;
    
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);
      
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      // Header
      page.drawText('PROFORMA INVOICE', {
        x: 50,
        y: 750,
        size: 24,
        font: boldFont,
        color: rgb(0.1, 0.3, 0.5)
      });
      
      // Seller info
      page.drawText('Seller:', {
        x: 50,
        y: 700,
        size: 12,
        font: boldFont
      });
      
      page.drawText(invoice.seller.name, {
        x: 50,
        y: 680,
        size: 10,
        font
      });
      
      // Invoice details
      page.drawText(`Proforma Invoice No: ${invoice.number}`, {
        x: 350,
        y: 700,
        size: 10,
        font
      });
      
      page.drawText(`Date: ${invoice.date}`, {
        x: 350,
        y: 680,
        size: 10,
        font
      });
      
      // Buyer info
      page.drawText('Buyer:', {
        x: 50,
        y: 640,
        size: 12,
        font: boldFont
      });
      
      page.drawText(invoice.buyer.name, {
        x: 50,
        y: 620,
        size: 10,
        font
      });
      
      // Terms
      page.drawText(`Payment Terms: ${invoice.paymentTerms}`, {
        x: 50,
        y: 580,
        size: 10,
        font
      });
      
      page.drawText(`Delivery Terms: ${invoice.deliveryTerms}`, {
        x: 50,
        y: 560,
        size: 10,
        font
      });
      
      page.drawText(`Validity: ${invoice.validity}`, {
        x: 50,
        y: 540,
        size: 10,
        font
      });
      
      // Items table
      page.drawText('Description', {
        x: 50,
        y: 500,
        size: 12,
        font: boldFont
      });
      
      page.drawText('Qty', {
        x: 300,
        y: 500,
        size: 12,
        font: boldFont
      });
      
      page.drawText('Unit', {
        x: 350,
        y: 500,
        size: 12,
        font: boldFont
      });
      
      page.drawText('Unit Price', {
        x: 400,
        y: 500,
        size: 12,
        font: boldFont
      });
      
      page.drawText('Amount', {
        x: 500,
        y: 500,
        size: 12,
        font: boldFont
      });
      
      let yPos = 480;
      invoice.items.forEach(item => {
        page.drawText(item.description, {
          x: 50,
          y: yPos,
          size: 10,
          font
        });
        
        page.drawText(item.quantity.toString(), {
          x: 300,
          y: yPos,
          size: 10,
          font
        });
        
        page.drawText(item.unit, {
          x: 350,
          y: yPos,
          size: 10,
          font
        });
        
        page.drawText(`$${item.unitPrice.toFixed(2)}`, {
          x: 400,
          y: yPos,
          size: 10,
          font
        });
        
        page.drawText(`$${item.amount.toFixed(2)}`, {
          x: 500,
          y: yPos,
          size: 10,
          font
        });
        
        yPos -= 20;
      });
      
      // Totals
      page.drawText(`Subtotal: $${invoice.subtotal.toFixed(2)}`, {
        x: 400,
        y: yPos - 40,
        size: 12,
        font
      });
      
      page.drawText(`Shipping: $${invoice.shipping.toFixed(2)}`, {
        x: 400,
        y: yPos - 60,
        size: 12,
        font
      });
      
      page.drawText(`Tax: $${invoice.tax.toFixed(2)}`, {
        x: 400,
        y: yPos - 80,
        size: 12,
        font
      });
      
      page.drawText(`Total: $${invoice.total.toFixed(2)}`, {
        x: 400,
        y: yPos - 100,
        size: 14,
        font: boldFont,
        color: rgb(0.2, 0.5, 0.2)
      });
      
      // Notes
      page.drawText(`Notes: ${invoice.notes}`, {
        x: 50,
        y: yPos - 140,
        size: 10,
        font
      });
      
      // Download PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `proforma_invoice_${invoice.number}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
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

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <FaFileInvoice className="text-4xl text-blue-600 mr-4" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Proforma Invoice Generator</h1>
          <p className="text-gray-600">Create preliminary invoices for international trade</p>
        </div>
      </div>

      {/* Invoice Form */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
        <div className="bg-blue-600 text-white p-4">
          <h2 className="text-xl font-bold flex items-center">
            <FaFileInvoice className="mr-2" /> Proforma Invoice Details
          </h2>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Seller Info */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-4 text-blue-600 flex items-center">
                <FaHandshake className="mr-2" /> Seller (Exporter)
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company Name</label>
                  <input
                    type="text"
                    name="seller.name"
                    value={invoice.seller.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tax ID/VAT</label>
                  <input
                    type="text"
                    name="seller.taxId"
                    value={invoice.seller.taxId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
            
            {/* Buyer Info */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-4 text-blue-600 flex items-center">
                <FaGlobe className="mr-2" /> Buyer (Importer)
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company Name</label>
                  <input
                    type="text"
                    name="buyer.name"
                    value={invoice.buyer.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <input
                    type="text"
                    name="buyer.address"
                    value={invoice.buyer.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Invoice Meta */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-1">Proforma Invoice #</label>
              <input
                type="text"
                name="number"
                value={invoice.number}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={invoice.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Validity Period</label>
              <input
                type="text"
                name="validity"
                value={invoice.validity}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          
          {/* Terms */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-1">Payment Terms</label>
              <input
                type="text"
                name="paymentTerms"
                value={invoice.paymentTerms}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Delivery Terms</label>
              <input
                type="text"
                name="deliveryTerms"
                value={invoice.deliveryTerms}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          
          {/* Items Table */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4 text-blue-600 flex items-center">
              <FaBoxes className="mr-2" /> Items
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border">Description</th>
                    <th className="p-3 text-left border">Qty</th>
                    <th className="p-3 text-left border">Unit</th>
                    <th className="p-3 text-left border">Unit Price ($)</th>
                    <th className="p-3 text-left border">Amount ($)</th>
                    <th className="p-3 text-left border"></th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
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
                        <select
                          name="unit"
                          value={item.unit}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full p-2 border rounded"
                        >
                          <option value="pcs">pcs</option>
                          <option value="kg">kg</option>
                          <option value="g">g</option>
                          <option value="l">l</option>
                          <option value="m">m</option>
                          <option value="set">set</option>
                          <option value="box">box</option>
                        </select>
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
                        <div className="p-2">${item.amount.toFixed(2)}</div>
                      </td>
                      <td className="p-3 border">
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700 p-2"
                          title="Remove item"
                        >
                          <FaTrash />
                        </button>
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
          
          {/* Additional Charges */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Shipping Cost ($)</label>
              <input
                type="number"
                name="shipping"
                value={invoice.shipping}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setInvoice(prev => ({
                    ...prev,
                    shipping: value,
                    total: prev.subtotal + value + prev.tax
                  }));
                }}
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tax ($)</label>
              <input
                type="number"
                name="tax"
                value={invoice.tax}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setInvoice(prev => ({
                    ...prev,
                    tax: value,
                    total: prev.subtotal + prev.shipping + value
                  }));
                }}
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          {/* Totals */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                name="notes"
                value={invoice.notes}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span>${invoice.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax:</span>
                <span>${invoice.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="flex justify-end">
            <button
              onClick={generatePdf}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <FaDownload className="mr-2" /> Download Proforma Invoice
            </button>
          </div>
        </div>
      </div>

      {/* SEO Articles Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaGlobe className="mr-2 text-blue-500" /> International Trade Resources
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Article 1 */}
          <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="bg-blue-100 p-4">
              <FaFileInvoice className="text-3xl text-blue-600 mb-2" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Proforma Invoice vs Commercial Invoice</h3>
              <p className="text-sm text-gray-600 mb-3">Learn the key differences between these essential international trade documents.</p>
              <ul className="text-xs space-y-1 text-gray-700">
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> When to use each document</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Legal implications</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Customs requirements</li>
              </ul>
            </div>
          </article>
          
          {/* Article 2 */}
          <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="bg-green-100 p-4">
              <FaShippingFast className="text-3xl text-green-600 mb-2" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Incoterms 2020 Explained</h3>
              <p className="text-sm text-gray-600 mb-3">Understand international shipping terms to avoid costly misunderstandings.</p>
              <ul className="text-xs space-y-1 text-gray-700">
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> FOB, CIF, EXW and more</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Risk transfer points</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Cost responsibilities</li>
              </ul>
            </div>
          </article>
          
          {/* Article 3 */}
          <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="bg-purple-100 p-4">
              <FaMoneyBillWave className="text-3xl text-purple-600 mb-2" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">International Payment Methods</h3>
              <p className="text-sm text-gray-600 mb-3">Secure payment options for cross-border transactions.</p>
              <ul className="text-xs space-y-1 text-gray-700">
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Letters of Credit</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Bank Transfers</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Escrow Services</li>
              </ul>
            </div>
          </article>
          
          {/* Article 4 */}
          <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="bg-yellow-100 p-4">
              <FaBoxes className="text-3xl text-yellow-600 mb-2" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Export Documentation Checklist</h3>
              <p className="text-sm text-gray-600 mb-3">Essential paperwork needed for smooth international shipments.</p>
              <ul className="text-xs space-y-1 text-gray-700">
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Commercial invoices</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Packing lists</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Certificates of origin</li>
              </ul>
            </div>
          </article>
          
          {/* Article 5 */}
          <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="bg-red-100 p-4">
              <FaGlobe className="text-3xl text-red-600 mb-2" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Avoiding Common Export Mistakes</h3>
              <p className="text-sm text-gray-600 mb-3">Learn from others' errors to ensure smooth international transactions.</p>
              <ul className="text-xs space-y-1 text-gray-700">
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Incorrect documentation</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Cultural misunderstandings</li>
                <li className="flex items-center"><FaPlus className="mr-1 text-green-500" /> Regulatory compliance</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}