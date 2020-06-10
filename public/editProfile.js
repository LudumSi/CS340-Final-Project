
//Returns true if clean, false otherwise
var sanitizeCheck = function(string){

  //String of illegal chars
  var badChars = "_();{}[]:"

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

var post = function(data,url){

  var postRequest = new XMLHttpRequest();
  postRequest.open('POST', url);

  var requestBody = JSON.stringify(data);

  postRequest.setRequestHeader('Content-Type', 'application/json');

  postRequest.send(requestBody);
}

window.onload = function(){
  var button = document.getElementById('sub-butt');
  button.addEventListener('click',function(event){

    //Adding weapon functionality
    var weapon_data = {};
    weapon_data.clean = true;

    weapon_data.smith_name = getInput(weapon_data,"smith_name");
    weapon_data.weapon_name = getInput(weapon_data,"weapon_name");
    weapon_data.weapon_type = getInput(weapon_data,"weapon_type");
    weapon_data.weapon_cost = getInput(weapon_data,"weapon_cost");
    weapon_data.weapon_mats = getInput(weapon_data,"weapon_mats");
    weapon_data.weapon_magic = getInput(weapon_data,"weapon_magic");

    if(weapon_data.clean){
      post(weapon_data, '/addWeapon');
    }else{
      window.alert("Please fill all weapon fields and make sure to remove any spaces, semicolons, colons, parenthesis, or brackets from your input.")
    }

  });
}
