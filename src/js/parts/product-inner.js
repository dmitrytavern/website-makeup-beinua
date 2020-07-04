export default function () {
	const frontSelector = document.querySelector('.product-inner__size-selector-front')
	const sizeApply 		= document.querySelector('.product-inner__size-apply')

	sizeApply.addEventListener('click', function() {
		frontSelector.classList.remove('product-inner__size-selector-front_opened')
	})
	frontSelector.addEventListener('click', function () {
		this.classList.toggle('product-inner__size-selector-front_opened')
	})
}
