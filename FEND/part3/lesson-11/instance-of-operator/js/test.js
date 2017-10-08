function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  const Dog = function() {
    return {
      legs: 4,
      bark: alert
    };
  };

  const fido = Dog();

  console.log(Dog, fido);
  console.log(fido instanceof Dog);
  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
