Posts = new Mongo.Collection('posts');
Posts.allow({
    update: function(userId, post){return ownsDocument(userId,post);},
    remove: function(userId, post){alert("remove" ) ; return ownsDocument(userId,post);},
});
Posts.deny({
    update: function(userId, post, fieldNames,modifier){
        var errors = validatePost(modifier.$set);

        return errors && (_.without(fieldNames, 'url','title').length>0);
    }
});
Meteor.methods({
    'postInsert': function(postAttributes){

        check(Meteor.userId(), String);

        check(postAttributes, {
            title:String,
            url: String
        });


        var postWithSameLink = Posts.findOne({url:postAttributes.url});
        if (postWithSameLink){
            return {
                postExists:true,
                _id: postWithSameLink._id
            };
        };

        var user = Meteor.user();
        var post=_.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        var postId= Posts.insert(post);

        return {
            _id:postId
        };
    }

});


validatePost = function(post){
    var errors={};
    console.log(post);
    if (!post.title){
        errors.title="Post Title should not be empty";
    }
    if (!post.url){
        errors.url="Post URL should not be empty";
    }
    return errors;
};
