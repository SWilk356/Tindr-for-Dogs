//aid from these official thedogapi resources:
// https://www.thedogapi.com/thanks
// https://docs.thedogapi.com/

var currImg;
var arrseenpics = [];

function getRandom() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.thedogapi.com/v1/images/search",
        "method": "GET",
        "headers": {
          "x-api-key": "{$9f6ec779-f2b3-43ca-b2c0-4454ced1b7da$.env.x-api-key}"
        }
    }
      
    $.ajax(settings).done(function (response) {
        document.getElementById('newpic').src = response[0].url;
        if(arrseenpics.includes(response[0].id)){
            console.log("seen already");
            getRandom();
        } else {
            if (response[0].breeds.length == 0) {
                document.getElementById('dogName').innerHTML = "No information provided";
                document.getElementById('doginfo').innerHTML = '';
            } else {
                document.getElementById('dogName').innerHTML = response[0].breeds[0].name;
                document.getElementById('doginfo').innerHTML = "<li>" + response[0].breeds[0].temperament+ "</li><li>Favorite activities/roles: " + response[0].breeds[0].bred_for + "</li>";
            }
            arrseenpics.push(response[0].id);
        }

        storeCurrImg(response[0].id);
    });
}

function storeCurrImg(img_id) {
    currImg = img_id;
}

var index;
function writeBreed(){
    document.getElementById('newpic').src = arrBreed.url;
    if (response[0].breeds.length == 0) {
        document.getElementById('dogName').innerHTML = "No information provided";
        document.getElementById('doginfo').innerHTML = '';
    } else {
        document.getElementById('dogName').innerHTML = response[0].breeds[0].name;
        document.getElementById('doginfo').innerHTML = "<li>" + response[0].breeds[0].temperament+ "</li><li>Favorite activites/roles: " + response[0].breeds[0].bred_for + "</li>";
    }
}

function savefav() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.thedogapi.com/v1/favourites",
        "type": "POST",
        "headers": {
          "content-type": "application/json",
          "x-api-key": "9f6ec779-f2b3-43ca-b2c0-4454ced1b7da"
        },
        "processData": false,
        "data": "{\"image_id\":\""+currImg+"\",\"sub_id\":\"5678\"}"
      }
      
      $.ajax(settings).done(function (response) {
        getRandom();
      });
}

getRandom();
 
$(document).on('click', '#left', function() {
    getRandom();
});

$(document).on('click', '#right', function() {
    savefav();
});