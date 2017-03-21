//Routes & Vars
var express = require('express');
var Track = require('../models/track');
var router = express.Router();

//Routes
router.post('/', function(req,res){
	//Create the track
	Track.create(req.body, function(err, track) {
		if (err) return res.status(500).send(err);
		return res.send(track);
	});
});

router.get('/', function(req,res){
	//Show the track
	Track.find(function(err, tracks) {
		if (err) return res.status(500).send(err);
		return res.send(tracks);
	});
});

router.get('/:filmId', function(req,res){
	//Show the track
	Track.find({imdbID : req.params.filmId}, function(err, tracks) {
		if (err) return res.status(500).send(err);
		return res.send(tracks);
	});
});

router.put('/:songId', function(req,res){
	//Update the track
	Track.findById(req.params.songId, function(err, track) {
		if (err) return res.status(500).send(err);
		return res.send(track);
	})
});

//Listener
module.exports = router;
