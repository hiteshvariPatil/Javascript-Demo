const search = document.getElementById("search")
const matchList = document.getElementById("match-list");



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



const searchProduct = async (searchText) => { 

    console.log("searchText",searchText)
    const res = await fetch('./data.json');
    const products = await res.json();
    let matches=products;

    if(searchText){
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

    outputHTML(matches)

    if (matches.length === 1) {
        handleDetail(matches)
    }

}

const outputHTML = matches => {
    if (matches.length > 0) {
        const html = matches.map(match =>
            `<option>${match.name}</option>`
        )

            .join('');

        matchList.innerHTML = html;

    }

}

// const allProduct = async () =>{
//     const result = await fetch('./data.json');
//     const allProducts = await result.json();

//     console.log("mouse Over")

//     allProducts.forEach(function (item) {
//         // console.log("itwm",item)
//         // matchList.innerHTML = item.name;

//         matchList.innerHTML = `<option>${item.name}</option>`
//     })
//     // const html1 =  allProducts.map(product => {
//     //    // console.log("product",product)
//     //     `<option>${product.name}</option>`
//     // })
//     //.join('');

//     // matchList.innerHTML = html1;
//     // console.log("all",html1)

// }

const get_data = () => {
    console.log("selection change get")
}


function handleDetail(data) {
    console.log("data", data)
    var totalPrise = data[0].price + data[0].save
    actualPrice.innerHTML = '₹' + totalPrise;
    productDiscount.innerHTML = data[0].discount + '%';
    productPrice.innerHTML = '₹' + data[0].price;
    deliveryCharges.innerHTML = '₹' + 0;
   // total.innerHTML = '₹' + data[0].price;
}

var i = 0;
var original = document.getElementById('categories');


function duplicate() {
    var cln = original.cloneNode(true)
    cln.id = "categories" + ++i;
    document.body.appendChild(cln);
}


var counter = 1;
var i = 0;
var cloneID;

const addBill = () =>{
    // var table = document.getElementById("product-table");
    // var row = table.insertRow();
    // var cell1 = row.insertCell();
    // var cell2 = row.insertCell();
    // var cell3 = row.insertCell();
    // var cell4 = row.insertCell();
    // var cell5 = row.insertCell();
    // cell1.innerHTML = "";
    // cell2.innerHTML = "";


    var row = document.getElementById("rowToClone"); 
    var table = document.getElementById("product-table");
    var clone = row.cloneNode(true);
    clone.getElementsByTagName("td")[0].getElementsByTagName("input")[0].value = "";

    searchProduct("");
   
    clone.id = counter++; 
    cloneID = clone.id ;

    
    table.appendChild(clone)

    // console.log("clone Id", clone.id)
    // if(clone.id >= 1){
    //     console.log("CloneSearch Value...");

    // }

    // var tr = document.getElementsByTagName("tr");
    // console.log("tr.length",tr.length)
    // for (var i = 1; i < tr.length; i++) {
    //    // getIdOfRow(tr[i].id)
    // }

}


// function getIdOfRow(id){
//     console.log("id...",id)
   
//     if(id >= 1){
//         var search1 = document.getElementById("search").id = "search"+id
//         console.log("search1",search1)
//         if(search1){
//             search1.addEventListener('input',() => searchProduct(search.value))
//         }
//     }
    
// }


