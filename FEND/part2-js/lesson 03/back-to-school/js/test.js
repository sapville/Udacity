function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/
  /*
   * Programming Quiz: Back to School (3-9)
   */

  // change the value of `education` to test your code
  var education = 'an Associate\'s degree';

  // set the value of this based on a person's education
  var salary;
//
// no high school diploma earned an average of $25,636/year,
// a high school diploma earned an average of $35,256/year,
// an Associate's degree earned an average of $41,496/year,
// a Bachelor's degree earned an average of $59,124/year,
// a Master's degree earned an average of $69,732/year,
// a Professional degree earned an average of $89,960/year,
// and a Doctoral degree earned an average of $84,396/year.

switch (education) {
  case 'no high school diploma': salary = 25636;
  break;
  case 'a high school diploma': salary = 35256;
  break;
  case 'an Associate\'s degree': salary = 59124;
  break;
  case 'a Bachelor\'s degree': salary = 41496;
  break;
  case 'a Master\'s degree': salary = 69732;
  break;
  case 'a Professional degree': salary = 89960;
  break;
  case 'a Doctoral degree': salary = 84396;
  break;
}
  output = 'In 2015, a person with ' + education + ' earned an average of $' +
    salary.toLocaleString('en-Us') + '/year.';
  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
