function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  function average(...nums) {
      let total = 0;
      for (let num of nums) {
        total += num;
      }
      if (total !== 0) {
        return total / nums.length;
      } else {
        return 0;
      }
  }

  console.log(average(2, 6));
  console.log(average(2, 3, 3, 5, 7, 10));
  console.log(average(7, 1432, 12, 13, 100));
  console.log(average());

  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
