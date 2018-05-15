/*
█████████████████████████████
  __  __ ______ _   _ _    _ 
 |  \/  |  ____| \ | | |  | |
 | \  / | |__  |  \| | |  | |
 | |\/| |  __| | . ` | |  | |
 | |  | | |____| |\  | |__| |
 |_|  |_|______|_| \_|\____/ 
 
█████████████████████████████
*/
/*  Last modified: August 16th 2014
	Version: 1.0
	Authored by: Erick Maynard @ Electronic Methods
	
	Latest Modifications:
		- First Version
		
	Known issues:
		- None at this time
*/
var aniSpeed = 300;

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

$(document).ready(function() {
	
	/* ---------- MENU BUTTON MOUSEOVER EFFECTS ---------- */
	/* -------------------------------------------------- */
	$(".menu-btn").mouseover(function() {
		if($(window).width() > 768) {
			$(this).children(".menu-btn-block").each(function() {
				$(this).stop().animate({backgroundColor: "#fcba2f"},{duration: 120, queue: false});
			});
			$("#menu-btn-block-1").animate({top: -3}, {duration: 120, queue: false});
			$("#menu-btn-block-3").animate({bottom: -3}, {duration: 120, queue: false});
		}
	});
	$('.menu-btn').mouseout(function() {
		if($(window).width() > 768) {	
			$(this).children(".menu-btn-block").each(function() {
				$(this).animate({backgroundColor: "#FFF"},{duration: 120, queue: false});
			});
			$("#menu-btn-block-1").animate({top: 0}, {duration: 120, queue: false});
			$("#menu-btn-block-3").animate({bottom: 0}, {duration: 120, queue: false});
		}
	});
	/* ---------- MENU BUTTON CLICK EFFCTS ----------- */
	/* ---------------------------------------------- */
	$(".menu-btn").click(function() {
		$(this).addClass("menu-btn-active");
		$(this).addClass("menu-btn-inactive");
		if(isMobileDevice() == false) {
			$(this).stop().animate({opacity: 0}, {duration: aniSpeed, queue: false, complete: function() {
				$(".menu-btn").css("display", "none");	
			}});
		}
		$(".side-menu").removeClass("side-menu-out");
		$(".side-menu").addClass("side-menu-active");
	});
	
	/* ---------- SIDE MENU CLOSE EFFECTS ---------------- */
	/* -------------------------------------------------- */
	$(".side-menu-close").click(function() {
		$('.menu-btn').removeClass("menu-btn-inactive");
		$('.menu-btn').addClass("menu-btn-active");
		var sideMenuWidth = $(".side-menu").width();
		$(".side-menu").removeClass("side-menu-active");
		$(".side-menu").addClass("side-menu-out");
		$(".menu-btn").css("display", "block");
		if(isMobileDevice() == false) {
			$(".menu-btn").stop().animate({opacity: 1}, {duration: aniSpeed, queue: false});
		}
	});
	
	/* ---------- SIDE MENU ITEM HOVER EFFECTS ---------------- */
	/* ------------------------------------------------------- */
	$(".side-menu-list a").mouseover(function() {
		$(this).children(".side-menu-list-item").removeClass("animate-mouseout-side-menu-list-item");
		$(this).children(".side-menu-list-item").addClass("animate-mouseover-side-menu-list-item");
	});
	$(".side-menu-list a").mouseout(function() {
		$(this).children(".side-menu-list-item").removeClass("animate-mouseover-side-menu-list-item");
		$(this).children(".side-menu-list-item").addClass("animate-mouseout-side-menu-list-item");
	});
	$(".side-sub-menu-list a").mouseover(function() {
		$(this).children(".side-sub-menu-list-item").removeClass("animate-mouseout-side-sub-menu-list-item");
		$(this).children(".side-sub-menu-list-item").addClass("animate-mouseover-side-sub-menu-list-item");
	});
	$(".side-sub-menu-list a").mouseout(function() {
		$(this).children(".side-sub-menu-list-item").removeClass("animate-mouseover-side-sub-menu-list-item");
		$(this).children(".side-sub-menu-list-item").addClass("animate-mouseout-side-sub-menu-list-item");
	});
});