Template.toolbar.events({
    'click #btnAdd': function(e,template){
        addSnippet();
        template.find("form").reset(); 
    },
    'keypress #txtAdd': function(e,template){
        if(e.keyCode != 13) return;
        addSnippet();
        template.find("form").reset(); 
    }
});

function addSnippet(){
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
    
}
