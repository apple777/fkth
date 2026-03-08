<?php if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) ob_start("ob_gzhandler"); else ob_start(); ?>

<!-- this section "case 1" include all comment to all DIV indentation in thos file ! -->

<script type="text/javascript">
	// Load the classic theme
	Galleria.loadTheme('ajax/galleria.classic.js');
	// Initialize Galleria
	//$('#galleria').galleria({debug:true,height:350,width:633});
	
	$(document).ready(function(){
	// audio bar hide/show controller
	$("audio").delay(3000).animate({ opacity: 0 });
		$("audio").mouseleave(function() {
			$("audio").delay(1000).animate({ opacity: 0 });
		});

			//$("audio").delay(400000).animate({ opacity: 0 });
			//setTimeout("$('audio').fadeTo('normal', 0);",3000);
			
		$("audio").mouseenter(function() {
			$("audio").delay(1000).animate({ opacity: 1 });
		});

	//create deley at #side_nav (duplicete to all !!!)
	$("#side_nav").delay(3000).animate({ opacity: 0.2 }).animate({width:'9px'},'normal');

		$("#side_nav").mouseleave(function() {
			//setTimeout('$(this).fadeTo(\'normal\', 0.2).animate({width:\'9px\'},\'normal\');',1);
			setTimeout("$('#side_nav').fadeTo('normal', 0.2).animate({width:'9px'},'normal');",2000);
			//setTimeout("alert($('#side_nav'))");
		});
		$("#side_nav").mouseenter(function() {
			$(this).fadeTo('fast', 1).animate({width:'30px'},'fast');
		});
});
</script>

<?php

