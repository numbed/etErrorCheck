function main() {

    let tableET = document.querySelector("tbody");
    const infoET = {};
    const arrayET = [];
    const duplicateArray2 = [];
    const expiredArray = [];
    const warnArray = [];
    const okArray = [];
    let today = new Date();
    let pubDate = "";

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
            obekt: objectSplit(row.cells[5].innerText)
        };
        arrayET.push(infoET[i]);
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
    console.groupEnd();

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
            type: infoET[i].type,
            subject: infoET[i].subject,
            obekt: infoET[i].obekt
        };
        if (infoET[i].type == "т") {
            tArray.push(typeObj);
        } else if (infoET[i].type == "к") {
            kArray.push(typeObj);
        } else if (infoET[i].type == "ецп") {
            cArray.push(typeObj);
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
            date: pubDate,
            deadline: infoET[i].deadline,
            etLink: infoET[i].etLink,
            obekt: infoET[i].obekt
        };

        if (ddlDate.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
            warnArray.push(infoObj);
        } else if (ddlDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
            expiredArray.push(infoObj);
        } else {
            okArray.push(infoObj);
        }
    }

    //checking for duplicated ET by date and TP (duplicateArray2)
    for (let i = 0; i < arrayET.length; i++) {
        for (let j = 0; j < arrayET.length; j++) {
            if (i !== j) {
                if (arrayET[i].date === arrayET[j].date && arrayET[i].TP === arrayET[j].TP) {
                    let obj = {
                        date: arrayET[i].date,
                        TP: arrayET[i].TP,
                        number1: arrayET[i].number,
                        number2: arrayET[j].number
                    };
                    duplicateArray2.push(obj);
                }
            }
        }
    }

    //removing second entry from the duplicate ET array (duplicateArray2)
    for (let i = 0; i < duplicateArray2.length; i++) {
        for (let j = 0; j < duplicateArray2.length; j++) {
            if (i !== j) {
                if (duplicateArray2[i].date == duplicateArray2[j].date && duplicateArray2[i].TP == duplicateArray2[j].TP) {
                    duplicateArray2.splice(j, 1);
                }
            }
        }
    }

    //OUTPUT only BELLOW
    //Duplicate output
    if (duplicateArray2.length !== 0) {
        console.group("%cDuplicates: " + duplicateArray2.length, "color:red");
        for (let i = 0; i < duplicateArray2.length; i++) {
            let duplicateInfo = duplicateArray2[i].date + " | " + duplicateArray2[i].TP + " - " + duplicateArray2[i].number1 + " | " + duplicateArray2[i].number2;
            console.error("\r\n" + duplicateInfo);
        }
    } else {
        console.groupCollapsed("%cDuplicates: " + duplicateArray2.length + " | NOT FOUND", "color:green");
    }
    console.groupEnd(); //Duplicate output groupe end


    //Deadlines output
    console.groupCollapsed("Deadlines: %c W: " + Object.keys(warnArray).length + " | %c E: " + Object.keys(expiredArray).length + " | %c OK: " + Object.keys(okArray).length, "color:orange;", "color:red;", "color:green;");
    //Warning output
    if (Object.keys(warnArray).length !== 0) {
        console.groupCollapsed("%c Warning: " + Object.keys(warnArray).length, "color:orange");
        for (let i = 0; i < Object.keys(warnArray).length; i++) {
            let warnInfo = warnArray[i].number + " | " + warnArray[i].TP + " " + warnArray[i].obekt + " | " + warnArray[i].date + " срок: " + warnArray[i].deadline + "\r\n" + warnArray[i].etLink;
            console.warn(warnInfo);
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


}
main();
