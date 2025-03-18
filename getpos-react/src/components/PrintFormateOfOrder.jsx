import { forwardRef, useImperativeHandle } from 'react';

const PrintFormateOfOrder = forwardRef(({ doc }, ref) => {
  useImperativeHandle(ref, () => ({
    handlePrint
  }));

  const handlePrint = (doc) => {
    // Get the latest transaction data from localStorage
    const transactionData = JSON.parse(localStorage.getItem("cashTransaction") || "{}");
    const cashReceived = transactionData.cashReceived || "0.00";
    const balanceAmount = transactionData.balance || "0.00";

    // Add timestamp to force template refresh
    const timestamp = new Date().getTime();
    
    console.log("Print doc received:", doc); // Debug log
    console.log("Transaction data:", transactionData); // Debug log
    console.log("Template timestamp:", timestamp); // Debug log

    const printContent = `
      <html>
        <head>
          <meta name="template-version" content="${timestamp}">
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 14px;
            }
            .container {
              border: 1px solid black;
              padding: 5%;
              width: 50%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin: auto;
            }
            .line {
              border-bottom: 1px dotted black;
              text-align: center;
              width: 100%;
              margin-bottom: 15px;
              padding-bottom: 10px;
            }
            .content {
              width: 100%;
            }
            .items {
              width: 100%;
              margin-bottom: 15px;
            }
            .items span {
              display: flex;
              justify-content: space-between;
              border-bottom: 1px dotted black;
              padding: 10px 0;
              font-size: 16px; 
            }
            .totals {
              width: 100%;
              margin-top: 15px;
            }
            .totals td {
              padding: 10px;
              font-size: 16px; 
            }
            .totals .label {
              text-align: right;
              width: 70%;
            }
            .totals .value {
              text-align: right;
              width: 30%;
            }
            .footer {
              text-align: center;
              width: 100%;
              border-top: 1px solid black;
              margin-top: 15px;
              padding-top: 10px;
            }
            @media print {
              body { margin: 0; }
              .container { border: none; width: 100%; padding: 10px; }
            }
          </style>
        </head>
        <body>
          <section class="container">
            <div class="line">
              <h1>GETPOS</h1>
              <p>Address: 123 Main St, City, Country</p>
            </div>
            <div class="content">
              <p>Check#: ${doc.name}</p>
              <p>Date: ${doc.transaction_date} - ${doc.transaction_time}</p>
              <p>Cashier: ${doc.hub_manager_name}</p>
              <div class="items">
                ${doc.items.map((item, index) => `
                  <span key=${index}>
                    <p>${index + 1}</p>
                    <p>${item.item_code} - ${item.item_name}</p>
                    <p>Qty: ${item.qty}</p>
                    <p>Rate: ${item.rate}</p>
                  </span>
                `).join('')}
              </div>
              <div class="totals">
                <table width="100%">
                  <tr>
                    <td class="label">Sub Total:</td>
                    <td class="value">${doc.sub_total}</td>
                  </tr>
                  <tr>
                    <td class="label">Tax:</td>
                    <td class="value">${doc.tax_amount}</td>
                  </tr>
                  <tr>
                    <td class="label">Total:</td>
                    <td class="value">${doc.total}</td>
                  </tr>
                  <tr>
                    <td class="label">Cash Received:</td>
                    <td class="value">${cashReceived}</td>
                  </tr>
                  <tr>
                    <td class="label">Balance:</td>
                    <td class="value">${balanceAmount}</td>
                  </tr>
                </table>
              </div>
              <div class="footer">
                <p>Thank you for your business!</p>
                <p>Visit us again</p>
              </div>
            </div>
          </section>
        </body>
      </html>
    `;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Add a small delay to ensure content is loaded
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return null; 
});

export default PrintFormateOfOrder;
