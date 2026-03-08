<script type="text/javascript">
<!--
if (document.images) {
	SLIDES.image = document.images.SLIDESIMG;
	// Create a function to ramp up the image opacity in Mozilla
	var fadein_opacity = 0;
	var fadein_img = SLIDES.image;
	function fadein(opacity) {
		if (typeof opacity != 'undefined') fadein_opacity = opacity;
		if (fadein_opacity < 1 && fadein_img && fadein_img.style &&
			typeof fadein_img.style.MozOpacity != 'undefined') {

				fadein_opacity += .05;
				fadein_img.style.MozOpacity = fadein_opacity;
				setTimeout("fadein()", 50);
			}
		}
		// Tell the slideshow to call our function whenever the slide is changed
		SLIDES.post_update_hook = function() { fadein(1); }
	}
//-->
</script>