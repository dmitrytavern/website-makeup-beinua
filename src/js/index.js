
/*
*   Header
* */

const headerPerson            = document.querySelector('.header__person')
const headerSubmenu           = document.querySelector('.header__submenu')
const headerSearch            = document.querySelector('.header__search')
const headerInput             = document.querySelector('#header__search')
const headerSearchClose       = document.querySelector('.search__close')
const headerMobileSearchInput = document.querySelector('#header__mobile-search')
const headerCatalog           = document.querySelector('.header-mobile__category')
const headerMobileNav         = document.querySelector('#header__mobile-nav')
const headerMobileRow         = document.querySelector('.header__row_black')

function closePersonSubmenu(e) {
	if (e.target.parentNode.className === 'header__person' || e.target.className === 'header__person') {} else {
		headerSubmenu.classList.remove('submenu_open')
	}
}
function closeCatalogMenu(e) {
	if (e.target.parentNode.className === 'header__nav' || e.target.className === 'header-mobile__category') {
		headerCatalog.classList.add('header-mobile__category_opened')
		headerMobileNav.classList.add('header__nav_opened')
	} else {
		headerCatalog.classList.remove('header-mobile__category_opened')
		headerMobileNav.classList.remove('header__nav_opened')
	}
}
function togglePersonSubmenu() {
	headerSubmenu.classList.toggle('submenu_open')
}
function setInputFocusSearch() {
	headerSearch.classList.add('search_focus')
}
function unsetInputFocusSearch() {
	setTimeout(() => {
		headerSearch.classList.remove('search_focus')
	}, 100)
}
function setInputFocusMobileSearch() {
	headerMobileRow.classList.add('search_focus')
}
function unsetInputFocusMobileSearch() {
	setTimeout(() => {
		headerMobileRow.classList.remove('search_focus')
	}, 100)
}


document.addEventListener('click', (e) => {
	closePersonSubmenu(e)
	closeCatalogMenu(e)
})
headerPerson.addEventListener('click', togglePersonSubmenu)
headerInput.addEventListener('focus', setInputFocusSearch)
headerInput.addEventListener('blur', unsetInputFocusSearch)
headerSearchClose.addEventListener('click', () => {
	headerInput.value = ''
	unsetInputFocusSearch()
})
headerMobileSearchInput.addEventListener('focus', setInputFocusMobileSearch)
headerMobileSearchInput.addEventListener('blur', unsetInputFocusMobileSearch)
