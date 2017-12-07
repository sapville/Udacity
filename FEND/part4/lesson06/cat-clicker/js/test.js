class Cat {
  constructor (name, id) {
    this.counter = -1;
    this.name = name;
    this.id = id;
  }

  catClick () {
    this.counter++;
    $('h1.' + this.id).text(`${this.name}: ${this.counter}`);
  }
}

class App {
  constructor () {
    this.cats = [];
    this.cats.push(new Cat('Kitten', 'cat1'));
    this.cats.push(new Cat('Shy', 'cat2'));
  }

  imgClick (id) {
    this.cats.find(cat => cat.id === id).catClick();
  }
}

function main () {
  const app = new App();
  app.imgClick('cat1');
  app.imgClick('cat2');
  $('img.cat1').click( () => {app.imgClick('cat1');});
  $('img.cat2').click( () => {app.imgClick('cat2');});
}
