import { tableProducts, tableOrders, tableBuyerOrders } from './_presentData'

const tableMixin = {
	data: {
		list: [],
		listSort: [],
		listDefault: [],
		sort: null,
		sortType: null,
		pagination: {
			items: 6,	// Max items in one page
			total: 0,	// All items length
			pages: 0, // Pages for pagination
			active: 0, // Page active
			next: false,
			prev: false
		}
	},
	mounted() {
		this.initPagination()
	},
	watch: {
		'pagination.active'() {
			this.onFilter(this.sort, true)

			this.list = this.getItemsList()

			this._initPaginationBar()
		}
	},
	methods: {
		initPagination() {
			this.pagination.total 	= this.listDefault.length
			this.pagination.pages 	= Math.ceil(this.pagination.total / this.pagination.items)
			this.pagination.active 	= 1

			this.list = [...this.listDefault].filter((item, index) => index < this.pagination.items )
			this.listSort = [...this.listDefault]

			this._initPaginationBar()
		},
		_initPaginationBar() {
			this.pagination.next = this.pagination.prev = true
			if (this.pagination.active >= this.pagination.pages) this.pagination.next = false
			if (this.pagination.active <= 1) this.pagination.prev = false
		},


		setPage(num) {
			if (num > this.pagination.pages || num < 1) return
			this.pagination.active = num
		},

		setList(newArr) {
			this.listSort = [...newArr]
			this.list 		= this.getItemsList()
		},

		getItemsList() {
			let newPage = this.pagination.active
			return [...this.listSort]
				.filter((item, index) =>
					index >= this.pagination.items * (newPage - 1) && index < this.pagination.items * newPage
				)
				.map(x => {
					x.selected = false
					return x
				})
		},


		onSelect(item) {
			item.selected = !item.selected
		},
		onSelectAll() {
			if (this.list.filter(x => x.selected).length === this.list.length) {
				this.list.map(x => x.selected = false)
			} else {
				this.list.map(x => x.selected = true)
			}
		},
		onRemoveSelected() {
			this.listDefault = this.listDefault.filter(x => !x.selected)
			this.initPagination()
		}
	},
	computed: {
		selectedItems() {
			return this.list.filter(x => x.selected).length
		},
		actionsStyle() {
			return {
				'disabled': this.list.filter(x => x.selected).length === 0
			}
		},
		sortStyle() {
			return function (sort) {
				return {
					'table__sort-box_active': this.sort == sort,
					'table__sort-box_active_down': this.sortType == 'down',
					'table__sort-box_active_top': this.sortType == 'top',
				}
			}.bind(this)
		},
		checkboxStyle() {
			return {
				'custom-checkbox_small-checked': this.selectedItems >= 1 && this.selectedItems != this.list.length,
				'custom-checkbox_checked': this.selectedItems == this.list.length && this.list.length != 0,
			}
		}
	}
}

const tableFiltersPriceMixin = {
	data: {
		sorts: {
			price: ['top', 'down', 'default']
		}
	},
	methods: {
		_onFilterPrice() {
			let list = [...this.listDefault]
			switch (this.sortType) {
				case 'top':
					this.setList(list.sort((a, b) => a.price - b.price))
					break;
				case 'down':
					this.setList(list.sort((a, b) => b.price - a.price))
					break;
			}
		},
	}
}

const filtersMixin = {
	methods: {
		onSelectFilter({ type, value }) {
			this.filters[type].value = value
		}
	}
}


/*
* 	Tables
* */

let accountSellerProducts = '#account-seller-products'

