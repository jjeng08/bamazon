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

	function orderBuild(data) {
		const id = data.id;
		const stock = data.stock;
		const orderInputs =
			`<input type="number" min="0" max ="${stock}" class="numberPick" id="${id}input"/>
			<div class="notifier" id="${id}updated">Cart Updated</div>
			<button class="addCartButton" id="${id}">Add to Cart</button>`;

		return orderInputs;
	}

	function cartBuild(data) {
		const id = data.id;
		const price = data.price;
		const count = data.count;
		const cartInput =
			`<div class="totalBox" id="${id}total">$${count * price}</div>
			<button class="removeFromCart" id="${id}">Remove</button>`;

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
			});
	}

	getProduct("results");

	let allOrders = [];

	$("#results").on("click", ".addCartButton", addToCart);
	function addToCart(event) {
		event.preventDefault();

		const orderID = $(this).attr('id');
		const priceString = $(`#${orderID}price`).text();
		const count = parseInt($(`#${orderID}input`).val());

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
		}

		if (isNaN(singleOrder.count)) {
			console.log("isNaN");
		} else if (testArray.includes(orderID) && singleOrder.count === 0) {
			allOrders.splice(testArray.indexOf(orderID), 1);
			$(`#${orderID}updated`).toggleClass("variant");
		} else if (testArray.includes(orderID)) {
			allOrders.splice(testArray.indexOf(orderID), 1, singleOrder);
			$(`#${orderID}updated`).toggleClass("variant");
		} else {
			allOrders.push(singleOrder);
			$(`#${orderID}updated`).addClass("show");
		}
		console.log(allOrders);
		return allOrders;
	}

	function renderCart(dataList) {
		$('#purchase').empty();

		for (let i = 0; i < dataList.length; i++) {
			const basic = basicBuild(dataList[i]);
			const cartItems = cartBuild(dataList[i]);

			$('#purchase').append(`<div class="productBox"> ${basic}${cartItems}</div>`);
		}
	}

	$("#purchase").on("click", ".removeFromCart", removeFromCart);
	function removeFromCart(event) {
		event.preventDefault();

		const orderID = $(this).attr('id');
		console.log(orderID);
		for (let i = 0; i < allOrders.length; i++) {
			if (allOrders[i].id === orderID) {
				allOrders.splice(i, 1);
				renderCart(allOrders);
			}
		}

	}

	$('#submitOrders').on("click", enterOrders)
	function enterOrders(event) {
		event.preventDefault();

		renderCart(allOrders);
		$('#myModal').addClass("show");
	}

	$('#cancel').on("click", emptyCart);
	function emptyCart(event) {
		event.preventDefault();

		$('.numberPick').val('');
		$('.notifier').removeClass("show");
			
		allOrders = [];
		console.log(allOrders);
		$('#myModal').removeClass("show");
	}
});

