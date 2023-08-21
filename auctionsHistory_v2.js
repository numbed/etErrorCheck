//21.08.23 PROCEEDS TO REALTIME TESTING
//21.08.23 NEEDS WORK WITH auction uploaded orders, and correct notInDangerTotal() output in confirm dialogs

console.clear();
console.log("history check v2");
let today = new Date();
let table = document.querySelector('tbody').querySelectorAll('tr');
let tableHeader = document.querySelector('thead');
let auctions = [];
let framesLoadedCounter = 0;
/*auctions object keys
{  number: bidStatus: {future | today | past} status: {danger | ""}  date:  TP:  obekt:  auctionFormLink:  auctionHistoryLink: } 
*/

arrayPopulate();
iframeCreation(); // <---- tabOpen();
frontPageStyling();

//creating iframes for every auction that is not in "danger"

function iframeCreation() {

    //creating iFrame elements if there are none
    //MUST DO - creating of the iFrame has to happen only once, and script should run without page refreshing
    if (document.querySelectorAll("iFrame").length === 0) {
        let orders;
        auctions.forEach((el, index) => {
            if (el.status != 'danger') {
                const iFrame = document.createElement('iFrame');
                iFrame.id = el.number;
                iFrame.style.display = 'none';
                table[index].cells[0].appendChild(iFrame);
                iFrame.src = el.auctionHistoryLink;
                iFrame.onload = function () {
                    framesLoadedCounter += 1;
                    orders = iFrame.contentWindow.document.querySelectorAll("label")[10].closest('div').querySelectorAll('tr');
                    if (orders.length > 0) {
                        el.numberOfOrders = orders.length;
                        table[index].cells[8].style.backgroundColor = "green";
                    }

                    //ensures that all frames are loaded before executing tabOpen();
                    if (framesLoadedCounter === notInDangerTotal()) {
                        tabOpen();
                    }
                }
            }
        });
    }
}

//populating auctions[]
function arrayPopulate() {
    table.forEach(el => {
        let object = {
            number: el.cells[0].innerText,
            status: el.className,
            bidStatus: bidStatusCheck(dateSplit(el.cells[4].innerHTML)),
            date: dateSplit(el.cells[4].innerHTML), //table.date
            TP: el.cells[1].innerText,
            obekt: el.cells[2].innerText.split("/")[1].trim().split(' ').pop(),
            auctionFormLink: "https://auction.ucdp-smolian.com/au-admin/auctions/form/" + el.cells[0].innerText.slice(-4),
            auctionHistoryLink: el.cells[8].getElementsByTagName("a")[0].href.split("/").pop(),
        }
        //table.date
        function dateSplit(input) {
            let dateInput = input.split(' ')[0].trim().split('.');
            let firstDate = new Date(dateInput[2], dateInput[1] - 1, dateInput[0]);
            return firstDate.getDate() + "." + (firstDate.getMonth() + 1) + "." + firstDate.getFullYear();
        }

        function bidStatusCheck(input) {
            let firstDate = new Date(input.split(' ')[0].trim().split('.')[2], input.split(' ')[0].trim().split('.')[1] - 1, input.split(' ')[0].trim().split('.')[0]);
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            let yesterday = new Date();

            if (today.getDay() === 1) {
                yesterday.setDate(yesterday.getDate() - 3);
            } else {
                yesterday.setDate(yesterday.getDate() - 1);
            }

            if (firstDate.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
                return 'today';
            } else if (firstDate.setHours(0, 0, 0, 0) <= yesterday.setHours(0, 0, 0, 0)) {
                return 'past';
            } else if (firstDate.setHours(0, 0, 0, 0) >= tomorrow.setHours(0, 0, 0, 0)) {
                return 'future';
            }
        }
        auctions.push(object);
    });

    //adding bidStatus to auctions[]


}
//auction history front page info styling
function frontPageStyling() {

    //coloring auctions page
    function colorfullRowsOutput(bidStatus, color, color2) {
        auctions.forEach((el, index) => {
            if (el.bidStatus === bidStatus) {
                table[index].cells[8].style.backgroundColor = color;
            }
        });
    }
    colorfullRowsOutput("future", "#2307fa", "white"); //blue
    colorfullRowsOutput("today", "#e4ed85", "white"); //yellow
    colorfullRowsOutput("past", "#D1462F", "white"); //red

    function tableHeaderInfo() {
        let info = tableHeader.rows[1].cells[3];
        if (!info.innerText.includes("Проведени")) {
            const div = document.createElement("div");
            div.id = "auctionsOutput";
            div.style.textAlign = "center";
            div.style.fontStyle = "italic";
            div.innerText = ("Проведени търгове: ");

            //appending child elements to tableHeader newly created div#auctionsOutput
            function appendChildMultiple(parent, elementName, color) {
                //check function argument is an element
                if (parent.nodeType !== undefined) {
                    const span = document.createElement("span");
                    span.id = elementName;
                    span.style.color = color;
                    //finally append child to parent
                    parent.appendChild(span);
                }
            }
            appendChildMultiple(div, "futureBidStatus", "#2307fa"); //blue
            appendChildMultiple(div, "spanSeparator");
            appendChildMultiple(div, "todayBidStatus", "#2f4050"); //black
            appendChildMultiple(div, "spanSeparator", );
            appendChildMultiple(div, "pastBidStatus", "#D1462F"); //red

            tableHeader.rows[1].cells[3].appendChild(div);

            //bidStatus counter frontpage info in tableHeader
            function frontPageAuctionInfo() {
                let futureInfo = ("бъдещи: " + arrayCounter().future);
                let todayInfo = ("днешни: " + arrayCounter().today);
                let yesterdayInfo = ("минали: " + arrayCounter().past);
                document.getElementById("futureBidStatus").innerText = futureInfo;
                document.getElementById("todayBidStatus").innerText = todayInfo;
                document.getElementById("pastBidStatus").innerText = yesterdayInfo;
                document.querySelectorAll("#spanSeparator").forEach(el => {
                    el.innerText = " | ";
                });
            }
            frontPageAuctionInfo();
        }
    }
    tableHeaderInfo();

    //end
}

