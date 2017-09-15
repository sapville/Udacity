function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  var num = 99;
  var bottle = '';
  var minusBottle = '';

  while (num >= 1) {
    bottle = num === 1 ? 'bottle' : 'bottles';
    minusBottle = num - 1 === 1 ? 'bottle' : 'bottles';

    output = num + ' ' + bottle + ' of juice on the wall! ' + num +
      ' ' + bottle + ' of juice! Take one down, pass it around... ' + (num - 1).valueOf() +
      ' ' + minusBottle + ' of juice on the wall !';
    num--;
    console.log(output);
  }


  /****************************************************************************/
  if (output !== null) {
    //console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
