export default function () {
	var selectedFilter = null
	var filterFront = document.querySelectorAll('.custom-filter__front')

	function setFilter(filter, value) {
		var filterFront = filter.querySelector('.custom-filter__front')
		var filterSpan = filterFront.querySelector('span')
		var filterItems = filter.querySelectorAll('.custom-submenu-selector__item_selected')
		var filterActive = filter.querySelector('.custom-submenu-selector__item[data-filter="' + value + '"]')

		filterFront.classList.remove('custom-filter__front_open')
		filterSpan.innerHTML = filterActive.innerHTML
		for (let item of [...filterItems]) item.classList.remove('custom-submenu-selector__item_selected')
		filterActive.classList.add('custom-submenu-selector__item_selected')

		/* Logic of sort */
	}

	var filtersItems = document.querySelectorAll('[data-filter-items]')
	for (let filter of Array.from(filtersItems)) {
		var items = filter.querySelectorAll('.custom-submenu-selector__item')

		Array.from(items).map((item) => {
			var value = item.getAttribute('data-filter')
			item.addEventListener('click', function () {
				setFilter(filter, value)
			})
		})
	}


	function toggleFilter() {
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
			if (target.classList.contains('custom-filter')) {
				break
			} else {
				if (!target.offsetParent) {
					if (window.innerWidth > 992) {
						for (let front of [...filterFront]) front.classList.remove('custom-filter__front_open')
					}
					break
				}
				target = target.offsetParent
			}
		}
	})

	var filtersContainer = document.querySelector('.custom-filters')

	function openFiltersPopup() {
		filtersContainer.classList.add('custom-filters_opened')
	}

	function closeFiltersPopup() {
		filtersContainer.classList.remove('custom-filters_opened')
	}

	document.querySelector('.tools__filters').addEventListener('click', openFiltersPopup)
	document.querySelector('.custom-filters__close').addEventListener('click', closeFiltersPopup)
	document.querySelector('.mobile-apply__btn').addEventListener('click', function () {
		closeFiltersPopup()
		/* Logic apply settings */
	})


	var filterCheckboxes = document.querySelectorAll('.custom-checkbox')
	var filterApply = document.querySelectorAll('.custom-filter__apply')
	for (let front of [...filterFront]) front.addEventListener('click', toggleFilter)
	for (let front of [...filterApply]) front.addEventListener('click', toggleFilter)
	for (let box of [...filterCheckboxes]) box.addEventListener('click', checkBoxSelect)

}
