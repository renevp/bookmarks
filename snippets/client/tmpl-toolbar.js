Template.toolbar.events({
    'click #btnAdd': function(e){
        addSnippet();
    },
    'keypress #txtAdd': function(e){
        if(e.keyCode != 13) return;
        addSnippet();
    }
});

function addSnippet(){
    var txtNode = $('#txtAdd');
    if(!txtNode || !txtNode.val() || !Meteor.userId()) return;
    Snippets.insert({
        text:txtNode.val(),
        owner:Meteor.userId()});
    txtNode.val(' ');
}