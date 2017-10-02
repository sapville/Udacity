function buildATree() {
//There are two variants of implementation. The first one is less readable and less lenghthy
//whereas the second one is much better structured though takes more lines

/*
  $('<div id="family2"><h1>Family 2</h1></div>').insertAfter('#family1').append(
    '<div id="bruce"><h2>Bruce</h2></div>');
  $('#bruce').append('<div id="madison"><h3>Madison</h3></div>').append(
    '<div id="hunter"><h3>Hunter</h3></div>');
*/
  const family2 = $('<div id="family2"><h1>Family 2</h1></div>');
  const bruce = $('<div id="bruce"><h2>Bruce</h2></div>');
  const madison = $('<div id="madison"><h3>Madison</h3></div>');
  const hunter = $('<div id="hunter"><h3>Hunter</h3></div>');

  family2.insertAfter( $('#family1') );
  family2.append(bruce);
  bruce.append(madison, hunter);

}
