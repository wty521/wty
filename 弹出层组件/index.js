require(['jquery','dialog'],function ($, Dialog) {
	
	$('#btn').on('click',function () {
		// dialog.open({
		// 	title:'我的对话框',
		// 	width: 500,
		// 	url:'login.html'
		// });
		var dialog = new Dialog();
		dialog.open({
			title:'我的对话框',
			width: 500,
			url:'login.html'
		});
	});

	// $('#btn-close').on('click',function () {
	// 	dialog.close();
	// })
});