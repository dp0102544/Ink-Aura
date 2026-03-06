// Parse configuration
Parse.initialize("YOUR_APP_ID","YOUR_JS_KEY");
Parse.serverURL = "https://parseapi.back4app.com/";

// SIGNUP FUNCTION
async function signUpUser(username,password){

const user = new Parse.User();

user.set("username",username);
user.set("password",password);

try{

await user.signUp();

alert("Signup Successful");

window.location.href="login.html";

}catch(error){

alert("Signup Error: "+error.message);

}

}

// LOGIN FUNCTION
async function loginUser(username,password){

try{

const user = await Parse.User.logIn(username,password);

alert("Login Successful");

window.location.href="index.html";

}catch(error){

alert("Login Error: "+error.message);

}

}