function tabOpen() {
    let order = "https://auction.ucdp-smolian.com/au-admin/history/erasedOrder/";
    let protocol = "https://auction.ucdp-smolian.com/au-admin/history/erasedProtocol/";
    let erasedDate = new Date().getDate() + "." + (new Date().getMonth() + 1) + "." + new Date().getFullYear();

    //NEEDS CHECK if future, today, past auctions allready has documents ---- MAYBE CHANGES SHOULD BE MADE in auctionsNotInDanger()
    if (notInDangerTotal() > 0) {
        if (confirm('Заличени протоколи и заповеди за първи купувач\nПроведени търгове: ' + notInDangerTotal() + " бр.\r\nОтвори?")) {
            if (auctionsNotInDanger().future > 0) {
                if (confirm("Бъдещи търгове: " + auctionsNotInDanger().future + " бр.\nОтвори?")) {
                    // console.log("🚀 ~ file: auctionsHistory_v2.js:208 ~ tabOpen ~ future:")
                    newTab('future', 'c', erasedDate);
                }
            }
            if (auctionsNotInDanger().today > 0) {
                if (confirm("Днешни търгове: " + auctionsNotInDanger().today + " бр.\nОтвори?")) {
                    // console.log("🚀 ~ file: auctionsHistory_v2.js:213 ~ tabOpen ~ today:")
                    newTab('today', 'b');
                }
            }
            if (auctionsNotInDanger().past > 0) {
                if (confirm("Минали търгове: " + auctionsNotInDanger().past + " бр.\nОтвори?")) {
                    // console.log("🚀 ~ file: auctionsHistory_v2.js:218 ~ tabOpen ~ past:")
                    newTab('past', 'b');
                }
            }
        }
    }

    function newTab(bidStatus, orderType, date) {
        auctions.forEach(el => {
            if (el.status === 'danger') {} else {
                if (el.bidStatus === bidStatus) {
                    if (date === undefined) {
                        date = el.date;
                    }
                    if (el.numberOfOrders === undefined) {
                        console.table(el.number, el.numberOfOrders, bidStatus, orderType, date);
                        window.open(protocol + el.auctionHistoryLink + "/" + date, '_blank');
                        window.open(order + el.auctionHistoryLink + "/" + date + "/?t=" + orderType, '_blank');
                        window.open(el.auctionFormLink, '_blank');
                    }
                }
            }
        })
    }
}

//status & bidStatus counter for all auctions  
function arrayCounter() {
    const count = {};
    auctions.forEach(el => {
        count[el.bidStatus] = (count[el.bidStatus] || 0) + 1;
        count[el.status] = (count[el.status] || 0) + 1;
    });
    return count;
}

//counter for auctions that are not in "danger"
//check for uploaded files to be added - will not count auctions that have already uploaded results (solution with iframes check)
function auctionsNotInDanger() {
    const count = {};
    auctions.forEach(el => {
        if (el.status != "danger") {
            // if (el.numberOfOrders === undefined) { //NOT WORKING FOR NOW, NEEDS MORE TESTING | CHECK ADDED IN newTab()
            count[el.bidStatus] = (count[el.bidStatus] || 0) + 1;
            // }
        }
    });
    return count;
}
console.log("🚀 ~ file: auctionsHistory_v2.js:232 ~ auctionsNotInDanger ~ auctionsNotInDanger():", auctionsNotInDanger())

function notInDangerTotal() {
    let output = 0;
    if (!isNaN(auctionsNotInDanger().future)) {
        output += Number(auctionsNotInDanger().future);
    }
    if (!isNaN(auctionsNotInDanger().today)) {
        output += Number(auctionsNotInDanger().today);
    }
    if (!isNaN(auctionsNotInDanger().past)) {
        output += Number(auctionsNotInDanger().past);
    }
    return output;
}
console.log("🚀 ~ file: auctionsHistory_v2.js:231 ~ auctionsNotInDanger ~ auctions:", auctions)