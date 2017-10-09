function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  const Car = function (loc) {
    this.loc = loc;
  };

  Car.prototype.move = function () {
    this.loc++;
  };

  const amy = new Car(1),
    ben = new Car(8);
  console.log('amy-before', amy.loc);
  console.log('ben-before', ben.loc);
  amy.move();
  ben.move();
  console.log('amy-after', amy.loc);
  console.log('ben-after', ben.loc);


  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
