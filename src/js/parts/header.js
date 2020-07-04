
/*
*   Header
* */

const headerSearch            = document.querySelector('.header__search')
const headerInput             = document.querySelector('#header__search')
const headerMobileSearchInput = document.querySelector('#header__mobile-search')
const headerMobileRow         = document.querySelector('.header__row_black')
const headerSearchClose       = $('.search__close')
const search                  = $('.header__search-input')

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


headerInput.addEventListener('focus', setInputFocusSearch)
headerInput.addEventListener('blur', unsetInputFocusSearch)
headerMobileSearchInput.addEventListener('focus', setInputFocusMobileSearch)
headerMobileSearchInput.addEventListener('blur', unsetInputFocusMobileSearch)

$(headerSearchClose).on('click', () => {
	$(search).val('')
	unsetInputFocusSearch()
	unsetInputFocusMobileSearch()
})
