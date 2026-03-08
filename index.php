<?php if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) ob_start("ob_gzhandler"); else ob_start(); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<!--<base href="http://localhost/kook-php/" />
 <base href="http://www.michael-labs.com/fkth" /> -->
 
<link rel="icon" type="image/x-icon" href="images/favicon.ico">
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<meta http-equiv="content-language" content="he" />
<meta name="description" lang="he" content="" />
<meta name="keywords" lang="he" content="" />
<meta name="author" lang="he" content="מיכאל מאיר" />
<meta name="author" lang="en" content="Michael Meir" />
<meta name="copyright" content="2011 (c) All Rights Reserved" />
<meta name="development" content="Michael Meir [www.michael-labs.com]" />
<meta name="robots" content="noindex,nofollow" />
<meta name="googlebot" content="noindex,nofollow" />

<title>Frontend Portfolio - בין קוק לחבצלת</title>
			<!-- MASTER CSS    &autohide=1&showinfo=0 -->
<link href="main_layout.min.css" rel="stylesheet" type="text/css" media="screen"/>
			<!-- jQuery library -->
<!--<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js" charset="utf-8"></script>-->
<script type="text/javascript" src="lib/jquery-1.4.4.min.js" charset="utf-8"></script>
<!--<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>-->
			<!-- MASTER: JQUERY PLUGINS -->
<script type="text/javascript" src="ajax/main.min.js"></script>
<script type="text/javascript" src="pano/post-pano.min.js"></script>
<script id="panoscript" type="text/javascript" src="pano/js/jquery.advanced-panorama.min.js"></script>
<script type="text/javascript" src="ajax/galleria.min.js"></script>

<script type="text/javascript">
<!-- // hide from really old browsers that no one uses anymore

// When the document loads do everything inside here ...
$(document).ready(function(){

	// michael wants to increase the opacity of "#nav_window" div, when the windows open.
	$("#nav_window").ready(function() {
		$("#nav_window").css({
			'opacity' : '0'
		});

		SLIDES.play();
		//setTimeout("$('#nav_window').fadeTo(8000, 1);",2000);
		//setTimeout("$('#nav_window').fadeTo(speed for menu 100%, 1);",when its happened);
		//timing between window opening to growing menu
	});

	// michael wants to show/hide play #jplayer_title_track.
	$("#jplayer_title_track").mouseleave(function() {
		$(this).fadeTo(2000, 0);
	});
	$("#jplayer_title_track").mouseenter(function() {
		$(this).fadeTo(2000, 1);
	});
	
	//onclick open a float window with scrolled credit
	$("#credit").fancybox();

	//$('.roseta').css({'opacity' : '1'});
	/*$(function(){
		$('.roseta,.roseta_pink').hover(
			//function(){ $(this).css({'opacity' : '0.4'}); },
			function(){ $(this).fadeToggle('fast'); }
		);

	});*/

	<?php 
		if(isset($_GET['person'])){
			echo "$('.".$_GET['person']."').click();";
		
		}
	?>
});

// -->
</script>

<script src="slideshow.min.js" type="text/javascript"></script>
			<!-- MENU WINDOW ANIMATION JS AREA -->
<script type="text/javascript">
<!--
SLIDES = new slideshow("SLIDES");
SLIDES.add_slide(new slide('winpics/DSC_7711.png'));
SLIDES.add_slide(new slide('winpics/DSC_7712.png'));
SLIDES.add_slide(new slide('winpics/DSC_7713.png'));
SLIDES.add_slide(new slide('winpics/DSC_7714.png'));
SLIDES.add_slide(new slide('winpics/DSC_7715.png'));
SLIDES.add_slide(new slide('winpics/DSC_7716.png'));
SLIDES.add_slide(new slide('winpics/DSC_7717.png'));
SLIDES.add_slide(new slide('winpics/DSC_7718.png'));
SLIDES.add_slide(new slide('winpics/DSC_7719.png'));
SLIDES.add_slide(new slide('winpics/DSC_7720.png'));
SLIDES.add_slide(new slide('winpics/DSC_7721.png'));
SLIDES.add_slide(new slide('winpics/DSC_7722.png'));
SLIDES.add_slide(new slide('winpics/DSC_7723.png'));
//-->
</script>
</head>
<body>
<div id="page-background"><img src="images/wall.jpg" alt="background" width="100%" height="100%"/></div>
<div id="container">
	<div id="header">
		<div id="window"></div>
		<div id="title"></div>
		<!--<div id="search">
			<label for="search1"></label>
			/* Dynamic Website Search - only for english */
			<form action="search.php" method="GET">
      			<input results="10" type="search" maxlength="28" size="28" id="search1" name="search1" placeholder="הקלד מילת חיפוש..." />
			</form>
		</div>-->
	</div>
	
