(function () {
	'use strict';

	Vue.component('search', {
	  data: function data() {
	    return {
	      input: '',
	      focus: false
	    };
	  },
	  methods: {
	    onBlur: function onBlur() {
	      this.focus = false;
	      this.$emit("on-blur");
	    },
	    onFocus: function onFocus() {
	      this.focus = true;
	      this.$emit("on-focus");
	    },
	    onSearch: function onSearch() {
	      this.$refs['search-input'].blur();
	      this.$emit("on-search", this.input);
	    },
	    onClear: function onClear() {
	      this.input = '';
	      this.$emit("on-clear");
	    }
	  },
	  template: ' <div class="search" :class="{search_focus: focus}">' + '           <input ref="search-input" class="search__input" v-model="input" @focus="onFocus" @blur="onBlur" v-on:keyup.enter="onSearch" placeholder="Поиск...">' + '           <button class="search__close" @click="onClear">' + '             <svg>' + '               <use xlink:href="img/sprite.svg#close"></use>' + '             </svg>' + '           </button>' + '           <button class="search__button" @click="onSearch" aria-label="Search">' + '             <svg class="search__icon">' + '               <use xlink:href="img/sprite.svg#search"></use>' + '             </svg>' + '           </button>' + '         </div>'
	});

	Vue.component('selector-filter', {
	  props: {
	    value: String,
	    type: String,
	    list: Array,
	    placeholder: String
	  },
	  methods: {
	    onSelect: function onSelect(value) {
	      this.$emit('select', {
	        type: this.type,
	        value: value
	      });
	    }
	  },
	  template: '<div class="selector">' + '        <div class="selector__button" data-toggle="dropdown"><span>{{ value == "" ? placeholder : value }}</span>' + '         <svg class="selector__ico">' + '           <use xlink:href="img/sprite.svg#dropdown-arrow"></use>' + '         </svg>' + '       </div>' + '       <div class="selector__dropdown dropdown-menu">' + '         <div class="dropdown-item" v-for="item in list" @click="onSelect(item)"> {{ item }} </div>' + '       </div>' + '     </div>'
	});

	var target = '#header';
	if (document.querySelector(target)) {
	  new Vue({
	    el: target,
	    data: {
	      focus: false
	    },
	    methods: {
	      onBlur: function onBlur() {
	        this.focus = false;
	      },
	      onFocus: function onFocus() {
	        this.focus = true;
	      },
	      search: function search(value) {
	        console.log('Searching', value);
	      }
	    }
	  });
	}

	new Swiper('#home-slider', {
	  pagination: {
	    el: '.swiper-pagination'
	  },
	  effect: 'fade',
	  slidesPerView: 1,
	  fadeEffect: {
	    crossFade: true
	  },
	  virtualTranslate: true,
	  navigation: {
	    nextEl: '.swiper-button-next',
	    prevEl: '.swiper-button-prev'
	  }
	});
	new Swiper('#brands__slider', {
	  pagination: {
	    el: '.swiper-pagination'
	  },
	  navigation: {
	    nextEl: '.brands__next',
	    prevEl: '.brands__prev'
	  },
	  slidesPerView: 2,
	  spaceBetween: 40,
	  breakpoints: {
	    768: {
	      slidesPerView: 4,
	      spaceBetween: 40
	    },
	    1000: {
	      slidesPerView: 5,
	      spaceBetween: 55
	    },
	    1600: {
	      slidesPerView: 6,
	      spaceBetween: 90
	    }
	  }
	});
	new Swiper('#popular__slider', {
	  pagination: {
	    el: '.swiper-pagination'
	  },
	  navigation: {
	    nextEl: '.popular__next',
	    prevEl: '.popular__prev'
	  },
	  slidesPerView: 2,
	  spaceBetween: 30,
	  breakpoints: {
	    768: {
	      slidesPerView: 4,
	      spaceBetween: 35
	    },
	    992: {
	      slidesPerView: 3,
	      spaceBetween: 35
	    },
	    1600: {
	      slidesPerView: 4,
	      spaceBetween: 35
	    }
	  }
	});
	if (document.querySelector('#product-inner-page')) {
	  var productInnerSliderResize = function productInnerSliderResize() {
	    var height = 100;
	    if (window.innerWidth <= 1300) height = 64;
	    sliderThumbs.style.height = sliderImg.offsetHeight - height + 'px';
	  };
	  var sliderImg = document.querySelector('#product-inner__image');
	  var sliderThumbs = document.querySelector('#product-inner__thumbs');
	  productInnerSliderResize();
	  window.addEventListener('resize', productInnerSliderResize);
	}
	var galleryThumbs = new Swiper('#product-inner__thumbs', {
	  spaceBetween: 12,
	  direction: 'vertical',
	  navigation: {
	    nextEl: '.product-inner__slider-btn_next',
	    prevEl: '.product-inner__slider-btn_prev'
	  },
	  freeMode: true,
	  watchSlidesVisibility: true,
	  watchSlidesProgress: true,
	  slidesPerView: 2.5,
	  breakpoints: {
	    1600: {
	      spaceBetween: 18
	    }
	  }
	});
	var innerProduct = new Swiper('#product-inner__image', {
	  slidesPerView: 1,
	  pagination: {
	    el: '.swiper-pagination'
	  },
	  breakpoints: {
	    768: {
	      allowTouchMove: false
	    }
	  },
	  thumbs: {
	    swiper: galleryThumbs
	  }
	});
	$('#product-inner__thumbs .swiper-wrapper a').on('click', function (e) {
	  innerProduct.slideTo(innerProduct.previousIndex);
	});
	new Swiper('#product-inner__slider', {
	  pagination: {
	    el: '.swiper-pagination'
	  },
	  navigation: {
	    nextEl: '.product-inner__next',
	    prevEl: '.product-inner__prev'
	  },
	  slidesPerView: 2,
	  spaceBetween: 30,
	  breakpoints: {
	    768: {
	      slidesPerView: 4,
	      spaceBetween: 30
	    },
	    1300: {
	      slidesPerView: 4,
	      spaceBetween: 40
	    },
	    1600: {
	      slidesPerView: 4,
	      spaceBetween: 90
	    }
	  }
	});

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
	}
	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
	}
	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
	}
	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}
	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;
	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	  return arr2;
	}
	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	var tableProducts = [{
	  id: 1,
	  image: 'products/man-1.png',
	  title: 'Повседневные',
	  price: 450,
	  seller: 'Lazana',
	  vendor: 'FU8943386',
	  status: 'close',
	  selected: false
	}, {
	  id: 2,
	  image: 'products/man-2.png',
	  title: 'Повседневные',
	  price: 355,
	  seller: 'Lazana',
	  vendor: 'BU89336',
	  status: 'open',
	  selected: false
	}, {
	  id: 3,
	  image: 'products/man-3.png',
	  title: 'Повседневные',
	  price: 550,
	  seller: 'Adrena',
	  vendor: 'EU8937346',
	  status: 'close',
	  selected: false
	}, {
	  id: 4,
	  image: 'products/man-4.png',
	  title: 'Повседневные',
	  price: 150,
	  seller: 'Lazana',
	  vendor: 'KU8945386',
	  status: 'close',
	  selected: false
	}, {
	  id: 5,
	  image: 'products/man-5.png',
	  title: 'Повседневные',
	  price: 50,
	  seller: 'Lazana',
	  vendor: 'RU8937586',
	  status: 'open',
	  selected: false
	}, {
	  id: 6,
	  image: 'products/man-6.png',
	  title: 'Повседневные',
	  price: 1450,
	  seller: 'Lazana',
	  vendor: 'BU89d7386',
	  status: 'close',
	  selected: false
	}, {
	  id: 7,
	  image: 'products/woman-1.png',
	  title: 'Повседневные',
	  price: 44000,
	  seller: 'Lazana',
	  vendor: 'FU8943386',
	  status: 'close',
	  selected: false
	}, {
	  id: 8,
	  image: 'products/woman-2.png',
	  title: 'Повседневные',
	  price: 135,
	  seller: 'Lazana',
	  vendor: 'BU89336',
	  status: 'open',
	  selected: false
	}, {
	  id: 9,
	  image: 'products/woman-3.png',
	  title: 'Повседневные',
	  price: 750,
	  seller: 'Adrena',
	  vendor: 'EU8937346',
	  status: 'open',
	  selected: false
	}, {
	  id: 10,
	  image: 'products/woman-4.png',
	  title: 'Повседневные',
	  price: 40,
	  seller: 'Lamoda',
	  vendor: 'KU8945386',
	  status: 'open',
	  selected: false
	}, {
	  id: 11,
	  image: 'products/woman-5.png',
	  title: 'Повседневные',
	  price: 1200,
	  seller: 'Silad',
	  vendor: 'RU8937586',
	  status: 'open',
	  selected: false
	}, {
	  id: 12,
	  image: 'products/woman-6.png',
	  title: 'Повседневные',
	  price: 1300,
	  seller: 'Axiony',
	  vendor: 'BU89d7386',
	  status: 'close',
	  selected: false
	}, {
	  id: 13,
	  image: 'products/woman-3.png',
	  title: 'Повседневные',
	  price: 44400,
	  seller: 'Lamoda',
	  vendor: 'KU8945386',
	  status: 'open',
	  selected: false
	}, {
	  id: 14,
	  image: 'products/woman-4.png',
	  title: 'Повседневные',
	  price: 100,
	  seller: 'Silad',
	  vendor: 'RU8937586',
	  status: 'open',
	  selected: false
	}, {
	  id: 15,
	  image: 'products/woman-5.png',
	  title: 'Повседневные',
	  price: 15600,
	  seller: 'Axiony',
	  vendor: 'BU89d7386',
	  status: 'close',
	  selected: false
	}];
	var tableOrders = [{
	  id: 1,
	  number: '870967',
	  buyer: 'Кирилл Левушкин',
	  price: 986,
	  status: 'success',
	  statusTxt: 'Завершен',
	  selected: false,
	  date: '10.08.2020'
	}, {
	  id: 2,
	  number: '240967',
	  buyer: 'Олег Сидорчук',
	  price: 3244,
	  status: 'deny',
	  statusTxt: 'Отменен',
	  selected: false,
	  date: '09.11.2020'
	}, {
	  id: 3,
	  number: '090967',
	  buyer: 'Кирилл Левушкин',
	  price: 754,
	  status: 'process',
	  statusTxt: 'В Обработке',
	  selected: false,
	  date: '08.02.2020'
	}, {
	  id: 4,
	  number: '040321',
	  buyer: 'Анна Курилова',
	  price: 12314,
	  status: 'success',
	  statusTxt: 'Завершен',
	  selected: false,
	  date: '07.25.2020'
	}, {
	  id: 5,
	  number: '120967',
	  buyer: 'Олег Сидорчук',
	  price: 8582,
	  status: 'success',
	  statusTxt: 'Завершен',
	  selected: false,
	  date: '06.26.2019'
	}, {
	  id: 6,
	  number: '090967',
	  buyer: 'Кирилл Левушкин',
	  price: 44250,
	  status: 'process',
	  statusTxt: 'В Обработке',
	  selected: false,
	  date: '11.04.2018'
	}, {
	  id: 7,
	  number: '450967',
	  buyer: 'Анна Курилова',
	  price: 4050,
	  status: 'process',
	  statusTxt: 'В Обработке',
	  selected: false,
	  date: '12.12.2020'
	}, {
	  id: 8,
	  number: '050967',
	  buyer: 'Олег Сидорчук',
	  price: 50,
	  status: 'deny',
	  statusTxt: 'Отменен',
	  selected: false,
	  date: '12.06.2020'
	}, {
	  id: 9,
	  number: '760967',
	  buyer: 'Анна Курилова',
	  price: 1250,
	  status: 'process',
	  statusTxt: 'В Обработке',
	  selected: false,
	  date: '12.10.2020'
	}];
	var tableBuyerOrders = [{
	  id: 1,
	  number: 'BU93738786',
	  buyer: 'Повседневные платья',
	  price: 40000,
	  status: 'success',
	  statusTxt: 'Завершен',
	  date: '10.08.2020',
	  selected: false
	}, {
	  id: 2,
	  number: 'DU93738786',
	  buyer: 'Повседневные платья',
	  price: 12000,
	  status: 'success',
	  statusTxt: 'Завершен',
	  date: '10.08.2020',
	  selected: false
	}, {
	  id: 3,
	  number: 'FU93738786',
	  buyer: 'Повседневные платья',
	  price: 12486,
	  status: 'success',
	  statusTxt: 'Завершен',
	  date: '10.08.2020',
	  selected: false
	}, {
	  id: 4,
	  number: 'HU3738786',
	  buyer: 'Повседневные платья',
	  price: 439,
	  status: 'success',
	  statusTxt: 'Завершен',
	  date: '10.08.2020',
	  selected: false
	}, {
	  id: 5,
	  number: 'BU93738786',
	  buyer: 'Повседневные платья',
	  price: 890,
	  status: 'success',
	  statusTxt: 'Завершен',
	  date: '10.08.2020',
	  selected: false
	}, {
	  id: 6,
	  number: 'GU93738786',
	  buyer: 'Повседневные платья',
	  price: 2342,
	  status: 'success',
	  statusTxt: 'Завершен',
	  date: '10.08.2020',
	  selected: false
	}, {
	  id: 7,
	  number: 'BU93738786',
	  buyer: 'Повседневные платья',
	  price: 5332,
	  status: 'success',
	  statusTxt: 'Завершен',
	  date: '10.08.2020',
	  selected: false
	}, {
	  id: 8,
	  number: 'TU93738786',
	  buyer: 'Повседневные платья',
	  price: 256,
	  status: 'success',
	  statusTxt: 'Завершен',
	  date: '10.08.2020',
	  selected: false
	}, {
	  id: 9,
	  number: 'KU93738786',
	  buyer: 'Повседневные платья',
	  price: 9142,
	  status: 'success',
	  statusTxt: 'Завершен',
	  date: '10.08.2020',
	  selected: false
	}, {
	  id: 10,
	  number: 'BU11738786',
	  buyer: 'Повседневные платья',
	  price: 7853,
	  status: 'success',
	  statusTxt: 'Завершен',
	  date: '10.08.2020',
	  selected: false
	}, {
	  id: 11,
	  number: 'BU93738786',
	  buyer: 'Повседневные платья',
	  price: 256,
	  status: 'success',
	  statusTxt: 'Завершен',
	  date: '10.08.2020',
	  selected: false
	}, {
	  id: 12,
	  number: 'BU93738786',
	  buyer: 'Повседневные платья',
	  price: 98754,
	  status: 'success',
	  statusTxt: 'Завершен',
	  date: '10.08.2020',
	  selected: false
	}, {
	  id: 13,
	  number: 'BU93738786',
	  buyer: 'Повседневные платья',
	  price: 120345,
	  status: 'success',
	  statusTxt: 'Завершен',
	  date: '10.08.2020',
	  selected: false
	}];

	var tableMixin = {
	  data: {
	    list: [],
	    listSort: [],
	    listDefault: [],
	    sort: null,
	    sortType: null,
	    pagination: {
	      items: 6,
	      // Max items in one page
	      total: 0,
	      // All items length
	      pages: 0,
	      // Pages for pagination
	      active: 0,
	      // Page active
	      next: false,
	      prev: false
	    }
	  },
	  mounted: function mounted() {
	    this.initPagination();
	  },
	  watch: {
	    'pagination.active': function paginationActive() {
	      this.onFilter(this.sort, true);
	      this.list = this.getItemsList();
	      this._initPaginationBar();
	    }
	  },
	  methods: {
	    initPagination: function initPagination() {
	      var _this = this;
	      this.pagination.total = this.listDefault.length;
	      this.pagination.pages = Math.ceil(this.pagination.total / this.pagination.items);
	      this.pagination.active = 1;
	      this.list = _toConsumableArray(this.listDefault).filter(function (item, index) {
	        return index < _this.pagination.items;
	      });
	      this.listSort = _toConsumableArray(this.listDefault);
	      this._initPaginationBar();
	    },
	    _initPaginationBar: function _initPaginationBar() {
	      this.pagination.next = this.pagination.prev = true;
	      if (this.pagination.active >= this.pagination.pages) this.pagination.next = false;
	      if (this.pagination.active <= 1) this.pagination.prev = false;
	    },
	    setPage: function setPage(num) {
	      if (num > this.pagination.pages || num < 1) return;
	      this.pagination.active = num;
	    },
	    setList: function setList(newArr) {
	      this.listSort = _toConsumableArray(newArr);
	      this.list = this.getItemsList();
	    },
	    getItemsList: function getItemsList() {
	      var _this2 = this;
	      var newPage = this.pagination.active;
	      return _toConsumableArray(this.listSort).filter(function (item, index) {
	        return index >= _this2.pagination.items * (newPage - 1) && index < _this2.pagination.items * newPage;
	      }).map(function (x) {
	        x.selected = false;
	        return x;
	      });
	    },
	    onSelect: function onSelect(item) {
	      item.selected = !item.selected;
	    },
	    onSelectAll: function onSelectAll() {
	      if (this.list.filter(function (x) {
	        return x.selected;
	      }).length === this.list.length) {
	        this.list.map(function (x) {
	          return x.selected = false;
	        });
	      } else {
	        this.list.map(function (x) {
	          return x.selected = true;
	        });
	      }
	    },
	    onRemoveSelected: function onRemoveSelected() {
	      this.listDefault = this.listDefault.filter(function (x) {
	        return !x.selected;
	      });
	      this.initPagination();
	    }
	  },
	  computed: {
	    selectedItems: function selectedItems() {
	      return this.list.filter(function (x) {
	        return x.selected;
	      }).length;
	    },
	    actionsStyle: function actionsStyle() {
	      return {
	        'disabled': this.list.filter(function (x) {
	          return x.selected;
	        }).length === 0
	      };
	    },
	    sortStyle: function sortStyle() {
	      return function (sort) {
	        return {
	          'table__sort-box_active': this.sort == sort,
	          'table__sort-box_active_down': this.sortType == 'down',
	          'table__sort-box_active_top': this.sortType == 'top'
	        };
	      }.bind(this);
	    },
	    checkboxStyle: function checkboxStyle() {
	      return {
	        'custom-checkbox_small-checked': this.selectedItems >= 1 && this.selectedItems != this.list.length,
	        'custom-checkbox_checked': this.selectedItems == this.list.length && this.list.length != 0
	      };
	    }
	  }
	};
	var tableFiltersPriceMixin = {
	  data: {
	    sorts: {
	      price: ['top', 'down', 'default']
	    }
	  },
	  methods: {
	    _onFilterPrice: function _onFilterPrice() {
	      var list = _toConsumableArray(this.listDefault);
	      switch (this.sortType) {
	        case 'top':
	          this.setList(list.sort(function (a, b) {
	            return a.price - b.price;
	          }));
	          break;
	        case 'down':
	          this.setList(list.sort(function (a, b) {
	            return b.price - a.price;
	          }));
	          break;
	      }
	    }
	  }
	};
	var filtersMixin = {
	  methods: {
	    onSelectFilter: function onSelectFilter(_ref) {
	      var type = _ref.type,
	        value = _ref.value;
	      this.filters[type].value = value;
	    }
	  }
	};

	/*
	* 	Tables
	* */

	var accountSellerProducts = '#account-seller-products';
	if (document.querySelector(accountSellerProducts)) {
	  new Vue({
	    el: accountSellerProducts,
	    mixins: [tableMixin, tableFiltersPriceMixin, filtersMixin],
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
	      }
	    },
	    created: function created() {
	      this.listDefault = tableProducts;
	    },
	    methods: {
	      search: function search(value) {
	        console.log('Searching', value);
	      },
	      filter: function filter() {
	        console.log('Filtering', this.filters);
	      },
	      onFilter: function onFilter(type) {
	        var freeze = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	        if (this.sort !== null) {
	          this.sorts[this.sort].push(this.sortType);
	        }
	        this.sort = type;
	        if (!freeze) {
	          this.sortType = this.sorts[type].splice(0, 1)[0];
	        }
	        if (this.sortType === 'default') {
	          this.sorts[type].push('default');
	          this.sort = null;
	          this.sortType = null;
	          this.setList(_toConsumableArray(this.listDefault));
	          return;
	        }
	        switch (this.sort) {
	          case 'price':
	            this._onFilterPrice();
	            break;
	          case 'brand':
	            this._onFilterBrand();
	            break;
	          case 'status':
	            this._onFilterStatus();
	            break;
	        }
	      },
	      _onFilterBrand: function _onFilterBrand() {
	        var list = _toConsumableArray(this.listDefault);
	        switch (this.sortType) {
	          case 'top':
	            this.setList(list.sort(function (a, b) {
	              var nameA = a.seller.toLowerCase(),
	                nameB = b.seller.toLowerCase();
	              if (nameA < nameB) return -1;
	              if (nameA > nameB) return 1;
	              return 0;
	            }));
	            break;
	          case 'down':
	            this.setList(list.sort(function (a, b) {
	              var nameA = a.seller.toLowerCase(),
	                nameB = b.seller.toLowerCase();
	              if (nameA > nameB) return -1;
	              if (nameA < nameB) return 1;
	              return 0;
	            }));
	            break;
	        }
	      },
	      _onFilterStatus: function _onFilterStatus() {
	        var list = _toConsumableArray(this.listDefault);
	        var filters = {
	          open: 1,
	          close: 0
	        };
	        switch (this.sortType) {
	          case 'top':
	            this.setList(list.sort(function (a, b) {
	              return filters[b.status] - filters[a.status];
	            }));
	            break;
	          case 'down':
	            this.setList(list.sort(function (a, b) {
	              return filters[a.status] - filters[b.status];
	            }));
	            break;
	        }
	      }
	    }
	  });
	}
	var accountSellerOrders = '#account-seller-orders';
	if (document.querySelector(accountSellerOrders)) {
	  new Vue({
	    el: accountSellerOrders,
	    mixins: [tableMixin, tableFiltersPriceMixin, filtersMixin],
	    data: {
	      sorts: {
	        date: ['top', 'down', 'default'],
	        status: ['success', 'deny', 'process', 'default']
	      }
	    },
	    created: function created() {
	      this.listDefault = tableOrders;
	    },
	    methods: {
	      search: function search(value) {
	        console.log('Searching', value);
	      },
	      onFilter: function onFilter(type) {
	        var freeze = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	        if (this.sort !== null) {
	          this.sorts[this.sort].push(this.sortType);
	        }
	        this.sort = type;
	        if (!freeze) {
	          this.sortType = this.sorts[type].splice(0, 1)[0];
	        }
	        if (this.sortType === 'default') {
	          this.sorts[type].push('default');
	          this.sort = null;
	          this.sortType = null;
	          this.setList(_toConsumableArray(this.listDefault));
	          return;
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
	      _onFilterDate: function _onFilterDate() {
	        var list = _toConsumableArray(this.listDefault);
	        switch (this.sortType) {
	          case 'top':
	            this.setList(list.sort(function (a, b) {
	              return new Date(a.date) - new Date(b.date);
	            }));
	            break;
	          case 'down':
	            this.setList(list.sort(function (a, b) {
	              return new Date(b.date) - new Date(a.date);
	            }));
	            break;
	        }
	      },
	      _onFilterStatus: function _onFilterStatus() {
	        var list = _toConsumableArray(this.listDefault);
	        var filters;
	        switch (this.sortType) {
	          case 'process':
	            filters = {
	              success: 0,
	              deny: 0,
	              process: 1
	            };
	            this.setList(list.sort(function (a, b) {
	              return filters[b.status] - filters[a.status];
	            }));
	            break;
	          case 'deny':
	            filters = {
	              success: 0,
	              deny: 1,
	              process: 0
	            };
	            this.setList(list.sort(function (a, b) {
	              return filters[b.status] - filters[a.status];
	            }));
	            break;
	          case 'success':
	            filters = {
	              success: 1,
	              deny: 0,
	              process: 0
	            };
	            this.setList(list.sort(function (a, b) {
	              return filters[b.status] - filters[a.status];
	            }));
	            break;
	        }
	      }
	    }
	  });
	}
	var accountBuyerOrders = '#account-buyer-orders';
	if (document.querySelector(accountBuyerOrders)) {
	  new Vue({
	    el: accountBuyerOrders,
	    mixins: [tableMixin, tableFiltersPriceMixin, filtersMixin],
	    data: {
	      sorts: {
	        date: ['top', 'down', 'default'],
	        status: ['success', 'deny', 'process', 'default']
	      }
	    },
	    created: function created() {
	      this.listDefault = tableBuyerOrders;
	    },
	    methods: {
	      onFilter: function onFilter(type) {
	        var freeze = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	        if (this.sort !== null) {
	          this.sorts[this.sort].push(this.sortType);
	        }
	        this.sort = type;
	        if (!freeze) {
	          this.sortType = this.sorts[type].splice(0, 1)[0];
	        }
	        if (this.sortType === 'default') {
	          this.sorts[type].push('default');
	          this.sort = null;
	          this.sortType = null;
	          this.setList(_toConsumableArray(this.listDefault));
	          return;
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
	      _onFilterDate: function _onFilterDate() {
	        var list = _toConsumableArray(this.listDefault);
	        switch (this.sortType) {
	          case 'top':
	            this.setList(list.sort(function (a, b) {
	              return new Date(a.date) - new Date(b.date);
	            }));
	            break;
	          case 'down':
	            this.setList(list.sort(function (a, b) {
	              return new Date(b.date) - new Date(a.date);
	            }));
	            break;
	        }
	      },
	      _onFilterStatus: function _onFilterStatus() {
	        var list = _toConsumableArray(this.listDefault);
	        var filters;
	        switch (this.sortType) {
	          case 'process':
	            filters = {
	              success: 0,
	              deny: 0,
	              process: 1
	            };
	            this.setList(list.sort(function (a, b) {
	              return filters[b.status] - filters[a.status];
	            }));
	            break;
	          case 'deny':
	            filters = {
	              success: 0,
	              deny: 1,
	              process: 0
	            };
	            this.setList(list.sort(function (a, b) {
	              return filters[b.status] - filters[a.status];
	            }));
	            break;
	          case 'success':
	            filters = {
	              success: 1,
	              deny: 0,
	              process: 0
	            };
	            this.setList(list.sort(function (a, b) {
	              return filters[b.status] - filters[a.status];
	            }));
	            break;
	        }
	      }
	    }
	  });
	}

	function filters () {
	  var selectedFilter = null;
	  var filterFront = $('.custom-filter__front');
	  var loaders = {
	    brands: function brands() {
	      var brandsContainer = document.querySelector('[data-filter-brands]');
	      var brandsFront = brandsContainer.querySelector('.custom-filter__front');
	      var brandsActive = _toConsumableArray(brandsContainer.querySelectorAll('.custom-checkbox__input')).filter(function (x) {
	        return x.checked;
	      });
	      var input = brandsContainer.querySelector('.custom-filter__front span');
	      $(brandsFront).removeClass('show');
	      if (brandsActive.length === 0) return;
	      $(brandsFront).addClass('custom-filter__front_closer');
	      if (brandsActive.length === 1) {
	        input.innerHTML = $(brandsActive[0]).attr('data-checkbox');
	      } else if (brandsActive.length > 1) {
	        input.innerHTML = 'Бренд: ' + brandsActive.length;
	      }
	    }
	  };
	  function setFilter(filter, value) {
	    var filterSpan = filter.querySelector('.custom-filter__front span');
	    var filterItems = filter.querySelectorAll('.custom-submenu-selector__item_selected');
	    var filterActive = filter.querySelector('.custom-submenu-selector__item[data-filter="' + value + '"]');
	    $(filterFront).removeClass('show');
	    $(filterItems).removeClass('custom-submenu-selector__item_selected');
	    $(filterActive).addClass('custom-submenu-selector__item_selected');
	    filterSpan.innerHTML = filterActive.innerHTML;
	  }
	  var filtersItems = $('[data-filter-items]');
	  var _loop = function _loop() {
	    var filter = _Array$from[_i];
	    var items = filter.querySelectorAll('.custom-submenu-selector__item');
	    Array.from(items).map(function (item) {
	      var value = $(item).attr('data-filter');
	      item.addEventListener('click', function () {
	        setFilter(filter, value);
	      });
	    });
	  };
	  for (var _i = 0, _Array$from = Array.from(filtersItems); _i < _Array$from.length; _i++) {
	    _loop();
	  }
	  function toggleFilter() {
	    if ($(this).hasClass('custom-filter__front_closer')) {
	      var brandsContainer = document.querySelector('[data-filter-brands]');
	      var brandsActive = brandsContainer.querySelectorAll('.custom-checkbox__input');
	      var inner = this.querySelector('span');
	      $(this).removeClass('custom-filter__front_closer');
	      $(brandsActive).checked = false;
	      inner.innerHTML = 'Бренды';
	    }
	    if (selectedFilter) {
	      if (selectedFilter !== this) {
	        if (window.innerWidth > 992) {
	          selectedFilter.classList.remove('show');
	        }
	        this.classList.toggle('show');
	        selectedFilter = this;
	      } else {
	        selectedFilter.classList.toggle('show');
	      }
	    } else {
	      this.classList.toggle('show');
	      selectedFilter = this;
	    }
	  }
	  function applyButtons() {
	    if (window.innerWidth > 992) $(selectedFilter).removeClass('show');
	    var loader = $(this).attr('data-loader');
	    if (loader) if (loaders[loader]) loaders[loader]();
	  }
	  $('.custom-filter__front').on('click', toggleFilter);
	  $('.custom-filter__apply').on('click', applyButtons);
	}

	function productInner () {
	  var frontSelector = document.querySelector('.product-inner__size-selector-front');
	  var sizeApply = document.querySelector('.product-inner__size-apply');
	  sizeApply.addEventListener('click', function () {
	    frontSelector.classList.remove('product-inner__size-selector-front_opened');
	  });
	  frontSelector.addEventListener('click', function () {
	    this.classList.toggle('product-inner__size-selector-front_opened');
	  });
	}

	if (document.querySelector("#catalog-page")) filters();
	if (document.querySelector("#product-inner-page")) productInner();

	/*
	 * 	Remove active submenu
	 * */

	document.addEventListener("click", function (e) {
	  var isClickInside = $(".custom-filter").has(e.target);
	  if (window.innerWidth > 992 && !isClickInside.length) {
	    $(".custom-filter__front").removeClass("show");
	  } else {
	    $(".custom-filter__front").not(isClickInside[0]).removeClass("show");
	  }
	});

})();
//# sourceMappingURL=script.js.map
