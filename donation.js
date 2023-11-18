const vendor = new Connex.Vendor("test");

var signer = ""
function signCertID() {
  vendor
    .sign("cert", {
      purpose: "identification",
      payload: {
        type: "text",
        content: "get signer address"
      }
    })
    .request()
    .then((r) => {
  document.getElementById("signer").innerText = "signer: " +r.annex.signer;
    signer = r.annex.signer

    })
    .catch((e) => document.getElementById("signer").innerText = "signer: User Canceled");
}

function signTx() {
  if (signer == ""){
    alert("please sign the cert first.") 
  }else{
    vendor
    .sign("tx", [
      {
        to: "0x70aE85A2fF6030366F512DbcD60Be3828139b498",
        //1 vet = 1e18 wei
        value: "1000000000000000000",
        data: "0x",
        comment:"demo - Enfoce signer to sign the tx"
      }
    ])
    //enforce signer
  .signer(signer)
    .comment("transaction signing - transfer 1 VET to 0x70aE85…139b498")
    .request()
    .then((r) => console.log(r))
    .catch((e) => console.log("error:" + e.message));
  }
}

var configDetails = ""

function saveConfig() {
  configDetails = {
    to: document.getElementById("address").value,
    value: parseInt(document.getElementById("amount").value), 
    data: "0x",
    message: document.getElementById("message").value
  };

  alert("Config saved,Please click BUY to continue");
  
document.getElementById("supportDiv").style.display="inline-block"
}

function signTx() {
  var cups = 1;
  const cupsRadio = document.getElementsByName("cups");
  
  for (var i = 0; i < cupsRadio.length; i++) {
    if (cupsRadio[i].checked) {
      cups = cupsRadio[i].value;
    }
  }
  vendor
    .sign("tx", [
      {
        to: configDetails.to,
        value: configDetails.value * 1e18 * cups,
        data: configDetails.data,
        // Click cluase to view comment
        comment: "support " + configDetails.value*cups +" VET"
      }
    ])
    .comment(configDetails.message)
    // .accepted(() => alert("accepted"))
    .request()
    .then((r) => document.getElementById("result").innerText=JSON.stringify(r,null,4))
    .catch((e) => console.log("error:" + e.message));
}

var addressLabel = document.getElementById("loggedIn");
var address = "";

var itemDiv = document.getElementById("item");

function login() {
  vendor
    .sign("cert", {
      purpose: "identification",
      payload: {
        type: "text",
        content: "Please sign the certificate to continue purchase"
      }
    })
    // .accepted(() => alert("accepted"))
    .request()
    .then((r) => {
      address = r.annex.signer;
      addressLabel.innerText = "Logged In: " + address;
      itemDiv.style.display = "inline-block";
    })
    .catch((e) => console.log("error:" + e.message));
}

function logout() {
  addressLabel.innerText = "Please login";
  itemDiv.style.display = "none";
  address = "";
}

function buy() {
  var txIdLabel = document.getElementById("txidLabel");
  vendor
    .sign("tx", [
      {
        to: "0x70aE85A2fF6030366F512DbcD60Be3828139b498",
        value: 1 * 1e18, //unit in wei
        data: "0x"
      }
    ])
  //enforce signer
  .signer(address)
    //a link that can redirect user to visit
    .link("https://explore-testnet.vechain.org/transactions/{txid}")
    .comment("buy skill stats: connex skill +2")
    // .accepted(() => alert("accepted"))
    .request()
    .then((r) => (txIdLabel.innerText = "TxId: " + r.txid))
    .catch((e) => console.log("error:" + e.message));
}