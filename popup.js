//clearing active tab console
chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.query({
        active: true
    }, function (tabs) {
        var tab = tabs[0];
        chrome.tabs.executeScript(tab.id, {
            code: "console.clear();",
            allFrames: true
        });
    });
});



//test for executing diffent scirpt for specific pages
chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.query({
        active: true
    }, function (tabs) {
        var tab = tabs[0];
        if (tab.url.includes("/au-admin/auctions")) {
            chrome.tabs.query({
                active: true
            }, function (tabs) {
                chrome.tabs.executeScript(tab.id, {
                    file: "auctions_v2.js",
                    allFrames: true
                });
            });
        } else if (tab.url.includes("/cpsess")) {
            chrome.tabs.query({
                active: true
            }, function (tabs) {
                chrome.tabs.executeScript(tab.id, {
                    file: "webmail.js",
                    allFrames: true
                });
            });
        } else if (tab.url.includes("/au-admin/history")) {
            chrome.tabs.query({
                active: true
            }, function (tabs) {
                chrome.tabs.executeScript(tab.id, {
                    file: "auctionHistoryCheck.js",
                    allFrames: true
                });
            });
        } else if (tab.url.includes("Document.aspx?")) {
            chrome.tabs.query({
                active: true
            }, function (tabs) {
                chrome.tabs.executeScript(tab.id, {
                    file: "archimed.js",
                    allFrames: true
                });
            });
        } else if (tab.url.includes("Documents.aspx")) {
            chrome.tabs.query({
                active: true
            }, function (tabs) {
                chrome.tabs.executeScript(tab.id, {
                    file: "archimedDocs.js",
                    allFrames: true
                });
            });
        } else if (tab.url.includes("Search.aspx")) {
            chrome.tabs.query({
                active: true
            }, function (tabs) {
                chrome.tabs.executeScript(tab.id, {
                    file: "archimedSearch.js",
                    allFrames: true
                });
            });
        }
    });
});

// chrome.browserAction.onClicked.addListener((tab) => {
//     chrome.tabs.query({
//         active: true
//     }, function (tabs) {
//         var tab = tabs[0];
//         chrome.tabs.executeScript(tab.id, {
//             file: "test.js;",
//             allFrames: true
//         });
//     });
// });