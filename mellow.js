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

  Template.room.messages = function() {
    return Room.find();
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
