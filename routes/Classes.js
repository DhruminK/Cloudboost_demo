var express = require('express');
var router = express.Router();
var CB= require('cloudboost');

CB.CloudApp.init('jlehlittjlsh', '58297006-d978-478d-bbac-b66aa6a31c59');


router.route('/Classes')
	.get(function(req ,res)
	 {
		var query = new CB.CloudQuery("Classes");
		query.notEqualTo('name','0');
		query.find(
		{
			success: function(list)
			{
				res.send(CB.toJSON(list));


			},
			error: function(err)
			{
				res.send(err);
			}
		});

	})
	.post(function(req, res)
	{
		var CO = CB.fromJSON(req.body);
		CO.save(
		{
			success: function(obj){
				res.send({ message: "Classes Added" });
			},

			error: function(err){
				res.send(err);
			}
		});
	});

	module.exports = router;