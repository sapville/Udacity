function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/


  const asyncRequest = new XMLHttpRequest();
  asyncRequest.onload = function () {
    console.log(this.responseText);
  };
  asyncRequest.onerror = function () {
    console.log('an error occurred');
  };
  asyncRequest.open('GET', 'https://unsplash.com');
  asyncRequest.send();

  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
