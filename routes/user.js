var express = require('express');
var router = express.Router();
var CB= require('../cloudboost/dist/cloudboost');

CB.CloudApp.init('fynytuholkmk', '873a8786-810b-408b-a3ec-82fc7c6be4f9');

var CBU = new CB.CloudUser();


router.route('/SignUp')
	.post(function(req , res){
		var arr= JSON.parse(JSON.stringify(req.body));
		var new_CBU = new CB.CloudUser();
		new_CBU.set('username', arr["username"]);
		new_CBU.set('password', arr["password"]);
		new_CBU.set('email', arr["email"]);
		new_CBU.save({
			success: function(user){
				res.json({message:"User Added"});
			},
			error: function(err){
				res.send(err);
			}
		});
	});

router.route('/LogIn')
	.post(function(req ,res){
		var arr= JSON.parse(JSON.stringify(req.body));
		var new_CBU= new CB.CloudUser();
		new_CBU.set('username', arr["username"]);
		new_CBU.set('password', arr["password"]);
		new_CBU.logIn({
			success: function(user){
				CBU = CB.CloudUser.current;
				res.json({message: "User Logged In"});
			},
			error: function(err){
				res.send(err);
			}
		});
	});

router.route('/LogOut')
	.post(function(req , res){
		CB.CloudUser.current.logOut({
			success: function(user){
				CBU = null;
				res.json({message: "User Logged Out"});
			},
			error: function(err){
				res.send(err);
			}
		});
	});	



module.exports = router;