
const pageTitle = document.querySelector('#page-title');
const hamburgerBtn = document.querySelector('#hamburger-btn');
const sidebar = document.querySelector('#sidebar');
const numberCards = document.querySelectorAll('.text-3xl');

const totalsales= document.getElementById('total-sales');
const products = document.getElementById('total-products');
const salescount = document.getElementById('total-sales-count');

function checkTime() {
    let currentHour = new Date().getHours();

    if (currentHour < 12) {
        pageTitle.textContent = "Good Morning! (สวัสดีตอนเช้า)";
        pageTitle.style.color = "orange"; // เปลี่ยนสีเป็นส้ม
    } else {
        pageTitle.textContent = "Good Afternoon! (สวัสดีตอนบ่าย)";
        pageTitle.style.color = "blue";   // เปลี่ยนสีเป็นน้ำเงิน
    }
}

function toggleMenu() {
    sidebar.classList.toggle('-translate-x-full');
}

function updateData() {
    let randomNumber1 = Math.floor(Math.random() * 1000);
    let randomNumber2 = Math.floor(Math.random() * 500);

    numberCards[0].textContent = "฿" + randomNumber1;
    numberCards[1].textContent = randomNumber2 + " คน";

    alert("อัปเดตข้อมูลเรียบร้อย!");
}

async function fetchDashboardData() {
    try {
        const response = await fetch('http://localhost:3000/api/dashboard-summary');
        const data = await response.json();
        
        const formattedRevenue = data.totalRevenue.toLocaleString('th-TH', {
            style: 'currency',
            currency: 'THB'
        });

        totalsales.textContent = formattedRevenue;
        products.textContent = data.totalProducts + " รายการ";
        salescount.textContent = data.totalSalesCount.toLocaleString() + " ชิ้น";
    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
        totalsales.textContent = "Error";
    }
}

checkTime();

hamburgerBtn.addEventListener('click', toggleMenu);

pageTitle.addEventListener('click', updateData);

fetchDashboardData();