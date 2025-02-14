import { Button } from 'antd';
import React, { useRef } from 'react';

const PrintInvoice = ({order}) => {
    const printRef = useRef();
    const doc = {
        name: order.name,
        custom_token: order?.token || 0,
        transaction_date: '',
        transaction_time: '',
        items: order.items,
        total: 0,
        total_taxes_and_charges: 0,
        discount_amount: 0,
        grand_total: 0,
        rounded_total: 0,
        custom_payment_status: '',
        change_amount: 0,
        owner: '',
        terms: ''
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print Invoice</title></head><body>');
        printWindow.document.write(`
        <style>
            @media print {
                body {
                    width: 4in; /* Thermal printer width */
                    height: auto;
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    font-size: 12px;
                }
                .print-format {
                    width: 100%;
                    padding: 0.25in;
                    min-height: 8in;
                }
                .text-center {
                    text-align: center;
                }
                .text-right {
                    text-align: right;
                }
            }
        </style>
    `);
        printWindow.document.write(printRef.current.innerHTML); // Capture the content from the ref
        printWindow.document.write('</body></html>');
        printWindow.document.close();  // Necessary for IE >= 10
        printWindow.print();
    };

    return (
        <div>
            <Button onClick={handlePrint}>Print</Button>
            <div ref={printRef} style={{ display: 'none' }}>
                {/* Print Format Content */}
                <div className="print-format">
                    <p className="text-center" style={{ marginBottom: '1rem' }}>
                        <b>TAX INVOICE</b><br />
                        #958913
                    </p>
                    <p style={{ paddingLeft: '25px' }}>
                        <b>Bill#</b> {doc.name} | &nbsp;&nbsp;&nbsp; <b>Token#</b> &nbsp;&nbsp; {doc.custom_token || 0}<br />
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p>
                            <b>{doc.transaction_date}</b><br />
                        </p>
                        <p>
                            <b>{doc.transaction_time}</b><br />
                        </p>
                    </div>
                    <hr />
                    <table className="table table-condensed">
                        <thead>
                            <tr>
                                <th width="50%">Description</th>
                                <th width="25%" className="text-right">Qty</th>
                                <th width="25%" className="text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                        {doc.items.map(item => (
                            <>
                                {/* Main item row */}
                                <tr key={item.name} className="main-row">
                                    <td>{item.name}</td>
                                    <td className="text-right">{item.quantity}</td>
                                    <td className="text-right">
                                        {item.product_price * item.quantity}
                                    </td>
                                </tr>

                                {/* Content rows */}
                                {Object.entries(item.content).map(([key, value]) => (
                                    <tr key={key} className="content-row">
                                        <td className="text-left">{value.label} - {value.value}</td>
                                        <td></td> {/* Empty cell for alignment */}
                                        <td></td> {/* Empty cell for alignment */}
                                    </tr>
                                ))}

                                {/* Add a row with an underline for separation */}
                                <tr className="underline-row">
                                    <td colSpan="3">
                                        <hr className="row-underline" />
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                    </table>
                    <table className="table table-condensed no-border">
                        <tbody>
                            {/* <tr>
                                <td className="text-left" style={{ width: '70%' }}>Total Before VAT</td>
                                <td className="text-right">{doc.total}</td>
                            </tr>
                            <tr>
                                <td className="text-left" style={{ width: '70%' }}>VAT incl.</td>
                                <td className="text-right">{doc.total_taxes_and_charges}</td>
                            </tr>
                            {doc.discount_amount && (
                                <tr>
                                    <td className="text-left" style={{ width: '75%' }}>Discount</td>
                                    <td className="text-right">{doc.discount_amount}</td>
                                </tr>
                            )}
                            <tr>
                                <td className="text-left" style={{ width: '75%' }}><b>Grand Total</b></td>
                                <td className="text-right">{doc.grand_total}</td>
                            </tr>
                            {doc.rounded_total && (
                                <tr>
                                    <td className="text-left" style={{ width: '75%' }}><b>Rounded Total</b></td>
                                    <td className="text-right">{doc.rounded_total}</td>
                                </tr>
                            )}
                            <tr>
                                <td className="text-center">
                                    <b style={{ paddingLeft: '100px' }}>***{doc.custom_payment_status}***</b>
                                </td>
                                <td className="text-center"></td>
                            </tr>
                            {doc.change_amount && (
                                <tr>
                                    <td className="text-right" style={{ width: '75%' }}><b>Change Amount</b></td>
                                    <td className="text-right">{doc.change_amount}</td>
                                </tr>
                            )} */}
                            <tr>
                                <td className="text-left" style={{ width: '75%' }}>
                                    <p>Waiter Name: <br /> Cashier Name: {doc.owner}</p>
                                </td>
                                <td className="text-right"></td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <p>{doc.terms || ''}</p>
                    <p className="text-center"><b>***Thank you, please visit again.***</b></p>
                </div>
            </div>
        </div>
    );
};

export default PrintInvoice;
