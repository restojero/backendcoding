var firstname = document.getElementById("txtfirstname");
var lastname = document.getElementById("txtlastname");
var address = document.getElementById("txtaddress");
var username = document.getElementById("txtusername");
var password = document.getElementById("txtpassword");
var confirmpass = document.getElementById("txtconfirm");

var male = document.getElementById("radiomale");
var female = document.getElementById("radiofemale");

var signinusername = document.getElementById('signinusername');
var signinpassword = document.getElementById('signinpassword');


const app = "app/";
const helper = "helpers";

let modifier = false;
let updateID = 0;
var resetbtn = document.getElementById('onreset');
var insertbtn = document.getElementById('oninsert');

signinusername.addEventListener('keyup', event => {
    if(event.keyCode === 13) {
        $('#onsignin').click();
    }
})

signinpassword.addEventListener('keyup', event => {
    if(event.keyCode === 13) {
        $('#onsignin').click();
    }
})

//
// firstname.addEventListener("keyup", event => {
//     if(event.keyCode === 13) {
//         onregister();
//     }
// })
// lastname.addEventListener("keyup", event => {
//     if(event.keyCode === 13) {
//         onregister();
//     }
// })
// address.addEventListener("keyup", event => {
//     if(event.keyCode === 13) {
//         onregister();
//     }
// })
// username.addEventListener("keyup", event => {
//     if(event.keyCode === 13) {
//         onregister();
//     }
// })
// password.addEventListener("keyup", event => {
//     if(event.keyCode === 13) {
//         onregister();
//     }
// })
// confirmpass.addEventListener("keyup", event => {
//     if(event.keyCode === 13) {
//         onregister();
//     }
// })