function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  /**
   * get trap
   */
  const richard = {
    status: 'looking for work'
  };
  const handler = {
    get(target, propName) {
      console.log(target);
      console.log(propName);
      return target[propName];
    }
  };
  const agent = new Proxy(richard, handler);
  console.log(agent.status); // (1)logs the richard object, (2)logs the property being accessed, (3)returns the text in richard.status


  /**
   * set trap
   */
  const richard2 = {
    status: 'looking for work'
  };
  const handler2 = {
    set(target, propName, value) {
      if (propName === 'payRate') { // if the pay is being set, take 15% as commission
        value = value * 0.85;
      }
      target[propName] = value;
    }
  };
  const agent2 = new Proxy(richard2, handler2);
  agent2.payRate = 1000; // set the actor's pay to $1,000
  console.log(agent2.payRate); // $850 the actor's actual pay

  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
