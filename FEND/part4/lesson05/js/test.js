function someFunction () {
  $('h1').hover(function () {
    $(this).toggleClass('blue');
  });

  const headers = new Headers();
  headers.append('Authorization', 'Client-ID 14d5810d436b6e09a64261d8b3d8271645affec5c67a0633fb52a7002b071fcb');
  fetch('https://api.unsplash.com/search/photos?page=1&query=hippo', {
    headers: headers
  })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      $('h1').after(`<img src=${data.results[0].urls.small}>`);
    });
  fetch('https://api.unsplash.com/search/photos?page=1&query=hippo', {
    headers: headers,
    method: 'POST'
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw Error('Error during connection');
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (data) {
      if (data && data.results[1]) {
        $('h1').after(`<img src=${data.results[1].urls.small}>`);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
