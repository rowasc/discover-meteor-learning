Router.configure({
 layoutTemplate: 'layout',
 loadingTemplate: 'loading',
 notFoundTemplate: 'notFound',
 waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
    name: 'postPage',
    data: function() {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/posts/:_id/edit', {
    name:'postEdit',
    data: function(){
        return Posts.findOne(this.params._id);
    }
});

Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function(){
    if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
    } else if (!Meteor.user()){
        this.render('accessDenied');
    }else{
        this.next();
    }
};

Router.onBeforeAction(requireLogin, {only:'postSubmit'});

/**
catch 404 errors for posts , too
**/
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
