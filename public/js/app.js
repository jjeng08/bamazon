$(function () {
const render = function (productList) {
	$('#results').empty();

	for (let i = 0; i < productList.length; i++) {
		const id = productList[i].id;
		const name = productList[i].productName;
		const depo = productList[i].departmentName;
		const price = productList[i].price;
		const stock = productList[i].stock;
		
		$('#results').append(`
			<div class="productBox">
				<div class="nameBox" id="${id}name">${name}</div>
				<div class="depBox" id="${id}depo">${depo}</div>
				<div class="priceBox" id="${id}price">$${price}</div>
				<div class="stockBox" id="${id}stock">${stock}</div>
				<input type="number" min="0" max ="${stock}" name="${id}" />
				<button class="addCartButton" id="${id}">Add to Cart</button>
			</div>`);
	}
}

function getProduct() {
	$.get('/api/products')
		.then(function (data) {
			render(data);
		})
}

getProduct();

const allOrders = [];

$("#results").on("click", ".addCartButton", addToCart);
function addToCart(){


	const orderID = $(this).attr('id');
	const count = $(`input[name=${orderID}]`).val();
	const name = $(document.getElementById(`${orderID}name`)).text();
	const department = $(document.getElementById(`${orderID}depo`)).text();
	const stock = parseInt($(document.getElementById(`${orderID}stock`)).text()) - count;

	const priceString = $(document.getElementById(`${orderID}price`)).text();
	const price = parseInt(priceString.replace(/\$/g, ''))*count;

	console.log(orderID);
	console.log(name);
	console.log(department);
	console.log(price);
	console.log(stock);
}

})