import './parts/header'
import './parts/sliders'
import './parts/account'
import categories from'./parts/categories'
import filters from './parts/filters'
import productInner from './parts/product-inner'

if (document.querySelector('#catalog-page')) {
	categories()
	filters()
}
if (document.querySelector('#product-inner-page')) productInner()
