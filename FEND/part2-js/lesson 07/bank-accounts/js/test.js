function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  /*
   * Programming Quiz: Bank Accounts 1 (7-3)
   */

  var savingsAccount = {
      balance: 1000,
      interestRatePercent: 1,
      deposit: function addMoney(amount) {
          if (amount > 0) {
              savingsAccount.balance += amount;
          }
      },
      withdraw: function removeMoney(amount) {
          var verifyBalance = savingsAccount.balance - amount;
          if (amount > 0 && verifyBalance >= 0) {
              savingsAccount.balance -= amount;
          }
      },
      printAccountSummary: function() {
        return 'Welcome!\nYour balance is currently $' + this.balance + ' and your interest rate is ' + this.interestRatePercent + '%.';
      }
  };

  output = savingsAccount.printAccountSummary();


  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
