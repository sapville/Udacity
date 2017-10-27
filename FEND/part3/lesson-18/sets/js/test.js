function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  const myFavoriteFlavors = new Set();

  myFavoriteFlavors.add('chocolate chip');
  myFavoriteFlavors.add('cookies and cream');
  myFavoriteFlavors.add('strawberry');
  myFavoriteFlavors.add('vanilla');

  myFavoriteFlavors.delete('strawberry');

  for (const flavor of myFavoriteFlavors) {
    console.log(flavor);
  }


  // Weak Set
  const uniqueFlavor = new WeakSet();
  let flavor1 = {
    flavor: 'chocolate'
  };
  let flavor2 = {
    flavor: 'vanilla'
  };

  uniqueFlavor.add(flavor1);
  uniqueFlavor.add(flavor2);
  uniqueFlavor.add(flavor1);

  console.log(uniqueFlavor);

  Window.flavor = flavor1;

  setTimeout(() => console.log(uniqueFlavor), 10000);

  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
