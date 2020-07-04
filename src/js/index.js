import './parts/header'
import './parts/sliders'
import './parts/account'
import filters from './parts/filters'
import productInner from './parts/product-inner'

if (document.querySelector('#catalog-page')) filters()
if (document.querySelector('#product-inner-page')) productInner()



/*
* 	Remove active submenu
* */

document.addEventListener('click', function (e) {
	let arr = e.path.filter(x => $(x).hasClass('custom-filter'))

	if (window.innerWidth > 992 && arr.length == 0) {
		$('.custom-filter__front').removeClass('show')
	}
})