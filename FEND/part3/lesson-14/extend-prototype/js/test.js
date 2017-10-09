function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  const Furniture = function(number) {
    this.number = number;
  };
  Furniture.prototype.sell = function() {
    this.number--;
  };
  console.log(Furniture);
  $.extend(Furniture.prototype, {
    buy: function() {
      this.number++;
    },
    break_all: function() {
      while (this.number > 0) {
        this.number--;
      }
    }
  });
  console.log(Furniture);

  const Stool = function (number) {
    Furniture.call(this, number);
    this.legs = 4;
  };
  Stool.prototype = Object.create(Furniture.prototype);
  Stool.prototype.constructor = Stool;
  Stool.prototype.break_all_legs = function () {
    this.legs = 0;
  };
  $.extend(Stool.prototype, {
    break_a_leg: function () {
      this.legs--;
    }
  });


  const chair = new Furniture(100);
  console.log('chair', chair);

  const stool = new Stool(200);
  console.log('stool', stool);
  console.log('stool.number', stool.number);

  stool.sell();
  console.log('stool.number', stool.number);
  stool.break_a_leg();
  console.log('stool.legs', stool.legs);
  stool.break_all_legs();
  console.log('stool.legs', stool.legs);


  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
