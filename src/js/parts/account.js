new Vue({
	el: '#account-table',
	data: {
		filter: null,
		filterType: null,
		filters: {
			price: ['top', 'down', 'default'],
			brand: ['top', 'down', 'default'],
			status: ['top', 'down', 'default']
		},
		pagination: {
			items: 2,
			total: 6,
			pages: 2,
			active: 1,
			next: true,
			prev: false
		},
		list: [],
		listSort: [],
		listDefault: [
			{ id: 1, image: 'products/man-1.png', title: 'Повседневные', price: 450, seller: 'Lazana', vendor: 'FU8943386', status: 'close', selected: false },
			{ id: 2, image: 'products/man-2.png', title: 'Повседневные', price: 355, seller: 'Lazana', vendor: 'BU89336', status: 'open', selected: false },
			{ id: 3, image: 'products/man-3.png', title: 'Повседневные', price: 550, seller: 'Adrena', vendor: 'EU8937346', status: 'close', selected: false },
			{ id: 4, image: 'products/man-4.png', title: 'Повседневные', price: 150, seller: 'Lazana', vendor: 'KU8945386', status: 'close', selected: false },
			{ id: 5, image: 'products/man-5.png', title: 'Повседневные', price: 50, seller: 'Lazana', vendor: 'RU8937586', status: 'open', selected: false },
			{ id: 6, image: 'products/man-6.png', title: 'Повседневные', price: 1450, seller: 'Lazana', vendor: 'BU89d7386', status: 'close', selected: false },
		]
	},
	created() {
		this.list = [...this.listDefault].filter((item, index) => index < this.pagination.items )
		this.listSort = [...this.listDefault]
		this.pagination.pages = Math.ceil(this.pagination.total / this.pagination.items)
	},
	watch: {
		'pagination.active'(newVal, oldVal) {
			this.onFilter(this.filter, true)

			this.list = [...this.listSort]
				.filter((item, index) =>
					index >= this.pagination.items * (newVal - 1) && index < this.pagination.items * newVal
				)

			this.pagination.next = this.pagination.prev = true
			if (newVal >= this.pagination.pages) this.pagination.next = false
			if (newVal <= 1) this.pagination.prev = false
		}
	},
	methods: {

		setPage(num) {
			if (num > this.pagination.pages || num < 1) return
			this.pagination.active = num
		},

		setPagination(newArr) {
			let newVal = this.pagination.active
			this.list = [...newArr]
				.filter((item, index) =>
					index >= this.pagination.items * (newVal - 1) && index < this.pagination.items * newVal
				)
		},

		setList(newArr) {
			this.listSort = newArr
			this.setPagination(this.listSort)
		},


		onSelect(item) {
			item.selected = !item.selected
		},


		onFilter(type, freeze = false) {
			let filterType = this.filterType

			if (this.filter !== null) {
				this.filters[type].push(filterType)
			}

			this.filter = type
			if (!freeze) {
				this.filterType = this.filters[type].splice(0, 1)[0]
			}

			if (this.filterType === 'default') {
				this.filters[type].push('default')
				this.filter 		= null
				this.filterType = null
				this.list 			= [...this.listDefault]
				return
			}

			switch (this.filter) {
				case 'price': this._onFilterPrice(); break;
				case 'brand': this._onFilterBrand(); break;
				case 'status': this._onFilterStatus(); break;
			}
		},

		_onFilterPrice() {
			let list = this.listDefault
			switch (this.filterType) {
				case 'top':
					this.setList(list.sort((a, b) => a.price - b.price))
					break;
				case 'down':
					this.setList(list.sort((a, b) => b.price - a.price))
					break;
			}
		},
		_onFilterBrand() {
			let list = this.listDefault

			switch (this.filterType) {
				case 'top':
					this.setList(list.sort((a, b) => {
						let nameA = a.seller.toLowerCase(),
								nameB = b.seller.toLowerCase()

						if (nameA < nameB) return -1
						if (nameA > nameB) return 1
						return 0
					}))
					break;
				case 'down':
					this.setList(list.sort((a, b) => {
						let nameA = a.seller.toLowerCase(),
							nameB = b.seller.toLowerCase()

						if (nameA > nameB) return -1
						if (nameA < nameB) return 1
						return 0
					}))
					break;
			}
		},
		_onFilterStatus() {
			let list 		= this.listDefault
			let filters = {
				open: 1,
				close: 0
			}

			switch (this.filterType) {
				case 'top':
					this.setList(list.sort((a, b) => filters[b.status] - filters[a.status]))
					break;
				case 'down':
					this.setList(list.sort((a, b) => filters[a.status] - filters[b.status]))
					break;
			}
		}
	},
	computed: {
		selectedItems() {
			return this.list.filter(x => x.selected).length
		},
		sortStyle(filter) {
			return function () {
				return {
					'table__sort-box_active': this.filter == filter,
					'table__sort-box_active_down': this.filterType == 'down',
					'table__sort-box_active_top': this.filterType == 'top',
				}
			}.bind(this)
		},
		checkboxStyle() {
			return {
				'custom-checkbox_small-checked': this.selectedItems >= 1 && this.selectedItems != this.list.length,
				'custom-checkbox_checked': this.selectedItems == this.list.length,
			}
		}
	}
})