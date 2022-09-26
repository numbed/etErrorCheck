    console.log("test");
    console.log("Archimed Docs");
    let t = document.querySelectorAll("tbody");
    let table = t[1];
    const docs = [];
    const todayArray = [];
    let today = new Date();

    //collecting data from active tab table (docs)
    for (let i = 0, row; row = table.rows[i]; i++) {
        docs[i] = {
            number: docNumber(row.cells[0].innerText),
            date: docDate(row.cells[0].innerText),
            fullcell: row.cells[0].innerText
        };
    }

    function docNumber(n) {
        let output = n.split("|");
        output = output[0].trim().split(" ").pop();
        return output;
    }

    function docDate(d) {
        let output = d.split("|");
        output = output[1].trim().split("\n").shift();
        return output;
    }

    //checking if date is TODAY
    for (i = 0; i < Object.keys(docs).length; i++) {
        let ddlStr = docs[i].date.split(".");
        let ddlDate = new Date(ddlStr[2], ddlStr[1] - 1, ddlStr[0]);
        let infoObj = {};
        infoObj = {
            number: docs[i].number,
            date: docs[i].date,
            fullcell: docs[i].fullcell,
        
        };

        if (ddlDate.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
            todayArray.push(infoObj);
        }
    }

        //coloring rows
        function colorfullRowsOutput(array, color, color2) {
            array.forEach(element => {
                for (let i = 0, row; row = table.rows[i]; i++) {
                    if (row.cells[0].innerText == element.fullcell) {
                        row.style.backgroundColor = color;
                        // row.style.color = color2;
                    }
                }
            });
        }
    
        colorfullRowsOutput(todayArray, "#a5e566", "white"); //green
       