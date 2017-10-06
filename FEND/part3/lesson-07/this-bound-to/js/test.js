function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

  function fun(par1, par2) {
    console.log(this, par1, par2);
  }

  const r = {
      r: null,
      method: fun
    },
    g = {
      g: null
    },
    b = {
      b: null
    },
    y = {
      y: null
    };

  fun(g, b);
  r.method(g, b);
  fun.call(r, g, b);
  r.method.call(y, g, b);
  new r.method(g, b);

  console.log('showResult', this);

  function someFunciton(para1) {
    console.log(para1, this);
  }

  someFunciton('from showResult');

  const someClass = {
    attr1: 'from someClass',
    meth1: function() {
      someFunciton(this.attr1);
    },
    meth2: function() {
      console.log('someClass', this);
    }
  };

  someFunciton(someClass);

  someClass.meth1();
  someClass.meth2();
  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
