function init(){
	//alert('Hakim');
	chrome.bookmarks.create({'parentId': bookmarkBar.id,
		'title': 'Extension bookmarks'},
		function(newFolder) {
			console.log("added folder: " + newFolder.title);
		});
}

$(function(){
	//alert("Codes here!");
	$('#update').click(function() {
		//$('#url').val('');
		alert("Update1134");
		//console.log("logs==Hakim");
		chrome.bookmarks.create({'parentId': extensionsFolderId,
			'title': 'Extensions doc Hakim',
			'url': 'http://code.google.com/chrome/extensions'});
	});

	$('#save').click(function() {
		//$('#url').val('');
		alert("Save");
	});

	chrome.bookmarks.create({'parentId': extensionsFolderId,
		'title': '1123Extensions doc Hakim',
		'url': 'http://code.google.com/chrome/extensions'});
})

// init();