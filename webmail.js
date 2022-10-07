const attachments = document.querySelectorAll(".filename");
const emailSubject = document.getElementById("compose-subject");
const emailTo = document.getElementById("_to");
document.getElementById("composebody").value = (" ");

//collect data from attached files and fills according fields in the email compose page
//!!!only adds recepient of the last file attached!!!
//!!!SEND MULTIPLE FILES ONLY TO THE SAME RECIPIENT/RECIPIENTS!!!
attachments.forEach(element => {
    let attached = element.innerText;
    let lastIndex = attached.lastIndexOf("-");
    let fileName = attached.slice(0, lastIndex);
    emailSubject.value = emailSubject.value + fileName + ", ";
    let recepient = attached.slice(lastIndex + 1).split(".")[0];
    emailTo.value = tpEmail(recepient);
    console.log(recepient);
});
console.log(attachments.fileName);


//list of predefined recepients
//!!!TO DO!!!
function tpEmail(val) {
    let result = "";
    switch (val) {
        case "ala":
            result = "dgsalabak@ucdp-smolian.com";
            break;
        case "anh":
            result = "dgsnikolayhaitov@ucdp-smolian.com";
            break;
        case "ard":
            result = "dgsardino@ucdp-smolian.com";
            break;
        case "asn":
            result = "dgsasenovgrad@ucdp-smolian.com";
            break;
        case "brn":
            result = "dgsborino@ucdp-smolian.com";
            break;
        case "brv":
            result = "dlsborovo@ucdp-smolian.com";
            break;
        case "bat":
            result = "dgsbatak@ucdp-smolian.com";
            break;
        case "che":
            result = "dlschepino@ucdp-smolian.com";
            break;
        case "dos":
            result = "dgsdospat@ucdp-smolian.com";
            break;
        case "his":
            result = "dgshisar@ucdp-smolian.com";
            break;
        case "hvo":
            result = "dgshvoyna@ucdp-smolian.com";
            break;
        case "izv":
            result = "dlsizvora@ucdp-smolian.com";
            break;
        case "jen":
            result = "dlsjenda@ucdp-smolian.com";
            break;
        case "kar":
            result = "dgskarlovo@ucdp-smolian.com";
            break;
        case "kir":
            result = "dgskirkovo@ucdp-smolian.com";
            break;
        case "kli":
            result = "dgsklisura@ucdp-smolian.com";
            break;
        case "kru":
            result = "dgskrumovgrad@ucdp-smolian.com";
            break;
        case "kor":
            result = "dlskormisosh@ucdp-smolian.com";
            break;
        case "mih":
            result = "dgsmihalkovo@ucdp-smolian.com";
            break;
        case "pld":
            result = "dgsplovdiv@ucdp-smolian.com";
            break;
        case "pan":
            result = "dgspanagyuriste@ucdp-smolian.com";
            break;
        case "par":
            result = "dgsparvomai@ucdp-smolian.com";
            break;
        case "pes":
            result = "dgspeshtera@ucdp-smolian.com";
            break;
        case "paz":
            result = "dgspazardjik@ucdp-smolian.com";
            break;
        case "rod":
            result = "dgsrodopi@ucdp-smolian.com";
            break;
        case "rak":
            result = "dgsrakitovo@ucdp-smolian.com";
            break;
        case "sel":
            result = "dgsselishte@ucdp-smolian.com";
            break;
        case "lak":
            result = "dgsshirokalaka@ucdp-smolian.com";
            break;
        case "pol":
            result = "dlsshirokapoliana@ucdp-smolian.com";
            break;
        case "sla":
            result = "dgsslaveino@ucdp-smolian.com";
            break;
        case "sml":
            result = "dgssmolyan@ucdp-smolian.com";
            break;
        case "smi":
            result = "dgssmilian@ucdp-smolian.com";
            break;
        case "tra":
            result = "dlstrakia@ucdp-smolian.com";
            break;
        case "tri":
            result = "dgstrigrad@ucdp-smolian.com";
            break;
        case "zla":
            result = "dgszlatograd@ucdp-smolian.com";
            break;
        case "mom":
            result = "dgsmomchilgrad@ucdp-smolian.com";
            break;
        case "all":
            result = "dgsalabak@ucdp-smolian.com, dgsardino@ucdp-smolian.com, dgsasenovgrad@ucdp-smolian.com, dgsbatak@ucdp-smolian.com, dgsborino@ucdp-smolian.com, dlsborovo@ucdp-smolian.com, dlschepino@ucdp-smolian.com, dgsdospat@ucdp-smolian.com, dgsnikolayhaitov@ucdp-smolian.com, dgshisar@ucdp-smolian.com, dlsizvora@ucdp-smolian.com, dlsjenda@ucdp-smolian.com, dgskarlovo@ucdp-smolian.com, dgskirkovo@ucdp-smolian.com, dgsklisura@ucdp-smolian.com, dgskrumovgrad@ucdp-smolian.com, dlskormisosh@ucdp-smolian.com, dgsmihalkovo@ucdp-smolian.com, dgsmomchilgrad@ucdp-smolian.com, dgsplovdiv@ucdp-smolian.com, dgspazardjik@ucdp-smolian.com, dgspanagyuriste@ucdp-smolian.com, dgspeshtera@ucdp-smolian.com, dgsparvomai@ucdp-smolian.com, dgsrakitovo@ucdp-smolian.com, dgsrodopi@ucdp-smolian.com, dgsselishte@ucdp-smolian.com, dgsslaveino@ucdp-smolian.com, dgssmilian@ucdp-smolian.com, dgssmolyan@ucdp-smolian.com, dgsshirokalaka@ucdp-smolian.com, dlsshirokapoliana@ucdp-smolian.com, dgstrigrad@ucdp-smolian.com, dlstrakia@ucdp-smolian.com, dgszlatograd@ucdp-smolian.com";
            break;
        case "okj":
            result = "dgsardino@ucdp-smolian.com, dgskirkovo@ucdp-smolian.com, dgskrumovgrad@ucdp-smolian.com, dgskardzhali@ucdp-smolian.com, dgsmomchilgrad@ucdp-smolian.com, dlsjenda@ucdp-smolian.com";
            break;
        case "opl":
            result = "dgsasenovgrad@ucdp-smolian.com, dgskarlovo@ucdp-smolian.com, dgsklisura@ucdp-smolian.com, dgsplovdiv@ucdp-smolian.com, dgsparvomai@ucdp-smolian.com, dgshisar@ucdp-smolian.com, dlskormisosh@ucdp-smolian.com, dlstrakia@ucdp-smolian.com";
            break;
        case "opz":
            result = "dgsalabak@ucdp-smolian.com, dgsbatak@ucdp-smolian.com, dgspazardjik@ucdp-smolian.com, dgspanagyuriste@ucdp-smolian.com, dgspeshtera@ucdp-smolian.com, dgsrakitovo@ucdp-smolian.com, dgsrodopi@ucdp-smolian.com, dgsselishte@ucdp-smolian.com, dlsborovo@ucdp-smolian.com, dlschepino@ucdp-smolian.com, dlsshirokapoliana@ucdp-smolian.com";
            break;
        case "osm":
            result = "dgsborino@ucdp-smolian.com, dgsdospat@ucdp-smolian.com, dgszlatograd@ucdp-smolian.com, dgsmihalkovo@ucdp-smolian.com, dgsslaveino@ucdp-smolian.com, dgssmilian@ucdp-smolian.com, dgssmolyan@ucdp-smolian.com, dgstrigrad@ucdp-smolian.com, dgsnikolayhaitov@ucdp-smolian.com, dgsshirokalaka@ucdp-smolian.com, dlsizvora@ucdp-smolian.com";
            break;
        case "rdg":
            result = "rugkarjali@iag.bg, rugsmolian@iag.bg, rugplovdiv@iag.bg, rugpazardjik@iag.bg";
            break;
        case "rkj":
            result = "rugkarjali@iag.bg";
            break;
        case "rpl":
            result = "rugplovdiv@iag.bg";
            break;
        case "rpz":
            result = "rugpazardjik@iag.bg";
            break;
        case "rsm":
            result = "rugsmolian@iag.bg";
            break;
        case "gpl":
            result = "gssplovdiv@iag.bg";
            break;
        case "lpl":
            result = "lzsplovdiv@iag.bg";
            break;
        case "swdp":
            result = "swdp@abv.bg";
            break;
        case "hub":
            result = "vhubcheva@mzh.government.bg";
            break;
        case "sta":
            result = "l.stateva@ucdp-smolian.com";
            break;
        case "kas":
            result = "s.kasabov@ucdp-smolian.com";
            break;
        case "iva":
            result = "a.ivanov@ucdp-smolian.com";
            break;
        case "mob":
            result = "bsokolov@mzh.government.bg,agoleva@mzh.government.bg,stodorov@mzh.government.bg";
            break;
        case "krr":
            result = "krastio@ucdp-smolian.com";
            break;
        case "bog":
            result = "n.bogdanova@ucdp-smolian.com";
            break;
        case "kni":
            result = "knijovnost96@abv.bg";
            break;
        case "ktr":
            result = "a.ivanov@ucdp-smolian.com, l.stateva@ucdp-smolian.com, b.toshev@ucdp-smolian.com, g.gagov@ucdp-smolian.com, tvasilev@ucdp-smolian.com, s.dzhambazov@ucdp-smolian.com, r.petakov@ucdp-smolian.com, i.simeonov@ucdp-smolian.com, s.deliyanchev@ucdp-smolian.com, z.baklareva@ucdp-smolian.com";
            break;
        case "mar":
            result = "emarinov@mzh.government.bg";
            break;
        case "apo":
            result = "office@apolo.bg";
            break;
        case "gov":
            result = "governor@region-smolyan.org";
            break;
        case "vel":
            result = "velichkova@iag.bg";
            break;
        case "cho":
            result = "k.cholakov@ucdp-smolian.com";
            break;
        case "ant":
            result = "akostova@mzh.government.bg";
            break;
        case "nrr":
            result = "rashkov.nikola@gmail.com";
            break;
    }
    return result;
}