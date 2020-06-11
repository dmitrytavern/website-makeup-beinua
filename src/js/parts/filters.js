export default function () {
	var selectedFilter = null
	var filterFront = document.querySelectorAll('.custom-filter__front');

	var loaders = {
		brands() {
			var brandsContainer = document.querySelector('[data-filter-brands]')
			var brandsFront     = brandsContainer.querySelector('.custom-filter__front')
			var brandsActive    = brandsContainer.querySelectorAll('.custom-checkbox_checked')
			var input           = brandsContainer.querySelector('.custom-filter__front span')

			$(brandsFront).removeClass('custom-filter__front_open')

			if (brandsActive.length === 0) return

			if (brandsActive.length === 1) {
				input.innerHTML = $(brandsActive[0]).attr('data-checkbox')
			} else if (brandsActive.length > 1) {
				input.innerHTML = 'Бренд: ' + brandsActive.length
			}

			brandsFront.classList.add('custom-filter__front_closer')
		}
	}

	function setFilter(filter, value) {
		var filterFront   = $('.custom-filter__front')
		var filterSpan    = filter.querySelector('.custom-filter__front span')
		var filterItems   = filter.querySelectorAll('.custom-submenu-selector__item_selected')
		var filterActive  = filter.querySelector('.custom-submenu-selector__item[data-filter="' + value + '"]')

		$(filterFront).removeClass('custom-filter__front_open')
		filterSpan.innerHTML = filterActive.innerHTML
		$(filterItems).removeClass('custom-submenu-selector__item_selected')
		$(filterActive).addClass('custom-submenu-selector__item_selected')
	}

	var filtersItems = $('[data-filter-items]')
	for (let filter of Array.from(filtersItems)) {
		var items = filter.querySelectorAll('.custom-submenu-selector__item')

		Array.from(items).map((item) => {
			console.log(item)
			var value = item.getAttribute('data-filter')
			item.addEventListener('click', function () {
				setFilter(filter, value)
			})
		})
	}


	function toggleFilter() {
		if ($(this).hasClass('custom-filter__front_closer')) {
			var brandsContainer = document.querySelector('[data-filter-brands]')
			var brandsActive    = brandsContainer.querySelectorAll('.custom-checkbox_checked')
			var inner           = this.querySelector('span')

			$(this).removeClass('custom-filter__front_closer')
			$(brandsActive).removeClass('custom-checkbox_checked')
			inner.innerHTML = 'Бренды'
		}

		if (selectedFilter) {
			if (selectedFilter !== this) {
				if (window.innerWidth > 992) {
					selectedFilter.classList.remove('custom-filter__front_open')
				}
				this.classList.toggle('custom-filter__front_open')
				selectedFilter = this
			} else {
				selectedFilter.classList.toggle('custom-filter__front_open')
			}
		} else {
			this.classList.toggle('custom-filter__front_open')
			selectedFilter = this
		}
	}

	function checkBoxSelect() {
		this.classList.toggle('custom-checkbox_checked')
	}

	document.addEventListener('click', function (e) {
		var target = e.target
		while (true) {
			if ($(target).hasClass('custom-filter')) {
				break
			} else {
				if (!target.offsetParent) {
					if (window.innerWidth > 992) {
						$(filterFront).removeClass('custom-filter__front_open')
					}
					break
				}
				target = target.offsetParent
			}
		}
	})


	function applyButtons() {
		if (window.innerWidth > 992) {
			$(selectedFilter).removeClass('custom-filter__front_open')
		}

		const loader = $(this).attr('data-loader')


		if (loader) {
			if (loaders[loader]) loaders[loader]()
		}
	}


	var filtersContainer = $('.custom-filters')

	function openFiltersPopup() {
		$(filtersContainer).addClass('custom-filters_opened')
	}

	function closeFiltersPopup() {
		$(filtersContainer).removeClass('custom-filters_opened')
	}

	$('.tools__filters').on('click', openFiltersPopup)
	$('.custom-filters__close').on('click', closeFiltersPopup)
	$('.mobile-apply__btn').on('click', function () {
		closeFiltersPopup()
	})


	var filterCheckboxes  = $('.custom-checkbox')
	var filterApply       = $('.custom-filter__apply')

	$(filterFront).on('click', toggleFilter)
	$(filterApply).on('click', applyButtons)
	$(filterCheckboxes).on('click', checkBoxSelect)
}
