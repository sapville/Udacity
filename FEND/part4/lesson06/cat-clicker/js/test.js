class Data {
  constructor () {
    this.cats = [];
    this.shownCat = null;
  }

  addCat (name, id, image) {
    this.cats.push({name, id, image, counter: 0});
  }
}

class View {
  constructor () {
    this.refElems = undefined;
    this.imgElem = undefined;
    this.adminSwitch = $('#admin');
    this.adminArea = $('.admin-area');
  }

  init () {
    this.adminArea.hide();
  }

  static resetCatName(id, name) {
    $(`#${id}`).text(name);
  }

  static drawListItem (id, name) {
    $('.list>ul').append(`<li><a id="${id}" href="#">${name}</a></li>`);
  }

  postListBuilding () {
    this.refElems = $('.list>ul>li>a');
    this.refElems.first().toggleClass('selected');
    this.imgElem = $('.image>img');
  }

  setEvents (handler) {
    this.refElems.on('click', function () {
      if (!handler.checkAdminProcessed()) {return;}
      $('.list>ul>li>a').removeClass('selected');
      $(this).addClass('selected');
      handler.refClick($(this).attr('id'));
    });
    this.imgElem.click(() => {handler.catClick();});
    $('#admin').click(() => handler.adminClick());
    $('#cancel').click(() => handler.cancelClick());
    $('#save').click(() => handler.saveClick());
  }

  showCat (cat) {
    this.imgElem.attr('src', `img/${cat.image}`);
    View.showTitle(cat);
  }

  showAdminArea (cat) {
    this.adminArea.show();
    this.adminSwitch.addClass('c-button-disabled');
    this.adminSwitch.removeClass('c-button');
    $('#name').val(cat.name);
    $('#pic').val(cat.image);
    $('#clicks').val(cat.counter);
  }

  hideAdminArea() {
    this.adminArea.hide();
    this.adminSwitch.addClass('c-button');
    this.adminSwitch.removeClass('c-button-disabled');
  }

  static getAdminData() {
    return {
      name: $('#name').val(),
      pic: $('#pic').val(),
      clicks: $('#clicks').val(),
    };
  }

  static showTitle (cat) {
    $('.image>h1').text(`${cat.name}: ${cat.counter}`);
  }
}

class App {
  constructor (data, view) {
    this.data = data;
    this.view = view;
    this.adminProcessed = true;
  }

  init () {
    this.data.addCat('Kitten', 'cat1', 'cat.jpg');
    this.data.addCat('Shy', 'cat2', 'cat2.jpg');
    this.data.addCat('Cuddle', 'cat3', 'cat3.jpg');
    this.data.addCat('Wild', 'cat4', 'cat4.jpg');
    this.data.addCat('Hope', 'cat5', 'cat5.jpg');
    this.buildList();
    this.view.init();
    this.view.setEvents(this);
    this.refClick('cat1');
  }

  buildList () {
    this.data.cats.forEach((cat) => {
      View.drawListItem(cat.id, cat.name);
    });
    this.view.postListBuilding();
  }

  checkAdminProcessed() {
    if (this.adminProcessed) {
      return true;
    } else {
      alert('Admin operations have not been finished');
      return false;
    }
  }

  refClick (id) {
    this.view.showCat(this.data.cats.find(cat => cat.id === id));
    this.data.shownCat = id;
  }

  catClick () {
    if (!this.checkAdminProcessed()) {return;}
    const cat = this.data.cats.find(cat => cat.id === this.data.shownCat);
    cat.counter++;
    View.showTitle(cat);
  }

  adminClick() {
    if (!this.adminProcessed){return;}
    this.adminProcessed = false;
    this.view.showAdminArea(this.data.cats.find( cat => cat.id === this.data.shownCat ));
  }

  cancelClick() {
    this.adminProcessed = true;
    this.view.hideAdminArea();
  }

  saveClick() {
    const adminData = View.getAdminData();
    const shownCatIdx = this.data.cats.findIndex(cat => cat.id === this.data.shownCat);
    const id = this.data.cats[shownCatIdx].id;
    this.data.cats[shownCatIdx].name = adminData.name;
    this.data.cats[shownCatIdx].image = adminData.pic;
    this.data.cats[shownCatIdx].counter = adminData.clicks;
    this.cancelClick();
    View.resetCatName(id, adminData.name);
    this.refClick(id);
  }

}

$(function () {
  const app = new App(new Data(), new View());
  app.init();
});
