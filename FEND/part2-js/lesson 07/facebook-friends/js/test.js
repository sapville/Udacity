function showResult() {
  var output = null;
  ///////////////////////////////////////////////////////////////////////////
  /*************************************************************************/

 var facebookProfile = {
   name: 'Evgeny Fedoseev',
   friends: 9,
   messages: [
     'Hello, world!',
     'I\'m on Facebook!'
   ],
   postMessage: function(message) {
     this.messages.push(message);
   },
   deleteMessage: function(index) {
     this.messages.splice(index, 1);
   },
   addFriend: function() {
     this.friends += 1;
   },
   removeFriend: function () {
     this.friends -= 1;
   }
 };

console.log(facebookProfile.messages);
facebookProfile.postMessage('Hi');
console.log(facebookProfile.messages);
facebookProfile.deleteMessage(facebookProfile.messages.length-1);
console.log(facebookProfile.messages);
  /*
  your name
  the number of friends you have, and
  an array of messages you've posted (as strings)
  The object should also have 4 methods:

  postMessage(message) - adds a new message string to the array
  deleteMessage(index) - removes the message corresponding to the index provided
  addFriend() - increases the friend count by 1
  removeFriend() - decreases the friend count by 1
*/



  /****************************************************************************/
  if (output !== null) {
    console.log(output);
  }
  ////////////////////////////////////////////////////////////////////////////////
  document.getElementById('paragraph1').innerHTML = output;

}
