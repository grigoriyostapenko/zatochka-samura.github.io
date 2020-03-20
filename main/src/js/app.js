$(document).ready(function(){
	$(".scrollToAnchor").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
		top = $(id).offset().top;
		
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top - 115}, 1500);
	});
});

const getHeightFirst = $('#firstTextfield').css('height');
const getHeightSecond = $('#secondTextfield').css('height');

if(getHeightFirst >= getHeightSecond) {
	$(".learn-info__list-text").css({"height":getHeightFirst});
} else {
	$(".learn-info__list-text").css({"height":getHeightSecond});
}

const getWidth = $(".sh-header").width();
$("#map").width(getWidth);


(function(){
	var $content = $('.modal_info').detach();

	$('.open_button').on('click', function(e){
		modal.open({
			content: $content,
			width: 540,
			height: 270,
		});
		$content.addClass('modal_content');
		$('.modal, .modal_overlay').addClass('display');
		$('.open_button').addClass('load');
		$("#body").css({"overflow": "hidden"});
	});
}());

var modal = (function(){

	var $close = $('<button role="button" class="modal_close" title="Close"><i class="fas fa-times"></i></button>');
	var $content = $('<div class="modal_content"/>');
	var $modal = $('<div class="modal"/>');
	var $window = $(window);

	$modal.append($content, $close);

	$close.on('click', function(e){
		$('.modal, .modal_overlay').addClass('conceal');
		$('.modal, .modal_overlay').removeClass('display');
		$('.open_button').removeClass('load');
		e.preventDefault();
		modal.close();
		$("#body").css({"overflow-x": "hidden"});
		$("body").css({"overflow-y": "visible"});
	});

	return {
		center: function(){
			var top = Math.max($window.height() - $modal.outerHeight(), 0) / 2;
			var left = Math.max($window.width() - $modal.outerWidth(), 0) / 2;
			$modal.css({
				top: top + $window.scrollTop(),
				left: left + $window.scrollLeft(),
			});
		},
		open: function(settings){
			$content.empty().append(settings.content);

			$modal.css({
				width: settings.width || 'auto',
				height: settings.height || 'auto'
			}).appendTo('body');

			modal.center();
			$(window).on('resize', modal.center);
		},
		close: function(){
			$content.empty();
			$modal.detach();
			$(window).off('resize', modal.center);
		}
	};
}());