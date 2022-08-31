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

    //outputs only bellow
    //Duplicate output
    if (duplicatedArray.length !== 0) {
        console.group("%cDuplicates: " + duplicatedArray.length, "color:red");
        for (let i = 0; i < duplicatedArray.length; i++) {
            let duplicateInfo = duplicatedArray[i].date + " | " + duplicatedArray[i].TP + " - " + duplicatedArray[i].number + " | " + duplicatedArray[i].number2;
            console.error("\r\n" + duplicateInfo);
        }
    } else {
        console.groupCollapsed("%cDuplicates: " + duplicatedArray.length + " | NOT FOUND", "color:green");
    }
    console.groupEnd(); //Duplicate output groupe end

    //Deadlines output
    console.groupCollapsed("Deadlines: %c W: " + Object.keys(warnArray).length + " | %c E: " + Object.keys(expiredArray).length + " | %c OK: " + Object.keys(okArray).length, "color:orange;", "color:red;", "color:green;");
    //Warning output
    if (Object.keys(warnArray).length !== 0) {
        console.groupCollapsed("%c Warning: " + Object.keys(warnArray).length, "color:orange");
        for (let i = 0; i < Object.keys(warnArray).length; i++) {
            let warnInfo = warnArray[i].number + " | " + warnArray[i].TP + " " + warnArray[i].obekt + " | " + warnArray[i].date + " срок: " + okArray[i].deadline + "\r\n" + warnArray[i].etLink;
            console.warn(warnInfo);
        }

        if (confirm('Търгове за публикуване на документации: ' + warnArray.length + "\r\nОтвори?")) {
            console.log("OK");
            for (i = 0; i < warnArray.length; i++) {
                window.open(warnArray[i].etLink, '_blank');
            }
        }
    } else {
        console.groupCollapsed("%c Warnings: " + Object.keys(warnArray).length, "color:green");
    }
    console.groupEnd(); //Warning output group end

    //Expired output
    if (Object.keys(expiredArray).length !== 0) {
        console.groupCollapsed("%c Expired: " + Object.keys(expiredArray).length, "color:red");
        for (let i = 0; i < Object.keys(expiredArray).length; i++) {
            let expiredInfo = expiredArray[i].number + " | " + expiredArray[i].TP + " " + expiredArray[i].obekt + " | " + expiredArray[i].date + " срок: " + expiredArray[i].deadline + "\r\n" + expiredArray[i].etLink;
            console.error(expiredInfo);
        }
    } else {
        console.groupCollapsed("%c Expired: " + Object.keys(expiredArray).length, "color:green");
    }
    console.groupEnd(); //Expired output group end
    //OK output
    if (Object.keys(okArray).length !== 0) {
        console.groupCollapsed("%c OK: " + Object.keys(okArray).length, "color:green");
        for (let i = 0; i < Object.keys(okArray).length; i++) {
            let okInfo = okArray[i].number + " | " + okArray[i].TP + " " + okArray[i].obekt + " | " + okArray[i].date + " срок: " + okArray[i].deadline + "\r\n" + okArray[i].etLink;
            console.info("%c" + okInfo, "color:green");
        }
    } else {
        console.groupCollapsed("%c Warnings: " + Object.keys(okArray).length, "color:green");
    }
    console.groupEnd(); //OK output group end
    console.groupEnd(); //Deadline output group end


    //auction type output
    console.groupCollapsed("Type check: наддаване: " + tArray.length + " | конкурс: " + kArray.length + " | ценово: " + cArray.length);
    //konkurs type output
    console.group("конкурс : " + kArray.length);
    if (kArray.length != 0) {
        for (i = 0; i < kArray.length; i++) {
            console.log(kArray[i].number + " | " + kArray[i].type + "_" + kArray[i].subject + " | " + kArray[i].TP + " " + kArray[i].obekt);
        }
    }
    console.groupEnd(); //konkurs type output end
    //ednokratno cenovo predlojenie type output
    console.group("ценово : " + cArray.length);
    if (cArray.length != 0) {
        for (i = 0; i < cArray.length; i++) {
            console.log(cArray[i].number + " | " + cArray[i].type + "_" + cArray[i].subject + " | " + cArray[i].TP + " " + cArray[i].obekt);
        }
    }
    console.groupEnd(); //ednokratno cenovo predlojenie type output end
    //TTN type output
    console.group("наддаване : " + tArray.length);
    if (tArray.length != 0) {
        for (i = 0; i < tArray.length; i++) {
            console.log(tArray[i].number + " | " + tArray[i].type + "_" + tArray[i].subject + " | " + tArray[i].TP + " " + tArray[i].obekt);
        }
    }
    console.groupEnd(); //TTN type output end
    console.groupEnd(); //auction type output end

    //commission date output
    if (commArray.length != 0) {
        console.groupCollapsed("Commissions: " + commArray.length + " | " + today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear());
        for (i = 0; i < commArray.length; i++) {
            console.log(commArray[i].number + " | " + commArray[i].TP + " | " + commArray[i].obekt + " | " + commArray[i].date + "\r\n" + commArray[i].etLink);
        }
        if (confirm('Търгове за назначаване на комисии: ' + commArray.length + "\r\nОтвори?")) {
            console.log("OK");
            for (i = 0; i < commArray.length; i++) {
                window.open(commArray[i].etLink, '_blank');
            }
        }
    }
    console.groupEnd(); //commission date output end

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
    colorfullRowsOutput(warnArray, "#fee440", "black");
    colorfullRowsOutput(okArray, "#59981A", "black");
    colorfullRowsOutput(duplicatedArray, "#344e41", "white");

    let predmet = tableHead.rows[1].cells[4];
    if (!predmet.innerText.includes("Дублирани")) {
        const div = document.createElement("div");
        div.id = "auctionsOutput";
        div.style.textAlign = "center";
        div.style.fontStyle = "italic";
        const node = document.createTextNode("Дублирани: " + duplicatedArray.length +
            " | " + "W: " + warnArray.length +
            " | " + "E: " + expiredArray.length +
            " | " + "OK: " + okArray.length +
            " | " + "Комисии: " + commArray.length);
        div.appendChild(node);
        tableHead.rows[1].cells[4].appendChild(div);
    }

    /*for testing purposes*/

    /**
     var x = document.createElement("a");
     x.id = "commissionButton";
     x.text = "Комисии: " + commArray.length;
     //x.setAttribute("onclick", "for (i = 0; i < 20; i++) {console.log('clicked');}");
     tableHead.rows[1].cells[5].appendChild(x);
    */
    if (document.getElementById("deadlineDateOutput0") == null) {
        for (i = 0; i < 20; i++) {
            const deadDateDiv = document.createElement("div");
            deadDateDiv.setAttribute("id", "deadlineDateOutput" + i)
            const xxx = document.createTextNode(" ");
            tableET.rows[i].cells[0].appendChild(deadDateDiv).appendChild(xxx);
        }
    }

    function colorfullRowsOutput2(array, color, color2) {
        array.forEach(element => {
            for (let i = 0, row; row = tableET.rows[i]; i++) {
                if (row.cells[0].innerText == element.number && !row.cells[2].innerHTML.includes(" | ")) {
                    row.cells[7].style.backgroundColor = color;
                    // row.style.color = color2;
                    //row.cells[2].innerHTML = row.cells[2].innerHTML + (" | ") + element.deadline.fontcolor(color).italics().bold();
                    const ddText = element.number;

                    let z = "deadlineDateOutput" + i;
                    console.log(z);
                    document.getElementById(z).innerText = ddText;


                }
            }
        });
    }
    colorfullRowsOutput2(okArray, "#59981A", "black");


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
                let info = element.number + " " + n2 + " " + " | " + element.TP + " " + element.obekt + " | " + element.date + " срок: " + element.deadline + "\r\n" + element.etLink;
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
  //  console.groupCollapsed("Duplicates: " + duplicatedArray.length);
    auctionConsoleOutput(duplicatedArray, "Duplicates");
   // console.groupEnd();


    /*for testing purposes*/

}
main();