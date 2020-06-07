new Swiper('#home-slider', {
	pagination: {
		el: '.swiper-pagination',
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
})

new Swiper('#brands__slider', {
	pagination: {
		el: '.swiper-pagination',
	},

	navigation: {
		nextEl: '.brands__next',
		prevEl: '.brands__prev',
	},

	slidesPerView: 2,
	spaceBetween: 40,
	breakpoints: {
		768: {
			slidesPerView: 4,
			spaceBetween: 40,
		},
		1000: {
			slidesPerView: 5,
			spaceBetween: 55,
		},
		1600: {
			slidesPerView: 6,
			spaceBetween: 90,
		},
	}
})
