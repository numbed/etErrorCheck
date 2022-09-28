function main() {
    let tableET = document.querySelector("tbody");
    let tableHead = document.querySelector("thead");
    const infoET = [];
    const duplicatedArray = [];
    const expiredArray = [];
    const warnArray = [];
    const upcommingArray = [];
    const commissionArray = [];
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
        //creating iframe for every row of the table without loading the according page
        if (!document.getElementById(tableET.rows[0].cells[0].innerText)) {
            for (let i = 0, row; row = tableET.rows[i]; i++) {
                const frame = document.createElement("iframe");
                frame.id = row.cells[0].innerText;
                frame.style.display = "none";

                row.cells[0].appendChild(frame);
            }
        }
    }

    //infoET.commission
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

    //infoET.subject
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

    //infoET.type
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

    //infoET.obekt
    function objectSplit(o) {
        let output = o.split("/");
        output = output[1].trim().split(" ").pop();
        return output;
    }

    //infoET.TP
    function tpSplit(t) {
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
            commissionArray.push(commObj);
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
            upcommingArray.push(infoObj);
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

    colorfullRowsOutput(expiredArray, "#59981A", "white"); //green
    colorfullRowsOutput(commissionArray, "#2f4050", "white"); //dark blue
    colorfullRowsOutput(warnArray, "#D1462F", "black"); //red
    colorfullRowsOutput(upcommingArray, "#e88031", "black"); //orange
    colorfullRowsOutput(duplicatedArray, "#344e41", "white"); //dark something

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
        containerWarn.style.color = "#D1462F";

        const containerExpired = document.createElement("span");
        containerExpired.id = "containerExpired";
        containerExpired.style.color = "#59981A";

        const containerOK = document.createElement("span");
        containerOK.id = "containerOK";
        containerOK.style.color = "#e88031";

        const containerCommission = document.createElement("span");
        containerCommission.id = "containerCommission";
        containerCommission.style.color = "#2f4050";

        div.appendChild(containerDupe);
        div.appendChild(containerExpired);
        div.appendChild(containerOK);
        div.appendChild(containerWarn);
        div.appendChild(containerCommission);

        tableHead.rows[1].cells[4].appendChild(div);
    }

    //auction front page info
    function frontPageInfo() {
        let duplicatedInfo = ("Дублирани: " + duplicatedArray.length + " | Публикуване: ");
        document.getElementById("containerDupe").innerText = duplicatedInfo;
        let expiredInfo = ("Минали: " + expiredArray.length + " | ");
        document.getElementById("containerExpired").innerText = expiredInfo;
        let warnInfo = ("Днес: " + warnArray.length + " | ");
        document.getElementById("containerWarn").innerText = warnInfo;
        let okInfo = ("Предстоящи: " + upcommingArray.length) + " | ";
        document.getElementById("containerOK").innerText = okInfo;
        let commInfo = ("Kомисии: " + commissionArray.length);
        document.getElementById("containerCommission").innerText = commInfo;
    }
    frontPageInfo();

    //open tabs for every auction in the according arrays
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
    auctionTabOpen(commissionArray, "назначаване на комисии");

    //loading iframes with auction page of the according arrays
    iframeLoad(upcommingArray);
    iframeLoad(warnArray);
    iframeLoad(commissionArray);

    function iframeLoad(array) {
        array.forEach(function (element) {
            for (let i = 0, row; row = tableET.rows[i]; i++) {
                if (element.number == tableET.rows[i].cells[0].innerText) {
                    document.getElementById(element.number).src = element.etLink;
                }
            }
        });
    }

    //check if upcomming auctions have published documentation
    for (let i = 0, row; row = tableET.rows[i]; i++) {
        let gish = document.getElementById(row.cells[0].innerText);
        gish.onload = function () {
            let links = gish.contentWindow.document.links;
            for (var i = 0; i < links.length; i++) {
                if (links[i].title.includes("Документация")) {
                    console.log(row.cells[0].innerText + " - публикувани документи");
                    row.cells[8].style.backgroundColor = "#59981A";
                }
            }
            //published documents counter
            //TO DO -- removes button "Публикувай" -- needs fixing
            row.cells[8].style.color = "white";
            // row.cells[8].style.fontSize  = "10px";
            row.cells[8].innerText = gish.contentWindow.document.querySelector("#auctionDocuments").querySelectorAll("a").length - 1;
        }
    }

    //check if commission is already assigned to the auction    
    commissionArray.forEach(function (element) {
        for (let i = 0, row; row = tableET.rows[i]; i++) {
            if (element.number == tableET.rows[i].cells[0].innerText) {
                let gish2 = document.getElementById(row.cells[0].innerText);
                gish2.onload = function () {
                    const el = gish2.contentWindow.document.querySelector("select.form-control.commision");
                    const el2 = gish2.contentWindow.document.querySelector("div.form-control");
                    if (el) { //if not NULL and auction has offers
                        console.log(row.cells[0].innerText + " " + el.value);
                        row.cells[8].style.backgroundColor = "#9eb3c6";
                    } else { //if NULL and auction doesn't have offers checks if there is assigned commision || TO BE TESTED FOR ERRORS WITH NO OFFERS AND NO COMMISSION ASSIGNED
                        if (el2.innerHTML != "") {
                            row.cells[8].style.backgroundColor = "#9eb3c6";
                            console.log("NULL " + el2.innerHTML);
                        }
                    }
                }
            }
        }
    });

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
    console.groupCollapsed("Deadlines: %c Минали: " + Object.keys(expiredArray).length + " | %c Днес: " + Object.keys(warnArray).length + " | %c Предстоящи: " + Object.keys(upcommingArray).length, "color:green;", "color:red;", "color:orange;");
    auctionConsoleOutput(expiredArray, "Минали");
    auctionConsoleOutput(warnArray, "Днес");
    auctionConsoleOutput(upcommingArray, "Предстоящи");
    console.groupEnd();
    console.groupCollapsed("Type check: наддаване: " + tArray.length + " | конкурс: " + kArray.length + " | ценово: " + cArray.length);
    auctionConsoleOutput(tArray, "наддаване");
    auctionConsoleOutput(kArray, "конкурс");
    auctionConsoleOutput(cArray, "еднократно ценово предложение");
    console.groupEnd();
    auctionConsoleOutput(commissionArray, "Комисии");
    auctionConsoleOutput(duplicatedArray, "Duplicates");

    // testing
    //published documents counter
    // row.cells[8].style.color = "white";
    // row.cells[8].innerText = gish.contentWindow.document.querySelector("#auctionDocuments").querySelectorAll("a").length - 1;

    /** working

        if (!document.getElementById(tableET.rows[0].cells[0].innerText)) {

            for (let i = 0, row; row = tableET.rows[i]; i++) {
                const frame = document.createElement("iframe");
                frame.id = row.cells[0].innerText;
                frame.style.display = "none";
                frame.onload = "access()";

                frame.src = infoET[i].etLink;
                row.cells[0].appendChild(frame);
            }
            for (let i = 0, row; row = tableET.rows[i]; i++) {
                let gish = document.getElementById(row.cells[0].innerText);
                gish.onload = function () {
                    // console.log(gish.contentWindow.document.getElementById('auctionStartPrice').value);
                    let links = gish.contentWindow.document.links;
                    for (var i = 0; i < links.length; i++) {
                        // console.log(links[i].title);
                        if (links[i].title.includes("Документация")) {
                            console.log(row.cells[0].innerText + " " + "True");
                            row.cells[8].style.backgroundColor = "#59981A";
                            // colorfullRowsOutput(upcommingArray, "#59981A", "black");
                        }
                    }
                }
            }
        }

        
        
        */
    //check if commission is already assigned to the auction
    //TO DO throws error if there are no offers in the auction
    // for (let i = 0, row; row = tableET.rows[i]; i++) {
    //     let gish2 = document.getElementById(row.cells[0].innerText);
    //     gish2.onload = function () {
    //         const el = gish2.contentWindow.document.querySelector("select.form-control.commision");
    //         if (el.value != "") {
    //             console.log(el.value);
    //             row.cells[8].style.backgroundColor = "#9eb3c6";
    //         } else if (el.value != "null") {
    //             console.log("null");
    //             const el2 = gish2.contentWindow.document.querySelector("div.form-control");
    //             if (el2.innerHTML != "") {
    //                 console.log("без оферти ->" + el2.innerHTML);
    //                 row.cells[8].style.backgroundColor = "#9eb3c6";
    //             } else {
    //                 console.log("без оферти -> не е назначена комисия");
    //             }
    //         } else {
    //             console.log("empty");

    //         }
    //     }
    // }
    // end of testing

}
main();