<!-- / # HEADER:top site -->

<!-- # NAV_MAP + # NAV_WINDOW -->

	<div id="content">
		<div id="img_window">

<!-- # img_window == ok to delete src="" and middle funcrion  !!!!!!-->
<img name="SLIDESIMG" src="winpics/DSC_7711.png" width="254" height="463" border="0" alt="" />

<script type="text/javascript">
<!--
if (document.images) {
	SLIDES.image = document.images.SLIDESIMG;
	// Create a function to ramp up the image opacity in Mozilla
	var fadein_opacity = 0;
	var fadein_img = SLIDES.image;
	function fadein(opacity) {
		if (typeof opacity != 'undefined') fadein_opacity = opacity;
		}
	}
//-->
</script>

<!-- / # img_window = animation of open windows-->

			<div id="nav_window" class="tabbed_area" dir="rtl"><!-- Tabbed Structure_ready on jquery -->
					<ul class="tabs">
						<li><a title="content_1" class="tab active">אישים</a></li>
						<li><a title="content_2" class="tab">מבנים</a></li>
						<li><a title="content_3" class="tab">אירועים</a></li>
					</ul>
					
					<div class="spacer"></div>
					
					<div id="content_1" class="content">
						<ul>
							<li><a class="" id="11">ישראל דב פרומקין</a></li>
							<li><a class="" id="22">הרב קוק</a></li>
							<li><a class="" id="33">ישראל ב"ק</a></li>
							<li><a class="" id="44">אברהם משה לונץ</a></li>
							<li><a class="" id="55">יוסף מיוחס</a></li>
							<li><a class="off">חיים נחמן ביאליק</a></li>
							<li><a class="off" id="">הרב יוסף מורדכי הלוי</a></li>
							<li><a class="" id="77">קדיש סילמן</a></li>
							<li><a class="" id="88">הרב עוזיאל</a></li>
						</ul>
					</div>
					<div id="content_2" class="content">
						<ul>
							<li><a class="" id="moshelet_ad_sheaol">בית היתומים האשכנזי</a></li>
							<li><a class="">בית הרב קוק</a></li>
							<li><a class="">בית החולים רוטשילד</a></li>
							<li><a class="off">בית חינוך עוורים</a></li>
							<li><a class="">בית השימוש  הראשון</a></li>
							<li><a class="">בית לאה ואיתמר בן אבי</a></li>
							<li><a class="">פלסטין פוסט</a></li>
							<li><a class="">עיתון חבצלת</a></li>
							<li><a class="" id="">עיתון דואר היום</a></li>
							<li><a class="">החנות של משפחת גליק</a></li>
						</ul>
					</div>
					<div id="content_3" class="content">
						<ul>
							<li><a class="" id="itamar_letters">מכתב מאיתמר בן אבי</a></li>
							<li><a class="" id="destroy_boys_school">הריסת ביניין בית ספר לבנים</a></li>
							<li><a class="">בית חינוך עוורים</a></li>
							<li><a class="" id="">היציאה מן החומות</a></li>
							<li><a class="">פיגוע בפלסטין פוסט</a></li>
							<li><a class="" id="">מסע המושבות</a></li>
							<li><a class="">הרב קוק וד"ר עליאש</a></li>
						</ul>
					</div>
				</div>				
			</div>
			
