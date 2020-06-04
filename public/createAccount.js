
//Returns true if clean, false otherwise
var sanitizeCheck = function(string){

  //String of illegal chars
  var badChars = " _();{}[]:"

  //Check for spaces
  for(var i = 0;i < string.length;i++){
    for(var j = 0;j < badChars.length;j++){
      if(string[i] == badChars[j]){
        return false;
      }
    }
  }

  //It passes. Yay.
  return true;
}

//Gets input based on id, and ensures the input is clean
var getInput = function(object,inputID){

  tmp = document.getElementById(inputID).value.trim();

  if(!tmp){
    object.clean = false;
    return null;
  }

  if(sanitizeCheck(tmp)){
    return tmp;
  }else{
    object.clean = false;
    return null;
  }
}

var addUser = function(data){

  console.log("AddUser called");

  var postRequest = new XMLHttpRequest();
  var requestURL = '/addUser';
  postRequest.open('POST', requestURL);

  var requestBody = JSON.stringify(data);

  postRequest.setRequestHeader('Content-Type', 'application/json');

  postRequest.send(requestBody);
}

//The thing which actually makes this all work
window.onload = function(){
  var button = document.getElementById('sub-butt');
  button.addEventListener('click',function(event){

    var data = {};
    data.clean = true;

    data.username = getInput(data,"username");
    data.password = getInput(data,"password");
    data.fname = getInput(data,"fname");
    data.lname = getInput(data,"lname");
    data.dob = getInput(data,"dob");
    data.experience = getInput(data,"experience");
    data.village = getInput(data,"village");
    data.kingdom = getInput(data,"kingdom");
    data.special = getInput(data,"special");

    if(data.clean){
      addUser(data);
    }else{
      window.alert("Please fill all fields and make sure to remove any spaces, semicolons, colons, parenthesis, or brackets from your input.")
    }

  });
}
