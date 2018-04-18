
/**
 * Listen for TransferWithFees event and add an element <li> in the DOM to describe the event
 *
 * @param web3 the web3 instance
 *
 */
function startApp(web3) {

  // The contract address where the contract lives on you can change it to listen on another contract
  var ValorAdress = "0x863293d64f63d2ac3844a4f2b240c53fe6225675";

  // The contract ABI
  var ValorABI = [{"constant":!1,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferWithFees","outputs":[],"payable":!1,"stateMutability":"nonpayable","type":"function"},{"anonymous":!1,"inputs":[{"indexed":!0,"name":"from","type":"address"},{"indexed":!0,"name":"to","type":"address"},{"indexed":!1,"name":"value","type":"uint256"},{"indexed":!1,"name":"fees","type":"uint256"}],"name":"TransferWithFees","type":"event"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"commissions","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"}],"payable":!1,"stateMutability":"nonpayable","type":"constructor"},{"constant":!0,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":!1,"stateMutability":"view","type":"function"},{"constant":!0,"inputs":[],"name":"fees","outputs":[{"name":"","type":"uint256"}],"payable":!1,"stateMutability":"view","type":"function"},{"constant":!0,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":!1,"stateMutability":"view","type":"function"},{"constant":!0,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":!1,"stateMutability":"view","type":"function"},{"constant":!0,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":!1,"stateMutability":"view","type":"function"},{"constant":!0,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":!1,"stateMutability":"view","type":"function"}];

  // The contract Instance
  var ValorContract = web3.eth.contract(ValorABI);



  // The contract at the specified address
  var Valor = ValorContract.at(ValorAdress);
  console.log(Valor);


  // Event triggered when a transfer occured
  var ValorEvent = Valor.TransferWithFees();
  ValorEvent.watch(function(error, result){
    if (!error)
    {
      var text = result.args.from + ' was charged' + result.args.fees + ' VALS when transferring ' + result.args.value.toString() + ' to ' + result.args.fees.toString();
      $(".box ul").append($("<li>").append($("<p>").append(text)));
      $("#loader").hide();
    } else {
      $("#loader").hide();
      console.log(error);
    }
  });
}
