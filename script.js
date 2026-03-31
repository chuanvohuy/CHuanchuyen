console.log("RUN OK");

/* ===== 28 SẢN PHẨM ===== */
let products = [
{id:1,name:"Áo thun Big Deal",price:1500000,category:"ao",image:"./anh1.webp"},
{id:2,name:"Áo khoác Cheonliang",price:450000,category:"ao",image:"./anh2.jfif"},
{id:3,name:"Áo khoác adidas",price:400000,category:"ao",image:"./anh3.jpg"},
{id:4,name:"Áo Khoác God Dog",price:550000,category:"ao",image:"./anh4.webp"},
{id:5,name:"Áo thun Allied",price:100000,category:"ao",image:"./anh5.jpg"},
{id:6,name:"Áo hoodie ",price:200000,category:"ao",image:"./anh6.jfif"},
{id:7,name:"Áo hoodie God Dog",price:350000,category:"ao",image:"./anh7.jfif"},

{id:8,name:"Quần jean Nữ",price:350000,category:"quan",image:"./anh8.webp"},
{id:9,name:"Quần jean ống rộng",price:200000,category:"quan",image:"./anh9.webp"},
{id:10,name:"Quần short thể thao",price:250000,category:"quan",image:"./anh10.webp"},
{id:11,name:"Quần kaki",price:320000,category:"quan",image:"./anh11.webp"},
{id:12,name:"Quần jean",price:270000,category:"quan",image:"./anh12.webp"},
{id:13,name:"Quần âu",price:400000,category:"quan",image:"./anh13.webp"},
{id:14,name:"Quần short",price:220000,category:"quan",image:"./anh14.webp"},

{id:15,name:"Dép có quai",price:124000,category:"giay",image:"./anh15.webp"},
{id:16,name:"Dép Giavy",price:210000,category:"giay",image:"./anh 16.webp"},
{id:17,name:"Giày Trắng",price:600000,category:"giay",image:"./anh17.jpg"},
{id:18,name:"Dép nữ",price:550000,category:"giay",image:"./anh18.jpg"},
{id:19,name:"Giày da",price:650000,category:"giay",image:"./anh19.webp"},
{id:20,name:"Giày Cao ",price:180000,category:"giay",image:"./anh20.jpg"},
{id:21,name:"Giày không cột",price:300000,category:"giay",image:"./anh21.jpg"},

{id:22,name:"Balo",price:210000,category:"phukien",image:"./anh22.webp"},
{id:23,name:"Mũ",price:120000,category:"phukien",image:"./anh23.jpg"},
{id:24,name:"Thắt lưng",price:180000,category:"phukien",image:"./anh24.jpg"},
{id:25,name:"Kính mát",price:220000,category:"phukien",image:"./anh25.webp"},
{id:26,name:"Ví da",price:250000,category:"phukien",image:"./anh26.jpg"},
{id:27,name:"Đồng hồ điện tử",price:700000,category:"phukien",image:"./anh27.png"},
{id:28,name:"Túi đeo chéo",price:300000,category:"phukien",image:"./anh28.jpg"}
];

/* ===== BIẾN ===== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentProducts = [...products];
let currentIndex = 0;
let visibleProducts = 5;

/* ===== HIỂN THỊ SẢN PHẨM ===== */
function displayProducts(list){
    let container = document.getElementById("productList");
    if(!container) return;

    currentProducts = list;
    let html = "";

    list.forEach(p=>{
        html += `
        <div class="product">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p class="price">${p.price} đ</p>
        <button onclick="addToCart(${p.id})">Thêm vào giỏ</button>
        </div>`;
    });

    container.innerHTML = html;
    currentIndex = 0;
    updateSlider();
}

/* ===== SLIDER ===== */
function updateSlider(){
    let first = document.querySelector(".product");
    if(!first) return;

    let w = first.offsetWidth + 20;
    document.getElementById("productList").style.transform =
        `translateX(-${currentIndex * w}px)`;
}

function nextProduct(){
    currentIndex++;
    if(currentIndex > currentProducts.length - visibleProducts){
        currentIndex = 0;
    }
    updateSlider();
}

function prevProduct(){
    currentIndex--;
    if(currentIndex < 0){
        currentIndex = currentProducts.length - visibleProducts;
    }
    updateSlider();
}

/* ===== CART ===== */
function addToCart(id){
    let item = cart.find(p => p.id === id);

    if(item){
        item.qty++;
    }else{
        let p = products.find(x=>x.id===id);
        cart.push({id:p.id,name:p.name,price:p.price,qty:1});
    }
    renderCart();
}

