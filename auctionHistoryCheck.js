function auctionHistoryCheck() {
    console.log("Auctions history check");

    let historyTableET = document.querySelector("tbody");
    let historyTableHead = document.querySelector("thead");
    const historyET = [];
    const todayAuctionsArray = [];
    const yesterdayAuctionsArray = [];
    const tomorrowAuctionsArray = [];
    let today = new Date();

    //collecting data from active tab table (historyET)
    for (let i = 0, row; row = historyTableET.rows[i]; i++) {
        historyET[i] = {
            number: row.cells[0].innerText,
            date: dateSplit(row.cells[4].innerText),
            TP: row.cells[1].innerText,
            obekt: objectSplit(row.cells[2].innerText),
            etLink: "https://auction.ucdp-smolian.com/au-admin/history/review/" + row.cells[0].innerText.slice(-4),
            auctionFormLink: "https://auction.ucdp-smolian.com/au-admin/auctions/form/" + row.cells[0].innerText.slice(-4),
            auctionHistoryLink: row.cells[8].getElementsByTagName("a")[0].href.split("/").pop()
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

    //check if auction date is today
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
            auctionFormLink: historyET[i].auctionFormLink,
            auctionHistoryLink: historyET[i].auctionHistoryLink,

        };
        let yesterday = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        yesterday.setDate(yesterday.getDate() - 1);
        if (dateBid.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
            todayAuctionsArray.push(dateBidObj);
        } else if (dateBid.setHours(0, 0, 0, 0) == yesterday.setHours(0, 0, 0, 0)) {
            yesterdayAuctionsArray.push(dateBidObj);
        } else if (dateBid.setHours(0, 0, 0, 0) == tomorrow.setHours(0, 0, 0, 0)) {
            tomorrowAuctionsArray.push(dateBidObj);
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
    colorfullRowsOutput(todayAuctionsArray, "#2f4050", "white");
    colorfullRowsOutput(yesterdayAuctionsArray, "#D1462F", "white");

    //auction front page info styling
    let predmet = historyTableHead.rows[1].cells[3];
    if (!predmet.innerText.includes("Проведени")) {
        const div = document.createElement("div");
        div.id = "auctionsOutput";
        div.style.textAlign = "center";
        div.style.fontStyle = "italic";
        div.innerText = ("Проведени търгове: ");

        const containerTodayAuctionsCount = document.createElement("span");
        containerTodayAuctionsCount.id = "containerTodayAuctionsCount";
        containerTodayAuctionsCount.style.color = "#2f4050";

        const containerYesterdayAuctionsCount = document.createElement("span");
        containerYesterdayAuctionsCount.id = "containerYesterdayAuctionsCount";
        containerYesterdayAuctionsCount.style.color = "#D1462F";

        div.appendChild(containerTodayAuctionsCount);
        div.appendChild(containerYesterdayAuctionsCount);

        historyTableHead.rows[1].cells[3].appendChild(div);
    }

    //auction front page info
    function frontPageAuctionInfo() {
        let todayInfo = ("днес: " + todayAuctionsArray.length + " | ");
        let yesterdayInfo = ("вчера: " + yesterdayAuctionsArray.length);
        document.getElementById("containerTodayAuctionsCount").innerText = todayInfo;
        document.getElementById("containerYesterdayAuctionsCount").innerText = yesterdayInfo;
    }
    frontPageAuctionInfo();

    //open history tabs for every auction in the according arrays
    function auctionTabOpen(array, text) {
        if (array.length !== 0) {
            if (confirm('СПРАВКА\nПроведени търгове ' + text + ': ' + array.length + "\r\nОтвори?")) {
                console.log("OK");
                for (i = 0; i < array.length; i++) {
                    window.open(array[i].etLink, '_blank');
                }
            }
        }
    }
    // auctionTabOpen(todayAuctionsArray, "днес");
    // auctionTabOpen(yesterdayAuctionsArray, "вчера");

    //open form tabs for every auction in the according arrays
    function auctionTabOpen2(array, text) {
        if (array.length !== 0) {
            if (confirm('ПРОЦЕДУРИ\nПроведени търгове ' + text + ': ' + array.length + "\r\nОтвори?")) {
                console.log("OK");
                for (i = 0; i < array.length; i++) {
                    window.open(array[i].auctionFormLink, '_blank');
                }
            }
        }
    }
    auctionTabOpen2(todayAuctionsArray, "днес");
    auctionTabOpen2(yesterdayAuctionsArray, "вчера");
    auctionTabOpen2(tomorrowAuctionsArray, "утре");

    //direct open for protocol and 1st buyer order
    function tabOpenProtocolandOrder(array, text) {
        if (array.length !== 0) {
            if (confirm('Заличени протоколи и заповеди за първи купувач\n\nПроведени търгове ' + text + ': ' + array.length + "\r\nОтвори?")) {
                console.log("OK");
                let order = "https://auction.ucdp-smolian.com/au-admin/history/erasedOrder/";
                let protocol = "https://auction.ucdp-smolian.com/au-admin/history/erasedProtocol/";
                for (i = 0; i < array.length; i++) {
                    window.open(protocol + array[i].auctionHistoryLink + "/" + array[i].date, '_blank');
                    window.open(order + array[i].auctionHistoryLink + "/" + array[i].date + "/?t=b", '_blank');
                }
            }
        }
    }
    tabOpenProtocolandOrder(todayAuctionsArray, "днес");
    tabOpenProtocolandOrder(yesterdayAuctionsArray, "вчера");
    // tabOpenProtocolandOrder(tomorrowAuctionsArray, "утре");

}
auctionHistoryCheck();