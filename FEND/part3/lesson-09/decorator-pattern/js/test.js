function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  var carlike = function(obj, loc) {
    obj.loc = loc;
    obj.move = function() {
      obj.loc++;
    };
    return obj;
  };

  /*var move = function(car) {
      car.loc++;
  };
  */

  /////
  // Here we want to call move with "dot access"
  var amy = carlike({}, 1);
  amy.move();
  console.log(amy.loc);
  var ben = carlike({}, 9);
  ben.move();
  console.log(ben.loc);

  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