<!-- / # NAV_WINDOW -->

		<!--<div id="nav_map">-->
		<div id="map">
			<div id="map_con">
				<!--<div id="ajax1" style="visibility:hidden;"></div> dir="rtl" fixed the removel from header-->
				<div id="ajax1" style="visibility:hidden;" dir="rtl"></div>
				
				<!--<a id="hotspot1" class="roseta" title="ישראל דב פרומקין"></a>-->
				<a id="hotspot2" class="roseta" title="אליעזר בן-יהודה"></a>
				<a id="hotspot3" class="roseta" title="הרב אברהם יצחק הכהן קוק"></a>
				<a id="hotspot4" class="roseta" title="הרב בן-ציון מאיר חי עוזיאל"></a>
				<a id="hotspot5" class="roseta" title="לאה אבושדיד ואיתמר בן אב'י"></a>
				<a id="hotspot6" class="roseta" title="אברהם אלברט ואנה טיכו"></a>
				<a id="hotspot7" class="roseta_pink" title="בית הספר העירוני לבנים שנהרס"></a>
				<a id="hotspot8" class="roseta" title="גרשון אגרון, דואר היום"></a>
				<a id="hotspot9" class="roseta" title="משפחת גליק"></a>
				<a id="hotspot10" class="roseta" title="בית חינוך עיוורים"></a>
				<a id="hotspot11" class="roseta" title="בית מרקחת אלבא, ישראל דב פרומקין"></a>

			</div>
		</div>

<!-- / # NAV_MAP -->

	</div>

<!-- / # CONTENT:middle site  -->

	<div id="bottom_content"><!-- # TIMELINE + # RADIO -->
		<div id="radio">

			<div id="jquery_jplayer"></div>
			<div class="jp-playlist-player">
				<div class="jp-interface">
					<ul class="jp-controls">
						<li><a id="jplayer_play" class="jp-play" tabindex="1">play</a></li>
						<li><a id="jplayer_pause" class="jp-pause" tabindex="1">pause</a></li>
						<li><a id="jplayer_stop" class="jp-stop" tabindex="1">stop</a></li>
						<li><a id="jplayer_volume_min" class="jp-volume-min" tabindex="1">min volume</a></li>
						<li><a id="jplayer_volume_max" class="jp-volume-max" tabindex="1">max volume</a></li>
						<li><a id="jplayer_previous" class="jp-previous" tabindex="1">previous</a></li>
						<li><a id="jplayer_next" class="jp-next" tabindex="1">next</a></li>
					</ul>
					<div class="jp-progress">
						<div id="jplayer_load_bar" class="jp-load-bar">
							<div id="jplayer_play_bar" class="jp-play-bar"></div>
						</div>
					</div>
					<div id="jplayer_volume_bar" class="jp-volume-bar">
						<div id="jplayer_volume_bar_value" class="jp-volume-bar-value"></div>
					</div>
					<div id="jplayer_time_remain" class="jp-time-remain"></div>
				</div>
				<div id="jplayer_title_track"></div>
			</div>
		</div>
		
