define(['jquery'], function ($) {

	function Dialog() {
		
	}
	Dialog.prototype.open = function(options){
			var self = this;

			var settings = {
				width:400,
				height:300
			};
			$.extend(settings, options);
			this.$container = $('<div class="dialog-container"></div>');
			this.$mask = $('<div class="dialog-mask"></div>');
			this.$dialogBox = $('<div class="dialog-box"></div>');
			this.$titleBox = $('<div class="dialog-title-box"><div>');
			this.$title = $('<span class="dialog-title"></span>');
			this.$btnClose = $('<span class="dialog-close-btn">[X]</span>');
			this.$content = $('<div class="dialog-content"></div>');

			this.$container.append(this.$mask);
			this.$dialogBox.css({
				width: settings.width,
				height: settings.height,
				marginLeft: -settings.width/2,
				marginTop: -settings.height/2
			}).appendTo(this.$container);
			this.$title.html(settings.title).appendTo(this.$titleBox);
			this.$btnClose.on('click',function () {
				self.close();
			}).appendTo(this.$titleBox);
			this.$titleBox.appendTo(this.$dialogBox);
			this.$content.load('login.html').appendTo(this.$dialogBox);


			// this.$mask.on('click',function(){
			// 	this.container.close();
			// })
			$(document.body).append(this.$container);
		};
	Dialog.prototype.close = function () {
			this.$container.remove();
		}
	// 大多数返回的都是对象
	return Dialog;
});

