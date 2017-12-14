/* global ko */
const ViewModel = function () {
  this.name = ko.observable('Tabby');
  this.clickCount = ko.observable(0);
  this.image = ko.observable('img/1413379559_412a540d29_z.jpg');
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
};

ViewModel.prototype.incrementCounter = function () {
  this.clickCount(this.clickCount() + 1);
};

ko.applyBindings(new ViewModel());