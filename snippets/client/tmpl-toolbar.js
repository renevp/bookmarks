Template.toolbar.events({
    'click #btnAdd': function(e){
        addSnippet(e);
    },
    'keypress #txtAdd': function(e){
        if(e.keyCode != 13) return;
        addSnippet(e);
    }
});

function addSnippet(event){
    event.preventDefault();
    
    var txtNode = $('#txtAdd');
    var urlSnippet = {};

    if(!txtNode || !txtNode.val().trim() || !Meteor.userId()) return;
    if(txtNode.val().indexOf('http') == 0){
        urlSnippet = txtNode;
    }
    var id = Snippets.insert({
        text:txtNode.val(),
        owner:Meteor.userId(),
        URL: urlSnippet.val()});
    
    Meteor.call('getURLImage', urlSnippet.val(), function(err, results){
        if(err){
            console.log(err);
        }
        
        Snippets.update({_id:id}, {$set:{URLImage: results.image}});
    });
    
    console.log('Snippet added...');
    
    txtNode.val("");
}
