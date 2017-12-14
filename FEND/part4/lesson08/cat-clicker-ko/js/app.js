/* global ko */

const Cat = function (name, image, nicknames) {
  this.name = ko.observable(name);
  this.clickCount = ko.observable(0);
  this.image = ko.observable(image);
  this.title = ko.computed(function () {
    return this.name() + ': ' + this.clickCount();
  }, this);
  this.level = ko.computed(function () {
    let level = 'infant';
    if (this.clickCount() >= 5 && this.clickCount() < 10) { level = 'teen';}
    else if (this.clickCount() >= 10 && this.clickCount() < 15) { level = 'adult';}
    else if (this.clickCount() >= 15) { level = 'mature';}
    return level;
  }, this);
  this.nicknames = nicknames;
};

const ViewModel = function () {

  const self = this;

  this.cats = ko.observableArray([]);
  this.cats.push(new Cat(
    'Tabby', 'img/1413379559_412a540d29_z.jpg', ['TabTab', 'T-Bone', 'Mr. T', 'Tabitha Tab Tabby Catty Cat']));
  this.cats.push(new Cat(
    'Tiger', 'img/434164568_fea0ad4013_z.jpg', ['Tiger']));
  this.cats.push(new Cat(
    'Scaredy', 'img/22252709_010df3379e_z.jpg', ['Casper']));
  this.cats.push(new Cat(
    'Shadow', 'img/4154543904_6e2428c421_z.jpg', ['Shooby']));
  this.cats.push(new Cat(
    'Sleepy', 'img/9648464288_2516b35537_z.jpg', ['Zzzzz']));
  this.currentCat = ko.observable(this.cats()[0]);

  this.incrementCounter = function () {
    this.clickCount(this.clickCount() + 1);
  };

  this.listClick = function (item) {
    self.currentCat(item);
  };

};



ko.applyBindings(new ViewModel());