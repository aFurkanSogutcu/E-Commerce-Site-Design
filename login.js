const firebaseConfig = {
    apiKey: "AIzaSyCOBL1cIRsB8nVyd95ViAMdt8hx58iKv9A",
    authDomain: "iot-deneme3.firebaseapp.com",
    projectId: "iot-deneme3",
    storageBucket: "iot-deneme3.appspot.com",
    messagingSenderId: "177571169203",
    appId: "1:177571169203:web:e55df40a1fa814672c81c6",
    measurementId: "G-14R7RMY492"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const database = firebase.database();

function register() {
    alert("çalışıyorum")

    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    nameSurname = document.getElementById('nameSurname').value;

    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is outta line');
        return;
    }
    if (validate_field(nameSurname) == false) {
        alert('Extra fields is outta line');
        return;
    }

    auth.createUserWithEmailAndPassword(email, password).then(function(){
        var user = auth.currentUser

        var database_ref = database.ref()

        var user_data = {
            nameSurname : nameSurname,
            email : email,
            last_login : Date.now()
        }

        database_ref.child('users/' + user.uid).set(user_data)

    }).catch(function(error) {
        var error_code = error.code;
        var error_message = error.message;

        alert(error_message);
    });
}

/*
function validate(){
    
    if (username == "admin" && password == "user") {
        alert("login succesfully");
    } else {
        alert("login failed");
    }

}
*/ 
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if  (expression.test(email) == true) {
        return true;
    }  else {
        return false;
    }

}

function validate_password(password) {
    if(password < 6) {
        return false;
    } else {
        return true;
    }
}

function validate_field(field) {
    if(field < null) {
        return false ;
    } 
    
    if(field.length <= 0) {
        return false;
    } else {
        return true;
    }

}

