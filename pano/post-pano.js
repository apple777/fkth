$(document).ready(function(){

	$(document).ajaxComplete(function() {
		testRefresh();

		// make fancybox reinit
		setTimeout(
			function() {
				$('.thickbox').fancybox();			   
			},
			600
		);
	});

	$('.thickbox').fancybox();			   

});

function testRefresh() {
	//first get the src to put in the new <script> tag
	var panoSource = document.getElementById("panoscript").src;
	//create new script
	newScript=document.createElement('script');
	newScript.src=panoSource;
	document.getElementsByTagName('head')[0].appendChild(newScript);
}



$(function(){

	$("#hotspot1").click(function(){

		$.post("pano/php-vr.php?page=1", function(data) {
	
			$(".roseta, .roseta_pink").css({ visibility:"hidden" });
			$("#ajax1").empty().html(data).css({ visibility:"visible" }).hide().fadeIn();
			//$("#map_con").html(data).css({ opacity: 0 }).fadeTo("normal",1);
			//ישראל דב פרומקין
			$("img.advancedpanorama").panorama({
				auto_start: 0,
				start_position: 1527
			});
		});
	});


	$("#hotspot2").click(function(){

		$.post("pano/php-vr.php?page=2", function(data) {

			$(".roseta, .roseta_pink").css({ visibility:"hidden" });
			$("#ajax1").empty().html(data).css({ visibility:"visible" }).hide().fadeIn();
			//אליעזר בן-יהודה
			
		});
	});


	$("#hotspot3").click(function(){

		$.post("pano/php-vr.php?page=3", function(data) {

			$(".roseta, .roseta_pink").css({ visibility:"hidden" });
			$("#ajax1").html(data).css({ visibility:"visible" }).hide().fadeIn();
			//הרב אברהם יצחק הכהן קוק

		});
	});


	$("#hotspot4").click(function(){

		$.post("pano/php-vr.php?page=4", function(data) {

			$(".roseta, .roseta_pink").css({ visibility:"hidden" });
			$("#ajax1").html(data).css({ visibility:"visible" }).hide().fadeIn();
			//הרב בן-ציון מאיר חי עוזיאל
		});
	});


	$("#hotspot5").click(function(){

		$.post("pano/php-vr.php?page=5", function(data) {

			$(".roseta, .roseta_pink").css({ visibility:"hidden" });
			$("#ajax1").html(data).css({ visibility:"visible" }).hide().fadeIn();
			//לאה אבושדיד ואיתמר בן אב'י
		});
	});


	$("#hotspot6").click(function(){

		$.post("pano/php-vr.php?page=6", function(data) {

			$(".roseta, .roseta_pink").css({ visibility:"hidden" });
			$("#ajax1").html(data).css({ visibility:"visible" }).hide().fadeIn();
			//אברהם אלברט ואנה טיכו
		});
	});


	$("#hotspot7").click(function(){

		$.post("pano/php-vr.php?page=7", function(data) {

			$(".roseta, .roseta_pink").css({ visibility:"hidden" });
			$("#ajax1").html(data).css({ visibility:"visible" }).hide().fadeIn();
			//$("#jplayer_pause").click();
			//בית הספר העירוני לבנים
		});
	});


	$("#hotspot8").click(function(){

		$.post("pano/php-vr.php?page=8", function(data) {

			$(".roseta, .roseta_pink").css({ visibility:"hidden" });
			$("#ajax1").html(data).css({ visibility:"visible" }).hide().fadeIn();
			//גרשון אגרון, דואר היום
		});
	});


	$("#hotspot9").click(function(){

		$.post("pano/php-vr.php?page=9", function(data) {

			$(".roseta, .roseta_pink").css({ visibility:"hidden" });
			$("#ajax1").html(data).css({ visibility:"visible" }).hide().fadeIn();
			//משפחת גליק	
		});
	});


	$("#hotspot10").click(function(){

		$.post("pano/php-vr.php?page=10", function(data) {

			$(".roseta, .roseta_pink").css({ visibility:"hidden" });
			$("#ajax1").html(data).css({ visibility:"visible" }).hide().fadeIn();
			//בית חינוך עיוורים
		});
	});


	$("#hotspot11").click(function(){

		$.post("pano/php-vr.php?page=11", function(data) {

			$(".roseta, .roseta_pink").css({ visibility:"hidden" });
			$("#ajax1").html(data).css({ visibility:"visible" }).hide().fadeIn();
			//בית מרקחת אלבא, ישראל דב פרומקין
		});
	});


	$("#hotspot12").click(function(){

		$.post("pano/php-vr.php?page=12", function(data) {

			$(".roseta, .roseta_pink").css({ visibility:"hidden" });
			$("#ajax1").html(data).css({ visibility:"visible" }).hide().fadeIn();
		});
	});


	$("#hotspot13").click(function(){

		$.post("pano/php-vr.php?page=13", function(data) {

			$(".roseta, .roseta_pink").css({ visibility:"hidden" });
			$("#ajax1").html(data).css({ visibility:"visible" }).hide().fadeIn();
		});
	});
	
	
	
});