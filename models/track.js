//Requires & Vars
var mongoose = require('mongoose');

var TrackSchema = new mongoose.Schema({
	title: String,
	artist: String,
	starttime: String,
	url: String,
	imdbID: String,
	likes: Number 
})

module.exports = mongoose.model('Track', TrackSchema);
