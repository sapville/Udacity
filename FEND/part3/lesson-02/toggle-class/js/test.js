function togglingAround() {
  let article2, article3;
  article2 = $('.article-list').children('.featured');
  article3 = article2.next();
  article2.toggleClass('featured');
  article3.toggleClass('featured');  
}
