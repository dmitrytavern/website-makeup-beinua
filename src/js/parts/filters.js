export default function () {
	let selectedFilter 	= null
	let filterFront 		= $('.custom-filter__front');

	let loaders = {
		brands() {
			let brandsContainer = document.querySelector('[data-filter-brands]')
			let brandsFront     = brandsContainer.querySelector('.custom-filter__front')
			let brandsActive    = [...brandsContainer.querySelectorAll('.custom-checkbox__input')].filter(x => x.checked)
			let input           = brandsContainer.querySelector('.custom-filter__front span')


			$(brandsFront).removeClass('show')

			if (brandsActive.length === 0) return

			$(brandsFront).addClass('custom-filter__front_closer')

			if (brandsActive.length === 1) {
				input.innerHTML = $(brandsActive[0]).attr('data-checkbox')
			} else if (brandsActive.length > 1) {
				input.innerHTML = 'Бренд: ' + brandsActive.length
			}
		}
	}

	function setFilter(filter, value) {
		let filterSpan    = filter.querySelector('.custom-filter__front span')
		let filterItems   = filter.querySelectorAll('.custom-submenu-selector__item_selected')
		let filterActive  = filter.querySelector('.custom-submenu-selector__item[data-filter="' + value + '"]')

		$(filterFront).removeClass('show')
		$(filterItems).removeClass('custom-submenu-selector__item_selected')
		$(filterActive).addClass('custom-submenu-selector__item_selected')
		filterSpan.innerHTML = filterActive.innerHTML
	}


	let filtersItems = $('[data-filter-items]')
	for (let filter of Array.from(filtersItems)) {
		let items = filter.querySelectorAll('.custom-submenu-selector__item')

		Array.from(items).map((item) => {
			let value = $(item).attr('data-filter')
			item.addEventListener('click', function () {
				setFilter(filter, value)
			})
		})
	}


	function toggleFilter() {
		if ($(this).hasClass('custom-filter__front_closer')) {
			let brandsContainer = document.querySelector('[data-filter-brands]')
			let brandsActive    = brandsContainer.querySelectorAll('.custom-checkbox__input')
			let inner           = this.querySelector('span')

			$(this).removeClass('custom-filter__front_closer')
			$(brandsActive).checked = false
			inner.innerHTML = 'Бренды'
		}

		if (selectedFilter) {
			if (selectedFilter !== this) {
				if (window.innerWidth > 992) {
					selectedFilter.classList.remove('show')
				}
				this.classList.toggle('show')
				selectedFilter = this
			} else {
				selectedFilter.classList.toggle('show')
			}
		} else {
			this.classList.toggle('show')
			selectedFilter = this
		}
	}


	function applyButtons() {
		if (window.innerWidth > 992) $(selectedFilter).removeClass('show')

		const loader = $(this).attr('data-loader')

		if (loader) if (loaders[loader]) loaders[loader]()
	}

	$('.custom-filter__front').on('click', toggleFilter)
	$('.custom-filter__apply').on('click', applyButtons)
}
