var conn = DDP.connect('localhost:3000');
Snippets = new Mongo.Collection('snippets', conn);

// We will need admin / security login
Tokens = new Mongo.Collection('user-tokens');

var token = Tokens.findOne({});

if(!token){
    initLogin();
}else{
    loginWithToken(token);
}

// If we have a valid token, let's proceed
if(token){
    conn.subscribe('snippets-admin', function(){
        Snippets.find().observeChanges({
            added : function(id, s){
                if(!s.text || s.URL) return;
                if(s.text.indexOf('http') == 0){
                    s.URL = s.text;
                    try{
                        Snippets.update({_id:id}, {$set:s});
                    }
                    catch(e){
                        console.log('ERROR updating');
                        console.log(e);
                    }
                }
            }
        });
    });
}

function initLogin(){
    conn.call('login',
              {user : {email: 'admin@test.com'},
              password: 'meteor'},
    function(err, result){
        if(err){
            console.log('ERROR logging in:');
            console.log(err);
            return;
        }
        Tokens.upsert({userid:result.id}, {$set:result});
    });
}

function loginWithToken(token){
    conn.call('login',
              {resume: token.token},
    function(err, res){
        if(err){
            Tokens.remove({});
            console.log('ERROR login with token:');
            console.log(err);
            initLogin(); // if the token didn't work, try login in
            return;
        }
        Tokens.upsert({userid:res.id},{$set:res});
    });
}