export default function () {
	const frontSelector = document.querySelector('.product-inner__size-selector-front')
	var sizeCheckboxes = document.querySelectorAll('.custom-checkbox')
	var sizeApply = document.querySelector('.product-inner__size-apply')

	document.addEventListener('click', function (e) {
		var target = e.target
		while (true) {
			if (target.classList.contains('product-inner__size-selector')) {
				break
			} else {
				if (!target.offsetParent) {
					if (window.innerWidth > 992) {
						frontSelector.classList.remove('product-inner__size-selector-front_opened')
					}
					break
				}
				target = target.offsetParent
			}
		}
	})

	function toggleFilter() {
		frontSelector.classList.remove('product-inner__size-selector-front_opened')
	}

	function checkBoxSelect() {
		this.classList.toggle('custom-checkbox_checked')
	}

	sizeApply.addEventListener('click', toggleFilter)
	for (let box of [...sizeCheckboxes]) box.addEventListener('click', checkBoxSelect)


	frontSelector.addEventListener('click', function () {
		this.classList.toggle('product-inner__size-selector-front_opened')
	})
}
