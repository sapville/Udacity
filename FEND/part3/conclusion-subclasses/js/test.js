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

  const pseudoMult = new PseudoMultClass(2, 2);
  console.log('pseudoMult-before:', pseudoMult);
  pseudoMult.add();
  pseudoMult.multiply();
  console.log(`pseudoMult-after: ${pseudoMult.attr}`);

  const pseudoDiv = new PseudoDivClass(2, 2);
  console.log('pseudoDiv-before:', pseudoDiv);
  pseudoDiv.add();
  pseudoDiv.divide();
  console.log(`pseudoDiv-after: ${pseudoDiv.attr}`);

}
