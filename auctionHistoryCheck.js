function auctionHistoryCheck() {
    console.log("Auctions history check");

    let historyTableET = document.querySelector("tbody");
    let historyTableHead = document.querySelector("thead");
    const historyET = {};
    const todayAuctionsHistoryArray = [];
    let today = new Date();

    //collecting data from active tab table (historyET)
    for (let i = 0, row; row = historyTableET.rows[i]; i++) {
        historyET[i] = {
            number: row.cells[0].innerText,
            date: dateSplit(row.cells[4].innerText),
            TP: row.cells[1].innerText,
            obekt: objectSplit(row.cells[2].innerText),
            etLink: "https://auction.ucdp-smolian.com/au-admin/history/review/" + row.cells[0].innerText.slice(-4),
        };
    }

    //historyET.obekt
    function objectSplit(o) {
        let output = o.split("/");
        output = output[1].trim().split(" ").pop();
        return output;
    }

    //historyET.date
    function dateSplit(date) {
        let d = date.split(" ");
        d = d[0].trim();
        d = d.split(".");
        let firstDate = new Date(d[2], d[1] - 1, d[0]);
        return firstDate.getDate() + "." + (firstDate.getMonth() + 1) + "." + firstDate.getFullYear();
    }

    //checking if Auction history date is today
    for (i = 0; i < Object.keys(historyET).length; i++) {
        let dateString = historyET[i].date.split(".");
        let dateBid = new Date(dateString[2], dateString[1] - 1, dateString[0]);
        let dateBidObj = {};
        dateBidObj = {
            number: historyET[i].number,
            date: historyET[i].date,
            TP: historyET[i].TP,
            obekt: historyET[i].obekt,
            etLink: historyET[i].etLink,
        };

        if (dateBid.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
            todayAuctionsHistoryArray.push(dateBidObj);
        }
    }

    //coloring auctions page
    function colorfullRowsOutput(array, color, color2) {
        array.forEach(element => {
            for (let i = 0, row; row = historyTableET.rows[i]; i++) {
                if (row.cells[0].innerText == element.number) {
                    row.cells[8].style.backgroundColor = color;
                }
            }
        });
    }
    colorfullRowsOutput(todayAuctionsHistoryArray, "#2f4050", "white");

    function auctionTabOpen(array) {
        if (array.length !== 0) {
            if (confirm('Проведени търгове днес: ' + array.length + "\r\nОтвори?")) {
                console.log("OK");
                for (i = 0; i < array.length; i++) {
                    window.open(array[i].etLink, '_blank');
                }
            }
        }
    }
    auctionTabOpen(todayAuctionsHistoryArray);

    //auction front page info styling
    let predmet = historyTableHead.rows[1].cells[3];
    if (!predmet.innerText.includes("Проведени")) {
        const div = document.createElement("div");
        div.id = "auctionsOutput";
        div.style.textAlign = "center";
        div.style.fontStyle = "italic";
        

        const containerTodayAuctionsCount = document.createElement("span");
        containerTodayAuctionsCount.id = "containerTodayAuctionsCount";
        containerTodayAuctionsCount.style.color = "#2f4050";

        div.appendChild(containerTodayAuctionsCount);

        historyTableHead.rows[1].cells[3].appendChild(div);
    }

    //auction front page info
    function f1() {
        let todayAuctionsHistoryInfo = ("Проведени търгове днес: " + todayAuctionsHistoryArray.length);
        document.getElementById("containerTodayAuctionsCount").innerText = todayAuctionsHistoryInfo;
    }
    f1();
    

    console.log(Object.keys(todayAuctionsHistoryArray).length);

    for (i = 0; i <= Object.keys(todayAuctionsHistoryArray).length; i++) {
        console.log(todayAuctionsHistoryArray[i]);

    }
}
auctionHistoryCheck();