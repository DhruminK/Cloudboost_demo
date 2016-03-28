var express = require('express');
var router = express.Router();
var CB= require('../cloudboost/dist/cloudboost');

CB.CloudApp.init('fynytuholkmk', '873a8786-810b-408b-a3ec-82fc7c6be4f9');

router.route("/")
	.get(function(req , res)
	{

	});

module.exports = router;	