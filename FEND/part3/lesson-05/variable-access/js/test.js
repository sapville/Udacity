function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  const func = function() {
    const varAccess = {
      cOuter: 'Outer',
      cInner: 'Inner'
    };
    output = func().cInner;
    return varAccess;
  };

  if (output === null) {
    output = func().cOuter;
  }

  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
