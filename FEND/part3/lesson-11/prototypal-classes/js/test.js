function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  const Car = function(loc) {
    const obj = Object.create(Car.prototype);
    obj.loc = loc;
    return  obj;
  };

  Car.prototype.move = function () {
    this.loc++;
  };

  const Example = function () {
    return Object.create(Car.prototype);
  };

  const amy = Car(1);
  amy.move();
  const ben = Car(9);
  ben.move();
  console.log(amy.loc, ben.loc);

  const exam = Example();
  exam.move();
  console.log(exam.loc);

  console.log(Car.prototype.constructor);

  console.log(amy.constructor);

  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
