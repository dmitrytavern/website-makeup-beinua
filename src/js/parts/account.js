const tableMixin = {
	data: {
		pagination: {
			items: 6,	// Max items in one page
			total: 0,	// All items length
			pages: 0, // Pages for pagination
			active: 0, // Page active
			next: false,
			prev: false
		}
	},
	created() {
		this.pagination.total 	= this.listDefault.length
		this.pagination.pages 	= Math.ceil(this.pagination.total / this.pagination.items)
		this.pagination.active 	= 1

		this.list = [...this.listDefault].filter((item, index) => index < this.pagination.items )
		this.listSort = [...this.listDefault]
	},
	watch: {
		'pagination.active'(newVal, oldVal) {
			this.onFilter(this.filter, true)

			this.list = this.getItemsList(this.listSort, newVal)

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
			this.list = this.getItemsList(newArr, newVal)
		},

		setList(newArr) {
			this.listSort = [...newArr]
			this.setPagination(this.listSort)
		},

		getItemsList(newArr, newPage) {
			return [...newArr]
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
			this.list.map(x => x.selected = true)
		},
	},
	computed: {
		selectedItems() {
			return this.list.filter(x => x.selected).length
		},
		sortStyle() {
			return function (filter) {
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
}

const tableFiltersPriceMixin = {
	data: {
		filters: {
			price: ['top', 'down', 'default']
		}
	},
	methods: {
		_onFilterPrice() {
			let list = [...this.listDefault]
			switch (this.filterType) {
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



/*
* 	Tables
* */

let accountPageProducts = '#account-table-products'

if (document.querySelector(accountPageProducts)) {
	new Vue({
		el: accountPageProducts,
		mixins: [
			tableMixin,
			tableFiltersPriceMixin
		],
		data: {
			filter: null,
			filterType: null,
			filters: {
				brand: ['top', 'down', 'default'],
				status: ['top', 'down', 'default']
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
				{ id: 7, image: 'products/woman-1.png', title: 'Повседневные', price: 44000, seller: 'Lazana', vendor: 'FU8943386', status: 'close', selected: false },
				{ id: 8, image: 'products/woman-2.png', title: 'Повседневные', price: 135, seller: 'Lazana', vendor: 'BU89336', status: 'open', selected: false },
				{ id: 9, image: 'products/woman-3.png', title: 'Повседневные', price: 750, seller: 'Adrena', vendor: 'EU8937346', status: 'open', selected: false },
				{ id: 10, image: 'products/woman-4.png', title: 'Повседневные', price: 40, seller: 'Lamoda', vendor: 'KU8945386', status: 'open', selected: false },
				{ id: 11, image: 'products/woman-5.png', title: 'Повседневные', price: 1200, seller: 'Silad', vendor: 'RU8937586', status: 'open', selected: false },
				{ id: 12, image: 'products/woman-6.png', title: 'Повседневные', price: 1300, seller: 'Axiony', vendor: 'BU89d7386', status: 'close', selected: false },
				{ id: 13, image: 'products/woman-3.png', title: 'Повседневные', price: 44400, seller: 'Lamoda', vendor: 'KU8945386', status: 'open', selected: false },
				{ id: 14, image: 'products/woman-4.png', title: 'Повседневные', price: 100, seller: 'Silad', vendor: 'RU8937586', status: 'open', selected: false },
				{ id: 15, image: 'products/woman-5.png', title: 'Повседневные', price: 15600, seller: 'Axiony', vendor: 'BU89d7386', status: 'close', selected: false },
			]
		},
		methods: {
			onFilter(type, freeze = false) {
				let filterType = this.filterType

				if (this.filter !== null) {
					this.filters[this.filter].push(filterType)
				}

				this.filter = type
				if (!freeze) {
					this.filterType = this.filters[type].splice(0, 1)[0]
				}

				if (this.filterType === 'default') {
					this.filters[type].push('default')
					this.filter 		= null
					this.filterType = null
					this.setList([...this.listDefault])
					return
				}

				switch (this.filter) {
					case 'price': this._onFilterPrice(); break;
					case 'brand': this._onFilterBrand(); break;
					case 'status': this._onFilterStatus(); break;
				}
			},

			_onFilterBrand() {
				let list = [...this.listDefault]

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
				let list 		= [...this.listDefault]
				let filters = { open: 1, close: 0 }

				switch (this.filterType) {
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


let accountPageOrders = '#account-table-orders'

if (document.querySelector(accountPageOrders)) {
	new Vue({
		el: accountPageOrders,
		mixins: [
			tableMixin,
			tableFiltersPriceMixin
		],
		data: {
			filter: null,
			filterType: null,
			filters: {
				date: ['top', 'down', 'default'],
				status: ['success', 'deny', 'process', 'default']
			},
			list: [],
			listSort: [],
			listDefault: [
				{
					id: 1,
					number: '870967',
					buyer: 'Кирилл Левушкин',
					price: 986,
					status: 'success',
					statusTxt: 'Завершен',
					selected: false,
					date: '10.08.2020'
				},
				{
					id: 2,
					number: '240967',
					buyer: 'Олег Сидорчук',
					price: 3244,
					status: 'deny',
					statusTxt: 'Отменен',
					selected: false,
					date: '09.11.2020'
				},
				{
					id: 3,
					number: '090967',
					buyer: 'Кирилл Левушкин',
					price: 754,
					status: 'process',
					statusTxt: 'В Обработке',
					selected: false,
					date: '08.02.2020'
				},
				{
					id: 4,
					number: '040321',
					buyer: 'Анна Курилова',
					price: 12314,
					status: 'success',
					statusTxt: 'Завершен',
					selected: false,
					date: '07.25.2020'
				},
				{
					id: 5,
					number: '120967',
					buyer: 'Олег Сидорчук',
					price: 8582,
					status: 'success',
					statusTxt: 'Завершен',
					selected: false,
					date: '06.26.2019'
				},
				{
					id: 6,
					number: '090967',
					buyer: 'Кирилл Левушкин',
					price: 44250,
					status: 'process',
					statusTxt: 'В Обработке',
					selected: false,
					date: '11.04.2018'
				},
				{
					id: 7,
					number: '450967',
					buyer: 'Анна Курилова',
					price: 4050,
					status: 'process',
					statusTxt: 'В Обработке',
					selected: false,
					date: '12.12.2020'
				},
				{
					id: 8,
					number: '050967',
					buyer: 'Олег Сидорчук',
					price: 50,
					status: 'deny',
					statusTxt: 'Отменен',
					selected: false,
					date: '12.06.2020'
				},
				{
					id: 9,
					number: '760967',
					buyer: 'Анна Курилова',
					price: 1250,
					status: 'process',
					statusTxt: 'В Обработке',
					selected: false,
					date: '12.10.2020'
				},
			]
		},
		methods: {
			onFilter (type, freeze = false) {
				let filterType = this.filterType

				if(this.filter !== null) {
					this.filters[this.filter].push(filterType)
				}

				this.filter = type
				if(!freeze) {
					this.filterType = this.filters[type].splice(0, 1)[0]
				}

				if(this.filterType === 'default') {
					this.filters[type].push('default')
					this.filter = null
					this.filterType = null
					this.setList([...this.listDefault])
					return
				}

				switch (this.filter) {
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

				switch (this.filterType) {
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

				switch (this.filterType) {
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