function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/


  const james = {
    name: 'James',
    height: '5\'10"',
    weight: 185
  };

  james[Symbol.iterator] = function() {
    let i = 0;
    const obj = this;
    const keys = Object.keys(obj);
    return {
      next: function() {
        if (i >= keys.length) {
          return {done: true};
        } else {
          return {value: obj[keys[i++]], key: keys[i-1], done: false};
        }
      }
    };
  };
  const iter = james[Symbol.iterator]();

  for (let obj of james) {
    console.log(obj);
  }

  console.log(iter.next()); // 'James'
  console.log(iter.next()); // `5'10`
  console.log(iter.next()); // 185



  const someString = 'hi';
  const iterator = someString[Symbol.iterator]();

  console.log(iterator.toString());
  for (let c of someString) {
    console.log(c);
  }

  let elem = iterator.next();
  while (elem.done === false) {
    console.log(elem.value);
    elem = iterator.next();
  }

  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
