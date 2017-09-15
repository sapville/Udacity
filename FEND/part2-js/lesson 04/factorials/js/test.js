function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/
var solution = 12;
for (var i = solution-1; i >= 1; i--) {
  solution *= i;
}
console.log(solution);

output = solution;

  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
