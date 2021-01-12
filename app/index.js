const imageSwiper = new Swiper(".swiper-image-container", {
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
});

var iconSwiper = new Swiper('.swiper-icons', {
	spaceBetween: 30,
	centeredSlides: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
});

$.scrollify({
	section: ".section",
	standardScrollElements: 'header',
	before:function () {
		$(".header__nav a").on("click", $.scrollify.move);
		var active = $.scrollify.current().attr('data-section-name');
		($('.header__nav').children()).each(function (indx, element) {
			$(element).removeClass('active')
			var link = $(element).attr("data")
			if (link == active) {
				$(element).addClass('active')
			}
		})
	}
});




