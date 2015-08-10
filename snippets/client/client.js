// for our general client side JS
Meteor.subscribe('snippets');

Router.configure({
    layoutTemplate: 'main'
});

$('.remove').click();