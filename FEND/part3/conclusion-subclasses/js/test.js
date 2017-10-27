function showResult() {
  /**
   * functional class pattern
   */
  const FunSuperClass = function(attr) {
    const obj = {
      attr
    };
    obj.add = function() {
      obj.attr++;
    };
    obj.substr = function() {
      obj.attr--;
    };
    return obj;
  };

  const FunMultClass = function(attr, mult) {
    const obj = FunSuperClass(attr);
    obj.mult = mult;
    obj.multiply = function() {
      obj.attr *= obj.mult;
    };
    return obj;
  };

  const FunDivClass = function(attr, div) {
    const obj = FunSuperClass(attr);
    obj.divider = div;
    obj.divide = function() {
      obj.attr /= obj.divider;
    };
    return obj;
  };

  const funMult = FunMultClass(2, 2);
  console.log('funMult-before:', funMult);
  funMult.add();
  funMult.multiply();
  console.log(`funMult-after: ${funMult.attr}`);

  const funDiv = FunDivClass(2, 2);
  console.log('funDiv-before:', funDiv);
  funDiv.add();
  funDiv.divide();
  console.log(`funDiv-after: ${funDiv.attr}`);



  /**
   * pseudoclassical class pattern
   */
  const PseudoSuperClass = function(attr) {
    this.attr = attr;
  };
  PseudoSuperClass.prototype.add = function () {
    this.attr++;
  };
  PseudoSuperClass.prototype.substr = function () {
    this.attr--;
  };

  const PseudoMultClass = function(attr, mult) {
    PseudoSuperClass.call(this, attr);
    this.mult = mult;
  };
  PseudoMultClass.prototype = Object.create(PseudoSuperClass.prototype);
  PseudoMultClass.prototype.constructor = PseudoMultClass;
  PseudoMultClass.prototype.multiply = function () {
    this.attr *= this.mult;
  };

  const PseudoDivClass = function (attr, div) {
    PseudoSuperClass.call(this, attr);
    this.div = div;
  };
  PseudoDivClass.prototype = Object.create(PseudoSuperClass.prototype);
  PseudoDivClass.prototype.constructor = PseudoDivClass;
  PseudoDivClass.prototype.divide = function () {
    this.attr /= this.div;
  };
  PseudoDivClass.prototype.add = function (number = 1) {
    for (let i = 0; i < number; i++) {
      PseudoSuperClass.prototype.add.call(this);
    }
  };

  const pseudoMult = new PseudoMultClass(2, 2);
  console.log('pseudoMult-before:', pseudoMult);
  pseudoMult.add();
  pseudoMult.multiply();
  console.log(`pseudoMult-after: ${pseudoMult.attr}`);

  const pseudoDiv = new PseudoDivClass(2, 2);
  console.log('pseudoDiv-before:', pseudoDiv);
  pseudoDiv.add(2);
  pseudoDiv.divide();
  console.log(`pseudoDiv-after: ${pseudoDiv.attr}`);



  /**
   * ES6 class pattern
   */
  class NewSuperClass {
    constructor(attr) {
      this.attr = attr;
    }
    add() {
      this.attr++;
    }
    substr() {
      this.attr--;
    }
  }

  class NewMultClass extends NewSuperClass {
    constructor(attr, mult) {
      super(attr);
      this.mult = mult;
    }
    multiply() {
      this.attr *= this.mult;
    }
  }

  class NewDivClass extends NewSuperClass {
    constructor(attr, div) {
      super(attr);
      this.div = div;
    }
    divide() {
      this.attr /= this.div;
    }
    add(number = 1) {
      for (let i = 0; i < number; i++) {
        super.add();
      }
    }
  }

  const newMult = new NewMultClass(2, 2);
  console.log('newMult-before:', newMult);
  newMult.add();
  newMult.multiply();
  console.log(`newMult-after: ${newMult.attr}`);

  const newDiv = new NewDivClass(2, 2);
  console.log('newDiv-before:', newDiv);
  newDiv.add(2);
  newDiv.divide();
  console.log(`newDiv-after: ${newDiv.attr}`);


}
