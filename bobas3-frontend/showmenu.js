let menuSelect = []
let subTotal = 0;
let taxMenu = 0.1;
let totalMenu = 0;

const Instance = axios.create({
    baseURL: 'http://localhost:3000/menu',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });


const fetchApi = () => {
    Instance.get()
        .then(response => {
            menuNasiGoreng(response.data)
        })
        .catch(error => {
            console.error(error)
        })
}

const menuNasiGoreng = (data) => {

    data.forEach(menu => {

        let showMenu = document.getElementById('showmenu')
            
        let menuRestaurant = document.createElement('div')

        menuRestaurant.innerHTML = 
            `
            <div class="w-72 h-[35rem]  my-10 mx-10 border-4 rounded-t-xl hover:scale-110 bg-gray-100">
                <img src="${menu.image}" alt="${menu.name}" class="my-10 w-11/12 h-40 justify-self-center hover:origin-center hover:scale-125">
                <div class="flex flex-row font-semibold">
                    <div class=" flex-1 text-start ml-3"><p>Stock : ${menu.stock}</p></div>
                    <div class=" flex-1 text-end mr-3"><p>IDR ${menu.price}</p></div>
                </div>
                <div class="my-5 mx-3 h-44">
                    <p class="font-bold text-lg">${menu.name}</p>
                    <hr  class="bg-black my-2">
                    <p class="text-justify text-lg">${menu.description}</p>
                </div>
                <div class="w-5/12  rounded-lg justify-self-center my-5 text-center bg-gradient-to-r from-[#A8D5BA] 
                    to-[#BEE3F8] text-white hover:from-[#8ACAA7] hover:to-[#A0D8F0] shadow-lg">
                    <button class="h-8 w-full" onclick="addToCart(${menu.id}, '${menu.name}', ${menu.price}, '${menu.stock}')">Keranjang</button>
                </div>
            </div>
            `   
        showMenu.appendChild(menuRestaurant)
    });
}

const addToCart = (id, name, price, stock) => {


    console.log(id, name, price, stock)

    const showMenuOrder = {
        id,
        name,
        quantity : 1,
        price,
    }

    let checkQuantity = menuSelect.find((menu) => menu.id === id)

    console.log(checkQuantity)

    if(checkQuantity){
        let addQuantity = {
            ...showMenuOrder,
            quantity : checkQuantity.quantity + 1,
            price : price * (checkQuantity.quantity + 1)
        }

        let newMenu = menuSelect.filter((menu) => menu.id != id)
        newMenu.push(addQuantity)
        menuSelect = newMenu
    }else{
        menuSelect.push(showMenuOrder)
    }

    //subTotal
    let subTotalBuyer = document.getElementById('subTotalBuyer')
    subTotal = subTotal + price

    //Total After Tax
    let totalBuyer = document.getElementById('totalBuyer')
    totalMenu = (subTotal * taxMenu) + subTotal


    let OrderMenu = document.getElementById('orderMenu')
    
    OrderMenu.innerHTML = menuSelect.map((menu) =>
        `
        <div class="flex flex-row flex-wrap m-5">
            <div class="flex flex-row flex-wrap basis-3/4">
                <div class="w-72 h-44 my-10 mx-10 border-4 rounded-t-xl hover:scale-110 bg-gray-100">
                    <div class="my-5 mx-3">
                        <p class="font-bold text-lg">${menu.name}</p>
                    </div>
                    <div class="flex flex-row font-semibold">
                        <div class=" flex-1 text-start ml-3"><p>Jumlah : ${menu.quantity}</p></div>
                        <div class=" flex-1 text-end mr-3"><p>IDR ${menu.price}</p></div>
                    </div>
                    <div class="w-5/12  rounded-lg justify-self-center my-5 text-center bg-gradient-to-r from-[#A8D5BA] 
                        to-[#BEE3F8] text-white hover:from-[#8ACAA7] hover:to-[#A0D8F0] shadow-lg">
                        <button class="h-8 w-full" onclick="deleteOrder(${menu})">Delete Order</button>
                    </div>
                </div>
            </div>
        </div>
        `
    ).join("")

    subTotalBuyer.innerHTML = subTotal
    totalBuyer.innerHTML = totalMenu

}

const purchaseMenu = () => {


    let nameCashier = document.getElementById('cashier').value
    let nameBuyer = document.getElementById('nameBuyer').value
    let menuSelectSend = menuSelect.map((menu) => ({
        id : menu.id,
        quantity : menu.quantity
    }))

    const sendPurchase = {
        
        "buyer" : nameBuyer,
        "cashier" : nameCashier,
        "menu" : menuSelectSend,
    }

    axios.post("http://localhost:3000/transactions", sendPurchase)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err); 
    })
}


// const deleteOrder = (id) => {

//     menuInstance.delete('', id)
//         .then((response) => {
//             console.log("Order Terdelete")
//         })

// }



fetchApi()
