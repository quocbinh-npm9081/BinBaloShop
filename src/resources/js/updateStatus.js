let inputOrder = document.querySelector('#hiddenInput');
let order = inputOrder ? inputOrder.value : null;
order = JSON.parse(order);
let statusOrder = document.querySelectorAll('.status-line');
const moment = require('moment');
let time = document.createElement('small');

///socket
//join
let socket = io();

if (order) {
    socket.emit('join', `order_${order._id}`); // order_f7asdgbfkf2bfd43275v5t31
}
//let adminAreaPath = window.location.pathname;
//console.log(adminAreaPath);
// if (adminAreaPath.includes('admin')) { // hàm includes để kt chuỗi admin có trong chuỗi adminAreapath hay ko( có retturn true, includes() có phân bt chữ hoa - thường)
//     socket.emit('join', 'adminRoom');
// }
//change order status


function updateStatus(order) {
    let stepCompleted = true;
    statusOrder.forEach((status) => {
        status.classList.remove('step-completed');
        status.classList.remove('current');
    });
    statusOrder.forEach((status) => {
        let dataPro = status.dataset.status;
        if (stepCompleted) {
            status.classList.add('step-completed');
        }
        if (dataPro === order.status) {
            console.log(dataPro);
            console.log(order.status);
            stepCompleted = false;
            time.innerText = moment(order.updatetedAt).format('hh:mm A');
            status.appendChild(time);
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current');
            }
        }
    });

}
updateStatus(order);

socket.on('orderUpdated', (data) => {
    const updateOrder = {...order };
    updateOrder.updateAt = moment('').format();
    updateOrder.status = data.status;
    // console.log(data);
    updateStatus(updateOrder);
})