function renderCart(){
    let html = "";
    let total = 0;

    cart.forEach(item=>{
        let itemTotal = item.price * item.qty;
        total += itemTotal;

        html += `
        <li>
        ${item.name}<br>
        <button onclick="decreaseQty(${item.id})">➖</button>
        ${item.qty}
        <button onclick="increaseQty(${item.id})">➕</button>
        = ${itemTotal} đ
        <button onclick="removeItem(${item.id})">❌</button>
        </li>`;
    });

    html += `<h3>Tổng tiền: ${total} đ</h3>`;
    document.getElementById("cart").innerHTML = html;

    localStorage.setItem("cart", JSON.stringify(cart));
}

function increaseQty(id){
    let item = cart.find(p => p.id === id);
    if(item){ item.qty++; renderCart(); }
}

function decreaseQty(id){
    let item = cart.find(p => p.id === id);
    if(item){
        item.qty--;
        if(item.qty <= 0){
            cart = cart.filter(p => p.id !== id);
        }
        renderCart();
    }
}

function removeItem(id){
    cart = cart.filter(p => p.id !== id);
    renderCart();
}

/* ===== SEARCH ===== */
let search = document.getElementById("search");
if(search){
    search.addEventListener("keyup", function(){
        let k = this.value.toLowerCase();
        let filtered = products.filter(p =>
            p.name.toLowerCase().includes(k)
        );
        displayProducts(filtered);
    });
}

/* ===== CATEGORY ===== */
function showCategory(category){
    if(category === "all"){
        displayProducts(products);
    }else{
        displayProducts(products.filter(p => p.category === category));
    }
}

/* ===== CHECKOUT ===== */
function showCheckout(){
    if(cart.length === 0){
        alert("Giỏ hàng trống!");
        return;
    }
    document.getElementById("checkoutBox").style.display = "block";
}

function confirmCheckout(){
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();
    let method = document.getElementById("paymentMethod").value;

    if(phone === "" || address === ""){
        alert("Nhập SĐT và địa chỉ!");
        return;
    }

    let total = cart.reduce((s,i)=>s+i.price*i.qty,0);

    alert(
        "Đặt hàng thành công!\n" +
        "SĐT: "+phone+"\n" +
        "Địa chỉ: "+address+"\n" +
        "PTTT: "+(method==="cod"?"COD":"Chuyển khoản")+"\n" +
        "Tổng: "+total+" đ"
    );

    cart = [];
    localStorage.removeItem("cart");
    renderCart();
    document.getElementById("checkoutBox").style.display = "none";
}

/* ===== USER ===== */
let users = JSON.parse(localStorage.getItem("users")) || [];

function hashPassword(p){ return btoa(p); }

if(!users.find(u=>u.username==="admin")){
    users.push({username:"admin",password:hashPassword("123456")});
    localStorage.setItem("users", JSON.stringify(users));
}

function register(){
    let u = document.getElementById("regUser").value.trim();
    let p = document.getElementById("regPass").value.trim();

    if(u === "" || p === ""){
        alert("Nhập đầy đủ!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if(users.find(x => x.username === u)){
        alert("Tên đã tồn tại!");
        return;
    }

    users.push({
        username: u,
        password: btoa(p)
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");

    // ✅ XÓA INPUT SAU KHI ĐK
    document.getElementById("regUser").value = "";
    document.getElementById("regPass").value = "";
}

function login(){
    let u = document.getElementById("loginUser").value.trim();
    let p = btoa(document.getElementById("loginPass").value.trim());

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(x => x.username === u && x.password === p);

    if(user){
        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Đăng nhập thành công!");

        // XÓA INPUT
        document.getElementById("loginUser").value = "";
        document.getElementById("loginPass").value = "";

        // CHUYỂN TRANG
        location.href = "index.html";
    }else{
        alert("Sai tài khoản hoặc mật khẩu!");
    }
}

function logout(){
    localStorage.removeItem("currentUser");
    location.reload();
}

function goToLogin(){
    location.href="login.html";
}

function updateAuthUI(){
    let user = JSON.parse(localStorage.getItem("currentUser"));
    let welcome = document.getElementById("welcome");
    let loginBtn = document.getElementById("loginBtn");
    let logoutBtn = document.getElementById("logoutBtn");

    if(!welcome) return;

    if(user){
        welcome.innerText="Xin chào "+user.username;
        loginBtn.style.display="none";
        logoutBtn.style.display="inline-block";
    }else{
        welcome.innerText="";
        loginBtn.style.display="inline-block";
        logoutBtn.style.display="none";
    }
}

/* ===== LOAD ===== */
if(document.getElementById("productList")){
    displayProducts(products);
    renderCart();
    setInterval(nextProduct,3000);
}

updateAuthUI();