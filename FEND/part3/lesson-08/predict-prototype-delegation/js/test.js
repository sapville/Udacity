function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  const gold = {
    id: 'gold',
    a: 1
  };

  const blue = $.extend({}, gold);
  console.log(blue);
  blue.b = 2;
  blue.id = 'blue';
  console.log(blue);

  const rose = Object.create(gold);
  console.log(rose);
  console.log(rose.a);

  rose.id = 'rose';

  gold.z = 3;
  console.log(rose.z);
  console.log(blue.z);

  console.log('constructor:', rose.constructor);

  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
