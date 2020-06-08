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


new Swiper('#popular__slider', {
	pagination: {
		el: '.swiper-pagination',
	},

	navigation: {
		nextEl: '.popular__next',
		prevEl: '.popular__prev',
	},

	slidesPerView: 2,
	spaceBetween: 30,
	breakpoints: {
		768: {
			slidesPerView: 4,
			spaceBetween: 35,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 35,
		},
		1600: {
			slidesPerView: 4,
			spaceBetween: 35,
		},
	}
})

var sliderImg = document.querySelector('#product-inner__image')
var sliderThumbs = document.querySelector('#product-inner__thumbs')
function productInnerSliderResize() {
	var height = 100

	if (window.innerWidth <= 1300) height = 64

	sliderThumbs.style.height = sliderImg.offsetHeight - height + 'px'
}
productInnerSliderResize()
window.addEventListener('resize', productInnerSliderResize)

var galleryThumbs = new Swiper('#product-inner__thumbs', {
	spaceBetween: 12,
	direction: 'vertical',
	navigation: {
		nextEl: '.product-inner__slider-btn_next',
		prevEl: '.product-inner__slider-btn_prev',
	},
	freeMode: true,
	watchSlidesVisibility: true,
	watchSlidesProgress: true,
	slidesPerView: 3,
	breakpoints: {
		1600: {
			spaceBetween: 18
		},
	}
});

new Swiper('#product-inner__image', {
	slidesPerView: 1,
	pagination: {
		el: '.swiper-pagination',
	},
	thumbs: {
		swiper: galleryThumbs
	}
});
