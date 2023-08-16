console.clear();
console.log("history check v2");
let today = new Date();
let table = document.querySelector('tbody').querySelectorAll('tr');
let tableHeader = document.querySelector('thead');
let auctions = [];


auctionArrayPopulate();
auctionsFrontPageStyling();

//populating auctions[]
function auctionArrayPopulate() {
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
    console.log("🚀 ~ file: Untitled-1:19 ~ auctions:", auctions);
}

//auction front page info styling
function auctionsFrontPageStyling() {

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

            const containerTodayAuctionsCount = document.createElement("span");
            containerTodayAuctionsCount.id = "containerTodayAuctionsCount";
            containerTodayAuctionsCount.style.color = "#2f4050";

            const containerYesterdayAuctionsCount = document.createElement("span");
            containerYesterdayAuctionsCount.id = "containerYesterdayAuctionsCount";
            containerYesterdayAuctionsCount.style.color = "#D1462F";

            const containerFutureAuctionsCount = document.createElement("span");
            containerFutureAuctionsCount.id = "containerFutureAuctionsCount";
            containerFutureAuctionsCount.style.color = "#2307fa";

            div.appendChild(containerFutureAuctionsCount);
            div.appendChild(containerTodayAuctionsCount);
            div.appendChild(containerYesterdayAuctionsCount);

            tableHeader.rows[1].cells[3].appendChild(div);

            function frontPageAuctionInfo() {
                let futureCount =0;
                let todayCount=0;
                let pastCount = 0;
                auctions.forEach(el => {
                    if (el.bidStatus === 'future') {
                        futureCount++;
                    }
                    if (el.bidStatus === 'today') {
                        todayCount++;
                    }
                    if (el.bidStatus === 'past') {
                        pastCount++;
                    }

                })

                let futureInfo = ("бъдещи: " + futureCount + " | ");
                let todayInfo = ("днешни: " + todayCount + " | ");
                let yesterdayInfo = ("минали: " + pastCount);
                document.getElementById("containerTodayAuctionsCount").innerText = todayInfo;
                document.getElementById("containerYesterdayAuctionsCount").innerText = yesterdayInfo;
                document.getElementById("containerFutureAuctionsCount").innerText = futureInfo;
            }
            frontPageAuctionInfo();
        }
    }
    tableHeaderInfo();
}