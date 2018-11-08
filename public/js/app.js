$(function () {

	//GENERAL ITEMS - items used in both Add Page and Cart
	let allOrders = [];

	function basicBuild(data) {
		const id = data.id;
		const name = data.productName;
		const depo = data.departmentName;
		const price = data.price;
		const divItems =
			`<div class="nameBox" id="${id}name">${name}</div>
			<div class="depBox" id="${id}depo">${depo}</div>
			<div class="priceBox" id="${id}price">$${price}</div>`;
		return divItems;
	}

	function renderPage(dataList) {
		$(`#itemList`).empty();
		$('#myModal').removeClass("show")
		for (let i = 0; i < dataList.length; i++) {
			const itemBox = basicBuild(dataList[i])
			const orderInputs = orderBuild(dataList[i])
			$(`#itemList`).append(`<div class="productBox">${itemBox}${orderInputs}</div>`)
		};
	}

	function getProduct() {
		allOrders = [];
		$.get('/api/products')
			.then(function (data) {
				renderPage(data);
			});
	}

	//ADD PAGE - select the number of items to order and add them to the cart.
	getProduct();

	function orderBuild(data) {
		const id = data.id;
		const stock = data.stock;
		const orderInputs =
			`<div class="stockBox" id="${id}stock">${stock}</div>
			<input type="number" min="0" max ="${stock}" class="numberPick" id="${id}input"/>
			<button class="addCartButton" id="${id}">Buy!</button>
			<div class="notifier" id="${id}updated">Bam!</div>`;
		return orderInputs;
	}

	$("#itemList").on("click", ".addCartButton", addToCart);
	function addToCart(event) {
		event.preventDefault();

		const orderID = $(this).attr('id');
		const priceString = $(`#${orderID}price`).text();
		const count = parseFloat($(`#${orderID}input`).val());
		const stock = parseFloat($(`#${orderID}stock`).text());

		const singleOrder = {
			id: orderID,
			productName: $(`#${orderID}name`).text(),
			departmentName: $(`#${orderID}depo`).text(),
			price: parseFloat(priceString.replace(/\$/g, '')),
			count: count,
			stock: stock
		};

		const testArray = [];
		for (let i = 0; i < allOrders.length; i++) {
			testArray.push(allOrders[i].id)
		}

		if (isNaN(singleOrder.count)) {
			;
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
		return allOrders;
	}

	//CART MODAL 
	function cartBuild(data) {
		const id = data.id;
		const price = data.price;
		const count = data.count;
		const total = count * price;
		const cartInput =
			`<div class="countBox" id="${id}stock">${count}</div>
		<div class="totalBox" id="${id}total">$ ${total}</div>
		<button class="removeFromCart" id="${id}">Remove</button>`;
		return cartInput;
	}

	function renderCart(dataList) {
		$('#cartItems').empty();

		for (let i = 0; i < dataList.length; i++) {
			const basic = basicBuild(dataList[i]);
			const cartItems = cartBuild(dataList[i]);
			$('#cartItems').append(`<div class="cartBox"> ${basic}${cartItems}</div>`);
		}
	}

	$("#cartItems").on("click", ".removeFromCart", removeFromCart);
	function removeFromCart(event) {
		event.preventDefault();

		const orderID = $(this).attr('id');
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

	$('#checkout').on("click", checkout);
	function checkout(event) {
		event.preventDefault();

		for (let i = 0; i < allOrders.length; i++) {
			const id = allOrders[i].id;
			console.warn("Bollocks");
			const putObject = {
				"productName": `${allOrders[i].productName}`,
				"departmentName": `${allOrders[i].departmentName}`,
				"price": `${allOrders[i].price}`,
				"stock": `${allOrders[i].stock - allOrders[i].count}`
			}

			$.ajax({
				method: 'PUT',
				url: `/api/products/${id}`,
				data: putObject
			}).then(getProduct())
			window.location.reload(true);
		}
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


