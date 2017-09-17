function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

var laugh = function(num) {
  var laughter = '';
  for (var i = 0; i < num; i++) {
    laughter += 'ha';
  }
  laughter += '!';
  return laughter;
};

output = laugh(10);

  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
