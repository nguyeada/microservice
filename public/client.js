
document.getElementById('play').addEventListener('click', () => {
    event.preventDefault();
    console.log('clickbutton')
    let food = document.getElementById('food');
    let location = document.getElementById('location');
    console.log(food.value);
    let data = {
      food: food.value,
      location: location.value
    }
     console.log(data);
  
    // new HttpRequest instance 
    var xmlhttp = new XMLHttpRequest();   
    xmlhttp.open("POST", '/restaurants');
    // important to set this for body-parser
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // setup callback function
    xmlhttp.onloadend = function(e) {
      console.log(xmlhttp.responseText);
      let data = JSON.parse(xmlhttp.responseText);
      console.log("This is data 1 "+data[0].name);
      for(var x = 0; x < 16; x++){
        document.getElementById("rt"+x).innerHTML = data[x].name;
      }
      
    }
    // all set up!  Send off the HTTP request
    xmlhttp.send(JSON.stringify(data));
  });
  