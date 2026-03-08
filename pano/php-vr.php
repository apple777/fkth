<?php if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) ob_start("ob_gzhandler"); else ob_start(); ?>

<script type="text/javascript">
	$(document).ready(function(){
		$("img.advancedpanorama").panorama({
	                auto_start: 1,
			start_position: 444
	         });
	});
</script>
<?php

switch($_GET["page"]) {
	case 1: {
		?>
<!--<div class="cloe">
<a href="javascript:location.reload(true)"></a>
</div>-->
			<img src="pano/img/havazelet-alba+israel-3-360.jpg" class="advancedpanorama" width="1514px" height="350px" usemap="testmap" alt="none" />
	
		<?php
	break;
	}

	case 2: {
		?>
			<img src="pano/img/ethiopia-eliezer ben yehuda.jpg" class="advancedpanorama" width="1417px" height="350px" usemap="testmap" alt="רחוב אתיופיה" />
	<map id="testmap" name="testmap"> 
		<area shape="rect" coords="653,101,700,149" href="pano/img/eliezer ben yehuda.jpg" alt="תמונה באבן, אליעזר בן יהודה" class="thickbox" /> 
	</map>
	
		<?php
	break;
	}

	case 3: {
		?>
			<img src="pano/img/kook-beitKook-1-360.jpg" class="advancedpanorama" width="1168px" height="350px" usemap="testmap" alt="בית הרב קוק" />
	<map id="testmap" name="testmap"> 
		<area shape="rect" coords="665,173,763,207" href="pano/img/3kook-stone.jpg" alt="תמונות באבן, הרב אברהם יצחק הכהן קוק" class="thickbox" /> 
		<area shape="rect" coords="290,174,321,208" href="pano/img/ticho.jpg" alt="תמונה באבן, אברהם אלברט ואנה טיכו" class="thickbox" /> 
	</map>
		<?php
	break;
	}

	case 4: {
		?>
			<img src="pano/img/havazelet-uziel-2-360.jpg" class="advancedpanorama" width="1397px" height="350px" usemap="testmap" alt="רחוב החבצלת" />
	<map id="testmap" name="testmap">
		<area shape="rect" coords="691,164,753,223" href="pano/img/uziel.jpg" alt="תמונה באבן, הרב בן-ציון מאיר חי עוזיאל" class="thickbox" /> 
	</map>
		<?php
	break;
	}

	case 5: {
		?>
			<img src="pano/img/havazelet-leah+itamar-1-360.jpg" class="advancedpanorama" width="1697px" height="350px" usemap="testmap" alt="רחוב החבצלת" />
	<map id="testmap" name="testmap"> 
		<area shape="rect" coords="361,167,408,247" href="pano/img/leah_itamar.jpg" alt="תמונה באבן, לאה אבושדיד ואיתמר בן אב'י" class="thickbox" /> 
	</map>

		<?php
	break;
	}

	case 6: {
		?>
			<img src="pano/img/kook_beitTicho-1-360.jpg" class="advancedpanorama" width="1807px" height="350px" usemap="testmap" alt="בית טיכו" />
	<map id="testmap" name="testmap"> 
		<area shape="rect" coords="1130,164,1169,206" href="pano/img/ticho.jpg" alt="תמונה באבן, אברהם אלברט ואנה טיכו" class="thickbox" /> 
	</map>
		<?php
	break;
	}

	case 7: {
		?>
		<div id="page7">
			<object width="633" height="350"><param name="movie" value="http://www.youtube.com/v/n4s_ihgAiA4?version=3&amp;hl=en_US&amp;rel=0&autohide=1&showinfo=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/n4s_ihgAiA4?version=3&amp;hl=en_US&amp;rel=0&autohide=1&showinfo=0" type="application/x-shockwave-flash" width="633" height="350" allowscriptaccess="always" allowfullscreen="true"></embed></object>
		</div>
		<?php
	break;
	}

	case 8: {
		?>
			<img src="pano/img/havazelet-doarHaom-3-360.jpg" class="advancedpanorama" width="1662px" height="350px" usemap="testmap" alt="רחוב החבצלת פינת רחוב הורקנוס" />
	<map id="testmap" name="testmap"> 
		<area shape="rect" coords="1224,121,1252,148" href="pano/img/doarHayom.jpg" alt="תמונה באבן, דואר היום" class="thickbox" /> 
		<area shape="rect" coords="1195,122,1223,148" href="pano/img/gershon.jpg" alt="תמונה באבן, גרשון אגרון, פלסטיין פוסט" class="thickbox" /> 
	</map>
		<?php
	break;
	}

	case 9: {
		?>

			<img src="pano/img/havazelet-glick-2-360.jpg" class="advancedpanorama" width="1378px" height="350px" usemap="testmap" alt="רחוב החבצלת" />
	<map id="testmap" name="testmap"> 
		<area shape="rect" coords="766,173,809,221" href="pano/img/glick.jpg" alt="תמונה באבן, משפחת גליק" class="thickbox" /> 
	</map>
		<?php
	break;
	}

	case 10: {
		?>

			<img src="pano/img/mombaz-beitHinuch-2-360.jpg" class="advancedpanorama" width="1883px" height="350px" usemap="testmap" alt="רחוב החבצלת פינת רחוב הנביאים" />
	<map id="testmap" name="testmap">
		<area shape="rect" coords="996,210,1027,251" href="pano/img/beit_hinoh.jpg" alt="תמונה באבן, בית חינוך עוורים" class="thickbox" /> 
	</map>
		<?php
	break;
	}

	case 11: {
		?>

			<img src="pano/img/havazelet-alba+israel-3-360.jpg" class="advancedpanorama" width="1514px" height="350px" usemap="testmap" alt="רחוב החבצלת פינת רחוב יפו" />
		
			<map id="testmap" name="testmap"> 
				<area shape="rect" coords="616,122,653,163" href="pano/img/alba.jpg" alt="תמונה באבן, בית מרקחת אלבא" class="thickbox" /> 
				<area shape="rect" coords="694,117,734,161" href="pano/img/frumkin.jpg" alt="תמונה באבן, ישראל דב פרומקין" class="thickbox" /> 
			</map>
		

		<?php
	break;
	}

	case 12: {
		?>

		<?php
	break;
	}

	case 13: {
		?>

		<?php
	break;
	}

}

?>