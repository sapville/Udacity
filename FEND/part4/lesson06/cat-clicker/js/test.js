class Cat {
  constructor (name, id, image) {
    this.counter = 0;
    this.name = name;
    this.id = id;
    this.image = image;
  }

  click () {
    this.counter++;
    this.showTitle();
  }

  show () {
    $('.image>img').attr('src', `img/${this.image}`);
    this.showTitle();
  }

  showTitle () {
    $('.image>h1').text(`${this.name}: ${this.counter}`);
  }

}

class App {
  constructor () {
    this.cats = [];
    this.cats.push(new Cat('Kitten', 'cat1', 'cat.jpg'));
    this.cats.push(new Cat('Shy', 'cat2', 'cat2.jpg'));
    this.cats.push(new Cat('Cuddle', 'cat3', 'cat3.jpg'));
    this.cats.push(new Cat('Shy-2', 'cat4', 'cat2.jpg'));
    this.cats.push(new Cat('Kitten-2', 'cat5', 'cat.jpg'));
    this.shownCat = null;
  }

  buildList () {
    const ul = $('.list>ul');
    this.cats.forEach((cat) => {
      ul.append(`<li><a id="${cat.id}" href="#">${cat.name}</a></li>`);
    });
  }

  refClick (id) {
    this.cats.find(cat => cat.id === id).show();
    this.shownCat = id;
  }

  catClick () {
    this.cats.find(cat => cat.id === this.shownCat).click();
  }
}

function main () {
  const app = new App();
  app.buildList();
  app.refClick('cat1');
  const refElems = $('.list>ul>li>a');
  refElems.first().toggleClass('selected');
  refElems.on('click', function () {
    $('.list>ul>li>a').removeClass('selected');
    $(this).addClass('selected');
    app.refClick($(this).attr('id'));
  });
  $('.image>img').click(() => {app.catClick();});
}
