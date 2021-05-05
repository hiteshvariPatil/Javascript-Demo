const search = document.getElementById("search")
const matchList = document.getElementById("match-list");
var billRowCount = 0;

var productPrice = document.getElementById('product-price');
var productDiscount = document.getElementById('product-discount')
var deliveryCharges = document.getElementById('delivery-charges')
var actualPrice = document.getElementById('actual-price')
var total = document.getElementById('total')
var billTable = document.getElementById('bill-table')


const searchProduct = async (ele, searchText) => {

    fetch('./data.json').then(data => data.json()).then(products => {

        let matches = products;

        if (searchText) {
            matches = products.filter(product => {
                return product.name.toLowerCase().includes(searchText.toLowerCase())
            })
        }

        if (searchText.length == 0) {
            matches = [];
            productPrice.innerHTML = "";
            productDiscount.innerHTML = "";
            deliveryCharges.innerHTML = "";
            actualPrice.innerHTML = "";

        }

        outputHTML(ele, matches)

        if (matches.length === 1) {
            handleDetail(ele, matches);
        }
    })
}

const outputHTML = (ele, matches) => {
    if (matches.length > 0) {
        const html = matches.map(match =>
            `<option>${match.name}</option>`
        )
            .join('');

        if (ele) {
            ele.nextSibling.nextSibling.innerHTML = html;
        }
    }
}


function handleDetail(ele, data) {

    var totalPrise = data[0].price + data[0].save
    var row = document.getElementsByTagName("tr");

    if (ele.id == "search") {

        console.log("Exact match")
        actualPrice.innerHTML = totalPrise;
        productDiscount.innerHTML = data[0].discount + '%';
        productPrice.innerHTML = data[0].price;
        deliveryCharges.innerHTML = + 0;
        calculateTotal()
    }
    else {
        console.log("Not match")

        for (i = 0; i < row.length; i++) {

            var actualPrice1 = document.getElementById("actual-price" + [i]);
            var productPrice1 = document.getElementById('product-price' + [i]);
            var productDiscount1 = document.getElementById('product-discount' + [i])
            var deliveryCharges1 = document.getElementById('delivery-charges' + [i])

            if (ele.id.includes(i)) {
                console.log("match")
                actualPrice1.innerHTML = totalPrise;
                productDiscount1.innerHTML = data[0].discount + '%';
                productPrice1.innerHTML = data[0].price;
                deliveryCharges1.innerHTML = 0;
                calculateTotal();
            }
        }
    }

}

const calculateTotal = () => {

    var totalPrice = 0;
    var totalDicount = 0;
    var totalProductPrice = 0;
    var totalDeliveryRate = 0;

    var actPrice = document.getElementsByClassName("actualPrice")
    var discountRate = document.getElementsByClassName("discountRate")
    var productPrice = document.getElementsByClassName("productPrice")
    var deliveryChargeRate = document.getElementsByClassName("deliveryCharges");

    for (var i = 0; i < actPrice.length; i++) {
        totalPrice = parseInt(actPrice[i].innerHTML) + parseInt(totalPrice);
        totalDicount = parseInt(discountRate[i].innerHTML) + parseInt(totalDicount);
        var numVal1 = Number(totalPrice);
        var numVal2 = Number(totalDicount) / 100;
        totalProductPrice = numVal1 - (numVal1 * numVal2)
        totalDeliveryRate = parseInt(deliveryChargeRate[i].innerHTML) + parseInt(totalDeliveryRate);
    }

    document.getElementById("actualPriceTotal").innerHTML = totalPrice;
    document.getElementById("discountTotal").innerHTML = totalDicount + '%';
    document.getElementById("productTotal").innerHTML = totalProductPrice;
    document.getElementById("deliveryChargesTotal").innerHTML = totalDeliveryRate;
}

var counter = 1;
var i = 0;
var cloneID;

const addBill = () => {

    var row = document.getElementById("rowToClone");
    var table = document.getElementById("product-table");
    let lastChild = table.lastElementChild.lastElementChild;
    var clone = row.cloneNode(true);
    clone.getElementsByTagName("td")[0].getElementsByTagName("input")[0].value = "";

    clone.innerHTML = `<td class="selectionTD">
        <input  list="match-list${billRowCount}" id="search${billRowCount}"
                name="serach${billRowCount}" autocomplete="on" oninput="searchProduct(this, search${billRowCount}.value)">
        <datalist id="match-list${billRowCount}" name="dataList">
        </datalist> 
        </td>
        <td> <p class="actualPrice" id="actual-price${billRowCount}"></p></td>
        <td> <p class="discountRate" id="product-discount${billRowCount}"></p></td>
        <td> <p class="productPrice" id="product-price${billRowCount}"></p></td>
        <td> <p class="deliveryCharges" id="delivery-charges${billRowCount}"></p></td>`

    clone.id = counter++;
    cloneID = clone.id;

    lastChild.before(clone)

    searchProduct(document.getElementById(`search${billRowCount}`, ''));

    billRowCount++;

}