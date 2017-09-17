function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

function laugh(ha, repeat) {
  var laughter = '';
  for (var i = 0; i < repeat; i++) {
    laughter += ha;
  }
  laughter += '!';
  return laughter;
}

output = laugh('ha', 10 );

  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
