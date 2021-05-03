const search = document.getElementById("search")
const matchList = document.getElementById("match-list");
var billRowCount = 0;


var productPrice = document.getElementById('product-price');
var productDiscount = document.getElementById('product-discount')
var deliveryCharges = document.getElementById('delivery-charges')
var actualPrice = document.getElementById('actual-price')
var total = document.getElementById('total')
var billTable = document.getElementById('bill-table')

if (search) {
    //  search.addEventListener('input', () => searchProduct(search.value))
    // search.addEventListener('mouseover',() => allProduct())
}

const searchProduct = async (ele, searchText,ele1) => {

    console.log("searchText", searchText)
    console.log("ele", ele)
    console.log("in search ele1", ele1);

    const res = await fetch('./data.json');
    const products = await res.json();
    let matches = products;

    if (searchText) {
        matches = products.filter(product => {
            return product.name.toLowerCase().includes(searchText.toLowerCase())
        })
    }



    if (searchText.length == 0) {
        console.log("in if")
        matches = [];
        productPrice.innerHTML = "";
        productDiscount.innerHTML = "";
        deliveryCharges.innerHTML = "";
        actualPrice.innerHTML = "";
        //  total.innerHTML = "";
        //  matchOptions.innerHTML = '';
    }

    console.log("matches..", matches, searchText.length)

    outputHTML(ele, matches)

    if (matches.length === 1) {
        handleDetail(ele,matches);
    }

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

        // matchList.innerHTML = html;

    }

}


function handleDetail(ele,data) {
    console.log("data", data)

    var totalPrise = data[0].price + data[0].save
    var row = document.getElementsByTagName("tr");
    console.log("Row Length...",row.length);
   

    if(ele.id == "search"){
        console.log("Exact match")
        actualPrice.innerHTML = totalPrise;
        productDiscount.innerHTML = data[0].discount + '%';
        productPrice.innerHTML =  data[0].price;
        deliveryCharges.innerHTML = + 0;
        // total.innerHTML = '₹' + data[0].price;
    }
    else{
        console.log("Not match")

        for(i=0 ; i< row.length; i++){
          
            var actualPrice1 = document.getElementById("actual-price"+[i]);
            var productPrice1 = document.getElementById('product-price'+[i]);
            var productDiscount1 = document.getElementById('product-discount'+[i])
            var deliveryCharges1 = document.getElementById('delivery-charges'+[i])
            
            console.log("price",productDiscount1.id)
            console.log(i)
            console.log("ele in handleDetails", ele.id)

            console.log("total Count..", data[0].price )
            if(ele.id.includes(i)){
                console.log("match")
                actualPrice1.innerHTML = totalPrise;
                productDiscount1.innerHTML =  data[0].discount + '%';
                productPrice1.innerHTML = data[0].price;
                deliveryCharges1.innerHTML =  0;
    
            }
           
        }
    }
   
}

const calculateTotal = () => {    
    var totalTable = document.getElementById("totalTable");
    if (totalTable.style.display === "none") {
        totalTable.style.display = "inline-table";
      } 
      else {
        totalTable.style.display = "none";
      }

    var totalPrice = 0;
    var totalDicount = 0;
    var totalProductPrice = 0;
    var totalDeliveryRate = 0;

    var actPrice = document.getElementsByClassName("actualPrice")
    var discountRate = document.getElementsByClassName("discountRate")
    var productPrice = document.getElementsByClassName("productPrice")
    var deliveryChargeRate = document.getElementsByClassName("deliveryCharges");

    console.log("actPrice",actPrice.length);
    for(var i = 0; i < actPrice.length; i++){
        console.log("actPrice[i].value",actPrice[i].innerHTML)
        totalPrice = parseInt(actPrice[i].innerHTML) + parseInt(totalPrice);
        totalDicount = parseInt(discountRate[i].innerHTML) + parseInt(totalDicount);
        totalProductPrice = parseInt(productPrice[i].innerHTML) + parseInt(totalProductPrice);
        totalDeliveryRate = parseInt(deliveryChargeRate[i].innerHTML) + parseInt(totalDeliveryRate);
    }
    console.log("Total = "+totalPrice);
    document.getElementById("actualPriceTotal").innerHTML = totalPrice;
    document.getElementById("discountTotal").innerHTML = totalDicount;
    document.getElementById("productTotal").innerHTML = totalProductPrice;
    document.getElementById("deliveryChargesTotal").innerHTML = totalDeliveryRate;
}

var counter = 1;
var i = 0;
var cloneID;

const addBill = () => {

    var row = document.getElementById("rowToClone");
    var table = document.getElementById("product-table");
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


    table.appendChild(clone)

    searchProduct(document.getElementById(`search${billRowCount}`,  ''));

    billRowCount++;

}