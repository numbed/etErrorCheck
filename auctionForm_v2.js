//v2
//work in progress
console.log("--------------------------------------------auctionForm v2");

if (commDateCheck() === true) {
    console.log("COMMISSION DATE");
    // auctionsCommission();
    // docNames(); //TESTING
} else if (commDateCheck() === false) {
    console.log("NOT COMMISSION DATE");
    // pubOrderCheck();
}

function commDateCheck() {
    console.log("--------------------------------------------commDateCheck()");
    let dateField = document.querySelector("#auctionDueDate").value;
    let today = new Date();
    let commDateSTR = dateField.split(".");
    let firstDate = new Date(commDateSTR[2], commDateSTR[1] - 1, commDateSTR[0]);
    let commDate = new Date(commDateSTR[2], commDateSTR[1] - 1, commDateSTR[0]);
    let date = new Date
    ();
    if (firstDate.getDay() == 1) {
        date = firstDate.getDate() - 3;
    } else {
        date = firstDate.getDate() - 1;
    }
    commDate.setDate(date);


    if (commDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        return true;
    } else {
        return false;
    }

}