switch($_GET["page"]) {

	case 1: {
		?>
		

	<div id="side_nav">
       <ul id="side_menu">
            <li><a class="gallery1" title="גלריה"></a></li>
            <li><a class="gallery2" title="סרטון"></a></li>
            <li><a class="gallery3"></a></li>
            <li><a class="gallery4" title="חזור למפה"></a></li>
        </ul>
	</div>

<div class="stone">

    <div class="album">
        <div id="galleria">
            <img alt="Add Title" src="ajax/image/hertzberg/Hertzberg.jpeg" />
            <img alt="Add Title" src="ajax/image/hertzberg/orphanage_house1.jpeg" />
            <img alt="Add Title" src="ajax/image/hertzberg/orphanage_house2.jpeg" />
            <img alt="Add Title" src="ajax/image/hertzberg/boys-school-plan.jpg" />
         </div>
    </div>

	<div class="stone_holder">
<!-- add scrollbar to text -->
		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:380px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:right; overflow: visible; height: auto; width: 110px; margin-right: 10px; position: absolute; top: 0px;">

			<div class="stone_content" style="height:680px;"><!-- make text div heigher -->
				<div class="stone_name">
				<h4>זאב וילהלם הרצברג</h4>
				</div><!-- /stone_name -->
				<div class="stone_year_he">
				תקפ"ז - תרנ"ז
				</div><!-- /stone_year_he -->
				<div class="stone_year_en">
				1897 - 1827
				</div><!-- /stone_year_en -->
				<div class="stone_text">
<p>

"אבי היתומים" בירושלים היה האיש, שעוד לפני שהגיע לעיר הקודש סלל לו דרך משלו – ליהדות. הוא נולד בגרמניה ב-1827, למשפחה מתבוללת ואת היהדות הכיר רק מתוך מקורות נכריים, שדי בהם לעורר בו מעורבות עמוקה בערכי היהדות והלאומיות היהודית, שמצאו ביטוי בספרו "כתבי משפחה יהודיים".
</p>
<p>
ב-1877 התמנה הרצברג למנהל בית הספר החקלאי במקוה ישראל, ומשם עבר כעבור שנתיים לירושלים כמנהלו של בית היתומים היהודי הראשון בעיר. יתומים לא חסרו אז בירושלים, ובכל זאת היה "איכלוסו" של בית היתומים איטי, בין השאר בשל התנגדות רבני וקנאי ירושלים, שנבעה לא במעט מ"משכיליותו" של הרצברג. כעבור עוד כמה שנים מיזג את בית היתומים עם בית הספר "למל".
</p>

<p style="margin:0px;">
הרצברג מצא כר נרחב לפעילות ציבורית בירושלים, ואולי גם סיפוק-מה, אבל את אושרו לא מצא בה. אולי משום כך ירד ב-1891 לבריסל, ושם נפטר ב-1897. מפעילותו לטובת ארץ-ישראל לא חדל גם בשנים הללו.

</p>
				</div><!-- /stone_text -->
				<div class="stone_copyright">
				<p>
דב גניחובסקי
<br/>
				</p>
				</div><!-- /stone_copyright -->
			</div><!-- /stone_content -->

		</div><!-- /#jScrollPane -->
		</div><!-- /.jScrollPaneContainer -->
<!-- /add scrollbar to text -->


		<div class="stone_photo">
			<img src="ajax/hertzberg-stone.jpeg" title="" alt="" width="190" height="310"/>
		</div><!-- /stone_photo -->
	
	</div><!-- /stone_holder -->
	
	<audio controls="controls" autoplay="autoplay">
		<source src="ajax/voiceover/hertzberg.ogg" type="audio/ogg" />
		<source src="ajax/voiceover/hertzberg.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
	
	<object class="youtube-player" width="633" height="350"><param name="movie" value="http://www.youtube.com/v/LT2VnZCRzuw?version=3&amp;hl=en_US&autohide=1&showinfo=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/LT2VnZCRzuw?version=3&amp;hl=en_US&autohide=1&showinfo=0" type="application/x-shockwave-flash" width="633" height="350" allowscriptaccess="always" allowfullscreen="true"></embed></object>

</div><!-- /stone -->

		<?php
	break;
	}

	case 2: {
		?>
		


	<div id="side_nav">
       <ul id="side_menu">
            <li><a class="gallery1" title="גלריה"></a></li>
            <li><a class="gallery2" title="סרטון"></a></li>
            <li><a class="gallery3"></a></li>
            <li><a class="gallery4" title="חזור למפה"></a></li>
        </ul>
	</div>
	
<div class="stone">

    <div class="album">
        <div id="galleria">
            <img alt="test galllery" src="ajax/image/frumkin/frumkin.jpg" />
            <img alt="test galllery" src="ajax/image/frumkin/Hahavatzelet.jpeg" />
        </div>
    </div>
 
	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:380px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:right; overflow: visible; height: auto; width: 110px; margin-right: 10px; position: absolute; top: 0px;">

		<div class="stone_content" style="height:430px;"><!-- make text div heigher -->
			<div class="stone_name">
			<h4>ישראל דב פרומקין</h4>
			</div>
			<div class="stone_year_he">
			תרי"א - תרע"ד
			</div>
			<div class="stone_year_en">
			1914 - 1851
			</div>
			<div class="stone_text">
			<p>

בן לחסידי חב"ד, עלה בגיל 9 מווילנה. התגורר בעיר העתיקה ב"חצר החבצלת". בשנת 1863 יסד את עיתון "חבצלת" והמשיך בעריכתו עד שנת 1911. לחם במיסיון ובקנאים מראשי ה"פרושים". תמך בהשכלה ובחינוך החדש בארץ. ייסד את "תפארת ירושלים" (ספרדים ואשכנזים) להקלת חיי העניים, ואת קרן "עזרת נידחים" לתמיכה בעולי תימן המקימים שכונתם בכפר השילוח. בנו גד היה השופט היהודי היחידי בבית המשפט העליון בתקופת המנדט.
			</p>
			</div>
			<div class="stone_copyright">
			<p>
כתב: נין, אלון גילון 
<br/>
אוסף: ארכיון העיר ירושלים

			</p>
			</div>
		</div>

		</div>
		</div>

		<div class="stone_photo">
			<img src="ajax/frumkin-stone.jpeg" title="" alt="" width="190" height="310"/>
		</div>
	
	</div>
	<audio controls="controls" autoplay="autoplay">
		<source src="ajax/voiceover/frumkin.ogg" type="audio/ogg" />
		<source src="ajax/voiceover/frumkin.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
</div>


		<?php
	break;
	}

	case 3: {
		?>

			
	<div id="side_nav">
       <ul id="side_menu">
            <li><a class="gallery1" title="גלריה"></a></li>
            <li><a class="gallery2" title="סרטון"></a></li>
            <li><a class="gallery3"></a></li>
            <li><a class="gallery4" title="חזור למפה"></a></li>
        </ul>
	</div>
					
<div class="stone">

    <div class="album">
        <div id="galleria">
            <img alt="Add Title" src="ajax/image/eliezer/benyehuda.jpeg" />
            <img alt="Add Title" src="ajax/image/eliezer/Eliezer_dvoraBenYehuda.jpeg" />
            <img alt="Add Title" src="ajax/image/eliezer/hinuh.jpeg" />
            <img alt="Add Title" src="ajax/image/eliezer/RazR029.jpeg" />
            <img alt="Add Title" src="ajax/image/eliezer/RazR012.jpeg" />
            <img alt="Add Title" src="ajax/image/eliezer/z_doar_ayom.jpeg" />
         </div>
    </div>

	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:380px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:right; overflow: visible; height: auto; width: 110px; margin-right: 10px; position: absolute; top: 0px;">

		<div class="stone_content" style="height:450px;"><!-- make text div heigher -->
			<div class="stone_name">
			<h4>אליעזר בן-יהודה</h4>
			</div>
			<div class="stone_year_he">
			תרי"ח - תרפ"ב
			</div>
			<div class="stone_year_en">
			1922 - 1858
			</div>
			<div class="stone_text">
			<p>
<small>
קטע מתוך שירו של ירון לונדון "אליעזר בן-יהודה"
<br/>

שנכתב בשנת 1968
</small>

<br/>
אִם נָמָה הָעִבְרִית אַלְפַּיִם, נּוּ אָז מָה?
<br/>
הָבָה נַעִירֶנָה וְנַמְצִיא אֶת הַיָזְמָה,
<br/>
אֶת הַמַּגְהֵץ, אֶת הַפְּצָצָה, אֶת הָרִהוּט
<br/>
בִּקְצֵה נוֹצָה בִּכְתָב רָהוּט,
<br/>
כָּתַב כְּרוּבִית, כָּתַב גְּלִידָה,
<br/>
כָּתַב אֶת כֹּל מִלּוֹן בֶּן יְהוּדָה.
<br/>
וְעוֹד הוֹסִיף מִלִּים לִבְרֹא
<br/>
ונוֹצָתוֹ הַמְּהִירָה לא נָחָה
<br/>
והַשָֹפָה גָּדְלָה
<br/>
וְלֹא הִכִּירָה אֶת מַרְאַה דְּמותָהּ בְּבוֹא הַֹשַּחַר.
			</p>
			</div>
			<div class="stone_copyright">
			<p>
בתמונה: אליעזר בן-יהודה בביתו שוקד של כתיבת המילון
צילם: יעקב בן דוב 1912 / ארכיון הציוני המרכזי ירושלים
			</p>
			</div>
		</div>

		</div>
		</div>


		<div class="stone_photo">
			<img src="ajax/eliezer-stone.jpeg" title="" alt="" width="190" height="310"/>
		</div>
	
	</div>
	<audio controls="controls" autoplay="autoplay">
		<source src="ajax/voiceover/eliezer.ogg" type="audio/ogg" />
		<source src="ajax/voiceover/eliezer.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
</div>
	
		<?php
	break;
	}

	case 4: {
		?>


			
	<div id="side_nav">
       <ul id="side_menu">
            <li><a class="gallery1" title="גלריה"></a></li>
            <li><a class="gallery2" title="סרטון"></a></li>
            <li><a class="gallery3"></a></li>
            <li><a class="gallery4" title="חזור למפה"></a></li>
        </ul>
	</div>
					
<div class="stone">

    <div class="album">
        <div id="galleria">
            <img alt="Add Title" src="ajax/image/kook/1.jpeg" />
            <img alt="Add Title" src="ajax/image/kook/2.jpeg" />
            <img alt="Add Title" src="ajax/image/kook/3.jpeg" />
            <img alt="Add Title" src="ajax/image/kook/4.jpeg" />
            <img alt="Add Title" src="ajax/image/kook/5.jpeg" />
            <img alt="Add Title" src="ajax/image/kook/abraham_isaac_kook_1924.jpeg" />
            <img alt="Add Title" src="ajax/image/kook/kook.jpg" />
            <img alt="Add Title" src="ajax/image/kook/kook2.jpeg" />
            <img alt="Add Title" src="ajax/image/kook/mordechai.jpeg" />
            <img alt="Add Title" src="ajax/image/kook/Rabi_Kook_house_02.jpeg" />
            <img alt="Add Title" src="ajax/image/kook/Rabi_Kook_house.jpeg" />
		</div>
    </div>


	<div class="stone_holder">
	
		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:380px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:right; overflow: visible; height: auto; width: 210px; margin-right: 10px; position: absolute; top: 0px;">

		<div class="stone_content" style="height:420px;"><!-- make text div heigher -->
			<div class="stone_name">
			<h4>הרב אברהם יצחק הכהן קוק (הראי"ה)</h4>
			</div>
			<div class="stone_year_he">
			תרכ"ה - תרצ"ה
			</div>
			<div class="stone_year_en">
			1935 - 1865
			</div>
			<div class="stone_text">
			<p>

..."מתוך נשמתי אני מדבר עמכם
<br/>
מתוך נשמת נשמתי, מתוך קשר החיים
<br/>
שאני קשור בכולכם...
<br/>
כל אחד מכם, כל נשמה בודדת,
<br/>
שמכלל כולכם הוא ניצוץ גדול וחשוב
<br/>
באבוקת אור עולם...
<br/>
ארצכם ארץ תקוותכם, קודש היא לי..."
			</p>
			</div>
			<div class="stone_copyright">
			<p>

מתוך "אורות הראי"ה", את התוכן בחרו בני המשפחה
<br/>
בצילום: מסע הרבנים עם הרב קוק לההתישבות העובדת, תרפ"ז 1927
<br/>
הרב קוק עומד במרכז התמונה, הראשון משמאל רבי בנימין 
<br/>
(יהושע רדלר פלדמן).
<br/>
מאוסף ארכיון בית הרב קוק
			</p>
			</div>
		</div><!-- / # stone-content -->
		
		</div>
		</div>


		<div class="stone_photo">
			<img src="ajax/kook-stone.jpg" title="" alt="" width="190" height="310"/>
		</div>
	
	</div><!-- / # stone-holder -->
	<audio controls="controls" autoplay="autoplay">
		<source src="ajax/voiceover/kook.ogg" type="audio/ogg" />
		<source src="ajax/voiceover/kook.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>

	<object class="youtube-player" width="633" height="350"><param name="movie" value="http://www.youtube.com/v/32-FvvRm-pg?version=3&amp;hl=en_US&amp;rel=0&autohide=1&showinfo=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/32-FvvRm-pg?version=3&amp;hl=en_US&amp;rel=0&autohide=1&showinfo=0" type="application/x-shockwave-flash" width=633 height="350" allowscriptaccess="always" allowfullscreen="true"></embed></object>	

</div><!-- / # stone -->

		<?php
	break;
	}
	
	case 5: {
		?>

			
	<div id="side_nav">
       <ul id="side_menu">
            <li><a class="gallery1" title="גלריה"></a></li>
            <li><a class="gallery2" title="סרטון"></a></li>
            <li><a class="gallery3"></a></li>
            <li><a class="gallery4" title="חזור למפה"></a></li>
        </ul>
	</div>
					
<div class="stone">

    <div class="album">
        <div id="galleria">
            <img alt="Add Title" src="ajax/image/meyuchas/meyuchas.jpg" />
         </div>
    </div>

	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:380px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:right; overflow: visible; height: auto; width: 210px; margin-right: 10px; position: absolute; top: 0px;">

		<div class="stone_content" style="height:800px;"><!-- make text div heigher -->
			<div class="stone_name">
			<h4>יוסף בר"ן מיוחס</h4>
			</div>
			<div class="stone_year_he">
			תרכ"ח - התש"ב
			</div>
			<div class="stone_year_en">
			1942 - 1868
			</div>
			<div class="stone_text">
			<p>

מכתב מאת נעמי בלזיצמן
<br/>
נכדתו של יוסף בר"ן מיוחס
<br/>
<br/>


אני זוכרת את סבא שלי כאיש ענו וצנוע חם ואוהב
כאיש שתמיד הלך בקומה זקופה ומלאה כבוד
הייתי מאד קשורה אליו
היו תקופות שישנתי בביתם כך סתם לשם התענוג להיות במחיצתו ובמחיצת סבתא.
<br/>
<br/>

סבא, כפי שאתם כבר יודעים, כתב הרבה סיפורים קצרים ומרתקים והיה נוהג להקריא לי אותם בחדרו, מעבר לשולחנו מלא הספרים.
היינו מבקרים בביתם בערבי שישי עם כל המשפחה והאווירה המסורתית, שאני אוהבת עד היום היתה מאד חמה.
כאשר סבתא נפטרה, סבא עבר לגור בביתנו וכמובן שנתתי לו את חדרי.
היינו יושבים יחד ומפטפטים.
<br/>
<br/>

אני זוכרת שבתקופה ההיא הוא היה קורא לי אשתי הקטנה.
זה היה מאד מרגש ואחד הדברים המיוחדים שאני זוכרת עד היום.
סבי נפטר שנה לאחר מות סבתי , מרוב צער.
עד היום הוא בליבי, כמו כל משפחתי שחייתה בתקופה היפה ההיא.
<br/>
<br/>



שלכם,
<br/>
נעמי בלזיצמן
<br/>
לבית פיגנבאום מיוחס						
						
			</p>
			</div>
			<div class="stone_copyright">
			<p>

			</p>
			</div>
		</div>

		</div>
		</div>

		<div class="stone_photo">
			<img src="ajax/meyuchas-stone.jpg" title="" alt="" width="190" height="173"/>
		</div>
	
	</div>
	<audio controls="controls" autoplay="autoplay">
		<source src="ajax/voiceover/baran_meyuhas_neomi.ogg" type="audio/ogg" />
		<source src="ajax/voiceover/baran_meyuhas_neomi.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
</div>

		<?php
	break;
	}
	
	case 6: {
		?>
	
	
			
	<div id="side_nav">
       <ul id="side_menu">
            <li><a class="gallery1" title="גלריה"></a></li>
            <li><a class="gallery2" title="סרטון"></a></li>
            <li><a class="gallery3"></a></li>
            <li><a class="gallery4" title="חזור למפה"></a></li>
        </ul>
	</div>
					
<div class="stone">

    <div class="album">
        <div id="galleria">
            <img alt="Add Title" src="ajax/image/kook/mordechai_halevy.jpg" />
         </div>
    </div>

	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:380px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:right; overflow: visible; height: auto; width: 210px; margin-right: 10px; position: absolute; top: 0px;">

		<div class="stone_content" style="height:450px;"><!-- make text div heigher -->
			<div class="stone_name">
			<h4>הרב יוסף מרדכי הלוי</h4>
			</div>
			<div class="stone_year_he">
			תרל"ה - תשי"ז
			</div>
			<div class="stone_year_en">
			1947 - 1875
			</div>
			<div class="stone_text">
			<p>
שכנו וחברו של הרב קוק. אציל נפש, כריזמטי, ידען וחריף שכל. הצטיין בחוכמה, עדינות נפש ונועם הליכות.
ראב"ד, חבר מועצת הרבנות הראשית, חבר בוועד הלאומי ונשיא עדת הספרדים. היה ציוני נלהב.
			</p>
			</div>
			<div class="stone_copyright">
			<p>
כתבו: נכדותיו, מרים גיני ורות גביזון
<br/>
צילום: חנוכת האוניברסיטה העברית על הר הצופים תרפ"ה - 1925
<br/>
מימין: עומד ביאליק, יושבים (אלמוני), הרב קוק, והרב יוסף מרדכי הלוי
<br/>
אוסף מינהל קהילתי לב העיר, ארכיון יד בן צבי
			</p>
			</div>
		</div>

		</div>
		</div>

		<div class="stone_photo">
			<img src="ajax/kook.mordechai_halevy-stone.jpg" title="" alt="" width="190" height="131"/>
		</div>
	
	</div>
	<audio controls="controls" autoplay="autoplay">
		<source src="ajax/voiceover/mordechai_halevy.ogg" type="audio/ogg" />
		<source src="ajax/voiceover/mordechai_halevy.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
</div>

		<?php
	break;
	}
	
	case 7: {
		?>

			
	<div id="side_nav">
       <ul id="side_menu">
            <li><a class="gallery1" title="גלריה"></a></li>
            <li><a class="gallery2" title="סרטון"></a></li>
            <li><a class="gallery3"></a></li>
            <li><a class="gallery4" title="חזור למפה"></a></li>
        </ul>
	</div>
	
<div class="stone">	

    <div class="album">
        <div id="galleria">
            <img alt="Add Title" src="ajax/image/uziel/1924.jpg" />
            <img alt="Add Title" src="ajax/image/uziel/Uziel_haim_arlozorov_1926.jpg" />
            <img alt="Add Title" src="ajax/image/uziel/1939.jpg" />
            <img alt="Add Title" src="ajax/image/uziel/Rabbi_Uziel_radio_broadcast.jpg" />
            <img alt="Add Title" src="ajax/image/uziel/Uziel_1939_avraham_shapira.jpg" />
            <img alt="Add Title" src="ajax/image/uziel/Uziel_1939_london.jpg" />
            <img alt="Add Title" src="ajax/image/uziel/Uziel_betzalel.jpg" />
            <img alt="Add Title" src="ajax/image/uziel/Uziel_binyamin_halevy.jpg" />
            <img alt="Add Title" src="ajax/image/uziel/Uziel_har_zion.jpg" />
            <img alt="Add Title" src="ajax/image/uziel/Uziel_simchat_tora.jpg" />
            <img alt="Add Title" src="ajax/image/uziel/Uziel_tree_hretzel.jpg" />
            <img alt="Add Title" src="ajax/image/uziel/Uziel_tree.jpg" />
         </div>
    </div>

	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:380px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:right; overflow: visible; height: auto; width: 210px; margin-right: 10px; position: absolute; top: 0px;">

		<div class="stone_content" style="height:450px;"><!-- make text div heigher -->
			<div class="stone_name">
			<h4>הרב בן ציון מאיר חי עוזיאל</h4>
			</div>
			<div class="stone_year_he">
			תר"מ - תשי"ג
			</div>
			<div class="stone_year_en">
			1953 - 1880
			</div>
<br/>
<br/>
			<div class="stone_name">
			<h4>הראשון לציון והרב הראשי לישראל</h4>
			</div>
			<div class="stone_year_he">
			תש"ט - תשי"ג
			</div>
			<div class="stone_year_en">
			1953 - 1949
			</div>

			<div class="stone_text">
			<p>
כאחד הנכדים אני כותב לך, סבא, בשמם. כל שנה שעוברת על המדינה והעם, אנו מבינים יותר את גדולת דרכך, עומק אהבתך לאומה ולאדם, בהירותך, האומץ האינטלקטואלי והאנושי שלך.
אין מי בדור הנכדים שיגיע למעלתך בעולם התורה ובתחומים אחרים.
סבא, דורות העתיד יכולים לשאוף לרוח הגדולה, היוצרת שלך.
"האמת והשלום אהבו"
<br/>
זכריה ח'
			</p>
			</div>
			<div class="stone_copyright">
			<p>
כתב: נכדו, מאיר עוזיאל
<br/>
צילום: משנת 1949. מאוסף ארכיון "רננות" ירושלים
			</p>
			</div>
		</div>

		</div>
		</div>

		<div class="stone_photo">
			<img src="ajax/uziel-stone.jpg" title="" alt="" width="190" height="310"/>
		</div>
	
	</div>
	<audio controls="controls" autoplay="autoplay">
		<source src="ajax/voiceover/harav_uziel.ogg" type="audio/ogg" />
		<source src="ajax/voiceover/harav_uziel.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
</div>

		<?php
	break;
	}
	
	case 8: {
		?>
					

			
	<div id="side_nav">
       <ul id="side_menu">
            <li><a class="gallery1" title="גלריה"></a></li>
            <li><a class="gallery2" title="סרטון"></a></li>
            <li><a class="gallery3"></a></li>
            <li><a class="gallery4" title="חזור למפה"></a></li>
        </ul>
	</div>
					
<div class="stone">

    <div class="album">
        <div id="galleria">
            <img alt="Add Title" src="ajax/image/itamar/abushdid-stone.png">
            <img alt="Add Title" src="ajax/image/itamar/old1.jpeg" />
            <img alt="Add Title" src="ajax/image/itamar/old3.jpeg" />
            <img alt="Add Title" src="ajax/image/itamar/RazR002.jpeg" />
            <img alt="Add Title" src="ajax/image/itamar/RazR003.jpeg" />
            <img alt="Add Title" src="ajax/image/itamar/RazR004.jpeg" />
            <img alt="Add Title" src="ajax/image/itamar/RazR014.jpeg" />
            <img alt="Add Title" src="ajax/image/itamar/RazR018.jpeg" />
            <img alt="Add Title" src="ajax/image/itamar/RazR022.jpeg" />
            <img alt="Add Title" src="ajax/image/itamar/RazR033.jpeg" />
            <img alt="Add Title" src="ajax/image/itamar/old2.jpeg" />
            <img alt="Add Title" src="ajax/image/itamar/RazR026.jpeg" />
            <img alt="Add Title" src="ajax/image/itamar/RazR044.jpeg" />
			<img alt="Add Title" src="ajax/image/itamar/ayom.jpeg" />
            <img alt="Add Title" src="ajax/image/itamar/new.jpeg" />
            <img alt="Add Title" src="ajax/image/itamar/new2.jpeg" />
            <img alt="Add Title" src="ajax/image/itamar/new3.jpeg" />
            <img alt="Add Title" src="ajax/image/itamar/new4.jpeg" />
         </div>
    </div>

	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:380px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:right; overflow: visible; height: auto; width: 210px; margin-right: 10px; position: absolute; top: 0px;">

		<div class="stone_content" style="height:460px;"><!-- make text div heigher -->
			<div class="stone_name">
			<h4>לאה אבושדיד</h4>
			</div>
			<div class="stone_year_he">
			תרנ"ב - תשמ"ב
			</div>
			<div class="stone_year_en">
			1982 - 1892
			</div>
<br/>
<br/>
			<div class="stone_name">
			<h4>איתמר בן-אב"י</h4>
			</div>
			<div class="stone_year_he">
			תרמ"ב - תש"ג
			</div>
			<div class="stone_year_en">
			1943 - 1882
			</div>
			<div class="stone_text">
			<p>
לא פלא שאיתמר - שעל יופיו, חוכמתו וגדולתו שמענו מ"מוֹמָה לאה", 
אמא של דרורה ורינה, מבוקר עד ערב. התאהב ב"אֶלָתוֹ" לאה, שלפי תמונותיה הייתה היפה בבנות ירושלים, ועל פי הכרותי כנכד שלה, הייתה אישה משכילה, חכמה, מצחיקה ומיוחדת - אצילה ספרדיה המתבלת את דיבורה בפתגמים בשבע שפות. לא מוצאים כמוה היום

			</p>
			</div>
			<div class="stone_copyright">
			<p>
כתב: הנכד, איתמר חובב
<br/>
הצילומים: מהעשור הראשון של המאה ה-20 צולמו ע"י מיליטאד סווידאס וגרבאד קריקוריאן 
<br/>
אוסף מינהל קהילתי לב העיר, ארכיון יד בן צבי

			</p>
			</div>
		</div>

		</div>
		</div>

		<div class="stone_photo">
			<img src="ajax/abushdid-stone.png" title="" alt="" width="190" height="310"/>
		</div>
	
	</div>
	<audio controls="controls" autoplay="autoplay">
		<source src="ajax/voiceover/itamar_leah.ogg" type="audio/ogg" />
		<source src="ajax/voiceover/itamar_leah.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
	
	<object class="youtube-player" width="633" height="350" class="youtube-player"><param name="movie" value="http://www.youtube.com/v/F1paeYI4UaU?version=3&amp;hl=en_US&amp;rel=0&autohide=1&showinfo=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/F1paeYI4UaU?version=3&amp;hl=en_US&amp;rel=0&autohide=1&showinfo=0" type="application/x-shockwave-flash" width="633" height="350" allowscriptaccess="always" allowfullscreen="true"></embed></object>

</div>

		<?php
	break;
	}
	
	case 9: {
	
		?>

			
	<div id="side_nav">
       <ul id="side_menu">
            <li><a class="gallery1" title="גלריה"></a></li>
            <li><a class="gallery2" title="סרטון"></a></li>
            <li><a class="gallery3"></a></li>
            <li><a class="gallery4" title="חזור למפה"></a></li>
        </ul>
	</div>
					
<div class="stone">

    <div class="album">
        <div id="galleria">
            <img alt="Add Title" src="ajax/image/ticho/ticho1.jpeg" />
            <img alt="Add Title" src="ajax/image/ticho/ticho2.jpeg" />
            <img alt="Add Title" src="ajax/image/ticho/ticho3.jpeg" />
            <img alt="Add Title" src="ajax/image/ticho/ticho4.jpeg" />
            <img alt="Add Title" src="ajax/image/ticho/ticho5.jpeg" />
         </div>
    </div>

	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:380px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:right; overflow: visible; height: auto; width: 210px; margin-right: 10px; position: absolute; top: 0px;">

		<div class="stone_content" style="height:440px;"><!-- make text div heigher -->
			<div class="stone_name">
			<h4>אברהם אלברט</h4>
			</div>
			<div class="stone_year_he">
			תרמ"ג - תש"כ
			</div>
			<div class="stone_year_en">
			1960 - 1883
			</div>
<br/>
<br/>
			<div class="stone_name">
			<h4>ואנה טיכו</h4>
			</div>
			<div class="stone_year_he">
			תרנ"ד - תש"מ
			</div>
			<div class="stone_year_en">
			1980 - 1894
			</div>
			<div class="stone_text">
			<p>
אלברט ואנה דודי הנערצים, גאוות המשפחה: כילד זכור לי ביתם כמקור תמיכה. דודי אברהם היה לי "פסגת ההר", בחירתי ברפואת עיניים.
אנה דודה למופת, אמנית בחסד עליון וביתם בית ועד חברתי.
אני שמח להיות נצר למשפחה נפלאה זו.

			</p>
			</div>
			<div class="stone_copyright">
			<p>
						
האחיין, אוריאל טיכו
<br/>
צולם בשנות ה-40 של המאה עשרים.
<br/>
ארכיון מוזיאון ישראל
			</p>
			</div>
		</div>

		</div>
		</div>

		<div class="stone_photo">
			<img src="ajax/ticho-stone.jpeg" title="" alt="" width="190" height="155"/>
		</div>
	
	</div>
	<audio controls="controls" autoplay="autoplay">
		<source src="ajax/voiceover/albert_ticho.ogg" type="audio/ogg" />
		<source src="ajax/voiceover/albert_ticho.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
</div>

		<?php
	break;
	}

	case 10: {
		?>
	
	
	<div id="side_nav">
       <ul id="side_menu">
            <li><a class="gallery1" title="גלריה"></a></li>
            <li><a class="gallery2" title="סרטון"></a></li>
            <li><a class="gallery3"></a></li>
            <li><a class="gallery4" title="חזור למפה"></a></li>
        </ul>
	</div>
	
<div class="stone">


    <div class="album">
        <div id="galleria">
            <img alt="Add Title" src="ajax/image/nissimlevy/60_bday.jpeg" />
            <img alt="Add Title" src="ajax/image/nissimlevy/adapting_grandfather1954.jpeg" />
            <img alt="Add Title" src="ajax/image/nissimlevy/card.jpeg" />
            <img alt="Add Title" src="ajax/image/nissimlevy/father_injury1948.jpeg" />
            <img alt="Add Title" src="ajax/image/nissimlevy/Nisim_Levy05.jpeg" />
            <img alt="Add Title" src="ajax/image/nissimlevy/Nisim_Levy08.jpeg" />
            <img alt="Add Title" src="ajax/image/nissimlevy/work.jpeg" />
            <img alt="Add Title" src="ajax/image/nissimlevy/wedding.jpg" />
        </div>
    </div>

	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:380px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:right; overflow: visible; height: auto; width: 210px; margin-right: 10px; position: absolute; top: 0px;">

		<div class="stone_content" style="height:740px;"><!-- make text div heigher -->
			<div class="stone_name">
			<h4>ניסים לוי</h4>
			</div>
			<div class="stone_year_he">
			תרס"ח - תשל"א
			</div>
			<div class="stone_year_en">
			1971 - 1888
			</div>
			<div class="stone_text">
			<p>
<small>
דברים של תירצה אורי - נכדתו של ניסים לוי
</small>
	<p>
ניסים לוי - המורה
	</p>
בילדותי הלכתי עם סבי, ניסים לוי, אל שוק מחנה-יהודה. בכל פעם הייתי שומעת את
<br/>
קריאות המוכרים והרוכלים אליו: "מורי, מורי, בוא הנה" ולי היו אומרים: "ילדה,
<br/>
אינך יודעת איזה מורה היה סבא שלך... חכם, יודע הכל, מעניין, רגיש, אכפתי
<br/>
ואוהב...שיהיה בריא ויאריך ימים..."
<br/>
ואני, שהערצתי את סבי, הייתי הנכדה הגאה בעולם...
<br/>

<br/>
כשלמדתי בבית- המדרש למורים ע"ש דוד ילין, אחד ממורי היה יצחק שלו ז"ל.
<br/>
כששמע שאני נכדתו של ניםים לוי- סיפר לי כי היה סמינריסט אצל סבי ועשה אצלו את
<br/>
אימוני ההוראה. הוא סיפר כי ניסים היה מורה ושחקן בכל רמ"ח אבריו ושס"ה גידיו.
<br/>
כשהוא לימד דבר מה - יכולת לראותו חי מול עיניך. עד כדי כך היו תיאוריו מוחשיים.
<br/>
הוג החייה את העבר ובאמצעותו פגשו התלמידים את כל הדמויות הגדולות והחשובות.
<br/>
הוא סיפק חוויות למידה מיוחדות לתלמידיו.
<br/>
והוסיף כי היה אהוב ונערץ על תלמידיו.
			</p>
			</div>
			<div class="stone_copyright">
			<p>

			</p>
			</div>
		</div>

		</div>
		</div>

		<div class="stone_photo">
			<img src="ajax/nissim_levy-stone.jpg" title="" alt="" width="190" height="310"/>
		</div>
	
	</div>
	<audio controls="controls" autoplay="autoplay">
		<source src="ajax/voiceover/nisim_levi_hamore.ogg" type="audio/ogg" />
		<source src="ajax/voiceover/nisim_levi_hamore.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
</div>

		<?php
	break;
	}
	

	case 11: {
		?>

		
	<div id="side_nav">
       <ul id="side_menu">
            <li><a class="gallery1" title="גלריה"></a></li>
            <li><a class="gallery2" title="סרטון"></a></li>
            <li><a class="gallery3"></a></li>
            <li><a class="gallery4" title="חזור למפה"></a></li>
        </ul>
	</div>
	
<div class="stone">

    <div class="album">
        <div id="galleria">
            <img alt="Add Title" src="ajax/image/kook/mordechai.jpeg" />
		</div>
    </div>

	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:380px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:right; overflow: visible; height: auto; width: 210px; margin-right: 10px; position: absolute; top: 0px;">

		<div class="stone_content" style="height:440px;"><!-- make text div heigher -->
			<div class="stone_name">
			<h4>מרדכי עליאש</h4>
			</div>
			<div class="stone_year_he">
			תרנ"ב - תש"י
			</div>
			<div class="stone_year_en">
			1950 - 1892
			</div>
			<div class="stone_text">
			<p>
מרדכי עליאש והרב קוק היו ידידי נפש. נפגשו בעת מלחמת העולם הראשונה בלונדון. הרב קוק בא לשמש כרב קהילת שומרי הדת ועליאש הגיע כסטודנט באוקספורד ללמוד שפות שמיות.
עליאש היה מבחירי עורכי הדין בארץ ויו"ר אגודתם; יועץ משפטי של הקק"ל ומזכיר ועד הצירים 1921-1919. ממקימי בית-הכנסת ישורון.
			</p>
			</div>
			<div class="stone_copyright">
			<p>
כתב: בנו, משה עליאש
<br/>
בצילום: חצר בית היתומים הספרדי. מאחורי הרב קוק ומרדכי עליאש, מרדכי לבנון הצייר ובמרכז בנו יהודה, מתחילת שנות ה-30 של המאה ה-20  
<br/>
אוסף משה ברמץ.
			</p>
			</div>
		</div>

		</div>
		</div>

		<div class="stone_photo">
			<img src="ajax/kook.mordechai_eliash-stone.jpg" title="" alt="" width="190" height="310"/>
		</div>

	</div>
	<audio controls="controls" autoplay="autoplay">
		<source src="ajax/voiceover/mordechai_eliash.ogg" type="audio/ogg" />
		<source src="ajax/voiceover/mordechai_eliash.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
</div>

		<?php
	break;
	}

	
	case 12: {
		?>
				

			
	<div id="side_nav">
       <ul id="side_menu">
            <li><a class="gallery1" title="גלריה"></a></li>
            <li><a class="gallery2" title="סרטון"></a></li>
            <li><a class="gallery3"></a></li>
            <li><a class="gallery4" title="חזור למפה"></a></li>
        </ul>
	</div>
					
<div class="stone">

    <div class="album">
        <div id="galleria">
            <img alt="Add Title" src="ajax/image/gershon/post.jpeg" />
            <img alt="Add Title" src="ajax/image/gershon/post2.jpeg" />
         </div>
    </div>

	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:380px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:right; overflow: visible; height: auto; width: 210px; margin-right: 10px; position: absolute; top: 0px;">

		<div class="stone_content" style="height:510px;"><!-- make text div heigher -->
			<div class="stone_name">
			<h4>גרשון אגרון</h4>
			</div>
			<div class="stone_year_he">
			תרנ"ג - תשי"ט
			</div>
			<div class="stone_year_en">
			1959 - 1893
			</div>
<br/>
<br/>
			<div class="stone_name">
			<h4>"פלסטיין פוסט"</h4>
			</div>
			<div class="stone_year_he">
			נוסד תרצ"ב
			</div>
			<div class="stone_year_en">
			1932
			</div>
			<div class="stone_text">
			<p>
לגרשון אגרון היו ארבע אהבות והוא אותן מימש:
אהבת ארץ ישראל וירושלים, העיתונות ומשפחתו. ב-1918 התנדב לגדוד העברי האמריקאי ואיתו הגיע לארץ ישראל. התיישב בירושלים ועסק בעיתונאות ובשליחות ציבורית. בשנת 1932 ייסד וערך את ה"פלסטיין פוסט" שהפך לג"רוסלם פוסט ב-1950. 
בשנת 1955 נבחר לראש העיר הרביעי של ירושלים, כיהן בתפקיד עד פטירתו.

			</p>
			</div>
			<div class="stone_copyright">
			<p>
כתבה: בתו ורדה אגרון טמיר 
<br/>
בתמונות:1. גרשון אגרון, העורך במשרד העיתון. 2. פיצוץ מכונית תופת בסמוך לבניין העיתון ע"י חיילים בריטים ב- 1948 בימי מלחמת השיחרור.
<br/>
צלם: לזר זינר (תמונה 1)
צילומים: הארכיון הציוני המרכזי

			</p>
			</div>
		</div>

		</div>
		</div>

		<div class="stone_photo">
			<img src="ajax/agron-stone.jpg" title="" alt="" width="190" height="310"/>
		</div>
	
	</div>
	<audio controls="controls" autoplay="autoplay">
		<source src="ajax/voiceover/gershon_agron.ogg" type="audio/ogg" />
		<source src="ajax/voiceover/gershon_agron.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
</div>

		<?php
	break;
	}

	
	case 13: {
		?>
								

			
	<div id="side_nav">
       <ul id="side_menu">
            <li><a class="gallery1" title="גלריה"></a></li>
            <li><a class="gallery2" title="סרטון"></a></li>
            <li><a class="gallery3"></a></li>
            <li><a class="gallery4" title="חזור למפה"></a></li>
        </ul>
	</div>
					
<div class="stone">

    <div class="album">
        <div id="galleria">
            <img alt="Add Title" src="ajax/image/glick/glick.jpg" />
         </div>
    </div>

	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:380px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:right; overflow: visible; height: auto; width: 210px; margin-right: 10px; position: absolute; top: 0px;">

		<div class="stone_content" style="height:460px;"><!-- make text div heigher -->
			<div class="stone_name">
			<h4>משפחת גליק</h4>
			</div>
			<div class="stone_year_he">

			</div>
			<div class="stone_year_en">

			</div>
			<div class="stone_text">
			<p>
בשנת תרנ"ו 1897 נישאים ר' מרדכי גליק בן העיר העתיקה ומרת איטה לבית ליפקינד. ביתם במזכרת משה ויקב קטן לפרנסתם. משלוח היין הראשון חוצה לארץ יוצא, אך תמורתו לא שבה מחמת המלחמה.
(בנם יצחק יעקב תרס"א 1901) פותח בשנת 1928 בית מסחר סיטוני לנייר. מקדם ענף הדפוס וייצור הנייר בארץ ישראל. שמו הטוב יצא בעזרה שהושיט ביד רתבה ובנפש חפצה לכל נצרך ונזקק. בתשנ"ג 1993 נפטר בשיבה טובה. צאצאיו ממשיכים דרכו.

			</p>
			</div>
			<div class="stone_copyright">
			<p>
כתבו: בני המשפחה
<br/>
יושבים מימין לשמאל: מרת איטה ור' מרדכי גליק
עומדים: ילדיהם רחל (קרשבסקי) אסתר (הרשלר) יצחק יעקב צביה (חיות) והצעיר אריה יהודה.
<br/>
צילום משנת 1917 אוסף מינהל קהילתי לב העיר, ארכיון יד בן צבי

			</p>
			</div>
		</div>

		</div>
		</div>

		<div class="stone_photo">
			<img src="ajax/glick-stone.jpg" title="" alt="" width="190" height="128"/>
		</div>
	
	</div>
	<audio controls="controls" autoplay="autoplay">
		<source src="ajax/voiceover/glick_family.ogg" type="audio/ogg" />
		<source src="ajax/voiceover/glick_family.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
</div>
		
		<?php
	break;
	}

	
	case 14: {
		?>
								

			
	<div id="side_nav">
       <ul id="side_menu">
            <li><a class="gallery1" title="גלריה"></a></li>
            <li><a class="gallery2" title="סרטון"></a></li>
            <li><a class="gallery3"></a></li>
            <li><a class="gallery4" title="חזור למפה"></a></li>
        </ul>
	</div>
					
<div class="stone">

    <div class="album">
        <div id="galleria">
            <img alt="Add Title" src="ajax/image/beit_hinoh/beit_hinoh.jpeg" />
         </div>
    </div>

	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:380px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:right; overflow: visible; height: auto; width: 210px; margin-right: 10px; position: absolute; top: 0px;">

		<div class="stone_content" style="height:440px;"><!-- make text div heigher -->
			<div class="stone_name">
			<h4>בית חינוך עיוורים</h4>
			</div>
			<div class="stone_year_he">
			תרס"ב
			</div>
			<div class="stone_year_en">
			1902
			</div>
			<div class="stone_text">
			<p>
נוסד ע"י אברהם משה לונץ ונחום נתנזון
<br/>
אבא הרב בנימין הלוי אהב לבוא וללמד בבית חינוך עיוורים*. היה בא פעמיים בשבוע מאהל משה. היה אומר: "אמנם תלמידי הטובים אין להם עיניים גשמיות אבל יש להם עיניים רוחניות מעמיקות". 
*משנת 1910 עד 1929 שכן בית חינוך עיוורים בבית עמיאל

			</p>
			</div>
			<div class="stone_copyright">
			<p>
כתבה: בתו נעמי הלוי גולדמן 
<br/>

התמונה (1907-8) בבניין שמחוץ לחומה. תלמידי בית חינוך עיוורים, התזמורת, המקהלה והמורים. מימין קדיש סילמן - מלחין ומורה למוסיקה, הרב בנימין הלוי - מורה לתלמוד, ומשמאלו המלחין אברהם אידלסון
<br/>
אוסף מינהל קהילתי לב העיר, בארכיון יד בן- צבי

			</p>
			</div>
		</div>

		</div>
		</div>

		<div class="stone_photo">
			<img src="ajax/beit_hinoh-stone.jpg" title="" alt="" width="190" height="310"/>
		</div>
	
	</div>
	<audio controls="controls" autoplay="autoplay">
		<source src="ajax/voiceover/institute_blind.ogg" type="audio/ogg" />
		<source src="ajax/voiceover/institute_blind.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>

	<object class="youtube-player" width="633" height="350"><param name="movie" value="http://www.youtube.com/v/M_L8BMUMyMs?version=3&amp;hl=en_US&autohide=1&showinfo=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/M_L8BMUMyMs?version=3&amp;hl=en_US&autohide=1&showinfo=0" type="application/x-shockwave-flash" width="633" height="350" allowscriptaccess="always" allowfullscreen="true"></embed></object>

</div>

		<?php
	break;
	}

	
	case 15: {
		?>		
						

			
	<div id="side_nav">
       <ul id="side_menu">
            <li><a class="gallery1" title="גלריה"></a></li>
            <li><a class="gallery2" title="סרטון"></a></li>
            <li><a class="gallery3"></a></li>
            <li><a class="gallery4" title="חזור למפה"></a></li>
        </ul>
	</div>
					
<div class="stone">

    <div class="album">
        <div id="galleria">
            <img alt="Add Title" src="ajax/image/itamar/ayom.jpeg" />
            <img alt="Add Title" src="ajax/image/itamar/RazR012.jpg" />
         </div>
    </div>

	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:380px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:right; overflow: visible; height: auto; width: 210px; margin-right: 10px; position: absolute; top: 0px;">

		<div class="stone_content" style="height:450px;"><!-- make text div heigher -->
			<div class="stone_name">
			<h4>"דואר היום"</h4>
			</div>
			<div class="stone_year_he">
			תרע"ט - תרצ"ו
			</div>
			<div class="stone_year_en">
			1936 - 1919
			</div>
			<div class="stone_text">
			<p>
"...אני - עורך ראשי, קלימי כותב צרפתית ואני מתרגמו, אלמליח עורך קבוע... וספיר מנהל חרוץ הרוצה בממשלת עריצים. כסופר רציני... נתגלה יצחק עבאדי, א" אהרונסון פתח מדור מיוחד לבדיחות... קורנפלד-דגן היה כותב על עניינים פנימיים... וידידנו הגדול פרומקין, השופט היהודי (בנו של י"ד פרומקין עורך ה"חבצלת") מעניק לחברתנו את השם "הסולל"...

			</p>
			</div>
			<div class="stone_copyright">
			<p>
איתמר בן-אב"י מתוך "עם שחר עצמאותנו" 
מזכרונות חייו של הילד העברי הראשון
<br/>
צילום: קבוצת "הסולל", מייסדי "דואר היום" 1919
עומדים מימין: א' אלמליח, פ' דגן-קורנפלד,
<br/>
א' בן- אב"י, י' עבאדי
יושבים מימין: א' ספיר, א' אהרונסון, ש' קלימי
<br/>
אוסף מינהל קהילתי לב העיר, ארכיון יד בן צבי

			</p>
			</div>
		</div>

		</div>
		</div>

		<div class="stone_photo">
			<img src="ajax/ayom-stone.jpg" title="" alt="" width="190" height="310"/>
		</div>
	
	</div>
	<audio controls="controls" autoplay="autoplay">
		<source src="ajax/voiceover/dailymail.ogg" type="audio/ogg" />
		<source src="ajax/voiceover/dailymail.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
</div>

		<?php
	break;
	}

	
	case 16: {
		?>
						

			
	<div id="side_nav">
       <ul id="side_menu">
            <li><a class="gallery1" title="גלריה"></a></li>
            <li><a class="gallery2" title="סרטון"></a></li>
            <li><a class="gallery3"></a></li>
            <li><a class="gallery4" title="חזור למפה"></a></li>
        </ul>
	</div>
					
<div class="stone">

    <div class="album">
        <div id="galleria">
            <img alt="Add Title" src="ajax/image/alba/alba.jpg" />
         </div>
    </div>

	<div class="stone_holder">

		<div class="stone_content">
			<div class="stone_name">
			<h4>בית מרקחת "אלבא"</h4>
			</div>
			<div class="stone_year_he">
			נוסד תרפ"ד
			</div>
			<div class="stone_year_en">
			1924
			</div>
			<div class="stone_text">
			<p>
הוקם ע"י הרוקח רובוביץ ונרכש בשנת 1938 ע"י הרוקח וילי רוזנברג. פעל במלחמת השחרור ובכל מלחמות ישראל.
מאז 1956 הבעלות בידי המשפחה.
			</p>
			</div>
			<div class="stone_copyright">
			<p>
כתבו מנהלי בית המרקחת:
<br/>
אבי רז, דור שני
<br/>
דניאל ארבל, דור רביעי
<br/>
צילום: בית המרקחת בשנות ה-40 של המאה ה-20
<br/>
אוסף מינהל קהילתי לב העיר בארכיון יד בן צבי

			</p>
			</div>
		</div>


		<div class="stone_photo">
			<img src="ajax/alba-stone.jpg" title="" alt="" width="190" height="310"/>
		</div>
	
	</div>
	<audio controls="controls" autoplay="autoplay">
		<source src="ajax/voiceover/alba_pharmacy.ogg" type="audio/ogg" />
		<source src="ajax/voiceover/alba_pharmacy.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
</div>

		<?php
	break;
	}






/* - end of ajax timeline content - */







/* - start of ajax windows content - */


	case 17: {
		?>

		
<div class="stone">
	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:583px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:justify; overflow: visible; height: auto; width: 566px; margin-right: 10px; position: absolute; top: 0px;">

<div class="stone_name">
<h4>ישראל דוב פרומקין</h4>
</div>


ישראל דוב בער פְרוּמְקִין (כ"ג בחשוון ה'תרי"א, 1850 – י"ד באייר ה'תרע"ד, 1914) מחלוצי העיתונות העברית בארץ ישראל ומתרגם.
<br /><br />
פרומקין נולד בעיר דוברובנה שבפלך מוגילב, באזור רוסיה הלבנה שתחת שליטת האימפריה הרוסית (כיום בבלארוס), למשפחה של חסידי חב"ד. בכ"ג בכסלו ה'תר"ך, 1859, בהיותו בן 9, עלה לירושלים עם הוריו ואחיו. כשמלאו לו 15 שנה, נישא לבתו של ר' ישראל ב"ק, מי שהקים את בית הדפוס העברי הראשון בארץ ישראל בעת החדשה. אשתו זו נפטרה בצעירותה, לאחר שנולדו להם בנות ובן אחד, אברהם. י"ד פרומקין נישא בשנית לבילקה, אחותו של אפרים כהן רייס, מנהל בית הספר למל, ונולדו להם ארבעה ילדים: זלמן, גד, רוזה ויצחק.
<br /><br />
ב"ק ייסד בשנת 1863 את העיתון העברי החלוצי "חבצלת", אך לא התמיד בהוצאתו לאור. פרומקין ירש את בית הדפוס מחותנו, ובשנת 1868 חידש את הוצאת העיתון והתמיד בה עד שנת 1911.
<br /><br />
י"ד פרומקין התגורר בצפון העיר העתיקה, בשכנות לבית המופתי הירושלמי. כיוון שבתהלוכת נבי מוסא נשאו המוסלמים דגל מבית המופתי, נקרא הרחוב בשם "רחוב הדגל". בפי היהודים נקרא מקום מושבו "חצר החבצלת", על-שם בית הדפוס והעיתון שהופק בו.
<br /><br />
על אף היותו של פרומקין חסיד חב"ד, שימש העיתון כבמה לתומכי "ההשכלה" ובהם אליעזר בן יהודה, שערך בעיתון מוסף בשם "מבשרת ציון", אל מול המתנגדים במחנה החרדי, שערכו עיתונים מתחרים בשם "הלבנון" ו"יהודה וירושלים". אולם בהמשך דרכו שב פרומקין והתחבר לאנשי "היישוב הישן" בירושלים, ובשיתוף פעולה עם יחיאל מיכל פינס, אשר עבר דרך אידאולוגית דומה, עמד במאבקים כנגד בן יהודה בשנותיה האחרונות של המאה ה-19. גם בנו, גד, פרסם מאמרים בעיתון תחת הכינוי גפ"ן, שהוא נוטריקון של שמו.
<br /><br />
פרט לעבודתו העיתונאית היה פרומקין פעיל ציבור וסייע רבות לנזקקים. הוא סייע לאנשי עליית אעלה בתמר שהגיעו לכפר השילוח, וארגן קרן 'להצלת נדחי ישראל' על מנת לסייע להם להקים משכני קבע. פעילות נוספת של פרומקין הייתה ניסיון לארגן התיישבות של יהודים בנבי סמואל: נרכשה חלקת אדמה, ובשנת 1895 ניסו כשלושה עשר יהודים תימנים מירושלים לעבד את האדמה הסמוכה לנבי סמואל, אך ניסיון זה לא עלה יפה. בנוסף, הקים את "בית מושב זקנים הכללי" בירושלים.
<br /><br />
אחיו הגדול, מיכאל לוי רודקינסון, כתב ספרים על חסידות, הוציא לאור את העיתונים העבריים "הקול" ואחר כך "אספת חכמים", והיה הראשון שהוציא תרגום ומבוא היסטורי לתלמוד הבבלי באנגלית. בנו, גד פרומקין, היה השופט העליון היהודי הראשון בימי המנדט הבריטי. בן אחר, אברהם פרומקין, היגר לארצות הברית והפך שם לאחד מראשי האנרכיסטים היהודים.
<br /><br />

		</div>
		</div>

	
	</div>
</div>

		<?php
	break;
	}



	case 18: {
		?>

		
<div class="stone">
	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:583px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:justify; overflow: visible; height: auto; width: 566px; margin-right: 10px; position: absolute; top: 0px;">

<div class="stone_name">
<h4>אברהם יצחק הכהן קוק</h4>
</div>


הרב אברהם יצחק הכהן קוק (ט"ז באלול ה'תרכ"ה - ג' באלול ה'תרצ"ה; 7 בספטמבר 1865 - 1 בספטמבר 1935. מכונה גם הראי"ה[1]) היה הרב הראשי האשכנזי הראשון בארץ ישראל, פוסק, מקובל והוגה דעות. נחשב לאחד מאבות הציונות הדתית.
<br /><br />
הרב קוק שימש ברבנות בלטביה, עלה לארץ ישראל בכ"ח אייר תרס"ד (1904), בתקופת העלייה השנייה, ופיתח משנה פילוסופית-קבלית אוהדת ביחס לציונות וליישוב החדש. הוא נתמנה לרבן של יפו והמושבות ולאחר מלחמת העולם הראשונה לרבה האשכנזי של ירושלים. הקים את הרבנות הראשית לארץ ישראל בה כיהן כרב הראשי האשכנזי הראשון, וכן ייסד את ישיבת מרכז הרב. פסיקותיו בספרי התשובות שלו מהווות יסוד לפסיקה בענייני משפט המלוכה והמצוות התלויות בארץ בקרב רבים. הגותו, שעלתה על הכתב בספרים שחיבר ושנערכו מכתביו בעיקר בתחומי האגדה, הפילוסופיה והמוסר, היא מרכיב משמעותי בהשקפת העולם של זרמים שונים בציונות הדתית; היא חלק חשוב בהגות הציונית,‏[2]‏[3] ובהגות היהודית בכללה, ובכלל זה האורתודוקסיה המודרנית.
<br /><br />

		</div>
		</div>

	
	</div>
</div>


<!--
<div class="stone">
<object width="633" height="350"><param name="movie" value="http://www.youtube.com/v/n4s_ihgAiA4?version=3&amp;hl=en_US&amp;rel=0&autohide=1&showinfo=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/n4s_ihgAiA4?version=3&amp;hl=en_US&amp;rel=0&autohide=1&showinfo=0" type="application/x-shockwave-flash" width="633" height="350" allowscriptaccess="always" allowfullscreen="true"></embed></object>
</div>
-->

		<?php
	break;
	}



	case 19: {
		?>

		
<div class="stone">
	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:583px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:justify; overflow: visible; height: auto; width: 566px; margin-right: 10px; position: absolute; top: 0px;">

<div class="stone_name">
<h4>ישראל ב"ק</h4>
</div>


(1797, ברדיצ'ב – כ"ט בחשוון תרל"ה, 1874, ירושלים) (נקרא גם בשם-המשפחה הלועזי דרוקר, שפירושו "מדפיס") היה מדפיס ספרים ואיש ציבור ביישוב הישן בארץ ישראל במאה התשע עשרה. על-פי המסורת, שם המשפחה ב"ק מורכב מראשי התיבות "בעל קורא", תפקיד שבו שימש אחד מאבות המשפחה. ישראל ב"ק חידש את הדפוס העברי בארץ ישראל לאחר הפסקה של למעלה ממאתיים שנה.‏
<br /><br />
ישראל ב"ק עסק בהדפסת ספרים עבריים עוד בעיר הולדתו ברדיצ'ב בין השנים 1816–1825. את אומנותו זאת הוא הביא עמו בעלייתו לארץ ישראל.
<br /><br />


		</div>
		</div>

	
	</div>
</div>

<!--		
<div class="stone">
 autohide for video = &autohide=1&showinfo=0 
<object width="633" height="350">
<param name="movie" value="http://www.youtube.com/v/F1paeYI4UaU?version=3&amp;hl=en_US&amp;rel=0&autohide=1&showinfo=0"></param>
<param name="allowFullScreen" value="true"></param>
<param name="allowscriptaccess" value="always"></param>
<embed src="http://www.youtube.com/v/F1paeYI4UaU?version=3&amp;hl=en_US&amp;rel=0&autohide=1&showinfo=0" type="application/x-shockwave-flash" width="633" height="350" allowscriptaccess="always" allowfullscreen="true"></embed>
</object>

</div>
-->		
		<?php
	break;
	}



	case 20: {
		?>
		
<div class="stone">
	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:583px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:justify; overflow: visible; height: auto; width: 566px; margin-right: 10px; position: absolute; top: 0px;">

<div class="stone_name">
<h4>אברהם משה לונץ</h4>
</div>


עלה ארצה עם הוריו ב-1869 מעיר הולדתו קובנה. למד בירושלים בישיבת עץ חיים, השתלם גם בלימודי חול וקרא בספרות ההשכלה. יחד עם ישראל דב פרומקין יסד לונץ את הספרייה על שם משה מונטיפיורי, שהייתה הספרייה הציבורית הראשונה בירושלים, ונסגרה כעבור זמן קצר.
<br /><br />
ב-1873 התחיל לפרסם מאמרים בעיתונו של פרומקין, "חבצלת", ובהם מתח ביקורת קשה על שיטת החלוקה ועל הגבאים הממונים עליה.‏ עם זאת נחלץ להגנה על קהילת ירושלים מפני התקפותיו של ההיסטוריון היינריך גרץ.
<br /><br />
לאחר שפרסם כמה מאמרים על נושאים גאוגרפיים כתב לונץ ב-1876 את ספרו "נתיבות ציון וירושלים", ובשנת 1891 פרסם מורה דרך ראשון לירושלים בשפה העברית, וזאת בעקבות מורי הדרך הלועזיים הרבים על ארץ ישראל שנדפסו באותה עת עם התגברות זרם התיירים והמבקרים בארץ הקדושה. מאז ועד סוף ימיו המשיך את מחקריו בגאוגרפיה של ארץ ישראל, והשתמש למטרה זו גם בספריות של מוסדות נוצריים, דבר בלתי רגיל בירושלים דאז.
<br /><br />
ראייתו לקתה בהיותו בן 23 והוא נסע לווינה ולפריז לשם ריפוי, אך מאמצי הרופאים עלו בתוהו, והוא התעוור כעבור שנתיים.
<br /><br />
בסיועו של פרץ סמולנסקין פרסם לונץ בווינה ב-1882 את הכרך הראשון של "ירושלים, שנתון לידיעת ארץ ישראל". על שנתון זה עבד עד יום מותו, והוציא לאור במרוצת השנים 12 כרכים נוספים, שנדפסו בירושלים בבית דפוס של לונץ עצמו. משנת 1895 ועד שנת 1915 פרסם מדי שנה גם את "לוח ארץ ישראל", מעין אלמנך ספרותי.
<br /><br />
הוא אף ההדיר מספר ספרים גאוגרפיים בתוספת הערות משלו, כגון את "כפתור ופרח" לר' אשתורי הפרחי, את "פאת השולחן" לר' ישראל משקלוב ואת "תבואות הארץ" לר' יהוסף שווארץ. הוא גם הוציא לאור, בשלושת הכרכים של "המעמר", תעודות ומאמרים על חקר הארץ, והתחיל בפרסום מהדורה חדשה של התלמוד הירושלמי על-פי כתב יד בספריית הוותיקן. לונץ היה חבר בוועד הלשון העברית, וייסד בית חינוך לעיוורים בירושלים.
<br /><br />
כמו כן, ערך את השירון הראשון "כינור ציון", ובו חמישים שירים לאומיים על העם, הארץ והגעגועים לציון. בעקבות פרסום השירון הוא נשפט על ידי השלטון העות'מאני באשמת עידוד למרד, ובסופו של דבר נקנס, ספריו הוחרמו ובית הדפוס שבבעלותו נסגר.
<br /><br />


		</div>
		</div>

	
	</div>
</div>


			
		<?php
	break;
	}


	case 21: {
		?>
		
<div class="stone">
	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:583px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:justify; overflow: visible; height: auto; width: 566px; margin-right: 10px; position: absolute; top: 0px;">

<div class="stone_name">
<h4>יוסף מיוחס</h4>
</div>

יוסף מיוחס (בר"ן - בן רחמים נתן) (25 בינואר 1868 - 4 בספטמבר 1942). סופר, מורה ואיש ציבור בתקופת היישוב. חתנו של יחיאל מיכל פינס.
<br /><br />
יוסף מיוחס נולד בשנת 1868 בירושלים למשפחת רבנים ספרדית שהגיעה לארץ ישראל מאיזמיר במאה השבע עשרה. למד בישיבת "אוהל יוסף" ובבית הספר כי"ח. רישומי ילדותו בכפר השילוח גרמו לו לחבב את מנהגי הערבים, להתמסר ללימוד הערבית ולחקור את הפולקלור הערבי. לצד לימודים אלה, למד מיוחס גם לימודי יהדות ושפות נוספות. כחוקר פולקלור ערבי, תיאר מיוחס לעתים את עולמו של הפלח הערבי באופן ביקורתי ביותר.
<br /><br />
מיוחס ניהל בית ספר לבנים בירושלים. במשך כשלושים שנה שימש מורה לעברית, ערבית וצרפתית, בבית הספר של החברה האנגלית-יהודית בירושלים. היה ממייסדי בית המדרש למורים של "עזרה" ואף בו לימד ערבית.
<br /><br />
מיוחס כתב מאמרים בעיתונות העברית וחיבר ספרים. היה ממייסדי בית הספרים "מדרש אברבנאל" ו"גנזי יוסף", ולימים ממייסדי בית הספרים הלאומי והאוניברסיטאי בירושלים.
<br /><br />
היה מבוני ומייסדי שכונת שערי צדק בירושלים. היה יושב ראש "ועד העיר ליהודי ירושלים", גוף שקדם לוועד הקהילה שנוסד בתקופת המנדט הבריטי. הוא היה חבר בלשכות "בני ברית" בירושלים ובערים שונות בטורקיה, היה מראשי ועד העדה הספרדית בירושלים והשתתף בחלק נכבד של האגודות והמוסדות הציבוריים בירושלים ובארץ ישראל.
<br /><br />


		</div>
		</div>

	
	</div>
</div>


			
		<?php
	break;
	}


	case 22: {
		?>
		
<div class="stone">
	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:583px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:justify; overflow: visible; height: auto; width: 566px; margin-right: 10px; position: absolute; top: 0px;">

<div class="stone_name">
<h4>קדיש סילמן</h4>
</div>


		
קדיש יהודה-ליב סילמן (28 בנובמבר 1880, חנוכה תרמ"א, ליטא – 13 בנובמבר 1937, ט' בכסלו תרצ"ח, ירושלים), מורה, משורר, סופר, מתרגם ובלשן ארצישראלי. ממייסדי תל אביב ושכונת בית הכרם בירושלים.
<br /><br />

ובנוסף למד לימודים כלליים ובהם עברית, שאותהּ גם לימד בחשאי את חבריו ללימודים. הוא הוציא לאור שבועון בשם "הקול". עם תום לימודיו, לימד בבית הספר העברי בווילנה, "יהודיה". בשנת 1899 החל לפרסם סיפורים ומאמרים בעיתון "המליץ".
<br /><br />

בשנת 1905 נשא לאשה את אסתר כהן, בת עיירתו.
<br /><br />

בשנת 1907 עלה סילמן לארץ ישראל, לבדו. רק בשנת 1909 הצטרפו אליו אשתו אסתר ובתם ימימה (בארץ נולדו לבני הזוג ארבעה ילדים נוספים). הוא השתקע ביפו, ולימד בבית הספר לנערות של יחיאל יחיאלי.
<br /><br />

ב-1909 הייתה משפחת סילמן אחת מ־66 המשפחות שחברו לאגודת אחוזת בית להקמת העיר תל אביב. סילמן הגריל את המגרש ברחוב ליליינבלום 30.
<br /><br />

בהמשך מכר סילמן את ביתו ועבר לירושלים, שם היה בין מייסדי הגימנסיה העברית רחביה ומראשי "ועד העברית" בעת מלחמת השפות. לאחר מכן עבר לחיפה ולימד בבית הספר הריאלי העברי. ב-1923 שב לירושלים, והיה בין מייסדי שכונת בית הכרם. סילמן, שהיה זה שהעניק לשכונה את שמהּ, כיהן כיו"ר ועדת התרבות של השכונה. הוא נשא נאומים והרצאות שזכו להצלחה רבה. ביתו בבית הכרם היה בית-ועד לסופרים ומשוררים רבים, ובהם חיים נחמן ביאליק, רבי בנימין, ש"י עגנון, אורי צבי גרינברג, יהושע ייבין, דוד תדהר ואחרים.
<br /><br />


		</div>
		</div>

	
	</div>
</div>


			
		<?php
	break;
	}




	case 23: {
		?>
		
<div class="stone">
	<div class="stone_holder">

		<div class="jScrollPaneContainer jScrollPaneScrollable" tabindex="0" style="height:310px; width:583px;">
		<div id="jScrollPane" class="scroll-pane" style="text-align:justify; overflow: visible; height: auto; width: 566px; margin-right: 10px; position: absolute; top: 0px;">

<div class="stone_name">
<h4>הרב עוזיאל</h4>
</div>



נולד בירושלים לרב יוסף רפאל עוזיאל, שהיה נשיא בית הדין הרבני של הקהילה הספרדית בירושלים. התייתם מאביו בגיל ארבע עשרה. תקופה מסוימת למד אצל הרב יחיא צארום ראב"ד התימנים בירושלים. למד בתלמוד תורה "דורש ציון" ובישיבת "תפארת ירושלים". רבו המובהק היה ר' בן ציון אברהם קואינקה. נישא בגיל שלוש עשרה.
<br /><br />

כבר בגיל 20 התמנה הרב עוזיאל לרב בישיבת "תפארת ירושלים", ומאוחר יותר ייסד ישיבה נוספת לאברכים ספרדים - "מחזיקי תורה". ב-1911 התמנה לרב הקהילה הספרדית ביפו. בתקופת מלחמת העולם הראשונה הוגלה על ידי הטורקים לדמשק, בשל פעילותו הציבורית ומחאתו נגד רדיפת היהודים, אך הותר לשוב לארץ עוד בטרם הגעת הצבא הבריטי.
<br /><br />

ב-1919 נתמנה לנשיא תנועת "המזרחי" ואף ייצג אותה בוועידתה העולמית באמסטרדם.
<br /><br />

ב-1921 מונה לרבה של קהילת סלוניקי, שהייתה בת כששים אלף יהודים, במקומו של הרב יעקב מאיר שמונה להיות הראשון לציון. בתקופה זו פעל לחיזוק לימוד התורה, כמו גם הפצת השפה העברית והציונות. הוא קרא לנוער היהודי לעלות לארץ, לפני שמצב היהודים בסלוניקי יחמיר. ב-1923 חזר לארץ לתפקיד הרב הספרדי הראשי של תל אביב-יפו.
<br /><br />

השתתף בהפגנות נגד הספר הלבן (1939), אך עם פרוץ מלחמת העולם השנייה קרא לנוער היהודי בארץ ישראל להתגייס לבריגדה.
<br /><br />

מ-1939 עד מותו כיהן כראשון לציון והרב הראשי הספרדי של ארץ ישראל. עד להקמת המדינה, היה הרב עוזיאל חבר בוועד הלאומי, והשתתף בפגישות שבמסגרתן נוסדה הסוכנות היהודית. הוא גם ייצג את היישוב היהודי בפני השלטון הבריטי ובפני האו"ם.
<br /><br />

לאחר הקמת המדינה הפך לרב הספרדי הראשי ראשון של המדינה. בנוסף נשא בתואר הראשון לציון, כמנהג הספרדים מימי הטורקים. הוא עמד בראש הרבנות יחד עם הרב הרצוג. מסופר עליו שבזמן מלחמת העצמאות, כאשר הותקפה ירושלים על ידי הערבים, הוא חפר ביום השבת, משיקולים של "פיקוח נפש דוחה שבת", תעלות לחיילי צה"ל.

<br /><br />


		</div>
		</div>

	
	</div>
</div>


			
		<?php
	break;
	}



}



?>

<!-- ! this script from:style_stone.css, to create a nice scroll bar - for long text ! -->
<script type="text/javascript">
	$(function() {
		// this initialises the demo scollpanes on the page.
		$('#jScrollPane').jScrollPane({showArrows:true});
	});
</script>
