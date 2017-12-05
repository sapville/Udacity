function someFunction() {
/*
  $('h1').hover(function() {
    $(this).toggleClass('blue');
  });
*/

  $.ajax({
    url: 'https://api.unsplash.com/search/photos?page=1&query=hippo',
    headers: {
      Authorization: 'Client-ID 14d5810d436b6e09a64261d8b3d8271645affec5c67a0633fb52a7002b071fcb'
    }
  }).then((data) => {
    $('h1').after(`<img src=${data.results[0].urls.regular}>`);
  });

}
