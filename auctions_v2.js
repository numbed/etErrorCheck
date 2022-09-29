function main() {
    let auctionsTable = document.querySelector("tbody");
    const auctions = [];
    let today = new Date();
    let number, date, subject, branch;

    //collecting data from active tab table (auctions)

    function auctionDataCollect() {
        for (let i = 0, row; row = auctionsTable.rows[i]; i++) {
            number = row.cells[0].innerText;
            date = row.cells[2].innerText;
            subject = row.cells[4].innerText;
            branch = row.cells[5].innerText;

            auctions[i] = {
                number: number,
                date: date,
                deadline: calculateDeadline(date),
                type: typeCheck(subject),
                subject: subjectCheck(subject),
                branch: branchCheck(branch),
                etLink: "https://auction.ucdp-smolian.com/au-admin/auctions/form/" + number.slice(-4),
                object: objectCheck(branch),
                commission: commissionDate(date),
                status: statusCheck()
            };
        }
    }
    auctionDataCollect();
    console.log(auctions);

    //auction.commission
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

    //auction.subject
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

    //auction.type
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

    //auction.object
    function objectCheck(o) {
        let output = o.split("/");
        output = output[1].trim().split(" ").pop();
        return output;
    }

    //auction.branch
    function branchCheck(t) {
        let output = t.split("/");
        output = output[0].trim().split(" ").pop();
        return output;
    }

    //auction.deadline
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

    //auction.status
    function statusCheck(){}

}
main();