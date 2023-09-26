let auctionsTable = document.querySelector('tbody').querySelectorAll('tr');
let leftSideNavigation = document.querySelector('.navbar-default.navbar-static-side');
let today = new Date();
let auctions = [];

checkUnnamedFiles()

function checkUnnamedFiles() {
    auctionsTable.forEach(row => {
        let subjectCell = row.cells[4].innerText;
        let auctionLink = row.cells[7].querySelector('a').href

        if (subjectCell.includes('pdf') || subjectCell.includes('rar')) {
            console.log(row.cells[0].innerText, "unnamed docs");
        }
        if (subjectCell.includes('изпълнител')) {
            console.log(row.cells[0].innerText, "изпълнител");
        }
        if ((subjectCell.match(/откриване/g) || []).length > 1) {
            console.log(row.cells[0].innerText, "изпълнител");
        }
        if (!subjectCell.includes('Договор') && !subjectCell.includes('прекратяване')) {
            console.log(row.cells[0].innerText, "договор");
        }

    })
}


// called in main()
function checkForUnnamedFiles() {
    console.log("-------------------------------------------------------checkForUnnamedFiles()");
    let docsWithNameErrorsArray = [];
    let cancelOrderArray = [];
    for (let i = 0, row; row = auctionsTable.rows[i]; i++) {
        let titleCell = row.cells[5].innerHTML;
        let auctionLink = row.cells[7].querySelector('a').href;
        let info = [];
        let obj = {}


        if (titleCell.includes('pdf') || titleCell.includes('rar')) {
            obj = {
                number: row.cells[0].innerText,
                error: "неименувани документи",
                link: auctionLink,
                count: (titleCell.includes('pdf') || []).length
            }
            docsWithNameErrorsArray.push(obj);
            // alert(row.cells[0].innerText + " unnamed files");
            // window.open(auctionLink, "_blank");
        }
        if ((titleCell.match(/откриване/g) || []).length > 1) {
            obj = {
                number: row.cells[0].innerText,
                error: "Заповед за откриване",
                link: auctionLink,
                count: (titleCell.match(/откриване/g) || []).length
            }
            docsWithNameErrorsArray.push(obj);
            // alert(row.cells[0].innerText + " more than one 'Заповед за откриване'" + " [" + (titleCell.match(/откриване/g) || []).length + "]");
            // window.open(auctionLink, "_blank");
        }
        if (titleCell.includes("прекратяване")) {

            let obj = {
                number: row.cells[0].innerText,
                link: auctionLink
            }
            cancelOrderArray.push(obj);
        }
        if (titleCell.includes('изпълнител')) {
            obj = {
                number: row.cells[0].innerText,
                error: "Заповед за изпълнител",
                link: auctionLink,
                count: (titleCell.includes('изпълнител') || []).length
            }
            docsWithNameErrorsArray.push(obj);
            // alert(row.cells[0].innerText + " Заповед за изпълнител");
            // window.open(auctionLink, "_blank");
        }
        if (!titleCell.includes("Договор") && !titleCell.includes("прекратяване")) {
            obj = {
                number: row.cells[0].innerText,
                error: "липсва договор",
                link: auctionLink,
                count: ((!titleCell.includes("Договор") && !titleCell.includes("прекратяване")) || []).length
            }
            docsWithNameErrorsArray.push(obj);
            // let obj = {
            //     number: row.cells[0].innerText,
            //     link: auctionLink
            // }
            // docsWithNameErrorsArray.push(obj);
        }
    }

    //checks if there are auctions with errors stored in the array
    if (docsWithNameErrorsArray.length > 0) {
        let confirmText = "";
        docsWithNameErrorsArray.forEach(el => {
            if (el.count != undefined) {
                confirmText += "\n" + el.number + " - " + el.error + " - " + el.count;
            } else {
                confirmText += "\n" + el.number + " - " + el.error;
            }
        });

        //removing duplicate numbers so that each auction tab is only opened once
        let newArray = [];
        let uniqueObject = {};
        for (let i in docsWithNameErrorsArray) {
            let objNumber = docsWithNameErrorsArray[i]['number'];
            uniqueObject[objNumber] = docsWithNameErrorsArray[i];
        }
        for (i in uniqueObject) {
            newArray.push(uniqueObject[i]);
        }

        //tab opening after confirmation
        if (confirm("[" + docsWithNameErrorsArray.length + "]" + confirmText)) {
            console.log("🚀 ~ file: auctions_v2.js:732 ~ checkForUnnamedFiles ~ newArray:", newArray)
            newArray.forEach(el => {
                window.open(el.link, "_blank");
            });
        }
    }
}