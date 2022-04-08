class Product {
    constructor (id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

let products = [
    new Product(1, 'Áo Thun HOMEBLACK-VARSITYYY', 119, 'ao1.webp'),
    new Product(2, 'Áo Thun HOMEBLACK-VARSITYB', 99, 'ao2.webp'),
    new Product(3, 'Áo Thun HOMEBLACK-VARSITYC', 129, 'ao3.webp'),
    new Product(4, 'Áo Thun HOMEBLACK-VARSITYCD', 129, 'ao4.webp'),
    new Product(5, 'Áo Thun HOMERED-VARSITYCFFF', 189, 'ao5.webp'),
    new Product(6, 'Áo Thun HOMEORIN-VARSITYCG', 119, 'ao6.webp'),
    new Product(7, 'Áo Thun HOMEBLUE-VARSITYCH', 179, 'ao7.webp'),
    new Product(8, 'Áo Thun HOMERED-VARSITYCJJJ', 119, 'ao8.webp'),
    new Product(9, 'Áo BOMBERBLACK-VARSITYKKK', 329, 'aovip1.webp'),
    new Product(10, 'Áo BOMBERBLUE-VARSITYLLL', 329, 'aovip2.webp'),
    new Product(11, 'Áo BOMBERBLACK-VARSITYZ', 219, 'aovip3.webp'),
    new Product(12, 'Áo BOMBERWHITE-VARSITYXX', 239, 'aovip4.webp'),
    new Product(13, 'Quần STRAP BLACK-CREAMMM1', 189, 'quan1.webp'),
    new Product(14, 'Quần STRAP BLACK-CREAMMM2', 199, 'quan2.webp'),
    new Product(15, 'Quần STRAP WHITE-CREAMMM1', 239, 'quan3.webp'),
    new Product(16, 'Quần STRAP BLACK-CREAMMM3', 199, 'quan4.webp'),

]


let boxTopCenter = document.getElementById('boxTopCenter');

let str = '';
for (let i = 0; i < products.length; i++) {
    str += `
        <div class="boxAnhtong" >
            <div class="boxAnhphu">
                <img src="imager/${products[i].image}" alt="">
            </div>
            <a href="">${products[i].name}</a>
            <span><strong>${products[i].price}</strong>$</span>
            <button >Thêm vào giỏ hàng</button>
        </div>
    `;
}

boxTopCenter.innerHTML = str;

function checkExist (arr, id) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
          return true;
        }
    }
    return false;
}


//PHẦN 1: Gọi ra 3 giá trị thẻ a(tên), thẻ img, thẻ strong(tiền)
let kiemtraButton = document.querySelectorAll("button")
kiemtraButton.forEach(function (button, index) {
    button.addEventListener("click", function (event) {
        let btnItem = event.target
        let product = btnItem.parentElement
        // let productId = product.dataset.id
        let productImg = product.querySelector("img").src
        let productThea = product.querySelector("a").innerText
        let productStrong = product.querySelector("strong").innerText

        addGioHang(productImg, productThea, productStrong)
    });
});

