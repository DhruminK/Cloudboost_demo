var express = require('express');
var router = express.Router();
var CB= require('cloudboost');

router.route('/')
	.get(function(req ,res)
	 {
		var query = new CB.CloudQuery("Tutorial");
		query.notEqualTo('name','');
		query.find(
		{
			success: function(list)
			{
				res.json(CB.toJSON(list));


			},
			error: function(err)
			{
				res.send(err);
			}
		});

	})
	.post(function(req, res)
	{
		var arr = JSON.parse(JSON.stringify(req.body));
		var CO = new CB.CloudObject("Tutorial");
		CO.set("name", arr["name"]);
		CO.set("phone_number", Number(arr["phone_number"]));
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

router.route('/:id')
	.get(function(req, res){
		var id = req.params.id;
		var CQ = new CB.CloudQuery("Tutorial");
		CQ.equalTo('id', id);
		CQ.find({
			success: function(list){
				res.json(CB.toJSON(list));
			},
			error: function(err){
				res.send(err);
			}
		})
	})
	.delete(function(req, res){
		var id = req.params.id;
		var CQ = new CB.CloudQuery("Tutorial");
		CQ.findById(id , {
			success:function(obj){
				obj.delete({
					success: function(obj1){
						res.send({message: "Classes Deleted"});
					},
					error: function(err){
						res.send(err);
					}
				})
			},
			error: function(err){
				res.send({message: err});
			}
		})
		
	});

router.route("/Cl/:name")
	.get(function(req, res){
		var name= req.params.name;
		console.log(name);
		var CQ = new CB.CloudQuery("Tutorial");
		CQ.equalTo("name", name);
		CQ.find({
			success: function(list)
			{
				console.log(list);
				res.json(CB.toJSON(list));
			},
			error: function(err)
			{
				res.send({message: err});
			}
		})
	});		

router.route("/search/:id/streams")
	.get(function(req , res){
		var id = req.params.id;
		var CQT = new CB.CloudQuery("Tutorial");
		CQT.findById(id, {
			success:function(tutorial){
				var CQ = new CB.CloudQuery("TutorialStream");
				CQ.equalTo("tutorial", tutorial);
				CQ.find({
					success:function(list)
					{
						var arr= [];
						for(var i=0; i<list.length;i++)
						{
							var streamObj = list[i].get("stream").get("id");
							arr[i]=streamObj;
						}
						var CQS = new CB.CloudQuery("Stream");
						CQS.containedIn("id", arr);
						CQS.find({
							success: function(list){
								res.json(CB.toJSON(list));
							},
							error: function(err){
								res.send(err);
							}
						})
					},
					error:function(err)
					{
						res.send(err);
					}
				});
			},
			error:function(err)
			{
				res.send(err);
			}
		});
			
	});	

router.route("/search/:id/subjects")
	.get(function(req , res){
		var id = req.params.id;
		var CQT = new CB.CloudQuery("Tutorial");
		CQT.findById(id , {
			success:function(tutorial){
				var CQ = new CB.CloudQuery("TutorialSubject");
				CQ.equalTo("tutorial", tutorial);
				CQ.find({
					success:function(list){
						var arr=[];
						for(var i=0;i<list.length;i++)
						{
							var subObj= list[i].get("subject").get("id");
							arr[i]= subObj;
						}
						var CQS = new CB.CloudQuery("Subject");
						CQS.containedIn("id" , arr)
						CQS.find({
							success: function(list){
								res.send(CB.toJSON(list));
							},
							error: function(err){
								res.send(err);
							}
						})
					},
					error:function(err){
						res.send(err);
					}
				});
			},
			error:function(err){
				res.send(err);
			}
		}); 
	});	

router.route("/search/:id/teachers")
	.get(function(req , res){
		var id=req.params.id;
		var CQT = new CB.CloudQuery("Tutorial");
		CQT.findById(id ,{
			success:function(tutorial){
				var CQ = new CB.CloudQuery("TutorialTeacher");
				CQ.equalTo("tutorial", tutorial);
				CQ.find({
					success: function(list){
						var arr = [];
						for(var i=0; i<list.length;i++)
						{
							teaObj = list[i].get("teacher").get("id");
							arr[i] = teaObj;
						}
						var CQTe = new CB.CloudQuery("Teacher");
						CQTe.containedIn("id", arr);
						CQTe.find({
							success:function(list){
								res.send(CB.toJSON(list));
							},
							error: function(err){
								res.send(err);
							}
						});
					}
				})
			},
			error: function(err){
				re.send(err);
			}
		})
	});	

	module.exports = router;