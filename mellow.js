Room = new Meteor.Collection("room");

if (Meteor.isClient) {
  Template.input.events({
    'click #send' : function (event) {
      var name = $("#message-form input[name=name]").val();
      var msg = $("#message-form input[name=message]").val();
      if (msg.length === 0) return;
      Room.insert({name: name, message: msg});
      event.preventDefault();
    }
  });

  var testRegex = /^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/;

  Template.room.messages = function() {
    var messages = Room.find().fetch();
    var fixedMessages = [];
    messages.forEach(function(element) {
      if (testRegex.test(element.message)) {
        element.message="<img src='" + element.message + "' />"
      }
      fixedMessages.push(element);
    });
    return fixedMessages;
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
