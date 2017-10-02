/*

For this quiz, can you use this script, which is linked in the <head> of index.html,
to change the boring placeholder image to a picture of a cute animal?

Remember, you'll need to pass a function into the jQuery object to run
when the document is ready.

Unfortunately, placepuppy is no longer available. Here's a link to a random
animal image on lorempixel.com:
http://lorempixel.com/350/150/animals/

Good luck!

*/
const customizing = {
  isKitten: false
};

function replaceImg() {
  let imgRef;
  const imgElem = $('li.article-item > img');
  const imgStyle = {
    'cursor': 'pointer'
  };

  imgElem.css(imgStyle);

  imgElem.click(function() {
    if (customizing.isKitten) {
      customizing.isKitten = false;
      imgRef = 'http://placehold.it/350x150';
    } else {
      customizing.isKitten = true;
      imgRef = 'http://placekitten.com/350/150';
    }
    $(this).attr('src', imgRef);
  });

}
