//v3-20230823-1

console.clear();
console.log("history check v2");
let today = new Date();
let table = document.querySelector('tbody').querySelectorAll('tr');

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function john() {
    let frameCounter = 0;
    const counts = {};
    table.forEach((el, index, array) => {
        //select rows that are not in 'danger' (danger means that auction is canceled)
        if (el.className != 'danger') {
            let dateCell = el.cells[4].innerText.split(" ")[0];
            el.id = (dateCheck(dateCell));

            counts[el] = (counts[el] || 0) + 1; //counts acutions not in danger
            let auctionLink = el.cells[8].querySelector('a').href;

            const iFrame = document.createElement('iFrame');
            iFrame.id = el.cells[0].innerText;
            iFrame.style.display = 'none';

            //appends iFrame element if missing, else reloads frame in first cell on the row
            if (el.cells[0].querySelector("iFrame") === null) {
                el.cells[0].appendChild(iFrame);
                iFrame.src = auctionLink;
            } else {
                el.cells[0].querySelector("iFrame").contentWindow.location.reload();
                el.cells[8].style.backgroundColor = "gray";
            }

            iFrame.onload = function () {
                if (iFrame.contentWindow.document.querySelectorAll("label")[10].closest('div').querySelectorAll('tr').length > 0) {
                    el.cells[8].style.backgroundColor = "green";
                    el.className = 'green';
                } else {
                    el.cells[8].style.backgroundColor = "red";
                    el.className = 'red';
                }

                frameCounter++;
                //check if all iFrames are loaded before executing more functions
                if (index === array.length - 1) {

                    delay(2500).then(() => tabOpen());
                }
            }
        }
    });
    console.log("🚀 ~ file: Untitled-1:46 ~ counts:", counts);
}
john();

function tabOpen() {
    let order = "https://auction.ucdp-smolian.com/au-admin/history/erasedOrder/";
    let protocol = "https://auction.ucdp-smolian.com/au-admin/history/erasedProtocol/";
    let form = "https://auction.ucdp-smolian.com/au-admin/auctions/form/";
        let date = new Date().getDate() + "." + (new Date().getMonth() + 1) + "." + new Date().getFullYear();
        console.log("🚀 ~ file: function john() {.js:69 ~ arrayCounter().red:", arrayCounter().red)
        if (arrayCounter().red > 0) {
            if (confirm("Заличени? " + arrayCounter().red)) {
                // if (el.className === 'red') {
                    if (arrayCounter().future > 0) {
                        if (confirm("Бъдещи търгове: " + arrayCounter().future + " бр.\nОтвори?"))
                        newTab('future', 'c', date)
                    }
                    if (arrayCounter().today > 0) {
                        if (confirm("Днешни търгове: " + arrayCounter().today + " бр.\nОтвори?"))
                        newTab('today', 'b', date)
                    }
                    if (arrayCounter().past > 0) {
                        if (confirm("Търгове от изминалите работни дни: " + arrayCounter().past + " бр.\nОтвори?"))
                        newTab('past', 'b', )
                    }
            }
        }

        function newTab(id, orderType, date) {
            table.forEach(el => {
                if (el.className === 'red') {
                    if (el.id === id) {
                        if (date === undefined) {
                            date = el.date;
                        }
                        // window.open(protocol + el.cells[8].querySelector('a').href.split('/').pop() + "/" + date, '_blank');
                        // window.open(order + el.cells[8].querySelector('a').href.split('/').pop() + "/" + date + "/?t=" + orderType, '_blank');
                        window.open(form + el.cells[0].innerText.slice(-4), '_blank');
                    }
                }
            })
        }
    // })
}

function dateCheck(input) {
    let date = new Date(input.split('.')[2], input.split('.')[1] - 1, input.split('.')[0]);
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    let yesterday = new Date();

    if (today.getDay() === 1) {
        yesterday.setDate(yesterday.getDate() - 3);
    } else {
        yesterday.setDate(yesterday.getDate() - 1);
    }

    if (date.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
        return 'today';
    } else if (date.setHours(0, 0, 0, 0) <= yesterday.setHours(0, 0, 0, 0)) {
        return 'past';
    } else if (date.setHours(0, 0, 0, 0) >= tomorrow.setHours(0, 0, 0, 0)) {
        return 'future';
    }
}

function arrayCounter() {
    const count = {};
    table.forEach(el => {
        count[el.className] = (count[el.className] || 0) + 1;
        count[el.id] = (count[el.id] || 0) + 1;
    });
    return count;
}