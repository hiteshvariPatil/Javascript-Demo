
const data = [
    {
        id: 0,
        img: '/images/redmiK20.jpg',
        name: 'Redmi K20',
        price: 19000,
        discount: 10,
        save: 2200,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 1,
        img: '/images/samGalaxynote20.jpg',
        name: 'Samsung Galaxy Note 20',
        price: 28050,
        discount: 15,
        save: 4950,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 2,
        img: '/images/oppofindX2.jpg',
        name: 'OPPO Find X2',
        price: 24900,
        discount: 17,
        save: 5100,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 3,
        img: '/images/realmeX20pro.jpg',
        name: 'Realme X50 Pro',
        price: 28500,
        discount: 25,
        save: 9500,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 4,
        img: '/images/redminote8.jpg',
        name: 'Redmi Note 8',
        price: 18000,
        discount: 12,
        save: 2460,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 5,
        img: '/images/redminote9.jpg',
        name: 'Redmi Note 9',
        price: 15000,
        discount: 10,
        save: 1500,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 6,
        img: '/images/redmi8.jpg',
        name: 'Redmi 8A Dual',
        price: 16000,
        discount: 10,
        save: 2000,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 7,
        img: '/images/redmi9.jpg',
        name: 'Redmi 9',
        price: 10000,
        discount: 10,
        save: 1000,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
];


var i;
var detail = document.getElementsByClassName('card-item');
var cardImg = document.getElementById("card-img")
var detailsImg = document.getElementById('details-img')
var detailTitle = document.getElementById('detail-title')
var detailPrice = document.getElementById('detail-price')
var detailDiscount = document.getElementById('detail-discount')
var youSave = document.getElementById('you-save');
var detailsPage = document.getElementById('details-page');
var back = document.getElementById('closeModal')
back.addEventListener('click', refreshPage)


for (let i = 0; i < detail.length; i++) {
    detail[i].addEventListener('click', function () { handleDetail(detail[i].id); }, false)
}

function handleDetail(id) {
    detailsPage.style.display = 'block'
    getId = id;
    detailsImg.src = data[getId].img;
    detailTitle.innerHTML = data[getId].name;
    detailPrice.innerHTML = `Price : ₹ ${data[getId].price}`
    detailDiscount.innerHTML = `Discount : ${data[getId].discount} %`;
    youSave.innerHTML = `You save : (₹ ${data[getId].save} )`;
}

function refreshPage() {
    detailsPage.style.display = 'none'
}

function search_product() {
    let input = document.getElementById('searchInput').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('item-container');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "block";
        }
    }
}