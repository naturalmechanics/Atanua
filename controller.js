function showCamCon()
{
        prv = document.getElementById("imprvw");
        prv.innerHTML = "<h4>Preview : </h4><br/><img src=\"about:blank\" alt=\"\" id=\"imgprv\">";
        
        // device orientation
        if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", deviceOrientationListener);
            
        }
        else {
             //use made up data   
        }
        var trgt = document.getElementById("rendertrgt");
        
        trgt.innerHTML=" \
        <form name=\"files\" id=\"files\">\
            <label> Device Orientation </label><br/>\
            <label>North Heading: </label>\
            <input id=\"NorthHeading\" type=\"range\" min=\"0\" max=\"360\" value=\"90\"><br/>\
            <label>Dip (Backward Forward tilt): </label>\
            <input id=\"Dip\" type=\"range\" min=\"-180\" max=\"180\" value=\"0\"><br/>\
            <label>Banking (Left-Right tilt): </label>\
            <input id=\"Banking\" type=\"range\" min=\"-180\" max=\"180\" value=\"0\"><br/><br/><br/>\
            <label> Device Location </label><br/>\
            <label>Latitude: </label>\
            <input id=\"Latitude\" type=\"text\" name=\"Latitude\"><br/>\
            <label>Longitude: </label>\
            <input id=\"Longitude\" type=\"text\" name=\"Longitude\"><br/><br/><br/>\
            <input type=\"file\" id=\"shutter\" accept=\"image/*\" ><br/><br/><br/>\
            </form>\
            ";
        
        
        navigator.geolocation.getCurrentPosition(showPosition);
        
        var takePicture = document.querySelector("#shutter"),
            showPicture = document.querySelector("#imgprv");
        takePicture.onchange = function (event) {
            // Get a reference to the taken picture or chosen file
            var files = event.target.files,
                file;
            if (files && files.length > 0) {
                file = files[0];
                try {
                    // Get window.URL object
                    var URL = window.URL || window.webkitURL;
 
                    // Create ObjectURL
                    var imgURL = URL.createObjectURL(file);
 
                    // Set img src to ObjectURL
                    showPicture.src = imgURL;
 
                    // Revoke ObjectURL
                    URL.revokeObjectURL(imgURL);
                }
                catch (e) {
                    try {
                        // Fallback if createObjectURL is not supported
                        var fileReader = new FileReader();
                        fileReader.onload = function (event) {
                            showPicture.src = event.target.result;
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
                        //
                        var error = document.querySelector("#error");
                        if (error) {
                            error.innerHTML = "Neither createObjectURL or FileReader are supported";
                        }
                    }
                }
            }
        };
        
        
}

function showPosition(position)
{
   
    var latitude  = position.coords.latitude;
    var lt = document.getElementById("Latitude");
    lt.value=latitude;
    var longitude = position.coords.longitude;
    var ln = document.getElementById("Longitude");
    ln.value=longitude;
}


function deviceOrientationListener(event)
{
        //alert("ori");
    alpha=event.alpha;
    beta=event.beta;
    gamma=event.gamma;
    //alert(alpha);
    var a = document.getElementById("NorthHeading");
    a.value=alpha;
    
    var b = document.getElementById("Dip");
    b.value=beta;
    
    var g = document.getElementById("Banking");
    g.value=gamma;
}

function changeVal()
{
        var a = document.getElementById("NorthHeading");
        a.value=200;
}


function showHelp()
{
        var trgt = document.getElementById("rendertrgt");
        
        trgt.innerHTML=" \
        As much as we appreciate your interest to help us with the project,\
        we would like to make sure that your contribution is truly usable. \
        In order to do so. please follow the instructions carefully.       \
        The biggest issue to keep in mind is - you got it - device calibration. \
        One would like to understand the actual hardware calibration procedures,\
        built-in to your camera, but the manufacturers want to keep it secret. \
        If you wonder why it is necessary to calibrate your device, please look at \
        <a href = \"http://en.wikipedia.org/wiki/The_dress_%28viral_phenomenon%29\"> this</a>.\
        <br><br> \
        You will need a <a href=\"http://en.wikipedia.org/wiki/Cyanometer\">Cyanometer</a> \
        , or a <a href=\"http://en.wikipedia.org/wiki/ColorChecker\">Colorchecker</a>.\
        Place the said object in your phone's field of view, and then take the picture. \
        <br/><br/>\
        Please now click on \"Take Picture\" Button. \
        ";
}


function upload()
{
    alert ('Upload Completed ... Suffices for this demo');
}

