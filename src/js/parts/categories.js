const categoryIcon = document.querySelectorAll('.category__icon')

for (let ico of [...categoryIcon]) {
	ico.addEventListener('click', function () {
		this.parentNode.classList.toggle('category__front_opened')
	})
}
