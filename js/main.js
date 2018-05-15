var bodyPartList = "#Head, #Chest, #Abdomen, #Pelvis, #Right_Upper_Arm, #Right_Lower_Arm, #Right_Hand, #Left_Upper_Arm, #Left_Lower_Arm, #Left_Hand, #Right_Upper_Leg, #Right_Lower_Leg, #Right_Foot, #Left_Upper_Leg, #Left_Lower_Leg, #Left_Foot";
var colorList = ["red", "green", "blue"];
var colorHex = {
	"red": "#e46767",
	"green": "#67e46a",
	"blue": "#67a8e4"
}
var patientInfo = {
	"name": "John Doe",
	"gender": "Male",
	"age": "32",
	"location": "Room 14",
	"reason": "Abdominal  pain, difficulty breathing, nausea, fever. Could be caused by kidney stone"
}
var bodyPartIntroInSpeed = "200";
var bodyPartPosArray = [];
var curTier = 1;


/* -------------------- GENERAL ------------------- */
/* ----------------------------------------------- */
$(function() {
    FastClick.attach(document.body);
});

function isMobileDevice() {
	return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function brighten(color, percent) {
    var r=parseInt(color.substr(1,2),16);
    var g=parseInt(color.substr(3,2),16);
    var b=parseInt(color.substr(5,2),16);
    
    return '#'+
       Math.min(255,Math.floor(r*percent)).toString(16)+
       Math.min(255,Math.floor(g*percent)).toString(16)+
       Math.min(255,Math.floor(b*percent)).toString(16);
}

/* -------------------- POPULATE DATA --------------------- */
/* ------------------------------------------------------- */
function positionArray() {
    $("g").each(function() {
        var posX = $(this).position().left;
        var posY = $(this).position().top;
		var thisCenterX = ($(this)[0].getBoundingClientRect().width / 2);
        var thisCenterY = ($(this)[0].getBoundingClientRect().height / 2);
		$(this).data("posX", posX);
        $(this).data("posY", posY);
		$(this).data("centerX", thisCenterX);
        $(this).data("centerY", thisCenterY);
    });
}

function colorArray() {
	$("g").each(function() {
		var thisColor = "blue";
		$(this).data("thiscolor", thisColor);	
	});	
}

/* -------------------- CONTENT GENERATORS ------------------- */
/* ---------------------------------------------------------- */
// .right-panel generator
function makeRightPanel(tier, title, color) {
	if($("#" + title).data("thistext") != undefined) {
		var thisText = $("#" + title).data("thistext");
	} else {
		var thisText = "";
	}	
    var rightPanelHTML = "<div id='right-panel-" + tier + "' class='right-panel'>";
    rightPanelHTML = rightPanelHTML + "<div id='right-panel-top-" + tier + "' class='right-panel-top'><div class='title-text'>" + title + "</div></div>";
    rightPanelHTML = rightPanelHTML + "<form>";
    rightPanelHTML = rightPanelHTML + "<textarea class='right-panel-textarea'>" + thisText + "</textarea>";
	rightPanelHTML = rightPanelHTML + "<button type='button' id='right-panel-submit-normal-green' class='right-panel-submit-normal' title='" + title + "'>Add Normal</button>";
	rightPanelHTML = rightPanelHTML + "<input type='submit' id='right-panel-submit-red' class='right-panel-submit' title='" + title + "' value='Add Issue'>";
	rightPanelHTML = rightPanelHTML + "<div class='push'></div>";
    rightPanelHTML = rightPanelHTML + "</form>";
    rightPanelHTML = rightPanelHTML + "</div>";
    $("#right-panel-wrapper").append(rightPanelHTML);
    $("#right-panel-" + tier).transition({opacity: 1, x: 0}, 500);
}

// .right-panel-error generator
function makeRightPanelError(msg) {
	$(".right-panel").append("<div class='right-panel-error'>" + msg + "<div class='right-panel-error-triangle'></div></div>");
	var thisWidth = $(".right-panel").outerWidth(true);
	$(".right-panel-error").css("right", thisWidth + 40);
	$(".right-panel-error").transition({right: thisWidth - 10, opacity: 1}, 300);
}

// .tier-item generator
function makeTierItem(tier, title, color) {
	var thisTitle = title.split(" ").join("_");
    $("#tier-panel").append("<div id='line-" + tier + "' class='tier-line'></div>");
    $("#line-" + tier).css("left", (80*tier) - 26);
    $("#tier-panel").append("<div id='tier-" + tier + "' class='tier-item " + thisTitle + "'><div class='tier-circle' value='" + color + "'></div></div>");
    $("#line-" + tier).transition({width: 30}, 250);
	$("#tier-" + tier).children(".tier-circle").css("border-color", colorHex[color]);
    $("#tier-" + tier).transition({scale: 1}, 250);
     // Expand Circle Stuff
    var expandCircle = setTimeout(function() {
        $("#tier-expand-circle-" + tier).stop().remove();
        $("#tier-" + tier).append("<div id='tier-expand-circle-" + tier + "' class='tier-expand-circle'></div>");
		$('.tier-expand-circle').css("border-color", colorHex[color]);
        $('.tier-expand-circle').stop().transition({scale: 1, opacity: 0}, 1500);
    }, 100);
}
// .patient-info generator
function makePatientInfo(name, gender, age, location, reason) {
	var patientInfoHTML = "<div class='patient-name'>" + name + "</div>";
    var patientInfoHTML = patientInfoHTML + "<div class='patient-info-block'>"
    var patientInfoHTML = patientInfoHTML + "<div class='patient-age'>" + age + ", </div>";
    var patientInfoHTML = patientInfoHTML + "<div class='patient-gender'> " + gender + " - </div>";
    var patientInfoHTML = patientInfoHTML + "<div class='patient-location'>" + location + "</div>";
    var patientInfoHTML = patientInfoHTML + "</div>"
    var patientInfoHTML = patientInfoHTML + "<div class='patient-reason'><div class='patient-reason-title'>Reason For Visit</div> " + reason + "</div>";

    $("#patient-info").append(patientInfoHTML);
}	


/* ---------------------- DOCUMENT READY --------------------- */
/* ---------------------------------------------------------- */
$(document).ready(function() {
    $(bodyPartList).children("path").css("opacity", "0");
    $("#tier-1").on("click", function() {
         $("#right-panel").transition({x: "100%"}, 300);
         $("#davinci-svg").transition({scale: .45, x: 0, y: 0}, 500);
         $(".not-tier-1").html("");
    });
    makePatientInfo(patientInfo.name, patientInfo.gender, patientInfo.age, patientInfo.location, patientInfo.reason);
});

/* ------------------------ WINDOW LOAD ---------------------- */
/* ---------------------------------------------------------- */
$(window).load(function() {
	positionArray();
	colorArray();
    var davinciOffsetX = ($("#davinci-svg").width() / 2) * -1;
    var davinciOffsetY = ($("#davinci-svg").height() / 2) * -1;
    $("#davinci-svg").css("margin-left", davinciOffsetX);
    $("#davinci-svg").css("margin-top", davinciOffsetY);
    $("#davinci-svg").transition({scale: .45}, 500);
    setTimeout(function() {
        var curTierId = "tier-" + curTier;
        $("#tier-panel").append("<div id='" + curTierId + "' class='tier-item'><div class='tier-circle'><div id='icon-davinci'></div></div></div>");
        $("#" + curTierId).transition({scale: 1}, 250);
        setTimeout(function() {
            $('#patient-info').stop().transition({opacity: 1, x: 0}, 500);
            $("#tier-1").append("<div class='tier-expand-circle'></div>");
            $('.tier-expand-circle').stop().transition({scale: 1, opacity: 0}, 1500);
        }, 0);
    }, 500);

    // Animate Sections Intro
    // In Animations
    /*
   setTimeout(function() {
        setTimeout(function() {
            $("#Right_Foot").children("path").transition({opacity: .35}, 300);
        }, 375);
        setTimeout(function() {
            $("#Right_Lower_Leg").children("path").transition({opacity: .35}, 300);
        }, 350);
        setTimeout(function() {
            $("#Right_Upper_Leg").children("path").transition({opacity: .35}, 300);
        }, 325);
         setTimeout(function() {
            $("#Left_Foot").children("path").transition({opacity: .35}, 300);
        }, 300);
        setTimeout(function() {
            $("#Left_Lower_Leg").children("path").transition({opacity: .35}, 300);
        }, 275);
        setTimeout(function() {
            $("#Left_Upper_Leg").children("path").transition({opacity: .35}, 300);
        }, 250);
        setTimeout(function() {
            $("#Right_Hand").children("path").transition({opacity: .35}, 300);
        }, 225);
        setTimeout(function() {
            $("#Right_Lower_Arm").children("path").transition({opacity: .35}, 300);
        }, 200);
        setTimeout(function() {
            $("#Left_Hand").children("path").transition({opacity: .35}, 300);
        }, 175);
        setTimeout(function() {
            $("#Left_Lower_Arm").children("path").transition({opacity: .35}, 300);
        }, 150);
        setTimeout(function() {
            $("#Pelvis").children("path").transition({opacity: .35}, 300);
        }, 125);
        setTimeout(function() {
            $("#Right_Upper_Arm").children("path").transition({opacity: .35}, 300);
        }, 100);
        setTimeout(function() {
            $("#Left_Upper_Arm").children("path").transition({opacity: .35}, 300);
        }, 75);
        setTimeout(function() {
            $("#Abdomen").children("path").transition({opacity: .35}, 300);
        }, 50);
        setTimeout(function() {
            $("#Chest").children("path").transition({opacity: .35}, 300);
        }, 25);
        setTimeout(function() {
            $("#Head").children("path").transition({opacity: .35}, 300);
        }, 0);

        //Out Animations
        setTimeout(function() {
            $(bodyPartList).children("path").transition({opacity: 0}, 1000);
        }, 775);
    }, 400);
*/

    /* ---------------------- MOUSEOVER EVENTS --------------------- */
    if(isMobileDevice() == false) {
        $(bodyPartList).on("mouseover", function() {
            $(this).children("path").css("cursor", "pointer");
            $(this).children("path").stop().transition({opacity: .35}, 300);
        });
        $(bodyPartList).on("mouseout", function() {
            $(this).children("path").css("cursor", "default");
            $(this).children("path").stop().transition({opacity: 0}, 300);
        });
        $("body").on("mouseover", ".tier-circle", function() {
            $(this).stop().transition({background: "#454e55"}, 300);
        });
        $("body").on("mouseout", ".tier-circle", function() {
            $(this).stop().transition({background: "#30373b"}, 300);
        });
		$("body").on("mouseover", ".right-panel-top", function() {
			$(this).stop().transition({background: "rgba(69, 78, 85, .5)"}, 300);
		});
		$("body").on("mouseout", ".right-panel-top", function() {
			$(this).stop().transition({background: "#454e55"}, 300);
		});
		$("body").on("mouseover", ".right-panel-submit, .right-panel-submit-normal", function() {
			var getId = $(this).attr("id");
			var lastGetId = getId.lastIndexOf("-");
			getColor = getId.substr(lastGetId + 1);
			var thisColor = colorHex[getColor];
			var brightenColor = brighten(thisColor, 1.1);
			$(this).stop().transition({background: brightenColor}, 250);
		});
		$("body").on("mouseout", ".right-panel-submit, .right-panel-submit-normal", function() {
			var getId = $(this).attr("id");
			var lastGetId = getId.lastIndexOf("-");
			getColor = getId.substr(lastGetId + 1);
			var thisColor = colorHex[getColor];
			$(this).stop().transition({background: thisColor}, 250);
		});
		$("body").on("mouseover", ".right-panel-color", function() {
			if(!$(this).children(".check").hasClass("active")) {
				$(this).children(".check").stop().transition({scale: 1, opacity: 1}, 250);
			}
		});
		$("body").on("mouseout", ".right-panel-color", function() {
			if(!$(this).children(".check").hasClass("active")) {
				$(this).children(".check").stop().transition({scale: .01, opacity: 0}, 250);
			}
		});
    }

    /* ---------------------- .TIER-ITEM CLICK --------------------- */
    $("body").on("click", ".tier-item", function() {
        var getId = $(this).attr("id");
        var getNumber = getId.match(/\d+/)[0];

       if(getNumber == 1) {
            $('#patient-info').stop().transition({opacity: 1, x: 0}, 250);
            $("#davinci-svg").transition({scale: .45, x: 0, y: 0}, 500);
            $(".tier-item").each(function() {
                var thisId = $(this).attr("id");
                var thisIdNum = thisId.match(/\d+/)[0];
                if(thisIdNum != getNumber) {
                    $(this).transition({scale: 0}, 250);
                    setTimeout(function() {
                        $("#" + thisId).remove();
                    }, 250);
                }
            })
            $(".tier-line").each(function() {
                var thisId = $(this).attr("id");
                var thisIdNum = thisId.match(/\d+/)[0];
                if(thisIdNum != getNumber) {
                    $(this).transition({width: 0}, 250);
                    setTimeout(function() {
                        $("#" + thisId).remove();
                    }, 250);
                }
            });
            $(".right-panel").each(function() {
                var thisId = $(this);
                $(thisId).transition({opacity: 0, x: "100%"}, 500);
                setTimeout(function() {
                    $(thisId).remove();
                }, 250);
            });
            curTier = Number(getNumber);
       }
    });
	
	/* ---------------------- .RIGHT-PANEL-TOP CLICK --------------------- */
	$("body").on("click", ".right-panel-top", function() {
		var getId = $(this).attr("id");
		var getNumber = getId.match(/\d+/)[0];
		
		if($(this).hasClass("minimized")) {
			$(this).removeClass("minimized");
			$("#right-panel-" + getNumber).transition({width: 400, x: 0, padding: "67px 25px 25px 25px"}, 250);
			$("#right-panel-" + getNumber).animate({"height": 327}, {duration: 250, queue: false});
			$("#right-panel-" + getNumber + " form").transition({opacity: 1}, 250);
		} else {
			var titleTextWidth = $("#right-panel-" + getNumber + " .title-text").outerWidth();
			var rightPanelTopHeight = $("#right-panel-top-" + getNumber).outerHeight(true);
			var paddT = $("#right-panel-" + getNumber).innerWidth() - $("#right-panel-" + getNumber).width();
			var totalWidth = $("#right-panel-" + getNumber).outerWidth(true);
			console.log(totalWidth);
			
			$("#right-panel-" + getNumber).transition({width: titleTextWidth + paddT, x: 400 - (titleTextWidth + paddT), padding: 0}, 250);
			$("#right-panel-" + getNumber).animate({"height": rightPanelTopHeight}, {duration: 250, queue: false});
			$("#right-panel-" + getNumber + " form").transition({opacity: 0}, 250);
			$(this).addClass("minimized");
		}
	});
	
	/* ---------------------- .RIGHT-PANEL-COLOR CLICK --------------------- */
	$("body").on("click", ".right-panel-color", function() {
		var getId = $(this).attr("id");
		var lastGetId = getId.lastIndexOf("-");
		getColor = getId.substr(lastGetId + 1);
		if(!$(getId).children(".check").hasClass("active")) {
			$(".active").stop().transition({scale: .01, opacity: 0}, 250);
			$(".active").removeClass("active");
			$("#" + getId).children(".check").addClass("active");
			$("#" + getId).children(".check").stop().transition({opacity: 1, scale: 1.2}, 10).transition({scale: 1}, 250);
			$("#" + getId).siblings(".right-panel-submit").transition({background: colorHex[getColor]}, 250);
			$("#" + getId).siblings(".right-panel-submit").attr("id", "right-panel-submit-" + getColor);
		}
	});
	
	$("body").on("focus", ".right-panel-textarea", function() {
		if($(".right-panel-error")) {
			$(".right-panel-error").transition({opacity: 0}, 250);
		}
	});
	
	/* ---------------------- .RIGHT-PANEL-SUBMIT CLICK --------------------- */
	$('body').on('submit','.right-panel form', function(e){
		thisId = $(this);
		e.preventDefault();
		var getTexarea = $(this).children(".right-panel-textarea").val();
		if(getTexarea == "") {
			makeRightPanelError("A description is required to add an issue. Please enter a description here!");
		} else {
			var getTitle = $(this).children(".right-panel-submit").attr("title").split(" ").join("_");
			var getId = $(this).children(".right-panel-submit").attr("id");
			var lastGetId = getId.lastIndexOf("-");
			getColor = getId.substr(lastGetId + 1);
			
			//Add text data to the tier element
			$("#" + getTitle).data("thistext", getTexarea);
			
			$("#Blue_" + getTitle).children("path").animate({svgFill: colorHex[getColor]}, 250);
			$("#" + getTitle).data("thiscolor", "red");
			
			$(thisId).children(".right-panel-submit").val("Saved!");
			setTimeout(function() {
				$(thisId).children(".right-panel-submit").val("Add Entry");
			}, 1100);
			
			$(".tier-item").each(function() {
				if($(this).hasClass(getTitle)) {
					$(this).append("<div class='check'></div>");
					$(this).children(".check").transition({scale: 1, opacity: 1}, 250);
					setTimeout(function() {
						$(thisId).children(".check").transition({opacity: 0}, 500);
					}, 1100);
					$(this).children(".tier-circle").transition({"border-color": colorHex[getColor]}, 250);
					$(this).children(".tier-circle").attr("value", "red");
					$(this).append("<div id ='tier-expand-circle-" + curTier + "' class='tier-expand-circle'></div>");
					$('.tier-expand-circle').css("border-color", colorHex[getColor]);
					setTimeout(function() {
						$('.tier-expand-circle').stop().transition({scale: 1, opacity: 0}, 1500);
					}, 100);
				}
			});
		}
	 });
	 
	 /* ---------------------- .RIGHT-PANEL-SUBMIT-NORMAL CLICK --------------------- */
	$('body').on('click','.right-panel-submit-normal', function(e){
		thisId = $(this);
		e.preventDefault();
		if($(".right-panel-textarea").val() == "") {
			$(".right-panel-textarea").val("Normal");
		}
		var getTextarea = $(".right-panel-textarea").val();
		var getTitle = $(this).attr("title").split(" ").join("_");
		var getId = $(this).attr("id");
		var lastGetId = getId.lastIndexOf("-");
		getColor = getId.substr(lastGetId + 1);
		
		//Add text data to the tier element
		$("#" + getTitle).data("thistext", getTextarea);
		
		$("#Blue_" + getTitle).children("path").animate({svgFill: colorHex[getColor]}, 250);
		$("#" + getTitle).data("thiscolor", getColor);
		
		$(thisId).children(".right-panel-submit").val("Saved!");
		setTimeout(function() {
			$(thisId).children(".right-panel-submit").val("Add Entry");
		}, 1100);
		
		$(".tier-item").each(function() {
			if($(this).hasClass(getTitle)) {
				$(this).append("<div class='check'></div>");
				$(this).children(".check").transition({scale: 1, opacity: 1}, 250);
				setTimeout(function() {
					$(thisId).children(".check").transition({opacity: 0}, 500);
				}, 1100);
				$(this).children(".tier-circle").transition({"border-color": colorHex[getColor]}, 250);
				$(this).children(".tier-circle").attr("value", "green");
				$(this).append("<div id ='tier-expand-circle-" + curTier + "' class='tier-expand-circle'></div>");
				$('.tier-expand-circle').css("border-color", colorHex[getColor]);
				setTimeout(function() {
					$('.tier-expand-circle').stop().transition({scale: 1, opacity: 0}, 1500);
				}, 100);
			}
		});
	 });
	 
	 /* ---------------------- .RIGHT-PANEL-SUBMIT KEYPRESS --------------------- */
	$('body').on('input','.right-panel-textarea', function(e){
		e.preventDefault();
		if($(this).val() == "") {
			$(this).siblings(".right-panel-submit").transition({background: colorHex["blue"]}, 250);
			$(this).siblings(".right-panel-submit").attr("id", "right-panel-submit-" + "blue");
		} else {
			$(this).siblings(".right-panel-submit").transition({background: colorHex["red"]}, 250);
			$(this).siblings(".right-panel-submit").attr("id", "right-panel-submit-" + "red");
		}
	});

    /* ---------------------- .BODYPARTS CLICK --------------------- */
    $(bodyPartList).on("click", function() {
        $('#patient-info').stop().transition({opacity: 0, x: "50%"}, 500);
		var thisBodyPartNoSpace = $(this).attr("id");
        var thisBodyPart = $(this).attr("id").replace(/_/g, " ");
		var thisColor = $(this).data("thiscolor");
        // Mobile click animation
		if(isMobileDevice() == true) {
			$(this).children("path").attr("class", "");
			$(this).children("path").css("opacity", ".35");
			$(this).children("path").transition({opacity: 0}, 300);
		}
        // Tier panel stuff
        if($("#tier-" + curTier).length && curTier != 1) {
            if(!$("#tier-" + curTier).hasClass(thisBodyPartNoSpace)) {
                $(".right-panel").each(function() {
                    var thisId = $(this);
                    $(thisId).transition({opacity: 0, x: "100%"}, 250);
                    setTimeout(function() {
                        $(thisId).remove();
                        makeRightPanel(curTier, thisBodyPartNoSpace, thisColor);
                    }, 250);
                });
                $("#tier-" + curTier).transition({scale: 0}, 250);
                setTimeout(function() {
                    $("#tier-" + curTier).remove();
                    makeTierItem(curTier, thisBodyPart, thisColor);
                }, 250);
            } else {
                // Jetteson the circle
				var getColor =$("#tier-" + curTier).children(".tier-circle").attr("value");
                $("#tier-expand-circle-" + curTier).stop().remove();
                $("#tier-" + curTier).append("<div id ='tier-expand-circle-" + curTier + "' class='tier-expand-circle'></div>");
				$("#tier-" + curTier).children(".tier-expand-circle").css("border-color", colorHex[getColor]);
                $('.tier-expand-circle').stop().transition({scale: 1, opacity: 0}, 1500);
            }
        } else {
            curTier++;
            makeRightPanel(curTier, thisBodyPart, thisColor);
            setTimeout(function() {
				makeTierItem(curTier, thisBodyPart, thisColor);
			}, 250);
        }


        // Calculate positions of everything to center the clicked body part
        var thisOffsetPosX = $(this).data("posX");
        var thisOffsetPosY = $(this).data("posY");
		var thisPosX = thisOffsetPosX;
        var thisPosY = thisOffsetPosY;
		
        var thisOffsetCenterX = $(this).data("centerX");
        var thisOffsetCenterY = $(this).data("centerY");
		var thisCenterX = thisOffsetCenterX;
        var thisCenterY = thisOffsetCenterY;
		

		var thisCenterX = (thisPosX + thisCenterX);
		var thisCenterY = (thisPosY + thisCenterY);

        var davinciCenterX = $("#davinci-svg").width() / 2;
        var davinciCenterY = $("#davinci-svg").height() / 2;
		
        var newCenterX = davinciCenterX - thisCenterX;
        var newCenterY = davinciCenterY - thisCenterY;
		
        // Animations
        $("#davinci-svg").transition({scale: 1.2, x: newCenterX, y: newCenterY}, 500);
    });
});