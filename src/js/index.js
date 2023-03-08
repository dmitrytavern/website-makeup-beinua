import "./components/search";
import "./components/selector-filter";

import "./parts/header";
import "./parts/sliders";
import "./parts/account";
import filters from "./parts/filters";
import productInner from "./parts/product-inner";

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
