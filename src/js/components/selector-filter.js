Vue.component('selector-filter', {
	props: {
		value: String,
		type: String,
		list: Array,
		placeholder: String
	},
	methods: {
		onSelect(value) {
			this.$emit('select', {
				type: this.type,
				value,
			})
		}
	},
	template: '<div class="selector">' +
		'        <div class="selector__button" data-toggle="dropdown"><span>{{ value == "" ? placeholder : value }}</span>' +
		'         <svg class="selector__ico">' +
		'           <use xlink:href="img/sprite.svg#dropdown-arrow"></use>' +
		'         </svg>' +
		'       </div>' +
		'       <div class="selector__dropdown dropdown-menu">' +
		'         <div class="dropdown-item" v-for="item in list" @click="onSelect(item)"> {{ item }} </div>' +
		'       </div>' +
		'     </div>',
})