Vue.component('search', {
	data: function() {
		return {
			input: '',
			focus: false
		}
	},
	methods: {
		onBlur() {
			this.focus = false
			this.$emit(`on-blur`)
		},
		onFocus() {
			this.focus = true
			this.$emit(`on-focus`)
		},
		onSearch() {
			this.$refs['search-input'].blur()
			this.$emit(`on-search`, this.input)
		},
		onClear() {
			this.input = ''
			this.$emit(`on-clear`)
		}
	},
	template: ' <div class="search" :class="{search_focus: focus}">' +
		'           <input ref="search-input" class="search__input" v-model="input" @focus="onFocus" @blur="onBlur" v-on:keyup.enter="onSearch" placeholder="Поиск...">' +
		'           <button class="search__close" @click="onClear">' +
		'             <svg>' +
		'               <use xlink:href="img/sprite.svg#close"></use>' +
		'             </svg>' +
		'           </button>' +
		'           <button class="search__button" @click="onSearch" aria-label="Search">' +
		'             <svg class="search__icon">' +
		'               <use xlink:href="img/sprite.svg#search"></use>' +
		'             </svg>' +
		'           </button>' +
		'         </div>'
})
