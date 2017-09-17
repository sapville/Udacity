function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  // creates a line of * for a given length
  function makeLine(length) {
      var line = "";
      for (var j = 1; j <= length; j++) {
          line += "* ";
      }
      return line + "\n";
  }


  function buildTriangle(width) {
    var output = '';
    for (var i = 1; i <= width; i++) {
    output +=  makeLine(i);
    }
    return output;
  }


  // test your code by uncommenting the following line
  console.log(buildTriangle(10));

  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