function addGioHang(productImg, productThea, productStrong) {
    //--------------PHẦN 3 GIỚI HẠN SẢN PHẨM KHI KÍCH 2 LẦN SẺ HIỂN THỊ THÔNG BÁO-----  
    let addThetr = document.createElement("tr")
    let kiemtraGioiHan = document.querySelectorAll("tbody tr");
    for (let i = 0; i < kiemtraGioiHan.length; i++) {
        let tenThea = document.querySelectorAll(".title")

        if (tenThea.length > 0) {
            if(tenThea[i].dataset.name == productThea) {
                alert("Sản phẩm đã có trong giỏ hàng, bạn vui lòng chọn số lượng!")
                return;
            }
        }

        // if (tenThea[i].innerHTML == productThea) {
        //     alert("Sản phẩm đã có trong giỏ hàng, bạn vui lòng chọn số lượng!")
        //     return;
        // }
    }
    // let addThetr = document.createElement("tr")

    // if (checkExist(products, productId)) {

    // }

    let kiemtraTbody = document.querySelector("tbody")
    kiemtraTbody.append(addThetr)
    let addAll = `
            <tr> 
                <td style="display: flex; align-items: center;  margin-left: -12px; ">
                    <img src="${productImg}" style="width: 150px;" alt="">
                    <span class="title" data-name='${productThea}'>${productThea}</span>  
                </td> 
                <td>
                    <span><strong class="strong-strong">${productStrong}</strong>$</span>
                </td>   
                <td>
                    <input type="number" oninput="myFunciton()"  style="width: 40px; outline: none;" value="1" min="1">
                </td>   
                <td style="cursor: pointer;"> 
                    <i class="far fa-trash-alt" style="font-size: 25px;"></i>
                </td>
            </tr>`
    addThetr.innerHTML = addAll

    // let kiemtraGioiHan = document.querySelectorAll("tbody tr");
    // for (let i = 0; i < kiemtraGioiHan.length; i++) {
    //     let tenThea = document.querySelectorAll(".title")
    //     if (tenThea[i].innerHTML == productThea) {
    //         alert("Sản phẩm đã có trong giỏ hàng, bạn vui lòng chọn số lượng!")
    //         return;
    //     }
    // }
    //PHẦN 2: Gọi hàm carttotol() tính tổng; tiền
    carttotol()

    //PHẦN4: GỌI HÀM deleteCart() xóa remove lại sản phẩm
    deleteCart()

}

// PHẦN2: TÍNH GIÁ TIỀN RA
function carttotol() {
    let kiemtraTboyTr = document.querySelectorAll("tbody tr");
    let totalTong = 0
    for (let i = 0; i < kiemtraTboyTr.length; i++) {
        let inPut = kiemtraTboyTr[i].querySelector("input").value
        let strong = kiemtraTboyTr[i].querySelector("strong").innerText
        let totalIpStrong = inPut * strong
        totalTong += totalIpStrong
    }
    //Bước 3: truyền giá trị tính Tổng được vào thẻ strong để nó hiện ra chính xác giá trị của nó
    //+Khởi tạo biến timStrong gán giá trị vào TotalTong, thẻ strong sẽ hiện ra theo tổng tiền
    let timStrong = document.querySelector(".price-total strong")
    timStrong.innerHTML = totalTong;

    inputchange();

}
//----------------------PHẦN 4:Sử dụng nút delete(xóa): dùng hàm remove để delete sản phẩm mình kích vào---------------
function deleteCart() {
    let DeLeTe = document.querySelectorAll("tbody tr")
    for (let i = 0; i < DeLeTe.length; i++) {
        let goibienDeLeTe = document.querySelectorAll("i")
        goibienDeLeTe[i].addEventListener("click", function (event) {
            let btnDeleTe = event.target
            let truyenduLieu = btnDeleTe.parentElement.parentElement
            // truyenduLieu.remove()

            if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?") == true) {
                truyenduLieu.remove();
            }



            //Khi xóa xong: gọi lại hàm carttotol(): Để tính lại giá trị tiền
            carttotol()

        })

    }
}
//-----------------------PHẦN 5:Sử dụng nút hàm gọi tới nút input để cho phép tăng giá trị, và gọi lại hàm carttotol(), để tính toán lại
//Truyền hàm: inputchange() lên hàm:carttotol() lại
function inputchange() {
    let Input = document.querySelectorAll("tbody tr")
    for (let i = 0; i < Input.length; i++) {
        let goibienInput = Input[i].querySelector("input");
        goibienInput.addEventListener("click", function () {
            carttotol();
        })
    }
}

// function demo1(){
//     let choice = confirm("Bạn có muốn xóa sản phẩm không?")
//     if(choice== true){
//         confirm("Đã Xóa")
//     }else{
//         confirm("Đã Hủy")
//     }

// }
//Cách chuyển tiền VNĐ.
function formatCurrency(number) {
    return number.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

}