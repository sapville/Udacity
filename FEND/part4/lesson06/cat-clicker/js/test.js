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
      $('.list>ul>li>a').removeClass('selected');
      $(this).addClass('selected');
      handler.refClick($(this).attr('id'));
    });
    this.imgElem.click(() => {handler.catClick();});
  }

  showCat (cat) {
    this.imgElem.attr('src', `img/${cat.image}`);
    View.showTitle(cat);
  }

  static showTitle (cat) {
    $('.image>h1').text(`${cat.name}: ${cat.counter}`);
  }
}

class App {
  constructor (data, view) {
    this.data = data;
    this.view = view;
  }

  init () {
    this.data.addCat('Kitten', 'cat1', 'cat.jpg');
    this.data.addCat('Shy', 'cat2', 'cat2.jpg');
    this.data.addCat('Cuddle', 'cat3', 'cat3.jpg');
    this.data.addCat('Shy-2', 'cat4', 'cat2.jpg');
    this.data.addCat('Kitten-2', 'cat5', 'cat.jpg');
    this.buildList();
    this.view.setEvents(this);
    this.refClick('cat1');
  }

  buildList () {
    this.data.cats.forEach((cat) => {
      View.drawListItem(cat.id, cat.name);
    });
    this.view.postListBuilding();
  }

  refClick (id) {
    this.view.showCat(this.data.cats.find(cat => cat.id === id));
    this.data.shownCat = id;
  }

  catClick () {
    const cat = this.data.cats.find(cat => cat.id === this.data.shownCat);
    cat.counter++;
    View.showTitle(cat);
  }
}

$(function () {
  const app = new App(new Data(), new View());
  app.init();
});
