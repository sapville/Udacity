class Cat {
  constructor (name, id, image) {
    this.counter = -1;
    this.name = name;
    this.id = id;
    this.image = image;
  }

  catClick () {
    this.counter++;
    $('h1.' + this.id).text(`${this.name}: ${this.counter}`);
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
  }

  buildList() {
    const ul = $('.list>ul');
    this.cats.forEach( (cat) => {
      ul.append(`<li><a id="${cat.id}" href="#">${cat.name}</a></li>`);
    });
  }

  refClick (id) {
    console.log(id);
    // this.cats.find(cat => cat.id === id).catClick();
  }
}

function main () {
  const app = new App();
  app.buildList();
  app.refClick('cat1');
  $('.list>ul>li>a').on('click', function() {
    app.refClick($(this).attr('id'));
  });
/*
  app.imgClick('cat1');
  app.imgClick('cat2');
  $('img.cat1').click( () => {app.imgClick('cat1');});
  $('img.cat2').click( () => {app.imgClick('cat2');});
*/
}
