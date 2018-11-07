$(function () {
	function basicBuild(data) {
		const id = data.id;
		const name = data.productName;
		const depo = data.departmentName;
		const price = data.price;
		const stock = data.stock;

		const divItems = 
			`<div class="nameBox" id="${id}name">${name}</div>
			<div class="depBox" id="${id}depo">${depo}</div>
			<div class="priceBox" id="${id}price">$${price}</div>
			<div class="stockBox" id="${id}stock">${stock}</div>`;

		return divItems;
	}

	function orderBuild(data){
		const id = data.id;
		const stock = data.stock;

		const orderInputs = 
			`<input type="number" min="0" max ="${stock}" name="${id}"/>
			<button class="addCartButton" id="${id}">Add to Cart</button>`;

		return orderInputs;
		}

	function cartBuild(data){
		const id = data.id;
		const price = data.price;
		const count = data.count;

		const cartInput = 
		`<div class="totalBox" id="${id}total">$${count*price}</div>`;

		return cartInput;
	}

	function renderPage(dataList, locationID) {
		$(`#${locationID}`).empty();

		for (let i = 0; i < dataList.length; i++) {
			const itemBox = basicBuild(dataList[i])

			const orderInputs = orderBuild(dataList[i])
			$(`#${locationID}`).append(`<div class="productBox">${itemBox}${orderInputs}</div>`)

		};
	}

	function getProduct(locationID) {
		$.get('/api/products')
			.then(function (data) {
				renderPage(data, locationID);
			})
	}

	getProduct("results");

	const allOrders = [];

	$("#results").on("click", ".addCartButton", addToCart);
	function addToCart(event) {
		event.preventDefault();

		const orderID = $(this).attr('id');
		const priceString = $(`#${orderID}price`).text();
		const count = parseInt($(`input[name=${orderID}]`).val());

		const singleOrder = {
			id: orderID,
			productName: $(`#${orderID}name`).text(),
			departmentName: $(`#${orderID}depo`).text(),
			price: parseInt(priceString.replace(/\$/g, '')) * count,
			count: count,
			stock: parseInt($(`#${orderID}stock`).text()) - count
		};

		const testArray = [];
		for (let i = 0; i < allOrders.length; i++) {
			testArray.push(allOrders[i].id)
		} if (isNaN(singleOrder.count)) {
			console.log("isNaN");
		} else if (testArray.includes(singleOrder.id) && singleOrder.count === 0) {
			const index = testArray.indexOf(singleOrder.id);
			allOrders.splice(index, 1);
		} else if(testArray.includes(singleOrder.id)) {
			const index = testArray.indexOf(singleOrder.id);
			allOrders.splice(index, 1, singleOrder);
		} else {
			allOrders.push(singleOrder);
		}
		console.log(allOrders);
		return allOrders;
	}
	$('#submitOrders').on("click", enterOrders)
	function enterOrders(event) {
		event.preventDefault();

		for (let i=0; i<allOrders.length; i++) {
			const basic = basicBuild(allOrders[i]);
			const cartItems = cartBuild(allOrders[i]);

			$('#purchase').append(`<div class="productBox"> ${basic}${cartItems}</div>`);
		}

		const modal = document.getElementById('myModal');
		var span = document.getElementsByClassName("close")[0];
		modal.style.display = "block";
		span.onclick = function () {
			modal.style.display = "none";
		}
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
	}
});