if (document.querySelector(accountSellerProducts)) {
	new Vue({
		el: accountSellerProducts,
		mixins: [
			tableMixin,
			tableFiltersPriceMixin,
			filtersMixin
		],
		data: {
			sorts: {
				brand: ['top', 'down', 'default'],
				status: ['top', 'down', 'default']
			},
			filters: {
				brands: {
					value: '',
					arr: ['Adreno', 'Siller', 'Seller']
				},
				category: {
					value: '',
					arr: ['Caregory-1', 'Caregory-2']
				},
				marker: {
					value: '',
					arr: ['marker-1', 'marker-2']
				},
				status: {
					value: '',
					arr: ['Вкл', 'Выкл']
				}
			},
		},
		created() {
			this.listDefault = tableProducts
		},
		methods: {
			search(value) {
				console.log('Searching', value)
			},

			filter() {
				console.log('Filtering', this.filters)
			},

			onFilter(type, freeze = false) {
				if (this.sort !== null) {
					this.sorts[this.sort].push(this.sortType)
				}

				this.sort = type
				if (!freeze) {
					this.sortType = this.sorts[type].splice(0, 1)[0]
				}

				if (this.sortType === 'default') {
					this.sorts[type].push('default')
					this.sort 		= null
					this.sortType = null
					this.setList([...this.listDefault])
					return
				}

				switch (this.sort) {
					case 'price': this._onFilterPrice(); break;
					case 'brand': this._onFilterBrand(); break;
					case 'status': this._onFilterStatus(); break;
				}
			},

			_onFilterBrand() {
				let list = [...this.listDefault]

				switch (this.sortType) {
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
				let list 		= [...this.listDefault]
				let filters = { open: 1, close: 0 }

				switch (this.sortType) {
					case 'top':
						this.setList(list.sort((a, b) => filters[b.status] - filters[a.status]))
						break;
					case 'down':
						this.setList(list.sort((a, b) => filters[a.status] - filters[b.status]))
						break;
				}
			}
		}
	})
}



let accountSellerOrders = '#account-seller-orders'

if (document.querySelector(accountSellerOrders)) {
	new Vue({
		el: accountSellerOrders,
		mixins: [
			tableMixin,
			tableFiltersPriceMixin,
			filtersMixin
		],
		data: {
			sorts: {
				date: ['top', 'down', 'default'],
				status: ['success', 'deny', 'process', 'default']
			},
		},
		created() {
			this.listDefault = tableOrders
		},
		methods: {
			search (value) {
				console.log('Searching', value)
			},

			onFilter (type, freeze = false) {
				if(this.sort !== null) {
					this.sorts[this.sort].push(this.sortType)
				}

				this.sort = type
				if(!freeze) {
					this.sortType = this.sorts[type].splice(0, 1)[0]
				}

				if(this.sortType === 'default') {
					this.sorts[type].push('default')
					this.sort = null
					this.sortType = null
					this.setList([...this.listDefault])
					return
				}

				switch (this.sort) {
					case 'price':
						this._onFilterPrice();
						break;
					case 'date':
						this._onFilterDate();
						break;
					case 'status':
						this._onFilterStatus();
						break;
				}
			},

			_onFilterDate () {
				let list = [...this.listDefault]

				switch (this.sortType) {
					case 'top':
						this.setList(list.sort((a, b) => new Date(a.date) - new Date(b.date)))
						break;
					case 'down':
						this.setList(list.sort((a, b) => new Date(b.date) - new Date(a.date)))
						break;
				}
			},
			_onFilterStatus () {
				let list = [...this.listDefault]
				let filters;

				switch (this.sortType) {
					case 'process':
						filters = {success: 0, deny: 0, process: 1}
						this.setList(list.sort((a, b) => filters[b.status] - filters[a.status]))
						break;
					case 'deny':
						filters = {success: 0, deny: 1, process: 0}
						this.setList(list.sort((a, b) => filters[b.status] - filters[a.status]))
						break;
					case 'success':
						filters = {success: 1, deny: 0, process: 0}
						this.setList(list.sort((a, b) => filters[b.status] - filters[a.status]))
						break;
				}
			}
		}
	})
}



let accountBuyerOrders = '#account-buyer-orders'

if (document.querySelector(accountBuyerOrders)) {
	new Vue({
		el: accountBuyerOrders,
		mixins: [
			tableMixin,
			tableFiltersPriceMixin,
			filtersMixin
		],
		data: {
			sorts: {
				date: ['top', 'down', 'default'],
				status: ['success', 'deny', 'process', 'default']
			},
		},
		created() {
			this.listDefault = tableBuyerOrders
		},
		methods: {
			onFilter (type, freeze = false) {
				if(this.sort !== null) {
					this.sorts[this.sort].push(this.sortType)
				}

				this.sort = type
				if(!freeze) {
					this.sortType = this.sorts[type].splice(0, 1)[0]
				}

				if(this.sortType === 'default') {
					this.sorts[type].push('default')
					this.sort = null
					this.sortType = null
					this.setList([...this.listDefault])
					return
				}

				switch (this.sort) {
					case 'price': this._onFilterPrice(); break;
					case 'date': this._onFilterDate(); break;
					case 'status': this._onFilterStatus(); break;
				}
			},

			_onFilterDate () {
				let list = [...this.listDefault]

				switch (this.sortType) {
					case 'top':
						this.setList(list.sort((a, b) => new Date(a.date) - new Date(b.date)))
						break;
					case 'down':
						this.setList(list.sort((a, b) => new Date(b.date) - new Date(a.date)))
						break;
				}
			},
			_onFilterStatus () {
				let list = [...this.listDefault]
				let filters;

				switch (this.sortType) {
					case 'process':
						filters = {success: 0, deny: 0, process: 1}
						this.setList(list.sort((a, b) => filters[b.status] - filters[a.status]))
						break;
					case 'deny':
						filters = {success: 0, deny: 1, process: 0}
						this.setList(list.sort((a, b) => filters[b.status] - filters[a.status]))
						break;
					case 'success':
						filters = {success: 1, deny: 0, process: 0}
						this.setList(list.sort((a, b) => filters[b.status] - filters[a.status]))
						break;
				}
			}
		}
	})
}