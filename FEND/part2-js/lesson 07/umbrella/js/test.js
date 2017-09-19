function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/
  var umbrella = {
      color: "pink",
      isOpen: true,
      open: function() {
          if (umbrella.isOpen === true) {
              return "The umbrella is already opened!";
          } else {
              umbrella.isOpen = true;
              return "Julia opens the umbrella!";
          }
      },
      close: function() {
        if (umbrella.isOpen) {
            umbrella.isOpen = false;
            return "Julia closes the umbrella!";
        } else {
          return "The umbrella is already closed!";
        }
      }
  };


  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
