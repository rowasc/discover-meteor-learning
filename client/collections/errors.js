/**
This collection is not synchronized to the server , since we don't really care for it to be consistent accross users that much (meaning that if someone plays with the console and changes it, is not a big deal for us, and we don't really want to handle the collection from an administrative pov)
**/
Errors = new Mongo.Collection(null);
