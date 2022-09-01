function auctionHistoryCheck() {
    console.log("Auctions history check");

    let historyTableET = document.querySelector("tbody");
    const historyET = {};
    const historyArray = [];
    let today = new Date();

    //collecting data from active tab table (historyET)
    for (let i = 0, row; row = historyTableET.rows[i]; i++) {
        historyET[i] = {
            number: row.cells[0].innerText,
            date: dateSplit(row.cells[4].innerText),
            TP: row.cells[2].innerText,
            etLink: "https://auction.ucdp-smolian.com/au-admin/history/review/" + row.cells[0].innerText.slice(-4),
            obekt: objectSplit(row.cells[2].innerText),
        };
    }

    function objectSplit(o) { //historyET.obekt
        let output = o.split("/");
        output = output[1].trim().split(" ").pop();
        return output;
    }

    //calculating deadline based on first date of the auction
    function dateSplit(date) {
        let d = date.split(" ");
        d = d[0].trim();
        d = d.split(".");
        let firstDate = new Date(d[2], d[1] - 1, d[0]);
        return firstDate.getDate() + "." + (firstDate.getMonth() + 1) + "." + firstDate.getFullYear();
    }





    console.log(Object.keys(historyET).length);

    historyET.forEach(element => {
        
        console.log(element.tp);
    });
}
auctionHistoryCheck();