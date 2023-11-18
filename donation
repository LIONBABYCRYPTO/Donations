const vendor = new Connex.Vendor("test");
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