<!-- / # RADIO:bottom site  -->


	<div id="timeline" style="overflow:hidden; cursor:-moz-grab;">
		<ul class="tl-events">
		<!-- start of section -->
			<li class="first last">
				<h3 id="title_hertzberg">1827 – 1897</h3>
				<ul class="column">
					<li>
					<a class="hertzberg"><img src="timeline/hertzberg_s.jpeg" title="זאב הרצברג" alt="Zeev Herzberg" width="116" height="76"/></a>
					</li>
				</ul>
			</li>
		<!-- end of section -->
			<li class="first last">
				<h3 id="title_frumkin">1851 – 1914</h3>
				<ul class="column">
					<li>
					<a class="frumkin"><img src="timeline/frumkin_s.jpeg" title="ישראל דב פרומקין" alt="Israel Dov Frumkin" width="116" height="76"/></a>
					</li>
				</ul>
			</li>
		<!-- end of section -->
			<li class="first last">
				<h3 id="title_eliezer">1858 – 1922</h3>
				<ul class="column">
					<li>
					<a class="eliezer"><img src="timeline/eliezer_s.jpeg" title="אליעזר בן-יהודה" alt="Eliezer Ben-Yehuda" width="116" height="76"/></a>
					</li>
				</ul>
			</li>
		<!-- end of thumbnail -->
			<li class="first last">
				<h3 id="title_kook">1865 – 1935</h3>
				<ul class="column">
					<li>
					<a class="kook"><img src="timeline/kook_s.jpeg" title="הרב אברהם יצחק הכהן קוק" alt="HaRav Abraham Isaac Kook" width="116" height="76"/></a>
					</li>
				</ul>
			</li>
		<!-- end of thumbnail -->
			<li class="first last">
				<h3 id="title_meyuchas">1868 – 1942</h3>
				<ul class="column">
					<li>
					<a class="meyuchas"><img src="timeline/meyuchas_s.jpeg" title="יוסף מיוחס" alt="Joseph Meyuchas" width="116" height="76"/></a>
					</li>
				</ul>
			</li>
		<!-- end of thumbnail -->
			<li class="first last">
				<h3 id="title_mordechai_halevy">1875 – 1947</h3>
				<ul class="column">
					<li>
					<a class="mordechai_halevy"><img src="timeline/kook.mordechai_halevy2_s.jpeg" title="הרב קוק עם הרב יוסף מורדכי הלוי" alt="HaRav Joseph Mordechai Halevy" width="116" height="76"/></a>
					</li>
				</ul>
			</li>
		<!-- end of thumbnail -->
			<li class="first last">
				<h3 id="title_harav_uziel">1880 – 1953</h3>
				<ul class="column">
					<li>
					<a class="harav_uziel"><img src="timeline/uziel_s.jpeg" title="הרב בן-ציון מאיר חי עוזיאל" alt="HaRav Ben-Zion Meir Hai Uziel" width="116" height="76"/></a>
					</li>
				</ul>
			</li>
		<!-- end of thumbnail -->
			<li class="first last">
				<h3 id="title_itamar_leah">1882 – 1943</h3>
				<ul class="column">
					<li>
					<a class="itamar_leah"><img src="timeline/itamar.leah_s.jpeg" title="לאה אבושדיד ואיתמר בן אב'י" alt="Itamar Ben-Avi" width="116" height="76"/></a>
					</li>
				</ul>
			</li>
		<!-- end of thumbnail -->
			<li class="first last">
				<h3 id="title_albert_ticho">1883 – 1960</h3>
				<ul class="column">
					<li>
					<a class="albert_ticho"><img src="timeline/ticho.jpeg" title="אברהם אלברט ואנה טיכו" alt="Avraham Albert Ticho" width="116" height="76"/></a>
					</li>
				</ul>
			</li>
		<!-- end of thumbnail -->
			<li class="first last">
				<h3 id="title_nissim_levy">1888 – 1971</h3>
				<ul class="column">
					<li>
					<a class="nissim_levy"><img src="timeline/nissim_levy_s.jpeg" title="ניסים לוי" alt="Nissim Levy" width="116" height="76"/></a>
					</li>
				</ul>
			</li>
		<!-- end of thumbnail -->
			<li class="first last">
				<h3 id="title_mordechai_eliash">1892 – 1950</h3>
				<ul class="column">
					<li>
					<a class="mordechai_eliash"><img src="timeline/kook.mordechai_s.jpeg" title="מרדכי אליאש" alt="Mordechai Eliash" width="116" height="76"/></a>
					</li>
				</ul>
			</li>
		<!-- end of thumbnail -->
			<li class="first last">
				<h3 id="title_gershon_agron">1894 – 1959</h3>
				<ul class="column">
					<li>
					<a class="gershon_agron"><img src="timeline/agron_s.jpeg" title="גרשון אגרון" alt="Gershon Agron" width="116" height="76"/></a>
					</li>
				</ul>
			</li>
		<!-- end of thumbnail -->
			<li class="first last">
				<h3 id="title_glick_family">1897</h3>
				<ul class="column">
					<li>
					<a class="glick_family"><img src="timeline/glick_s.jpeg" title="משפחת גליק" alt="Glick Family" width="116" height="76"/></a>
					</li>
				</ul>
			</li>
		<!-- end of thumbnail -->
			<li class="first last">
				<h3 id="title_institute_blind">1902 – 1910</h3>
				<ul class="column">
					<li>
					<a class="institute_blind"><img src="timeline/beit_hinoh_s.jpeg" title="בית חינוך עיוורים" alt="" width="116" height="76"/></a>
					</li>
				</ul>
			</li>
		<!-- end of thumbnail -->
			<li class="first last">
				<h3 id="title_dailymail">1919 – 1936</h3>
				<ul class="column">
					<li>
					<a class="dailymail"><img src="timeline/daily_mail_s.jpeg" title='"דואר היום"' alt="Daily Mail" width="116" height="76"/></a>
					</li>
				</ul>
			</li>
		<!-- end of thumbnail -->
			<li class="first last">
				<h3 id="title_alba_pharmacy">1924</h3>
				<ul class="column">
					<li>
					<a class="alba_pharmacy"><img src="timeline/alba.jpeg" title="בית מרקחת אלבא" alt="Alba Pharmacy" width="116" height="76"/></a>
					</li>
				</ul>
			</li>
		<!-- end of thumbnail -->
		</ul>
	</div>
