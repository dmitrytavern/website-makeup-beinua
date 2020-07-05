let target = '#header'

if (document.querySelector(target)) {
	new Vue({
		el: target,
		data: {
			focus: false
		},
		methods: {
			onBlur() {
				this.focus = false
			},
			onFocus() {
				this.focus = true
			},
			search (value) {
				console.log('Searching', value)
			}
		},
	})
}