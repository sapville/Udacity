function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  class Vehicle {
    constructor(color = 'blue', wheels = 4, horn = 'beep beep') {
      this.color = color;
      this.wheels = wheels;
      this.horn = horn;
    }

    honkHorn() {
      console.log(this.horn);
    }
  }

  class Bicycle extends Vehicle{
    constructor(color = 'blue') {
      super(color, 2, 'honk honk');
    }
  }
  const myVehicle = new Vehicle();
  myVehicle.honkHorn(); // beep beep
  const myBike = new Bicycle();
  myBike.honkHorn(); // honk honk


  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
