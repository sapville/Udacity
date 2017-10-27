function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  function* getEmployee() {
    console.log('the function has started');

    const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];

    for (const name of names) {
      yield name;
    }

    console.log('the function has ended');
  }

  const generatorIterator = getEmployee();
  let result = generatorIterator.next();
  console.log(result.value); // is "Amanda"

  console.log(generatorIterator.next().value); // is "Diego"
  console.log(generatorIterator.next().value); // is "Farrin"

  for (const name of generatorIterator) {
    console.log(name);
  }

  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
