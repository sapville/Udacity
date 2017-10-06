function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  let sagas = [];

  function newSaga() {
    //Push the function as an object
    sagas.push(function() {
      return sagas.length;
    });
    //Push the result of the function
    sagas.push(function() {
      return sagas.length;
    }());
  }

  newSaga();
  newSaga();

  output = sagas;

  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
