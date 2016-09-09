// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509

var str;
var thing =
    {
        name: "",
        quantity: 0,
        multiplier: 0,
        thresh: 0,
        threshMet: false,
        btnID: "",
       
        txtID: "",
        icnID: ""
    }
var thingz = [];
var cost = 0;

$(function () { // First things first
    $(".labeled.input").hide();
    $(".basic.button").hide();
    $(".dropdown.icon").css({ opacity: 0 });
    str = chance.word();
    $("#villageInput").attr('placeholder', $("#villageInput").attr('placeholder') + str.charAt(0).toUpperCase() + str.slice(1))
    $(".labeled.input").fadeIn(1000);
    

});

$('.ui.dropdown')
  .dropdown()
;

function checkKey(e) 
{
   

    if (e.keyCode == 13) // If 'Enter' pressed
    {
        document.getElementById("Village").innerHTML = document.getElementById("villageInput").value;
        if (document.getElementById("villageInput").value == "")
        {
            document.getElementById("Village").innerHTML = str.charAt(0).toUpperCase() + str.slice(1) + " (Hamlet)";
        }
        var elem = document.getElementById("villageInput");
        $(elem).fadeOut('slow', function () {
            $("#Village").fadeTo('slow', 1, function () {
                $(".dropdown.icon").fadeTo('fast', 1, function () {
                    thingz.push({ name: 'mud', quantity: 0, multiplier: .1, thresh: 5, threshMet: false, btnID: "#mudBtn", txtID: "#mudTxt", icnID: "#mudIcn" });
                    $(thingz[0].btnID).fadeTo('slow', 1);
                    $("li").fadeTo('slow', 1);
                });
            });
        });
       
        
    }
}

function add(thing)
{
    var thang = thingz[thing];

    if (thing == 1)
    {

        if (thingz[0].quantity >= cost)
        {
            thingz[0].quantity -= (cost);
            thang.quantity += 1;

        }
    }

    else {
        thang.quantity += 1;

    }
       
    
    if (thang.quantity >= thang.thresh && !thang.threshMet)
    {
        thang.threshMet = true;
        console.log("thresh met");
        
        switch (thing)
        {
            case 0:
                $(thang.btnID).after("<button id ='mudmanBtn' class='ui basic button' onclick='add(1)'> Make A Mudman </button>");
                thingz.push({ name: 'mudman', quantity: 0, multiplier: 1, btnID: "#mudmanBtn", txtID: "#mudmanTxt", icnID: "#mudmanIcn" }); // Add a new thing
                
                thang = thingz[thing + 1];
                $(thang.btnID).hide();
                $(thang.btnID).fadeTo('slow', 1);
                break;
        }
    }
}



setInterval(function ()
{
    if (thingz)
    {
        for (var i = 0; i < thingz.length; i++)
        {
            if (thingz[i])
            {
                switch(i)
                {
                    case 1:
                        thingz[0].quantity += (thingz[i].quantity * thingz[i].multiplier / 100);
                        break;
                }

                $(thingz[i].txtID).html(Math.floor(thingz[i].quantity)); // Update the quantity of this thing
                cost = 3 * thingz[1].quantity;
                $(thingz[1].btnID).html("Make a Mudman (" + cost + " Mud)");

            }
                
            
        }

    

    }

}, 10);




/* Settlement Hierarchy:

Empire of Ezu
City-State of Ezu
City of Ezu
Town of Ezu
Village of Ezu
Hamlet of Ezu


*/