    // display credit and forms
    var displayPageMenu;

    document.querySelector(".firstMenu1").onclick = function() { 
        document.querySelector("#infoCredit").style.display = "block"
        document.querySelector("#navigation").style.opacity = "0"
        document.querySelector("#buttons").style.opacity = "0"

        document.querySelector("#formulaire3D").style.display = "none"

        // document.querySelector(".firstMenu1").style.display = "none"
        // document.querySelector(".firstMenu2").style.display = "none"
        // document.querySelector(".firstMenu3").style.display = "none"
        // document.querySelector(".firstMenu4").style.display = "none"
        displayPageMenu = "yes";
    };

    document.querySelector(".firstMenu3").onclick = function() { 
        document.querySelector("#formulaire3D").style.display = "block"
        document.querySelector("#navigation").style.opacity = "0"
        document.querySelector("#buttons").style.opacity = "0"

        document.querySelector("#infoCredit").style.display = "none"

        // document.querySelector(".firstMenu1").style.display = "none"
        // document.querySelector(".firstMenu2").style.display = "none"
        // document.querySelector(".firstMenu3").style.display = "none"
        // document.querySelector(".firstMenu4").style.display = "none"
        displayPageMenu = "yes";
    };

    document.querySelector("#menu-toggler").onclick = function() { 
        if (displayPageMenu === "yes"){
            document.querySelector("#infoCredit").style.display = "none"
            document.querySelector("#formulaire3D").style.display = "none"
            document.querySelector("#navigation").style.opacity = "1"
            document.querySelector("#buttons").style.opacity = "1"

            document.querySelector(".firstMenu1").style.display = "block"
            document.querySelector(".firstMenu2").style.display = "block"
            document.querySelector(".firstMenu3").style.display = "block"
            document.querySelector(".firstMenu4").style.display = "block"
        }
    };