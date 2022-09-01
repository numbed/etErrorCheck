function main() {
    let tableET = document.querySelector("tbody");
    let tableHead = document.querySelector("thead");
    const infoET = {};
    const duplicatedArray = [];
    const expiredArray = [];
    const warnArray = [];
    const okArray = [];
    const commArray = [];
    let today = new Date();

    //collecting data from active tab table (infoET)
    for (let i = 0, row; row = tableET.rows[i]; i++) {
        infoET[i] = {
            number: row.cells[0].innerText,
            date: row.cells[2].innerText,
            deadline: calculateDeadline(row.cells[2].innerText),
            type: typeCheck(row.cells[4].innerText),
            subject: subjectCheck(row.cells[4].innerText),
            TP: tpSplit(row.cells[5].innerText),
            etLink: "https://auction.ucdp-smolian.com/au-admin/auctions/form/" + row.cells[0].innerText.slice(-4),
            obekt: objectSplit(row.cells[5].innerText),
            commission: commissionDate(row.cells[2].innerText)
        };
    }

    function commissionDate(c) { //infoET.commission
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

    function subjectCheck(s) { //infoET.subject
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

    function typeCheck(t) { //infoET.type
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

    function objectSplit(o) { //infoET.obekt
        let output = o.split("/");
        output = output[1].trim().split(" ").pop();
        return output;
    }

    function tpSplit(t) { //infoET.TP
        let output = t.split("/");
        output = output[0].trim().split(" ").pop();
        return output;
    }
    
    //calculating deadline based on first date of the auction
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

    //checking for type & subject errors
    //toDO
    let typeObj = {};
    let tArray = [];
    let kArray = [];
    let cArray = [];
    for (i = 0; i < Object.keys(infoET).length; i++) {
        typeObj = {
            number: infoET[i].number,
            TP: infoET[i].TP,
            date: infoET[i].date,
            deadline: infoET[i].deadline,
            etLink: infoET[i].etLink,
            obekt: infoET[i].obekt,
            type: infoET[i].type,
            subject: infoET[i].subject
        };
        if (infoET[i].type == "т") {
            tArray.push(typeObj);
        } else if (infoET[i].type == "к") {
            kArray.push(typeObj);
        } else if (infoET[i].type == "ецп") {
            cArray.push(typeObj);
        }
    }
    
    //commission date check
    for (i = 0; i < Object.keys(infoET).length; i++) {
        let commStr = infoET[i].commission.split(".");
        let commDate = new Date(commStr[2], commStr[1] - 1, commStr[0]);
        let commObj = {};
        commObj = {
            number: infoET[i].number,
            TP: infoET[i].TP,
            date: infoET[i].date,
            deadline: infoET[i].deadline,
            etLink: infoET[i].etLink,
            obekt: infoET[i].obekt,
            type: infoET[i].type,
            subject: infoET[i].subject
        };
        
        if (commDate.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
            commArray.push(commObj);
        }
    }

    //checking deadlines for publishing documentation
    for (i = 0; i < Object.keys(infoET).length; i++) {
        let ddlStr = infoET[i].deadline.split(".");
        let ddlDate = new Date(ddlStr[2], ddlStr[1] - 1, ddlStr[0]);
        let infoObj = {};
        infoObj = {
            number: infoET[i].number,
            TP: infoET[i].TP,
            date: infoET[i].date,
            deadline: infoET[i].deadline,
            etLink: infoET[i].etLink,
            obekt: infoET[i].obekt,
            type: infoET[i].type,
            subject: infoET[i].subject
        };

        if (ddlDate.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
            warnArray.push(infoObj);
        } else if (ddlDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
            expiredArray.push(infoObj);
        } else {
            okArray.push(infoObj);
        }
    }

    //checking for duplicated ET by date and TP (duplicatedArray)
    for (let i = 0; i < infoET.length; i++) {
        for (let j = 0; j < infoET.length; j++) {
            if (i !== j) {
                if (infoET[i].date === infoET[j].date && infoET[i].TP === infoET[j].TP) {
                    let obj = {
                        number: infoET[i].number,
                        number2: infoET[j].number,
                        TP: infoET[i].TP,
                        date: infoET[i].date,
                        deadline: infoET[i].deadline,
                        etLink: infoET[i].etLink,
                        obekt: infoET[i].obekt,
                        type: infoET[i].type,
                        subject: infoET[i].subject
                    };
                    duplicatedArray.push(obj);
                }
            }
        }
    }

    //removing second entry from the duplicate ET array (duplicatedArray)
    for (let i = 0; i < duplicatedArray.length; i++) {
        for (let j = 0; j < duplicatedArray.length; j++) {
            if (i !== j) {
                if (duplicatedArray[i].date == duplicatedArray[j].date && duplicatedArray[i].TP == duplicatedArray[j].TP) {
                    duplicatedArray.splice(j, 1);
                }
            }
        }
    }

    //coloring auctions page
    function colorfullRowsOutput(array, color, color2) {
        array.forEach(element => {
            for (let i = 0, row; row = tableET.rows[i]; i++) {
                if (row.cells[0].innerText == element.number) {
                    row.cells[8].style.backgroundColor = color;
                    // row.style.color = color2;
                    if (!row.cells[2].innerHTML.includes(" | ")) {
                        row.cells[2].innerHTML = row.cells[2].innerHTML + (" | ") + element.deadline.fontcolor(color).italics().bold();
                    }
                }
            }
        });
    }

    colorfullRowsOutput(expiredArray, "#D1462F", "white");
    colorfullRowsOutput(commArray, "#2f4050", "white");
    colorfullRowsOutput(warnArray, "#F8D210", "black");
    colorfullRowsOutput(okArray, "#59981A", "black");
    colorfullRowsOutput(duplicatedArray, "#344e41", "white");

    //auction front page info styling
    let predmet = tableHead.rows[1].cells[4];
    if (!predmet.innerText.includes("Дублирани")) {
        const div = document.createElement("div");
        div.id = "auctionsOutput";
        div.style.textAlign = "center";
        div.style.fontStyle = "italic";
        

        const containerDupe = document.createElement("span");
        containerDupe.id = "containerDupe";
        containerDupe.style.color = "#344e41";


        const containerWarn = document.createElement("span");
        containerWarn.id = "containerWarn";
        containerWarn.style.color = "#F8D210";
        
        
        const containerExpired = document.createElement("span");
        containerExpired.id = "containerExpired";
        containerExpired.style.color = "#D1462F";


        const containerOK = document.createElement("span");
        containerOK.id = "containerOK";
        containerOK.style.color = "#59981A";

        
        const containderComm = document.createElement("span");
        containderComm.id = "containderComm";
        containderComm.style.color = "#2f4050";
        

        div.appendChild(containerDupe);
        div.appendChild(containerExpired);
        div.appendChild(containerWarn);
        div.appendChild(containerOK);
        div.appendChild(containderComm);

        tableHead.rows[1].cells[4].appendChild(div);
    }

    //auction front page info
    function f1() {
        let duplicatedInfo = ("Дублирани: " + duplicatedArray.length + " | ");
        document.getElementById("containerDupe").innerText = duplicatedInfo;
        let expiredInfo = ("E: " + expiredArray.length + " | ");
        document.getElementById("containerExpired").innerText = expiredInfo;
        let warnInfo = ("W: " + warnArray.length + " | ");
        document.getElementById("containerWarn").innerText = warnInfo;
        let okInfo = ("OK: " + okArray.length) + " | ";
        document.getElementById("containerOK").innerText = okInfo;
        let commInfo = ("Kомисии: " + commArray.length);
        document.getElementById("containderComm").innerText = commInfo;
    }
    f1();
    
    
    function auctionTabOpen(array, text) {
        if (array.length !== 0) {
            if (confirm('Търгове за ' + text + ': ' + array.length + "\r\nОтвори?")) {
                console.log("OK");
                for (i = 0; i < array.length; i++) {
                    window.open(array[i].etLink, '_blank');
                }
            }
        }
    }
    auctionTabOpen(warnArray, "публкуване на документация");
    auctionTabOpen(commArray, "назначаване на комисии");

    //console output function
    function auctionConsoleOutput(array, type) {
        if (array.length !== 0) {
            console.groupCollapsed(type + ": " + array.length);
            array.forEach(element => {
                let n2 = ""
                if (element.number2 !== undefined) {
                    n2 = element.number2;
                } else {
                    n2 = "";
                }
                let info = element.number + " " + n2 + " " + " | " + element.TP + " " + element.obekt + " | " + element.type + element.subject + "\r\n" + element.date + " срок: " + element.deadline + "\r\n" + element.etLink;
                console.log(info);
            });
        } else {
            console.groupCollapsed(type + ": " + array.length);
        }
        console.groupEnd();
    }

    console.groupCollapsed("Deadlines: %c E: " + Object.keys(expiredArray).length + " | %c W: " + Object.keys(warnArray).length + " | %c OK: " + Object.keys(okArray).length, "color:red;", "color:orange;", "color:green;");
    auctionConsoleOutput(expiredArray, "Expired");
    auctionConsoleOutput(warnArray, "Warning");
    auctionConsoleOutput(okArray, "OK");
    console.groupEnd();
    console.groupCollapsed("Type check: наддаване: " + tArray.length + " | конкурс: " + kArray.length + " | ценово: " + cArray.length);
    auctionConsoleOutput(tArray, "наддаване");
    auctionConsoleOutput(kArray, "конкурс");
    auctionConsoleOutput(cArray, "еднократно ценово предложение");
    console.groupEnd();
    auctionConsoleOutput(commArray, "Комисии");
    auctionConsoleOutput(duplicatedArray, "Duplicates");




    // testing
    for (let i = 0, row; row = tableET.rows[i]; i++) {
        const k = document.createElement("span");
        row.cells[0].appendChild(k);
    }


    // function f2() {
    //     if (document.getElementById("auctioniFrame") == null) {
    //         for (i = 0; i < 5; i++) {
    //             let footer = document.querySelector(".footer");
    //             let iframe = document.createElement("iframe");
    //             // iframe.style.display = "none";
    //             let id = okArray[2].number;
    //             iframe.id = id;
    //             iframe.src = okArray[2].etLink;
    //             footer.appendChild(iframe);
    //             console.log(document.getElementById('auctioniFrame').contentWindow.document.getElementById('auctionStartPrice').value);
    //         }
    //     }
    // }
    // f2();




    // end of testing
    
}
main();