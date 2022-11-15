function main() {
    console.clear();
    //js new line in string?
    let auctionsTable = document.querySelector("tbody");
    document.querySelector("thead").rows[1].cells[3].innerText = "Краен срок\n за публикуване";
    const auctions = [];
    let today = new Date();
    let number, date, subject, branch;

    //collecting data from active tab table (auctions)
    function auctionDataCollect() {
        for (let i = 0, row; row = auctionsTable.rows[i]; i++) {
            number = row.cells[0].innerText;
            date = row.cells[2].innerText;
            subject = row.cells[4].innerText;
            branch = row.cells[5].innerText;

            auctions[i] = {
                number: number,
                date: date,
                deadline: calculateDeadline(date),
                type: typeCheck(subject),
                subject: subjectCheck(subject),
                branch: branchCheck(branch),
                etLink: "https://auction.ucdp-smolian.com/au-admin/auctions/form/" + number.slice(-4),
                object: objectCheck(branch),
                commission: commissionDate(date),
                status: statusCheck(calculateDeadline(date), commissionDate(date))
            };
        }
    }
    auctionDataCollect();

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
    function subjectCheck(s) {
        let output;
        if (s.includes("действително")) {
            output = "ДД";
        } else if (s.includes("корен")) {
            output = "K";
        } else if (s.includes("прогнозни")) {
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
        output = output[1].trim().split(" ").pop();
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

        if (firstDate.getDay() == 1) {
            deadline = firstDate.getDate() - 20;
        } else if (firstDate.getDay() == 2) {
            deadline = firstDate.getDate() - 18;
        } else if (firstDate.getDay() == 3) {
            deadline = firstDate.getDate() - 19;
        } else if (firstDate.getDay() == 4) {
            deadline = firstDate.getDate() - 20;
        } else if (firstDate.getDay() == 5) {
            deadline = firstDate.getDate() - 18;
        } else if (firstDate.getDay() == 6 || firstDate.getDay() == 0) {}

        deadlineDate.setDate(deadline);
        let output = new Date();
        output = deadlineDate.getDate() + "." + (deadlineDate.getMonth() + 1) + "." + deadlineDate.getFullYear();
        return output;
    }

    //auctions.status
    function statusCheck(dead, comm) {
        let deadlineDateString = dead.split(".");
        let deadline = new Date(deadlineDateString[2], deadlineDateString[1] - 1, deadlineDateString[0]);
        let commissionDateString = comm.split(".");
        let commission = new Date(commissionDateString[2], commissionDateString[1] - 1, commissionDateString[0]);
        let output;

        if (deadline.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
            output = "today";
        } else if (deadline.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) && commission.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
            output = "commission";
        } else if (deadline.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
            output = "passed";
        } else {
            output = "upcomming";
        }

        return output;
    }

    //creating iframes for every auction on page
    function iframeCreation() {
        for (let i = 0, row; row = auctionsTable.rows[i]; i++) {
            if (!document.getElementById(auctionsTable.rows[0].cells[0].innerText)) {
                for (let i = 0, row; row = auctionsTable.rows[i]; i++) {
                    const frame = document.createElement("iframe");
                    frame.id = row.cells[0].innerText;
                    frame.style.display = "none";
                    row.cells[0].appendChild(frame);
                }
            }
        }
    }
    iframeCreation();

    //check if commission is already assigned to the auction 
    function assingedCommissionCheck() {
        auctions.forEach(function (element) {
            for (let i = 0, row; row = auctionsTable.rows[i]; i++) {
                if ((element.number == row.cells[0].innerText) && (element.status == "commission")) {
                    let lastCell = row.cells[8];
                    let iFrame = document.getElementById(element.number);
                    iFrame.src = element.etLink;
                    iFrame.onload = function () {
                        const comm1 = iFrame.contentWindow.document.querySelector("select.form-control.commision");
                        const comm2 = iFrame.contentWindow.document.querySelector("div.form-control");
                        if (comm1.value != "") {
                            console.log("comm1");
                            lastCell.style.backgroundColor = "#9eb3c6";
                        } else if (!comm1) {
                            if (comm2.innerHMTL != "") {
                                console.log("comm2");
                                lastCell.style.backgroundColor = "#9eb3c6";
                            }
                        } else {
                            lastCell.style.backgroundColor = "#2f4050";
                        }
                    }
                }
            }
        });
    }
    assingedCommissionCheck();

    //check if upcomming auctions have published documentation
    function upcommingAuctionsCheck() {
        auctions.forEach(function (element) {
            if (element.status == "upcomming" || element.status == "today") {
                for (let i = 0, row; row = auctionsTable.rows[i]; i++) {
                    if (element.number == row.cells[0].innerText) {
                        let lastCell = row.cells[8];
                        let iFrame = document.getElementById(element.number);
                        iFrame.src = element.etLink;
                        iFrame.onload = function () {
                            let links = iFrame.contentWindow.document.links;
                            for (i = 0; i < links.length; i++) {
                                if (links[i].title.includes("Документация")) {
                                    lastCell.style.backgroundColor = "#81B622";
                                    row.style.color = "#676a6c";
                                    row.style.fontWeight = "normal";
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    upcommingAuctionsCheck();

    //error check for duplicates and wrong type of auction
    function errorCheck() {
        auctions.forEach(function () {
            for (let i = 0; i < auctions.length; i++) {
                //auction type check
                if (auctions[i].type == "к" || auctions[i].type == "ецп" || auctions[i].subject == "ДД") {
                    auctionsTable.rows[i].style.backgroundColor = "black";
                    auctionsTable.rows[i].style.color = "white";
                }
                if (auctions[i].subject == "K") {
                    auctionsTable.rows[i].cells[4].innerHTML = "Електронен търг с наддаване за продажба на стояща дървесина на <b>корен</b>";

                }
                if (auctions[i].subject == "ДД") {
                    auctionsTable.rows[i].cells[4].innerHTML = "Електронен търг с наддаване за продажба на <b>действително добити</b> количества";

                }
                if (auctions[i].subject == "П") {
                    auctionsTable.rows[i].cells[4].innerHTML = "Електронен търг с наддаване за продажба на добита дървесина на <b>прогнозни</b> количества";

                }
                //duplicate check by date and branch
                for (let j = 0; j < auctions.length; j++) {
                    if (i !== j) {
                        if (auctions[i].date === auctions[j].date && auctions[i].branch === auctions[j].branch) {
                            auctionsTable.rows[i].style.backgroundColor = "#B21368";
                            auctionsTable.rows[i].style.color = "#EFD3B5";
                        }
                    }
                }
            }
        });
    }
    errorCheck();

    //coloring auctions page
    function colorRow() {
        auctions.forEach(element => {
            for (let i = 0, row; row = auctionsTable.rows[i]; i++) {
                if (row.cells[0].innerText == element.number) {
                    let dateCell = row.cells[3];
                    let lastCell = row.cells[8];
                    if (!dateCell.innerHTML.includes(" | ")) {
                        if (element.status == "passed") {
                            lastCell.style.backgroundColor = "#81B622";
                            dateCell.innerHTML = element.deadline.fontcolor("#81B622").italics().bold();
                        } else if (element.status == "today") {
                            lastCell.style.backgroundColor = "#D1462F";
                            row.style.color = "#D1462F";
                            row.style.fontWeight = "bold";
                            dateCell.innerHTML = element.deadline.fontcolor("#D1462F").italics().bold();
                        } else if (element.status == "upcomming") {
                            lastCell.style.backgroundColor = "#e88031";
                            row.style.color = "#e88031";
                            // row.style.fontWeight = "bold";
                            dateCell.innerHTML = element.deadline.fontcolor("#e88031").italics().bold();
                        } else if (element.status == "commission") {
                            lastCell.style.backgroundColor = "#2f4050";
                            row.style.color = "#2f4050";
                            // row.style.fontWeight = "bold";
                            dateCell.innerHTML = element.deadline.fontcolor("#2f4050").italics().bold();
                        }
                    }
                }
            }
        });
    }
    colorRow();

    //open tabs for every auction with deadline or commission
    function auctionsTabOpen(status, confirmText) {
        const isFound = auctions.some(element => {
            if (element.status == status) {
                return true; 
            } else {
                return false;
            }
        });
        
        if (isFound) {
            if (confirm(confirmText + " " + statusCounter(status))) {
                auctions.forEach(element => {
                    if (element.status == status) {
                        window.open(element.etLink, "_blank");
                    }
                });
            }
        }
    }

    //count number of auctions with specific status
    function statusCounter(s){
        let counter = 0;
        auctions.forEach(element => {
            if (element.status == s) {counter++;}
        });
        return counter;
    }

    auctionsTabOpen("upcomming", "Отвори предстоящи търгове?");
    auctionsTabOpen("today", "Отвори търгове с краен срок за публикуване днес?");
    auctionsTabOpen("commission", "Отвори търгове за назначаване на комисии?");

    //check if auction has published contract
    function contractCheck() {
        if (confirm("Проверка за публикувани договори?")) {
            auctions.forEach(function (element) {
                if (element.status == "passed") {
                    for (let i = 0, row; row = auctionsTable.rows[i]; i++) {
                        if (element.number == row.cells[0].innerText) {
                            let lastCell = row.cells[8];
                            let iFrame = document.getElementById(element.number);
                            iFrame.src = element.etLink;
                            iFrame.onload = function () {
                                let links = iFrame.contentWindow.document.links;
                                for (i = 0; i < links.length; i++) {
                                    if (links[i].title.includes("Договор")) {
                                        lastCell.style.backgroundColor = "#3D550C";
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    contractCheck();

    // console.log(auctions[0].number + ' ' + auctions[0].status);
    // console.log(auctions[16].number + " " + auctions[16].status);
    // console.log(auctions[18].number + " " + auctions[18].status);

}
main();