<html>
<script src="jquery-1.11.0.js">

function returnYoutubeVideoCode(searchTerm) {
	var jsonOutput = $.getJSON( "https://gdata.youtube.com/feeds/api/videos/-/wake/me/up?v=2&max-results=1&alt=json", function() {
		console.log( "success" );
	})
	.done(function() {
		console.log( "second success" );
	})
	.fail(function() {
		console.log( "error" );
	})
	.always(function() {
		console.log( "complete" );
	});	
	console.log(jsonOutput);
}

/*function returnYoutubeThumbnail(searchTerm) {

}*/


</script>
</html>