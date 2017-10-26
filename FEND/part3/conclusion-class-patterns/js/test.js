function showResult() {
  /**
   * functional class pattern
   */
  const FunClass = function(attr) {
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

  const fun = FunClass(1);
  console.log(`fun-before: ${fun.attr}`);
  fun.add();
  fun.substr();
  console.log(`fun-after: ${fun.attr}`);


  /**
   * functional shared class pattern
   */
  const FunSharClass = function(attr) {
    const obj = {
      attr
    };
    $.extend(obj, FunSharClass.methods);
    return obj;
  };
  FunSharClass.methods = {
    add: function() {
      this.attr++;
    },
    substr: function() {
      this.attr--;
    }
  };

  const funShar = FunSharClass(2);
  console.log(`funShar-before: ${funShar.attr}`);
  funShar.add();
  funShar.substr();
  console.log(`funShar-after: ${funShar.attr}`);



  /**
   * prototypal class pattern
   */
  const ProtoClass = function(attr) {
    const obj = Object.create(ProtoClass.prototype);
    obj.attr = attr;
    return obj;
  };
  ProtoClass.prototype.add = function() {
    this.attr++;
  };
  ProtoClass.prototype.substr = function() {
    this.attr--;
  };

  const proto = ProtoClass(3);
  console.log(`proto-before: ${proto.attr}`);
  proto.add();
  proto.substr();
  console.log(`proto-after: ${proto.attr}`);



  /**
   * pseudoclassical class pattern
   */
  const PseudoClass = function(attr) {
    this.attr = attr;
  };
  PseudoClass.prototype.add = function() {
    this.attr++;
  };
  PseudoClass.prototype.substr = function() {
    this.attr--;
  };

  const pseudo = new PseudoClass(4);
  console.log(`pseudo-before: ${pseudo.attr}`);
  pseudo.add();
  pseudo.substr();
  console.log(`pseudo-after: ${pseudo.attr}`);


  /**
   * ES6 class pattern
   */
  class NewClass {
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

  const newCl = new NewClass(4);
  console.log(`new-before: ${newCl.attr}`);
  pseudo.add();
  pseudo.substr();
  console.log(`new-after: ${newCl.attr}`);

}
