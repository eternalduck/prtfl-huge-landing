$(document).ready(function() {
	//screen size test&responsive transforms
	checkSize();
	responsiveness();
	//all others
	topMenuCollapse();
	linksScroll();
	calc();


}); //doc ready

$(window).resize(function() {
	checkSize();
	responsiveness();

}); //resize




//top menu collapse
function topMenuCollapse(){
  $('.menu-toggle').click(function(){
  	$(this).hide();
    $('.top-menu').toggle("slideDown(200)");
   });
$('.menu-close').click(function(){
     $('.top-menu').hide("slideUp(100)");
     $('.menu-toggle').show();
   });
}



// top&footer menu scroll [href^="#"]
function linksScroll(){
   $('.top-menu a, .bottom-menu a, #top .btn, #funnels .btn, #calculator .btn, #kp-features .btn, #problems .btn, #target .btn, #case .btn, #dev .btn, .about-popup .btn').click(function() {
   	event.preventDefault();
     var c = $(this).attr("href");
     $("html, body").animate({scrollTop: $(c).offset().top -80}, 700);
     return false;
   });
}

//reg button in about-popup
$(".close-popup").click(function(){
	$.colorbox.close();
});

//bottom logo return to top
$(".logo").click(function(){
	$("html, body").animate({scrollTop: $(c).offset().top}, 800);
});




//calculator
function calc() {
	$("#calculator").change(function(){ //or click?

		//getting values
		$("#calc-empl").on("input", function() {
	  		$("#calc-empl-range").val(this.value);
		});
		$("#calc-empl-range").change(function(){
			$("#calc-empl").val(this.value);
		})
		var calcEmpl = $("#calc-empl").val(); 


		$("#calc-kp").on("input", function() {
	  		$("#calc-kp-range").val(this.value);
		});
		$("#calc-kp-range").change(function(){
			$("#calc-kp").val(this.value);
		})
		var calcKp = $("#calc-kp").val(); 

		$("#calc-conv").on("input", function() {
	  		$("#calc-conv-range").val(this.value);
		});
		$("#calc-conv-range").change(function(){
			$("#calc-conv").val(this.value);
		})
		var calcConv = (parseInt($("#calc-conv").val()) + 8)/100; 

		$("#calc-average").on("input", function() {
	  		$("#calc-average-range").val(this.value);
		});
		$("#calc-cheque-range").change(function(){
			$("#calc-cheque").val(this.value);
		})
		var calcCheque = $("#calc-cheque").val(); 

		//calculating
		//Х = СУММА КП(исходный процент конверсии +8)средний
		var calcResult = (calcKp*calcConv*calcCheque).toFixed(0); //calcEmpl*
		$("#calc-res").text(calcResult);

		//change font size depending on sum length
		var calcResultCount = $("#calc-res").text().length;
		if(calcResultCount==7) {$("#calc-res").css("font-size", "350%")}
		else if (calcResultCount==9) {$("#calc-res").css("font-size", "320%")}
		else if (calcResultCount==10) {$("#calc-res").css("font-size", "300%")}
		else if (calcResultCount==11) {$("#calc-res").css("font-size", "280%")}
		else if (calcResultCount==12) {$("#calc-res").css("font-size", "260%")}
		else if (calcResultCount==13) {$("#calc-res").css("font-size", "240%")}
		else {$("#calc-res").css("font-size", "430%");}
		//console.log("symbols: " + calcResultCount + ", conv new:" + calcConv + ", conv initial: "+ $("#calc-conv").val());

	});


}



/*
******************************
main responsive f*ction
******************************
*/
function checkSize(){
	if ($(".ctrl-px").offset().top == 1 ){screenRes = 1;} 
	if ($(".ctrl-px").offset().top == 2 ){screenRes = 2;}
	if ($(".ctrl-px").offset().top == 3 ){screenRes = 3;}

	//debug
	//var cWidth = $(window).width();
	//$('.wsize').text('js: ' + cWidth);
} //checkSize()



