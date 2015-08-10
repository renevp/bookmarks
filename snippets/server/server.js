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
    },
    remove: function(userId, fields){
        return(userId); // make sure the user is logged
    }
})

Meteor.methods({
    'getURLImage': function(urlImg){
        var apiURL = "http://api.screenshotlayer.com/api/capture";
        var userAccessKey = "6027c66ea464490530049886466d5e5f";
        var widthImg = "250";
        var result = {};
        var url = apiURL + "?access_key=" + userAccessKey + "&width=" + widthImg + "&url=" + urlImg;
        
        try {
            
            result = Meteor.http.call("GET", url);
            console.log('Image Created: ');
            console.log(result);

        } catch (err) {
            console.log('ERROR creating image.');
            console.log(err);
            return;
        }
        
        result.image = url;
        return result;
    }
});