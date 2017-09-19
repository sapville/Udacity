function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  var bills = [50.23, 19.12, 34.01, 100.11, 12.15, 9.90,
    29.11, 12.99, 10.00, 99.22, 102.20, 100.10, 6.77, 2.22
  ];

  var totals = bills.map(function(bill) {
    bill *= 1.15;
    return Number(bill.toFixed(2));
  });

  console.log(totals);


  /*  console.log(
      bills.map(function(bill) {
        bill *= 1.15;
        return bill.toFixed(2);
      })
    );*/
  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
