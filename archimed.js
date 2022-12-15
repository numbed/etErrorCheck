function archimed() {
	var copyToClipboard = document.createElement("input");
	copyToClipboard.className = "copyToClipboard";
	document.body.appendChild(copyToClipboard);
	copyToClipboard.value = window.location.href.split("/").pop();
	copyToClipboard.select();
	document.body.removeChild(copyToClipboard);
	var arr = [],
	    l = document.links;
	for (var i = 0; i < l.length; i++) {
	    if (l[i].href.includes("FileView?")) {
	        arr.push(l[i].href);
	    }
	}
	if (arr.length > 10) {
		alert(arr.length);
	    download(0, 9);
	    sleep(5000);
	    download(9, 19);
	    sleep(5000);
	    download(19, 29);
	    sleep(5000);
	    download(29, 39);
	    sleep(5000);
	    download(39, 49);
	    sleep(5000);
	    download(49, arr.length);
	} else {
		alert(arr.length);
		download(0, arr.length);
	}
	
	function download(start, end) {
	    for (var n = start; n < end; n++) {
	        var x = arr[n];
	        var a = document.createElement("a");
	        a.href = x;
	        fileName = copyToClipboard.value + "_" + x.split("/").pop();
	        a.download = fileName;
	        document.body.appendChild(a);
	        a.click();
	        window.URL.revokeObjectURL(x);
	        a.remove();
	    }
	}
	
	function sleep(milliseconds) {
	    var start = new Date().getTime();
	    for (var i = 0; i < 1e7; i++) {
	        if ((new Date().getTime() - start) > milliseconds) {
	            break;
	        }
	    }
	}

}
archimed();