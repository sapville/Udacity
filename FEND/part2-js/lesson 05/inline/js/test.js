function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  /*
   * Programming Quiz: Inline Functions (5-6)
   */

  // don't change this code
  function emotions(myString, myFunc) {
      console.log("I am " + myString + ", " + myFunc(2));
  }

emotions(
  'happy',
  function(num) {
    var laughter = '';
    for (var i = 0; i < num; i++) {
      laughter += 'ha';
    }
    laughter += '!';
    return laughter;
  }
);


  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
