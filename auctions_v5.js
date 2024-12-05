// Hide sidebar menu
document
    .querySelector(".navbar-minimalize.minimalize-styl-2.btn.btn-primary")
    .click();

// Function to adjust date by a number of working days
function adjustWorkingDays(date, days) {
    const result = new Date(date);
    while (days !== 0) {
      result.setDate(result.getDate() - 1);
      const day = result.getDay();
      // Skip weekends
      if (day !== 0 && day !== 6) {
        days--;
      }
    }
    return result;
  }
  
  // Function to format date as mm.dd.yyyy
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}.${day}.${year}`;
  }
  
  // Extract data from the table
  function extractTableData() {
    const table = document.querySelector("tbody"); // Adjust selector if needed
    const rows = Array.from(table.querySelectorAll("tr")); // Skip the header row
    return rows.map((row) => {
      const cells = row.querySelectorAll("td");
      const id = cells[0].textContent.trim();
      const name = cells[1].textContent.trim();
  
      // Get dates from columns 3 and 4
      const date3Raw = cells[2].textContent.trim();
      const date3 = new Date(date3Raw.split(" ")[0]);
      const date4Adjusted = adjustWorkingDays(date3, 2);
  
      const link = cells[7].querySelector("a")?.href || null;
  
      return {
        id,
        name,
        date3: formatDate(date3),
        date4: formatDate(date4Adjusted),
        link,
        rowElement: row, // Reference to the row element for updating later
        column5: null, // Placeholder for auctionDocuments links
        column6: {}, // Placeholder for woodInfo data
        column7: {}, // Placeholder for auction details
        startPrice: null, // Placeholder for auctionStartPrice
      };
    });
  }
  
  // Fetch and process data from the links in column 8
  async function fetchAdditionalData(link) {
    if (!link) return null;
    try {
      const response = await fetch(link);
      const text = await response.text();
  
      // Parse the HTML to extract the desired values
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
  
      // Extract data for column6
      const woodInfo = {
        total:
          doc.querySelector('[name="data[woodInfo][total][0]"]')?.value || null,
        firewood:
          doc.querySelector('[name="data[woodInfo][firewood][0]"]')?.value ||
          null,
        ozm: doc.querySelector('[name="data[woodInfo][ozm][0]"]')?.value || null,
        small: doc.querySelector('[name="data[woodInfo][small][0]"]')?.value || null,
        mid: doc.querySelector('[name="data[woodInfo][mid][0]"]')?.value || null,
        big: doc.querySelector('[name="data[woodInfo][big][0]"]')?.value || null,
      };
  
      // Extract data for column7
      const auctionDetails = {
        auctionBidStep: parseFloat(
          doc
            .querySelector("#аuctionBidStep")
            ?.value.trim()
            .replace(/,/g, "") || "0"
        ),
        auctionGuarantee: parseFloat(
          doc
            .querySelector("#аuctionGuarantee")
            ?.value.trim()
            .replace(/,/g, "") || "0"
        ),
        startPrice: parseFloat(
          doc
            .querySelector("#auctionStartPrice")
            ?.value.trim()
            .replace(/,/g, "") || "0"
        ),
      };
  
      // Extract links for column5
      const auctionDocumentsLinks = Array.from(
        doc.querySelectorAll("#auctionDocuments a[href]")
      ).map((link) => link.href);
  
      return {
        column5: auctionDocumentsLinks,
        column6: woodInfo,
        column7: auctionDetails,
      };
    } catch (error) {
      console.error(`Error fetching data from ${link}:`, error);
      return {
        column5: null,
        column6: {},
        column7: {},
        startPrice: null,
      };
    }
  }
  
  // Update the table with column6 and column7 data
function updateTable(tableData) {
    tableData.forEach((rowData) => {
        const { rowElement, column6, column7, startPrice } = rowData;
        const cells = rowElement.querySelectorAll("td");

        // Update the 6th cell with column6 data
        // if (cells[5] && column6) {
        //     cells[5].innerHTML += `
        //     <div id='woodsInfo'>
        //         <span title='Big'> ${column6.big || "N/A"}</span>
        //         <span title='Mid'> ${column6.mid || "N/A"}</span>
        //         <span title='Small'> ${column6.small || "N/A"}</span>
        //         <span title='OZM'> ${column6.ozm || "N/A"}</span>
        //         <span title='Firewood'> ${column6.firewood || "N/A"}</span>
        //         <span title='Total'> ${column6.total || "N/A"}</span>
        //     </div>
        //     `;
        // }
        if (cells[5] && column6) {
            cells[5].innerHTML += `
                <div id='woodsInfo'>
                    <span title='Big' style="opacity: ${column6.big === 0 ? 0.3 : 0.7};">
                        ${column6.big !== undefined && column6.big !== null ? column6.big : "N/A"}
                    </span>
                    <span title='Mid' style="opacity: ${column6.mid === 0 ? 0.3 : 0.7};">
                        ${column6.mid !== undefined && column6.mid !== null ? column6.mid : "N/A"}
                    </span>
                    <span title='Small' style="opacity: ${column6.small === 0 ? 0.3 : 0.7};">
                        ${column6.small !== undefined && column6.small !== null ? column6.small : "N/A"}
                    </span>
                    <span title='OZM' style="opacity: ${column6.ozm === 0 ? 0.3 : 0.7};">
                        ${column6.ozm !== undefined && column6.ozm !== null ? column6.ozm : "N/A"}
                    </span>
                    <span title='Firewood' style="opacity: ${column6.firewood === 0 ? 0.3 : 0.7};">
                        ${column6.firewood !== undefined && column6.firewood !== null ? column6.firewood : "N/A"}
                    </span>
                    <span title='Total' style="opacity: ${column6.total === 0 ? 0.3 : 0.7};">
                        ${column6.total !== undefined && column6.total !== null ? column6.total : "N/A"}
                    </span>
                </div>
            `;
        }
        


        // Update the 7th cell with column7 data
        if (cells[6] && column7) {
            const maxGuarantee = column7.startPrice * 0.05;
        
            // Highlight guarantee and percentage if it exceeds 5% of the start price
            const guaranteeStyle =
                column7.auctionGuarantee > maxGuarantee
                    ? "background-color: red; font-weight: bold; display: inline-block;"
                    : "";
        
            const guaranteePercentage =
                column7.auctionGuarantee && column7.startPrice
                    ? ((column7.auctionGuarantee / column7.startPrice) * 100).toFixed(2)
                    : "N/A";
        
            cells[6].innerHTML = `
                <div><strong>Start price: ${column7.startPrice || "N/A"}</strong></div>
                <div id='auctionDetails'>
                    <span title='Bid Step'> ${column7.auctionBidStep || "N/A"}</span>
                    <span title='Guarantee' style="${guaranteeStyle}">${column7.auctionGuarantee || "N/A"}</span>
                    <span title='Percentage' style="${guaranteeStyle}">${guaranteePercentage} %</span>
                </div>
            `;
        }
    });
}

// Main function
async function processTable() {
    const tableData = extractTableData();

    for (const row of tableData) {
        if (row.link) {
            const additionalData = await fetchAdditionalData(row.link);
            row.column5 = additionalData.column5;
            row.column6 = additionalData.column6;
            row.column7 = additionalData.column7;
            row.startPrice = additionalData.column7.startPrice;
        }
    }

    updateTable(tableData);
    console.log("Processed Data:", tableData);
    return tableData;
}

// Run the script
processTable();


//styling bellow
document.head.insertAdjacentHTML(
    "beforeend",
    `<style>

/* woodsinfo number of documents styling*/
#docsLengthInfo {
    display: flex;
    width: 200px;
}
#woodsInfo,
#auctionDetails{
    display: flex;
    width: auto;
}
#offers-pills {
    display: flex;
    width: 90px;
}

#docsLengthInfo>span,
#woodsInfo>span,
#auctionDetails>span,
#offers-pills>span {
    flex: 1;
    padding-left: 2px;
    padding-right: 2px;
    margin-right: 5px;
    width: 30%;
    border-radius: 6px;
    background-color: grey;
    opacity: 0.7;
    text-align: center;
    font-size: small;
    font-weight: 550;
    color: white;
}
</style>`
);