$(document).ready(function () {
    addCarPage();
   // getCarList();
});

var Car = {
    manufacturer,
    model,
    transmission,
    regNumber,
    type,
    numberOfOwners,
    year,
    color,
    kilometers,
    price,
    horsePowers,
    city,
    imageUrl
};

function getCarList() {
    $.ajax({
        url: 'api/Cars/GetCars',
        method: 'GET',
        dataType: 'JSON',
        success: function (cars) {

            $("#backButton").remove();
            carListSucces(cars);
        },

        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

function carListSucces(car) {
    $("#carTable tbody").remove();
    $.each(car, function (index, car) {
        carAddRow(car);
    });
}


function carAddRow(car) {
    
    if ($("#carTable tbody").length === 0) {
        $("#carTable").append("<tbody></tbody>");
    }

    $("#carTable tbody").append(
        carBuildTableRow(car));
}

function carBuildTableRow(car) {
    var newRow = "<tr>" +
        "<td><a href='" + car.imageUrl + "'><img class='image' src='" + car.imageUrl + "'/></a></td> " +
        "<td><input class='input-manufacturer' type='text' value='" + car.manufacturer + "'/></td>" +
        "<td><input class='input-model' type='text' value='" + car.model + "' /></td>" +
        "<td><input class='input-year type='text' value='" + car.year + "' /></td>" +
        "<td><input class='input-price type='text' value='" + car.price + "' /></td>" +
        "<td><input class='input-city' type='text' value='" + car.city + "' /></td>" +
        "<td>" +       
        " <button type='button' " +
        "onClick='getCarInfo(this);'" +
        "class='btn btn-default' " +
        "data-id='" + car.id + "'>" +
        "<span class='glyphicon glyphicon-info' />Info" +
        "</button>" +       
        "</td>" +
        "</tr>";

    return newRow;
}

function addCarPage() {

    $("#carTable tbody").append(
        addCarBuildPage());
}

function addCarBuildPage(car) {
    var addCarRow =
        "<tr>" +
        "<td>Image</td>" +
        "<td>Manufacturer</td>" +
        "<td>Model</td>" +
        "<td>Transmission</td>" +
        "<td>Registration Number</td>" +
        "<td>Type</td>" +
        "<td>Number of Owners</td>" +
        "<td>Color</td>" +
        "<td>Year</td>" +
        "<td>Kilometers</td>" +
        "<td>Price</td>" +
        "<td>Horse Powers</td>" +
        "<td>City</td>" +
        "</tr>" +  
        "<tr>" +
        "<td><input class='imageUrl' type='text' value='" + "'/></td>" +        
        "<td><input class='manufacturer' type='text' value='" + "'/></td>" +
        "<td><input class='model' type='text' value='" + "' /></td>" +
        "<td><input class='transmission' type='text' value='" + "' /></td>" +
        "<td><input class='regNumber' type='text' value='" + "' /></td>" +
        "<td><input class='type' type='text' value='" + "' /></td>" +
        "<td><input class='numberOfOwners' type='text' value='" + "' /></td>" +
        "<td><input class='color' type='text' value='" + "' /></td>" +
        "<td><input class='year' type='text' value='" + "' /></td>" +
        "<td><input class='kilometers' type='text' value='" + "' /></td>" +
        "<td><input class='price' type='text' value='" + "' /></td>" +
        "<td><input class='horsePowers' type='text' value='" + "' /></td>" +
        "<td><input class='city' type='text' value='" + "' /></td>" +
        "<td>" +
        "<button type='button' " +
        "onClick='AddCar(this);'" +
        "class='btn btn-default' >" +
        "<span class='glyphicon glyphicon-info' />Add" +
        "</button>" +
        "</td>" +
        "</tr>";
    return addCarRow;
}

function AddCar(item) {
    var options = {};
    options.url = "/api/cars/AddCar";
    options.type = "POST";

    var obj = Car;
    obj.imageUrl = $(".imageUrl").val();
    obj.manufacturer = $(".manufacturer").val();
    obj.model = $(".model").val();
    obj.transmission = $(".transmission").val();
    obj.regNumber = $(".regNumber").val();
    obj.type = $(".type").val();
    obj.numberOfOwners = $(".numberOfOwners").val();
    obj.year = $(".year").val();
    obj.color = $(".color").val();
    obj.kilometers = $(".kilometers").val();
    obj.price = $(".price").val();
    obj.horsePowers = $(".horsePowers").val();
    obj.city = $(".city").val();
    console.dir(obj);
    options.data = JSON.stringify(obj);
    options.contentType = "application/json";
    options.dataType = "html";

    options.success = function (msg) {
        getCarList();
    },
        options.error = function () {
            $("#msg").html("Error while calling the web API!");
        };
    $.ajax(options);

}

function carUpdate(item) {
    var id = $(item).data("id");
    var options = {};
    options.url = "api/cars/editcar/";
    options.type = "PUT";

    var obj = Car;
    obj.id = $(item).data("id");
    obj.imageUrl = $(".input-imageUrl", $(item).parent().parent()).val();
    obj.manufacturer = $(".input-manufacturer", $(item).parent().parent()).val();
    obj.model = $(".input-model", $(item).parent().parent()).val();
    obj.transmission = $(".input-transmission", $(item).parent().parent()).val();
    obj.regNumber = $(".input-regNumber", $(item).parent().parent()).val();
    obj.type = $(".input-type", $(item).parent().parent()).val();
    obj.numberOfOwners = $(".input-numberOfOwners", $(item).parent().parent()).val();
    obj.year = $(".input-year", $(item).parent().parent()).val();
    obj.color = $(".input-color", $(item).parent().parent()).val();
    obj.kilometers = $(".input-kilometers", $(item).parent().parent()).val();
    obj.price = $(".input-price", $(item).parent().parent()).val();
    obj.horsePowers = $(".input-horsePowers", $(item).parent().parent()).val();
    obj.city = $(".input-city", $(item).parent().parent()).val();
    

    console.dir(obj);
    options.data = JSON.stringify(obj);
    options.contentType = "application/json";
    options.dataType = "html";

    options.success = function (msg) {
        console.log('msg=' + msg);
        $("#msg").html(msg);
        getCarList();
    },
        options.error = function () {
            $("#msg").html("Error while calling the web API!");
        };
    $.ajax(options);
}
function carDelete(item) {
    var id = $(item).data("id");
    var options = {};
    options.url = "api/cars/DeleteCar/"
        + id;
    options.type = "DELETE";
    options.dataType = "html";

    options.success = function (msg) {
        console.log('msg=' + msg);
        $("#msg").html(msg);
        getCarList();
    };
    options.error = function () {
        $("#msg").html("error while calling the web api!");
    };
    $.ajax(options);
}

function handleException(request, message, error) {
    var msg = "";
    msg += "Code:" + request.status + "\n";
    msg += "Text" + request.statusText + "\n";
    if (request.responseJson != null) {
        msg += "Message:" + request.responseJson.Message + "\n";

    }
    alert(msg);
}

function carAddRow(car) {
    if ($("#carTable tbody").length === 0) {
        $("#carTable").append("<tbody></tbody>");
    }

    $("#carTable tbody").append(
        carBuildTableRow(car));
}
function getCarInfo(item) {
    var id = $(item).data("id");
    var options = {};
    options.url = "api/cars/GetCar/"
        + id;
    options.type = "GET";
    options.dataType = "JSON";

    options.success = function (data) {
        carInfoSucces(data);
    },
        options.error = function (request, message, error) {
            handleException(request, message, error);

        };
    $.ajax(options);
}

function carInfoSucces(item) {

    $("#carTable tbody").remove();
    $("#carTable").append("<tbody></tbody>");
    $("#carTable tbody").append(
        addCarInfo(item));   
}

function addCarInfo(item) {

    $("body").append("<button type='button' id='backButton' onClick='getCarList()'>Back</button>");

    var carInfo = "<tr>" +
        "<td>" + item.id + "</td>" +
        "<td><input class='input-imageUrl' type='text' value='" + item.imageUrl + "'/></td>" +
        "<td><input class='input-manufacturer' type='text' value='" + item.manufacturer + "'/></td>" +
        "<td><input class='input-model' type='text' value='" + item.model + "' /></td>" +
        "<td><input class='input-transmission' type='text' value='" + item.transmission + "' /></td>" +
        "<td><input class='input-regNumber type='text' value='" + item.regNumber + "' /></td>" +
        "<td><input class='input-type type='text' value='" + item.type + "' /></td>" +
        "<td><input class='input-numberOfOwners type='text' value='" + item.numberOfOwners + "' /></td>" +
        "<td><input class='input-color type='text' value='" + item.color + "' /></td>" +
        "<td><input class='input-year type='text' value='" + item.year + "' /></td>" +
        "<td><input class='input-kilometers type='text' value='" + item.kilometers + "' /></td>" +
        "<td><input class='input-price type='text' value='" + item.price + "' /></td>" +
        "<td><input class='input-horsePowers type='text' value='" + item.horsePowers + "' /></td>" +
        "<td><input class='input-city' type='text' value='" + item.city + "' /></td>" +
        "<td>" +
        "<button type='button' " +
        "onClick='carUpdate(this);' " +
        "class='btn btn-default' " +
        "data-id='" + item.id + "' " +
        "data-imageUrl='" + item.imageUrl + "' " +
        "data-manufacturer='" + item.manufacturer + "' " +
        "data-model='" + item.model + "' " +
        "data-transmission='" + item.transmission + "' " +
        "data-regNumber='" + item.regNumber + "' " +
        "data-type='" + item.type + "' " +
        "data-numberOfOwners='" + item.numberOfOwners + "' " +
        "data-year='" + item.year + "' " +
        "data-color='" + item.color + "' " +
        "data-kilometers='" + item.kilometers + "' " +
        "data-price='" + item.price + "' " +
        "data-horsePowers='" + item.horsePowers + "' " +
        "data-city='" + item.city + "' " +
        ">" +
        "<span class='glyphicon glyphicon-edit' /> Edit" +
        "</button> " +
        " <button type='button' " +
        "onClick='carDelete(this);'" +
        "class='btn btn-default' " +
        "data-id='" + item.id + "'>" +
        "<span class='glyphicon glyphicon-remove' />Delete" +
        "</button>" +
        " <button type='button' " +
        "onClick='getCarInfo(this);'" +
        "class='btn btn-default' " +
        "data-id='" + item.id + "'>" +
        "<span class='glyphicon glyphicon-info' />Info" +
        "</button>" +
        "</td>" +
        "</tr>" ;

    return carInfo;
}

function getEmails() {
    $.ajax({
        url: 'api/cars/getemails',
        method: 'GET',
        dataType: 'json',
        success: function (result) {
            console.log(result[0].email);
            buildEmailList(result);
        },
    });
}

function buildEmailList(result) {

    var html = "";

    for (var i = 0; i < result.length; i++) {
        html += "<option>" + result[i].email + "</option>";
    }

    $("#emails").append(html);

}

$("#getUsers").click(function () {
    $.ajax({
        url: 'api/cars/getusers',
        method: 'GET',
        success: function () {
            console.log(result);
        },

        error: function (request, message, error) {
            console.log(request, message, error);
        }
    });
});