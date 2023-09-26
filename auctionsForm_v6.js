console.clear();
console.log('form_v6');

function main() {
    if (auctionDocuments.includes('прекратяване')) {
        // get cancelation order name and date of upload!!!! then copies info to clipboard and clicks cancel auction button
    }
    if (auctionDateCheck() === 'future') {

        if (infoFieldsEmptyIsTrue()) {
            // set guarantee 
            // fill info fields
        }
        if (filesToUploadIsTrue()){
            ooNumberCheck();
        }
        
        
        saveAuction();
        
    } else if (auctionDateCheck() === 'today') {
        nameDocuments();


        saveAuction();
        
    } else if (auctionDateCheck() === 'passed') {
        nameDocuments('passed');
        
    } else if (auctionDateCheck() === 'commission') {
        ooNumberCheck();
        assingCommission();
        assignCommOrderInfo();
        nameDocuments('commission');
    }
}

let today = new Date();

function auctionDateCheck() {
    let firstDate = document.querySelector('#auctionDueDate').value.split(".");
    let deadlineDate = deadlineCheck(firstDate);
    let commissionDate = commissionDateCheck(firstDate);

    if (deadlineDate.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
        return "today";
    } else if (deadlineDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) && commissionDate.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
        return "commission";
    } else if (deadlineDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
        return "passed";
    } else {
        return "future";
    }
}
auctionDateCheck();

// called in auctionDateCheck(el) && showDeadline()
function deadlineCheck(date) {
    let firstDate = new Date(date[2], date[1] - 1, date[0]);
    let deadlineDate = new Date(firstDate);

    if (firstDate.getDay() == 1 || firstDate.getDay() == 4) {
        deadlineDate.setDate(firstDate.getDate() - 20);
    } else if (firstDate.getDay() == 2 || firstDate.getDay() == 5) {
        deadlineDate.setDate(firstDate.getDate() - 18);
    } else if (firstDate.getDay() == 3) {
        deadlineDate.setDate(firstDate.getDate() - 19);
    }

    return deadlineDate;
}

// called in auctionDateCheck(el)
function commissionDateCheck(date) {
    let firstDate = new Date(date[2], date[1] - 1, date[0]);
    let commissionDate = new Date(firstDate);

    if (firstDate.getDay() == 1) {
        commissionDate.setDate(firstDate.getDate() - 3);
    } else {
        commissionDate.setDate(firstDate.getDate() - 1);
    }

    return commissionDate;
}