function responsiveness(){

/*****************
all versions
*****************/
$("#faq .accord").accordion({header: ".toggle-header", collapsible: true, active: 0, heightStyle: "content"});


/*****************
mobile
*****************/
if (screenRes == 1) {
	//debug 
	// console.log("mob");
	// $(".wsize2").text("if: 1 - mob");

	// mobile section collapse
	$(".mob-collapse").each(function(){
		if (!$(this).hasClass("ui-accordion")) {
			$(this).accordion({disabled: false, header: ".mob-collapse-header", collapsible: true, active: false, heightStyle: "content"})
	   	} else {return false;}
	})

   	
	// #pilot-answers .tabs-accord: mob - accord all closed
	$("#pilot-answers .tabs-accord").accordion({header: ".toggle-header", collapsible: true, active: false, heightStyle: "content"});
	

	//kp-features comparison table
	if (!$(".comparison-table").hasClass("ui-accordion")) {
		$(".comparison-table").accordion({header: ".feature", collapsible: true, active: 0, heightStyle: "content"});
	} else {return false;}

	//comparison table bg - FAIL
	$(".comparison .mob-collapse-header").click(function(){
		$(".bg-cup").toggle();

	});

	//mob popups
		$(".toggle-popup").click(function(){
			var popupSrc = '.'+$(this).attr('data-colorbox');
			$(this).colorbox({
			  inline: true, 
			  width:'100%', 
			  opacity: 0.75,
			  href: popupSrc

			});
		});




}//end mobile 



/*****************
tablet
*****************/
if (screenRes == 2) {
	//debug 
	//console.log("tabl");
	//$(".wsize2").text("if: 2 - tablet");

	//remove mobile section collapse
	$(".mob-collapse").accordion({active: 0}).accordion("destroy");

   	


	//#pilot-answers .tabs-accord: tabl - acc 1 open
		$( "#pilot-answers .tabs-accord" ).accordion({header: ".toggle-header", collapsible: true, active: 0, heightStyle: "auto"});


	//kp-features comparison table
	$(".comparison-table").accordion().accordion( "destroy" );

	//tabl popups
		$(".toggle-popup").click(function(){
			var popupSrc = '.'+$(this).attr('data-colorbox');
			$(this).colorbox({
			  inline: true, 
			  width:'90%', 
			  opacity: 0.75,
			  href: popupSrc

			});
		});






}//end tablet






/*****************
mobile AND tablet
*****************/
if (screenRes == 1 || screenRes == 2) {
	//debug 
	//console.log("mobile AND tablet");
	

	//#problems vertical-tabs to tabl&mob accord
	if (!$("#problems .tabs-accord, #target .tabs-accord").hasClass("ui-accordion")) 
	{
		$( "#problems .tabs-accord, #target .tabs-accord" ).tabs().tabs( "destroy" );
		$( "#problems .tabs-accord.vertical, #target .tabs-accord.vertical" ).removeClass( "ui-tabs-vertical ui-helper-clearfix" );
		$( "#problems .tabs-accord, #target .tabs-accord" ).accordion({header: ".toggle-header", collapsible: true, active: 0, heightStyle: "content"});
	} 
	else {return false;}



}//end mobile AND tablet



/*****************
desktop
*****************/
if (screenRes == 3) {
	//debug 
	//console.log("desk");
	//$(".wsize2").text("if: 3 - desk");

	//#pilot-answers .tabs-accord: desk - tabs
	$("#pilot-answers .tabs-accord").accordion().accordion("destroy");
	$("#pilot-answers .tabs-accord").tabs({
		hide: { effect: "fade", duration: 400 }, 
		heightStyle: "content"});
	$("#pilot-answers .tabs-accord ul").show();
	$("#pilot-answers .ui-tabs-panel").hide(); 
	$("#pilot-answers .ui-tabs-panel#tab-1").show(); 

	//tabs nav
	$(".answers-nav .next").click(function(){
		$("#pilot-answers").tabs().tabs("option", "active", $("#pilot-answers").tabs("option", "active")+1 );

	});
	$(".answers-nav .prev").click(function(){
		 $("#pilot-answers").tabs().tabs("option", "active", $("#pilot-answers").tabs("option", "active")-1 );
		
	});



	//#problems mob&tabl accord to vertical-tabs
	$("#problems .tabs-accord, #target .tabs-accord").accordion().accordion( "destroy" );
    $("#problems .tabs-accord.vertical, #target .tabs-accord.vertical").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");



	//desk popups
		$(".toggle-popup").click(function(){
			var popupSrc = '.'+$(this).attr('data-colorbox');
			$(this).colorbox({
			  inline: true, 
			  width:'80%', 
			  maxWidth: '1000px',
			  opacity: 0.75,
			  href: popupSrc

			});
		});



}//end desktop

}//responsiveness()