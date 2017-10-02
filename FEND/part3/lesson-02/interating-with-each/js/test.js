function charCount() {
  $('p').each(function(index, element) {
    $(element).text(function(index, para) {
      return para + para.length;
    });
  });
  /*  $('p').text( function( index, para ) {
      return para + para.length;
    });
  */
}