<!-- / # TIMELINE:( * 16 photos * )bottom site  -->
		
	</div>
	
<!-- / # BOTTOM_CONTENT:bottom site 							CV VERSION 2026-->

	<div id="footer">
	</div>
		<div class="footer_nav">
			<!--<a title="" href="mailto:avidandvora@walla.com" target="_blank">ליצירת קשר</a><span>|</span>-->
			<!--<a title="" href="jquery.fancybox/opening.html" id="credit">איך הופך שביל לרחוב</a><span>|</span>-->
			<!--a title="" href="https://he.wikipedia.org/wiki/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%91%D7%90%D7%91%D7%9F" target="_blank">תמונה באבן</a><span>|</span-->
			<a title="Michael Meir Email" href="mailto:michaelmeiir@gmail.com">EMAIL</a><span>|</span>
			<!--a title="" href="http://www.levhair.org.il" target="_blank">מנהל קהילתי לב העיר</a><span>|</span-->
			<a title="Michael Meir LinkedIn" href="https://www.linkedin.com/in/michaelmeir777/" target="_blank">LinkedIn</a><span>|</span>
			<!--a title="" href="http://www.jerusalem.muni.il" target="_blank">עיריית ירושלים</a><span>|</span-->
			<a title="Michael Meir WhatsApp" href="https://wa.me/message/4KIINPSQQSRLA1" target="_blank">WhatsApp</a><span>|</span>
			<!--a title="" href="http://www.jda.gov.il" target="_blank">הרל"י</a><span>|</span-->
			<a title="פרויקט דיגיטציה לפרויקט פיסי מודפס על אבני שיש" href="https://he.wikipedia.org/wiki/תמונה_באבן" target="_blank">אודות הפרויקט</a><span>|</span>
			<a title="https://www.linkedin.com/in/michaelmeir777/" href="MichaelMeir_Resume.pdf" target="_blank">מיכאל קורות חיים</a><span>|</span>
			<!--a title="" href="https://www.jmc.ac.il/" target="_blank">מכללת הדסה</a><span>|</span-->
			<a title="" href="BOOK-FINAL.pdf" target="_blank">ספר פרויקט</a><span>|</span>
			<a title="https://fromkooktohavazelet.blogspot.com/" href="jquery.fancybox/ajax.txt" id="credit">תודות</a>
		</div>

</div><!-- / # CONTAINER -->

</body>
</html>