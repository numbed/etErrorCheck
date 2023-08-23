let table = document.querySelector('tbody').querySelectorAll('tr');
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
function john() {
    console.clear();
    console.log("history check v2");
    let today = new Date();
    let frameCounter = 0;

    const counts = {};
    table.forEach((el, index, array) => {

        //select rows that are not in 'danger' (danger means that auction is canceled)
        if (el.className != 'danger') {
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
    console.log("🚀 ~ file: function john() {.js:65 ~ tabOpen:")
    table.forEach(el => {
        if (el.className === 'green') {
            console.log("🚀 ~ file: function john() {.js:18 ~ table.forEach ~ :", el.cells[2].innerText)
            let order = "https://auction.ucdp-smolian.com/au-admin/history/erasedOrder/";
            let protocol = "https://auction.ucdp-smolian.com/au-admin/history/erasedProtocol/";
            let erasedDate = new Date().getDate() + "." + (new Date().getMonth() + 1) + "." + new Date().getFullYear();
            // window.open(link, '_blank');

        }
    })
}