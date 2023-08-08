//v2
//work in progress
console.log("--------------------------------------------auctionForm v2");

function dateCheck() {
    console.log("--------------------------------------------dateCheck()");
    let dateField = document.querySelector("#auctionDueDate").value.split(".");
    let today = new Date();
    let nextWorkDay = new Date();
    let firstDate = new Date(dateField[2], dateField[1] - 1, dateField[0]);

    if (today.getDay() === 5) {
        nextWorkDay.setDate(today.getDate() + 3);
    } else {
        nextWorkDay.setDate(today.getDate() + 1);
    }

    if (firstDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        console.log("today");
        console.log("cancelOrderCheck()");
    } else if (firstDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
        console.log("before today");
        console.log("pubOrder()");
        console.log("auctionSave()");        
    } else if (firstDate.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0) && firstDate.setHours(0, 0, 0, 0) === nextWorkDay.setHours(0, 0, 0, 0)) {
        console.log("commission Day");
        console.log("auctionsCommission()");
        console.log("pubOrder()");
    } else {
        console.log("after today");
        console.log("cancelOrderCheck()");
    }
}
dateCheck();