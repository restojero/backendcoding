
function navigateregister() { 
    window.location.href = "http://localhost/webprogs/registration.php";
}

function onregister() { 
   var registerObj = { 
       'data1' : firstname.value,
       'data2' : lastname.value,
       'data3' : address.value,
       'data4' : username.value,
       'data5' : password.value,
       'data6' : confirmpass.value,
       'data7' : male.value,
       'data8' : female.value,
       'trigger' : true
   }
   validate(registerObj);
}

function validate(registerObj) {
        if(registerObj.data5 != registerObj.data6) { 
            alert("Password mismatch");
            return false;
        }
        else { 
            promiseAll(registerObj)
        }
}

async function promiseAll(registerObj) {
     await Promise.all([__construct(registerObj)]);
}

async function __construct(registerObj) { 
    const promise = new Promise(resolve => {
        registerRequest(registerObj, resolve);
    })
    await promise.then(response => {

        var hammer = JSON.parse(response);
        if (hammer.statusCode === 200) {
            alert('Successfully Registered!');
            onreset();
        }
    })
}

function registerRequest(registerObj, resolve) {
    $.post(app + helper + "/postHelper.php", registerObj, (response) => { 
           resolve(response);
    })
}

function malechange() {
    female.value = null;
    male.value ="Male";
}

function femalechange() {
    male.value = null;
    female.value ="Female";
}

function onreset() {
    firstname.value = null;
    lastname.value = null;
    address.value = null;
    username.value = null;
    password.value = null;
    confirmpass.value = null;
}

function navigatesignin() {
    window.location.href = 'http://localhost/webprogs/signin.php'
}

function onsignin() {
    var signinobj = {
        'signin1' : signinusername.value,
        'signin2' : signinpassword.value,
        'signinonstate' : true
    }
    validatesigin(signinobj)
}
function validatesigin(signobj) {
    if(!signobj.signin1 || !signobj.signin2) {
        alert('Empty fields');
        return false;
    } else {
        commitPromise(signobj);
    }

}

async function commitPromise(signinobj) {
    await Promise.all([pushPromise(signinobj)]); //call multiple functions
}

async function pushPromise(signinobj) {
    const promise = new Promise((resolve) => {
        signinrequest(signinobj, resolve);
    })
   await promise.then((response) => {
       var jsondestroy = JSON.parse(response);
       console.log(jsondestroy);
       if(jsondestroy.statusCode === 200) {
           alert('Successfully Sign in');
           window.location.href = "http://localhost/webprogs/welcome.php";
       }
       else if(jsondestroy.statusCode === 201) {
           alert('Invalid password');
           return false;
       } else if (jsondestroy.statusCode === 202) {
           alert('Username not found');
           return false;
       }
   })
}

function signinrequest(signinobj, resolve) {
    $.post(app + helper + '/postHelper.php', signinobj, function(response) {
        resolve(response);
    })
}


$('#onlogout').click(() => {
    var ask = confirm('Are you sure you want to logout?');
    if (ask === true) {
        $.post('logout.php',
            logstate={
                logtrigger: true
            }, (response) => {
                var jsondestroy = JSON.parse(response);
            if(jsondestroy.statusCode === 'logout') {
                window.location.href = "http://localhost/webprogs/signin.php";
            }
            })
    } else{
        alert('Cancel');
    }
})


$('#oninsert').click(() => {
    if (modifier === true) {
        finalupdate();
    }
    else {
        insertrequest();
    }
})

function finalupdate() {
    $.post(app + helper + '/postHelper.php',
        dataonupdate = {
            id: updateID,
            data1: document.getElementById('txtdata1').value,
            finalupdateTrigger: true
        }, function (response) {
            var jsondestroy = JSON.parse(response);
            if (jsondestroy.statusCode === 200) {
                alert('Successfully updated!');
                window.location.href = "http://localhost/webprogs/welcome.php";
            }
        })
}

function insertrequest() {
    $.post(app + helper + '/postHelper.php',
        insertstate={
            data1 : document.getElementById('txtdata1').value,
            insertTrigger : true
        }, function (response) {
            var jsondestroy = JSON.parse(response);
            if (jsondestroy.statusCode === 200) {
                alert('Successfully added!');
                window.location.href = "http://localhost/webprogs/welcome.php";
            }
        })
}


function ondelete(id) {
    var ask = confirm('Are you sure you want to delete this data?');
    if (ask === true) {
        //
        ondeletion(id);
    } else {
        alert('Cancel deletion');
    }
}

async function ondeletion(id) {
    await $.post(app + helper + '/postHelper.php',
        deleteonstate = {
            id: id,
            deletionTrigger: true
        }, (response) => {
            var jsondestroy = JSON.parse(response);
            if (jsondestroy.statusCode === 200) {
                alert('Successfully deleted!');
                window.location.href = "http://localhost/webprogs/welcome.php";
            }
        })
}

function onedit(id) {
    $.post(app + helper + '/postHelper.php',
        updateselectionstate = {
            id: id,
            upselect : true
        }, function (response) {
            console.log(response);
            var jsondestroy = JSON.parse(response);
            modifier = true;
            updateID = id;
            if (modifier === true) {
                document.getElementById('txtdata1').value = jsondestroy.data1;
                resetbtn.style.display = 'block';
                insertbtn.innerHTML = 'Update';
            }
    })
}

$('#onreset').click(() => {
    modifier = false;
    updateID = 0;
    document.getElementById('txtdata1').value = null;
    resetbtn.style.display = 'none';
    insertbtn.innerHTML = 'Insert';
})