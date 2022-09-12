function getFavs() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.thedogapi.com/v1/favourites",
        "method": "GET",
        "headers": {
          "x-api-key": "9f6ec779-f2b3-43ca-b2c0-4454ced1b7da"
        }
      }
      
      $.ajax(settings).done(function (response) {
        if (response.length == 0) {
            document.getElementById('img-flex').innerHTML = "<h3>No Favorites! Yet...</h3>"
        } else {
            getSpecific(response);
        }
    });
}

function getSpecific(allFavs) {
    var listFav = "";

    for(var i = 0; i < allFavs.length; i++){
        var k = allFavs[i].id;
        var settings = {
            "async": false,
            "crossDomain": true,
            "url": "https://api.thedogapi.com/v1/images/"+allFavs[i].image_id,
            "method": "GET",
            "headers": {
              "x-api-key": "9f6ec779-f2b3-43ca-b2c0-4454ced1b7da"
            }
          }
         
        $.ajax(settings).done(function (response) {


            if(response.breeds == undefined) {
                listFav += "<div class='favBox'><img id='" + k + "' class='favImgs' src='" + response.url + "' alt='a good boy'></img><div class='flex-title'><h3>No information given</h3><button type='button' class='delFav'>Delete</button></div></div>";
            } else {
                listFav += "<div class='favBox'><img id='" + k + "' class='favImgs' src='" + response.url + "' alt='a good boy'><div class='flex-title'><h3>" + response.breeds[0].name + "</h3><button type='button' class='delFav'>Delete</button></div><ul><li>" + response.breeds[0].temperament + "</li><li>Favorite activities/roles: " + response.breeds[0].bred_for + "</li></ul></div>";
            }
            document.getElementById('img-flex').innerHTML = listFav;
        });
    }
}

function delFav(img_id) {
    var url = "https://api.thedogapi.com/v1/favourites/" + img_id;  

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "DELETE",
        "headers": {
          "x-api-key": "9f6ec779-f2b3-43ca-b2c0-4454ced1b7da"
        }
      }
      
      $.ajax(settings).done(function (response) {
        getFavs();
      });
}

getFavs();

var id;
$(document).on( "mouseenter", '.favBox', function() {
    //find id every time mouse enters div
    var findChild = $(this).find( ".favImgs" ).attr("id");
    id = findChild;
} )

$(document).on('click', '.delFav', function () {
    //to delete
    console.log("wait for it...");
    delFav(id);
});