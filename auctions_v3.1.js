function main() {
    console.log("auctions v3");
    let aucTable = document.querySelector("tbody");
    document.querySelector("thead").rows[1].cells[3].innerText = "Краен срок за записване\n" + "Краен срок за публикуване";
    const auctions = [];
    let today = new Date();

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    // document.head - add mousover tooltip on cells 
    document.head.insertAdjacentHTML("beforeend", `<style>
        td.hidden-xs {
            position: relative;
        }
        .tt{
            display: none;
            position: absolute; 
            z-index: 100;
            border: 1px;
            background-color: white;
            border: 1px solid green;
            padding: 3px;
            color: green; 
            top: 20px; 
            left: 20px;
            white-space: pre;
        }
        td.hidden-xs:hover .tt{
            display:block;
            white-space: pre;
        }
        </style>`);

    //auction table cell variable assing & auction array fill & visual changes
    function auctionDataCollect() {
        console.log("auctionDataCollect()");
        for (let i = 0, row; row = aucTable.rows[i]; i++) {
            let numberCell = row.cells[0];
            let dateCell = row.cells[2];
            let endDateCell = row.cells[3];
            let subjectCell = row.cells[4];
            let branchCell = row.cells[5];
            let priceCell = row.cells[6];
            let linkCell = row.cells[7];
            let lastCell = row.cells[8];

            auctions[i] = {
                number: numberCell.innerText,
                date: dateCell.innerText,
                deadline: calculateDeadline(dateCell.innerText),
                type: typeCheck(subjectCell.innerText),
                subject: subjectCheck(subjectCell.innerText),
                branch: branchCheck(branchCell.innerText),
                etLink: "https://auction.ucdp-smolian.com/au-admin/auctions/form/" + numberCell.innerText.slice(-4),
                object: objectCheck(branchCell.innerText),
                commission: commissionDate(dateCell.innerText),
                status: statusCheck(calculateDeadline(dateCell.innerText), commissionDate(dateCell.innerText))
            };

            //auctions.commission
            function commissionDate(c) {
                let d = c.split(" ");
                d = d[0].trim();
                d = d.split(".");
                let firstDate = new Date(d[2], d[1] - 1, d[0]);
                let commDate = new Date(d[2], d[1] - 1, d[0]);
                let date = new Date();

                if (firstDate.getDay() == 1) {
                    date = firstDate.getDate() - 3;
                } else {
                    date = firstDate.getDate() - 1;
                }

                commDate.setDate(date);
                let output = new Date();
                output = commDate.getDate() + "." + (commDate.getMonth() + 1) + "." + commDate.getFullYear();
                return output;
            }

            //auctions.subject
            //TO DO -> needs case insensitive modifications <- TO DO
            function subjectCheck(s) {
                let output;
                if (s.includes("действително") || s.includes("ДЕЙСТВИТЕЛНО")) {
                    output = "ДД";
                } else if (s.includes("корен") || s.includes("КОРЕН")) {
                    output = "K";
                } else if (s.includes("прогнозни") || s.includes("ПРОГНОЗНИ")) {
                    output = "П";
                }
                return output;
            }

            //auctions.type
            function typeCheck(t) {
                let output;
                if (t.includes("конкурс")) {
                    output = "к";
                } else if (t.includes("наддаване")) {
                    output = "т";
                } else if (t.includes("ценово")) {
                    output = "ецп";
                }
                return output;
            }

            //auctions.object
            function objectCheck(o) {
                let output = o.split("/");
                output = output[1].trim().split("№:").pop().trim();
                return output;
            }

            //auctions.branch
            function branchCheck(t) {
                let output = t.split("/");
                output = output[0].trim().split(" ").pop();
                return output;
            }

            //auctions.deadline
            function calculateDeadline(date) {
                let d = date.split(" ");
                d = d[0].trim();
                d = d.split(".");
                let firstDate = new Date(d[2], d[1] - 1, d[0]);
                let deadlineDate = new Date(d[2], d[1] - 1, d[0]);
                let deadline = new Date();

                if (firstDate.getDay() == 1 || firstDate.getDay() == 4) {
                    deadline = firstDate.getDate() - 20;
                } else if (firstDate.getDay() == 2 || firstDate.getDay() == 5) {
                    deadline = firstDate.getDate() - 18;
                } else if (firstDate.getDay() == 3) {
                    deadline = firstDate.getDate() - 19;
                }

                deadlineDate.setDate(deadline);
                let output = new Date();
                output = deadlineDate.getDate() + "." + (deadlineDate.getMonth() + 1) + "." + deadlineDate.getFullYear();
                return output;
            }

            //auctions.status & inicial cell coloring
            function statusCheck(dead, comm) {
                let deadlineDateString = dead.split(".");
                let deadline = new Date(deadlineDateString[2], deadlineDateString[1] - 1, deadlineDateString[0]);
                let commissionDateString = comm.split(".");
                let commission = new Date(commissionDateString[2], commissionDateString[1] - 1, commissionDateString[0])
                let output;

                if (deadline.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
                    output = "today";
                    row.style.fontWeight = "bold";
                    coloring("#D1462F");
                } else if (deadline.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) && commission.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
                    output = "commission";
                    coloring("#2f4050");
                } else if (deadline.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
                    output = "passed";
                    coloring("#81B622");
                    row.style.color = "";
                } else {
                    output = "upcomming";
                    coloring("#e88031");
                }

                function coloring(color) {
                    lastCell.style.backgroundColor = color;
                    row.style.color = color;
                    endDateCell.innerHTML = endDateCell.innerHTML + "<br>" + calculateDeadline(dateCell.innerText).fontcolor(color).italics().bold();
                }
                return output;
            }

            //subjectText caps change
            subjectCell.innerHTML = subjectCell.innerHTML.replace('конкурс', '<b>КОНКУРС</b>');
            subjectCell.innerHTML = subjectCell.innerHTML.replace('търг', '<b>ТЪРГ</b>');
            subjectCell.innerHTML = subjectCell.innerHTML.replace('ценово', '<b>ЦЕНОВО</b>');
            subjectCell.innerHTML = subjectCell.innerHTML.replace('добив', '<b>ДОБИВ</b>');
            subjectCell.innerHTML = subjectCell.innerHTML.replace('корен', '<b>КОРЕН</b>');
            subjectCell.innerHTML = subjectCell.innerHTML.replace('действително добити', '<b>ДЕЙСТВИТЕЛНО ДОБИТИ</b>');
            subjectCell.innerHTML = subjectCell.innerHTML.replace('прогнозни', '<b>ПРОГНОЗНИ</b>');

        }
    }
    auctionDataCollect();

    //creating iframes for every auction on page
    function iframeCreation() {
        console.log("iframeCreation()");
        auctions.forEach((element, index) => {
            if (!document.getElementById(element.number)) {
                const auctionFrame = document.createElement('iframe');
                auctionFrame.id = element.number;
                auctionFrame.style.display = "none";
                aucTable.rows[index].cells[0].appendChild(auctionFrame);
            }
        });
    }
    iframeCreation();

    function cellTooltip() {
        console.log("cellTooltip()");
        auctions.forEach((element, index) => {
            let iFrame = document.getElementById(element.number);
            iFrame.src = element.etLink;
            iFrame.onload = function () {
                console.log("\n" + element.number + " frame loaded");
                let woodsInfoTable = iFrame.contentWindow.document.querySelector("tbody");
                let woodsVolumes = woodsInfoTable.querySelectorAll('input[name*="data[woodInfo]"]');

                let bidStep = iFrame.contentWindow.document.querySelector("#аuctionBidStep").value;
                let guarantee = iFrame.contentWindow.document.querySelector("#аuctionGuarantee").value;

                let woodsInfo = "Едра: " + woodsVolumes[1].value + "\r\nСредна: " + woodsVolumes[2].value + "\r\nДребна: " + woodsVolumes[3].value + "\r\nОзм: " + woodsVolumes[4].value + "\r\nОгрев: " + woodsVolumes[5].value + "\r\nОБЩО: " + woodsVolumes[6].value;
                const woodSpan = document.createElement('span');
                woodSpan.className = "tt";
                woodSpan.textContent = woodsInfo;
                aucTable.rows[index].cells[4].appendChild(woodSpan);

                let priceInfo = "стъпка: " + bidStep + " \r\nгаранция: " + guarantee;
                const priceSpan = document.createElement('span');
                priceSpan.className = "tt";
                priceSpan.textContent = priceInfo;
                // priceSpan.textContent = "стъпка: " + bidStep
                aucTable.rows[index].cells[6].appendChild(priceSpan);
                console.log(woodsInfo + "\n" + priceInfo);


                let docs = iFrame.contentWindow.document.querySelector("#auctionDocuments").querySelectorAll('a');
                let docsTT = "Документи:\n";
                docs.forEach((el, index) => {
                    if (index === 0) return;
                    docsTT += el.innerHTML + "\n";
                });
                let tooltip = docsTT;
                console.log(tooltip);
                aucTable.rows[index].cells[7].querySelector('a').setAttribute('title', tooltip);

            }
        });
    }
    delay(2500).then(() => cellTooltip());
    console.log(auctions);

}
main();