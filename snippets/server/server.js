// general server side code
Meteor.publish('snippets',function(){
	return Snippets.find({owner: this.userId});
})

Meteor.publish('snippets-admin',function(){
	return Snippets.find({}); // We want all the URLs
})

Snippets.allow({
    insert: function(userId, fields){
        return(userId);
    },
    update: function(userId, fields){
        return(userId); // make sure the user is logged
    }
})