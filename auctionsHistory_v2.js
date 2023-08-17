console.clear();
console.log("history check v2");
let today = new Date();
let table = document.querySelector('tbody').querySelectorAll('tr');
let tableHeader = document.querySelector('thead');
let auctions = [];
// const count = {};
/*auctions object keys
 {  number: bidStatus: {future | today | past} status: {danger | ""}   date:   TP:   obekt:   etLink:   auctionFormLink:   auctionHistoryLink: } 
*/

arrayPopulate();
console.log("🚀 ~ file: auctionsHistory_v2.js:12 ~ auctions:", auctions)
frontPageStyling();
tabOpen();

function tabOpen() {
    let order = "https://auction.ucdp-smolian.com/au-admin/history/erasedOrder/";
    let protocol = "https://auction.ucdp-smolian.com/au-admin/history/erasedProtocol/";
    let erasedDate = new Date().getDate() + "." + (new Date().getMonth() + 1) + "." + new Date().getFullYear();

    if (confirm('Заличени протоколи и заповеди за първи купувач\nПроведени търгове: ' + (auctions.length - arrayCounter().danger) + "\r\nОтвори?")) {
        if (arrayCounter().future > 0) {
            if (confirm("FUTURE?")) {
                newTab('future', 'c', erasedDate);
            }
        }
        if (arrayCounter().today > 0) {
            if (confirm("TODAY?")) {
                newTab('today', 'b');
            }
        }
        if (arrayCounter().past > 0) {
            if (confirm("PAST?")) {
                newTab('past', 'b');
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
                    console.log("🚀 ~ file: auctionsHistory_v2.js:29 ~ newTab ~ el.status:", el.number, el.date, el.bidStatus, bidStatus, orderType, date);
                    // window.open(protocol + el.auctionHistoryLink + "/" + date, '_blank');
                    // window.open(order + el.auctionHistoryLink + "/" + date + "/?t="+ orderType, '_blank');
                }
            }
        })
    }
}

//populating auctions[]
function arrayPopulate() {
    table.forEach(el => {
        let object = {
            number: el.cells[0].innerText,
            status: el.className,
            date: dateSplit(el.cells[4].innerHTML), //table.date
            TP: el.cells[1].innerText,
            obekt: el.cells[2].innerText.split("/")[1].trim().split(' ').pop(),
            etLink: "https://auction.ucdp-smolian.com/au-admin/history/review/" + el.cells[0].innerText.slice(-4),
            auctionFormLink: "https://auction.ucdp-smolian.com/au-admin/auctions/form/" + el.cells[0].innerText.slice(-4),
            auctionHistoryLink: el.cells[8].getElementsByTagName("a")[0].href.split("/").pop(),
        }
        //table.date
        function dateSplit(input) {
            let dateInput = input.split(' ')[0].trim().split('.');
            let firstDate = new Date(dateInput[2], dateInput[1] - 1, dateInput[0]);
            return firstDate.getDate() + "." + (firstDate.getMonth() + 1) + "." + firstDate.getFullYear();
        }
        auctions.push(object);
    });

    //adding bidStatus to auctions[]
    function auctionBidStatusAdd(params) {
        auctions.forEach(el => {
            el.bidStatus = bidStatusCheck(el.date);
        });

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
            } else if (firstDate.setHours(0, 0, 0, 0) == yesterday.setHours(0, 0, 0, 0)) {
                return 'past';
            } else if (firstDate.setHours(0, 0, 0, 0) >= tomorrow.setHours(0, 0, 0, 0)) {
                return 'future';
            }
        }
    }
    auctionBidStatusAdd();
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
    colorfullRowsOutput("future", "#2307fa", "white");
    colorfullRowsOutput("today", "#2f4050", "white");
    colorfullRowsOutput("past", "#D1462F", "white");

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

//arrayCounter counter
function arrayCounter() {
    const count = {};
    auctions.forEach(el => {
        count[el.bidStatus] = (count[el.bidStatus] || 0) + 1;
        count[el.status] = (count[el.status] || 0) + 1;
    });
    return count;
}