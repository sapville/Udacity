function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/


  /**
   * create employees map
   */
  const employees = new Map();

  employees.set('james.parkes@udacity.com', {
    firstName: 'James',
    lastName: 'Parkes',
    role: 'Content Developer'
  });
  employees.set('julia@udacity.com', {
    firstName: 'Julia',
    lastName: 'Van Cleve',
    role: 'Content Developer'
  });
  employees.set('richard@udacity.com', {
    firstName: 'Richard',
    lastName: 'Kalehoff',
    role: 'Content Developer'
  });

  console.log(employees);


  /**
   * access to employees map
   */
  const keysIter = employees.keys();
  let done = false;

  while (done === false) {
    let employee = keysIter.next();
    done = employee.done;
    if (!done) {
      console.log(employees.get(employee.value).firstName);
    }
  }



  /**
   * create members map
   */

  const members = new Map();

  members.set('Evelyn', 75.68);
  members.set('Liam', 20.16);
  members.set('Sophia', 0);
  members.set('Marcus', 10.25);

  console.log(members);

  /**
   * access to members map
   */
  for (const member of members) {
    const [key, value] = member;
    console.log(key, value);
  }

  //or...
  members.forEach((value, key) => console.log(key, value));


  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
