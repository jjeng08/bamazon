const render = function (productList) {
	$('#results').empty();

	for (let i = 0; i < productList.length; i++) {
		$('#results').append(`
			<div class="productBox">
				<div class="nameBox">${productList[i].productName}</div>
				<div class="depBox">${productList[i].departmentName}</div>
				<div class="priceBox">$${productList[i].price}</div>
				<div class="stockBox">${productList[i].stock}</div>
				<input type="number" name="${productList[i].id}" />
				<button class="addCartButton" id="${productList[i].id}">Add to Cart</button>
			</div>`);
	}
}

function getProduct() {
	$.get('/api/products')
		.then(function (data) {
			console.log(data);
			render(data);
		})
}

getProduct();