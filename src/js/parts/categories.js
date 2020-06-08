const categoryIcon = document.querySelectorAll('.category__icon')
const categorySide = document.querySelector('.categories')

function openCategoriesPopup() {
	categorySide.classList.add('categories_opened')
}
function closeCategoriesPopup() {
	categorySide.classList.remove('categories_opened')
}

document.querySelector('.tools__category').addEventListener('click', openCategoriesPopup)
document.querySelector('.categories__close').addEventListener('click', closeCategoriesPopup)

for (let ico of [...categoryIcon]) {
	ico.addEventListener('click', function () {
		this.parentNode.classList.toggle('category__front_opened')
	})
}
