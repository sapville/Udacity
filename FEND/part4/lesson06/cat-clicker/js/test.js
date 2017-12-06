class App {
  constructor () {
    this.counter = -1;
  }

  imgClick () {
    this.counter++;
    $('.counter h1').text(this.counter);
  }
}

function main () {
  const app = new App();
  app.imgClick();
  $('.image img').click( () => {app.imgClick();});
}
