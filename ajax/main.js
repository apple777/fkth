/**************************************************************************************
 * Javascript for the mousewheel for timeline, lines: 10-94
 * Include function for timeline UI, lines: 102-773
 * Include action for jScrollPane for stone UI, lines: 785-1003
 * Include action for jPlayer for UI, lines: 1013-1230
 
 * Include action for navBar for UI, lines: 1250
 * jQuery Bubble Popup v.2.3.1: 1285
 **************************************************************************************/



/* Copyright (c) 2006 Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 *
 * $LastChangedDate: 2007-12-20 09:02:08 -0600 (Thu, 20 Dec 2007) $
 * $Rev: 4265 $
 *
 * Version: 3.0
 * 
 * Requires: $ 1.2.2+
 */

(function($) {

$.event.special.mousewheel = {
	setup: function() {
		var handler = $.event.special.mousewheel.handler;
		
		// Fix pageX, pageY, clientX and clientY for mozilla
		if ( $.browser.mozilla )
			$(this).bind('mousemove.mousewheel', function(event) {
				$.data(this, 'mwcursorposdata', {
					pageX: event.pageX,
					pageY: event.pageY,
					clientX: event.clientX,
					clientY: event.clientY
				});
			});
	
		if ( this.addEventListener )
			this.addEventListener( ($.browser.mozilla ? 'DOMMouseScroll' : 'mousewheel'), handler, false);
		else
			this.onmousewheel = handler;
	},
	
	teardown: function() {
		var handler = $.event.special.mousewheel.handler;
		
		$(this).unbind('mousemove.mousewheel');
		
		if ( this.removeEventListener )
			this.removeEventListener( ($.browser.mozilla ? 'DOMMouseScroll' : 'mousewheel'), handler, false);
		else
			this.onmousewheel = function(){};
		
		$.removeData(this, 'mwcursorposdata');
	},
	
	handler: function(event) {
		var args = Array.prototype.slice.call( arguments, 1 );
		
		event = $.event.fix(event || window.event);
		// Get correct pageX, pageY, clientX and clientY for mozilla
		$.extend( event, $.data(this, 'mwcursorposdata') || {} );
		var delta = 0, returnValue = true;
		
		if ( event.wheelDelta ) delta = event.wheelDelta/120;
		if ( event.detail     ) delta = -event.detail/3;
//		if ( $.browser.opera  ) delta = -event.wheelDelta;
		
		event.data  = event.data || {};
		event.type  = "mousewheel";
		
		// Add delta to the front of the arguments
		args.unshift(delta);
		// Add event to the front of the arguments
		args.unshift(event);

		return $.event.handle.apply(this, args);
	}
};

$.fn.extend({
	mousewheel: function(fn) {
		return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
	},
	
	unmousewheel: function(fn) {
		return this.unbind("mousewheel", fn);
	}
});

})(jQuery);



/* from file: jScrollPane.js */



/* Copyright (c) 2009 Kelvin Luck (kelvin AT kelvinluck DOT com || http://www.kelvinluck.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * See http://kelvinluck.com/assets/jquery/jScrollPane/
 * $Id: jScrollPane.js 93 2010-06-01 08:17:28Z kelvin.luck $
 */

/**
 * Replace the vertical scroll bars on any matched elements with a fancy
 * styleable (via CSS) version. With JS disabled the elements will
 * gracefully degrade to the browsers own implementation of overflow:auto.
 * If the mousewheel plugin has been included on the page then the scrollable areas will also
 * respond to the mouse wheel.
 *
 * @example jQuery(".scroll-pane").jScrollPane();
 *
 * @name jScrollPane
 * @type jQuery
 * @param Object	settings	hash with options, described below.
 *								scrollbarWidth	-	The width of the generated scrollbar in pixels
 *								scrollbarMargin	-	The amount of space to leave on the side of the scrollbar in pixels
 *								wheelSpeed		-	The speed the pane will scroll in response to the mouse wheel in pixels
 *								showArrows		-	Whether to display arrows for the user to scroll with
 *								arrowSize		-	The height of the arrow buttons if showArrows=true
 *								animateTo		-	Whether to animate when calling scrollTo and scrollBy
 *								dragMinHeight	-	The minimum height to allow the drag bar to be
 *								dragMaxHeight	-	The maximum height to allow the drag bar to be
 *								animateInterval	-	The interval in milliseconds to update an animating scrollPane (default 100)
 *								animateStep		-	The amount to divide the remaining scroll distance by when animating (default 3)
 *								maintainPosition-	Whether you want the contents of the scroll pane to maintain it's position when you re-initialise it - so it doesn't scroll as you add more content (default true)
 *								tabIndex		-	The tabindex for this jScrollPane to control when it is tabbed to when navigating via keyboard (default 0)
 *								enableKeyboardNavigation - Whether to allow keyboard scrolling of this jScrollPane when it is focused (default true)
 *								animateToInternalLinks - Whether the move to an internal link (e.g. when it's focused by tabbing or by a hash change in the URL) should be animated or instant (default false)
 *								scrollbarOnLeft	-	Display the scrollbar on the left side?  (needs stylesheet changes, see examples.html)
 *								reinitialiseOnImageLoad - Whether the jScrollPane should automatically re-initialise itself when any contained images are loaded (default false)
 *								topCapHeight	-	The height of the "cap" area between the top of the jScrollPane and the top of the track/ buttons
 *								bottomCapHeight	-	The height of the "cap" area between the bottom of the jScrollPane and the bottom of the track/ buttons
 *								observeHash		-	Whether jScrollPane should attempt to automagically scroll to the correct place when an anchor inside the scrollpane is linked to (default true)
 * @return jQuery
 * @cat Plugins/jScrollPane
 * @author Kelvin Luck (kelvin AT kelvinluck DOT com || http://www.kelvinluck.com)
 */

(function($) {

$.jScrollPane = {
	active : []
};
$.fn.jScrollPane = function(settings)
{
	settings = $.extend({}, $.fn.jScrollPane.defaults, settings);

	var rf = function() { return false; };
	
	return this.each(
		function()
		{
			var $this = $(this);
			var paneEle = this;
			var currentScrollPosition = 0;
			var paneWidth;
			var paneHeight;
			var trackHeight;
			var trackOffset = settings.topCapHeight;
			var $container;
			
			if ($(this).parent().is('.jScrollPaneContainer')) {
				$container = $(this).parent();
				currentScrollPosition = settings.maintainPosition ? $this.position().top : 0;
				var $c = $(this).parent();
				paneWidth = $c.innerWidth();
				paneHeight = $c.outerHeight();
				$('>.jScrollPaneTrack, >.jScrollArrowUp, >.jScrollArrowDown, >.jScrollCap', $c).remove();
				$this.css({'top':0});
			} else {
				$this.data('originalStyleTag', $this.attr('style'));
				// Switch the element's overflow to hidden to ensure we get the size of the element without the scrollbars [http://plugins.jquery.com/node/1208]
				$this.css('overflow', 'hidden');
				this.originalPadding = $this.css('paddingTop') + ' ' + $this.css('paddingRight') + ' ' + $this.css('paddingBottom') + ' ' + $this.css('paddingLeft');
				this.originalSidePaddingTotal = (parseInt($this.css('paddingLeft')) || 0) + (parseInt($this.css('paddingRight')) || 0);
				paneWidth = $this.innerWidth();
				paneHeight = $this.innerHeight();
				$container = $('<div></div>')
					.attr({'className':'jScrollPaneContainer'})
					.css(
						{
							'height':paneHeight+'px', 
							'width':paneWidth+'px'
						}
					);
				if (settings.enableKeyboardNavigation) {
					$container.attr(
						'tabindex', 
						settings.tabIndex
					);
				}
				$this.wrap($container);
				$container = $this.parent();
				// deal with text size changes (if the jquery.em plugin is included)
				// and re-initialise the scrollPane so the track maintains the
				// correct size
				$(document).bind(
					'emchange', 
					function(e, cur, prev)
					{
						$this.jScrollPane(settings);
					}
				);
				
			}
			trackHeight = paneHeight;
			
			if (settings.reinitialiseOnImageLoad) {
				// code inspired by jquery.onImagesLoad: http://plugins.jquery.com/project/onImagesLoad
				// except we re-initialise the scroll pane when each image loads so that the scroll pane is always up to size...
				// TODO: Do I even need to store it in $.data? Is a local variable here the same since I don't pass the reinitialiseOnImageLoad when I re-initialise?
				var $imagesToLoad = $.data(paneEle, 'jScrollPaneImagesToLoad') || $('img', $this);
				var loadedImages = [];
				
				if ($imagesToLoad.length) {
					$imagesToLoad.each(function(i, val)	{
						$(this).bind('load readystatechange', function() {
							if($.inArray(i, loadedImages) == -1){ //don't double count images
								loadedImages.push(val); //keep a record of images we've seen
								$imagesToLoad = $.grep($imagesToLoad, function(n, i) {
									return n != val;
								});
								$.data(paneEle, 'jScrollPaneImagesToLoad', $imagesToLoad);
								var s2 = $.extend(settings, {reinitialiseOnImageLoad:false});
								$this.jScrollPane(s2); // re-initialise
							}
						}).each(function(i, val) {
							if(this.complete || this.complete===undefined) { 
								//needed for potential cached images
								this.src = this.src; 
							} 
						});
					});
				};
			}

			var p = this.originalSidePaddingTotal;
			var realPaneWidth = paneWidth - settings.scrollbarWidth - settings.scrollbarMargin - p;

			var cssToApply = {
				'height':'auto',
				'width': realPaneWidth + 'px'
			}

			if(settings.scrollbarOnLeft) {
				cssToApply.paddingLeft = settings.scrollbarMargin + settings.scrollbarWidth + 'px';
			} else {
				cssToApply.paddingRight = settings.scrollbarMargin + 'px';
			}

			$this.css(cssToApply);

			var contentHeight = $this.outerHeight();
			var percentInView = paneHeight / contentHeight;
			
			var isScrollable = percentInView < .99;
			$container[isScrollable ? 'addClass' : 'removeClass']('jScrollPaneScrollable');

			if (isScrollable) {
				$container.append(
					$('<div></div>').addClass('jScrollCap jScrollCapTop').css({height:settings.topCapHeight}),
					$('<div></div>').attr({'className':'jScrollPaneTrack'}).css({'width':settings.scrollbarWidth+'px'}).append(
						$('<div></div>').attr({'className':'jScrollPaneDrag'}).css({'width':settings.scrollbarWidth+'px'}).append(
							$('<div></div>').attr({'className':'jScrollPaneDragTop'}).css({'width':settings.scrollbarWidth+'px'}),
							$('<div></div>').attr({'className':'jScrollPaneDragBottom'}).css({'width':settings.scrollbarWidth+'px'})
						)
					),
					$('<div></div>').addClass('jScrollCap jScrollCapBottom').css({height:settings.bottomCapHeight})
				);
				
				var $track = $('>.jScrollPaneTrack', $container);
				var $drag = $('>.jScrollPaneTrack .jScrollPaneDrag', $container);
				
				
				var currentArrowDirection;
				var currentArrowTimerArr = [];// Array is used to store timers since they can stack up when dealing with keyboard events. This ensures all timers are cleaned up in the end, preventing an acceleration bug.
				var currentArrowInc;
				var whileArrowButtonDown = function() 
				{
					if (currentArrowInc > 4 || currentArrowInc % 4 == 0) {
						positionDrag(dragPosition + currentArrowDirection * mouseWheelMultiplier);
					}
					currentArrowInc++;
				};

				if (settings.enableKeyboardNavigation) {
					$container.bind(
						'keydown.jscrollpane',
						function(e) 
						{
							switch (e.keyCode) {
								case 38: //up
									currentArrowDirection = -1;
									currentArrowInc = 0;
									whileArrowButtonDown();
									currentArrowTimerArr[currentArrowTimerArr.length] = setInterval(whileArrowButtonDown, 100);
									return false;
								case 40: //down
									currentArrowDirection = 1;
									currentArrowInc = 0;
									whileArrowButtonDown();
									currentArrowTimerArr[currentArrowTimerArr.length] = setInterval(whileArrowButtonDown, 100);
									return false;
								case 33: // page up
								case 34: // page down
									// TODO
									return false;
								default:
							}
						}
					).bind(
						'keyup.jscrollpane',
						function(e) 
						{
							if (e.keyCode == 38 || e.keyCode == 40) {
								for (var i = 0; i < currentArrowTimerArr.length; i++) {
									clearInterval(currentArrowTimerArr[i]);
								}
								return false;
							}
						}
					);
				}

				if (settings.showArrows) {
					
					var currentArrowButton;
					var currentArrowInterval;

					var onArrowMouseUp = function(event)
					{
						$('html').unbind('mouseup', onArrowMouseUp);
						currentArrowButton.removeClass('jScrollActiveArrowButton');
						clearInterval(currentArrowInterval);
					};
					var onArrowMouseDown = function() {
						$('html').bind('mouseup', onArrowMouseUp);
						currentArrowButton.addClass('jScrollActiveArrowButton');
						currentArrowInc = 0;
						whileArrowButtonDown();
						currentArrowInterval = setInterval(whileArrowButtonDown, 100);
					};
					$container
						.append(
							$('<a></a>')
								.attr(
									{
										'href':'javascript:;', 
										'className':'jScrollArrowUp', 
										'tabindex':-1
									}
								)
								.css(
									{
										'width':settings.scrollbarWidth+'px',
										'top':settings.topCapHeight + 'px'
									}
								)
								.html('Scroll up')
								.bind('mousedown', function()
								{
									currentArrowButton = $(this);
									currentArrowDirection = -1;
									onArrowMouseDown();
									this.blur();
									return false;
								})
								.bind('click', rf),
							$('<a></a>')
								.attr(
									{
										'href':'javascript:;', 
										'className':'jScrollArrowDown', 
										'tabindex':-1
									}
								)
								.css(
									{
										'width':settings.scrollbarWidth+'px',
										'bottom':settings.bottomCapHeight + 'px'
									}
								)
								.html('Scroll down')
								.bind('mousedown', function()
								{
									currentArrowButton = $(this);
									currentArrowDirection = 1;
									onArrowMouseDown();
									this.blur();
									return false;
								})
								.bind('click', rf)
						);
					var $upArrow = $('>.jScrollArrowUp', $container);
					var $downArrow = $('>.jScrollArrowDown', $container);
				}
				
				if (settings.arrowSize) {
					trackHeight = paneHeight - settings.arrowSize - settings.arrowSize;
					trackOffset += settings.arrowSize;
				} else if ($upArrow) {
					var topArrowHeight = $upArrow.height();
					settings.arrowSize = topArrowHeight;
					trackHeight = paneHeight - topArrowHeight - $downArrow.height();
					trackOffset += topArrowHeight;
				}
				trackHeight -= settings.topCapHeight + settings.bottomCapHeight;
				$track.css({'height': trackHeight+'px', top:trackOffset+'px'})
				
				var $pane = $(this).css({'position':'absolute', 'overflow':'visible'});
				
				var currentOffset;
				var maxY;
				var mouseWheelMultiplier;
				// store this in a seperate variable so we can keep track more accurately than just updating the css property..
				var dragPosition = 0;
				var dragMiddle = percentInView*paneHeight/2;
				
				// pos function borrowed from tooltip plugin and adapted...
				var getPos = function (event, c) {
					var p = c == 'X' ? 'Left' : 'Top';
					return event['page' + c] || (event['client' + c] + (document.documentElement['scroll' + p] || document.body['scroll' + p])) || 0;
				};
				
				var ignoreNativeDrag = function() {	return false; };
				
				var initDrag = function()
				{
					ceaseAnimation();
					currentOffset = $drag.offset(false);
					currentOffset.top -= dragPosition;
					maxY = trackHeight - $drag[0].offsetHeight;
					mouseWheelMultiplier = 2 * settings.wheelSpeed * maxY / contentHeight;
				};
				
				var onStartDrag = function(event)
				{
					initDrag();
					dragMiddle = getPos(event, 'Y') - dragPosition - currentOffset.top;
					$('html').bind('mouseup', onStopDrag).bind('mousemove', updateScroll).bind('mouseleave', onStopDrag)
					if ($.browser.msie) {
						$('html').bind('dragstart', ignoreNativeDrag).bind('selectstart', ignoreNativeDrag);
					}
					return false;
				};
				var onStopDrag = function()
				{
					$('html').unbind('mouseup', onStopDrag).unbind('mousemove', updateScroll);
					dragMiddle = percentInView*paneHeight/2;
					if ($.browser.msie) {
						$('html').unbind('dragstart', ignoreNativeDrag).unbind('selectstart', ignoreNativeDrag);
					}
				};
				var positionDrag = function(destY)
				{
					$container.scrollTop(0);
					destY = destY < 0 ? 0 : (destY > maxY ? maxY : destY);
					dragPosition = destY;
					$drag.css({'top':destY+'px'});
					var p = destY / maxY;
					$this.data('jScrollPanePosition', (paneHeight-contentHeight)*-p);
					$pane.css({'top':((paneHeight-contentHeight)*p) + 'px'});
					$this.trigger('scroll');
					if (settings.showArrows) {
						$upArrow[destY == 0 ? 'addClass' : 'removeClass']('disabled');
						$downArrow[destY == maxY ? 'addClass' : 'removeClass']('disabled');
					}
				};
				var updateScroll = function(e)
				{
					positionDrag(getPos(e, 'Y') - currentOffset.top - dragMiddle);
				};
				
				var dragH = Math.max(Math.min(percentInView*(paneHeight-settings.arrowSize*2), settings.dragMaxHeight), settings.dragMinHeight);
				
				$drag.css(
					{'height':dragH+'px'}
				).bind('mousedown', onStartDrag);
				
				var trackScrollInterval;
				var trackScrollInc;
				var trackScrollMousePos;
				var doTrackScroll = function()
				{
					if (trackScrollInc > 8 || trackScrollInc%4==0) {
						positionDrag((dragPosition - ((dragPosition - trackScrollMousePos) / 2)));
					}
					trackScrollInc ++;
				};
				var onStopTrackClick = function()
				{
					clearInterval(trackScrollInterval);
					$('html').unbind('mouseup', onStopTrackClick).unbind('mousemove', onTrackMouseMove);
				};
				var onTrackMouseMove = function(event)
				{
					trackScrollMousePos = getPos(event, 'Y') - currentOffset.top - dragMiddle;
				};
				var onTrackClick = function(event)
				{
					initDrag();
					onTrackMouseMove(event);
					trackScrollInc = 0;
					$('html').bind('mouseup', onStopTrackClick).bind('mousemove', onTrackMouseMove);
					trackScrollInterval = setInterval(doTrackScroll, 100);
					doTrackScroll();
					return false;
				};
				
				$track.bind('mousedown', onTrackClick);
				
				$container.bind(
					'mousewheel',
					function (event, delta) {
						delta = delta || (event.wheelDelta ? event.wheelDelta / 120 : (event.detail) ?
-event.detail/3 : 0);
						initDrag();
						ceaseAnimation();
						var d = dragPosition;
						positionDrag(dragPosition - delta * mouseWheelMultiplier);
						var dragOccured = d != dragPosition;
						return !dragOccured;
					}
				);

				var _animateToPosition;
				var _animateToInterval;
				function animateToPosition()
				{
					var diff = (_animateToPosition - dragPosition) / settings.animateStep;
					if (diff > 1 || diff < -1) {
						positionDrag(dragPosition + diff);
					} else {
						positionDrag(_animateToPosition);
						ceaseAnimation();
					}
				}
				var ceaseAnimation = function()
				{
					if (_animateToInterval) {
						clearInterval(_animateToInterval);
						delete _animateToPosition;
					}
				};
				var scrollTo = function(pos, preventAni)
				{
					if (typeof pos == "string") {
						// Legal hash values aren't necessarily legal jQuery selectors so we need to catch any
						// errors from the lookup...
						try {
							$e = $(pos, $this);
						} catch (err) {
							return;
						}
						if (!$e.length) return;
						pos = $e.offset().top - $this.offset().top;
					}
					ceaseAnimation();
					var maxScroll = contentHeight - paneHeight;
					pos = pos > maxScroll ? maxScroll : pos;
					$this.data('jScrollPaneMaxScroll', maxScroll);
					var destDragPosition = pos/maxScroll * maxY;
					if (preventAni || !settings.animateTo) {
						positionDrag(destDragPosition);
					} else {
						$container.scrollTop(0);
						_animateToPosition = destDragPosition;
						_animateToInterval = setInterval(animateToPosition, settings.animateInterval);
					}
				};
				$this[0].scrollTo = scrollTo;
				
				$this[0].scrollBy = function(delta)
				{
					var currentPos = -parseInt($pane.css('top')) || 0;
					scrollTo(currentPos + delta);
				};
				
				initDrag();
				
				scrollTo(-currentScrollPosition, true);
			
				// Deal with it when the user tabs to a link or form element within this scrollpane
				$('*', this).bind(
					'focus',
					function(event)
					{
						var $e = $(this);
						
						// loop through parents adding the offset top of any elements that are relatively positioned between
						// the focused element and the jScrollPaneContainer so we can get the true distance from the top
						// of the focused element to the top of the scrollpane...
						var eleTop = 0;
						
						var preventInfiniteLoop = 100;
						
						while ($e[0] != $this[0]) {
							eleTop += $e.position().top;
							$e = $e.offsetParent();
							if (!preventInfiniteLoop--) {
								return;
							}
						}
						
						var viewportTop = -parseInt($pane.css('top')) || 0;
						var maxVisibleEleTop = viewportTop + paneHeight;
						var eleInView = eleTop > viewportTop && eleTop < maxVisibleEleTop;
						if (!eleInView) {
							var destPos = eleTop - settings.scrollbarMargin;
							if (eleTop > viewportTop) { // element is below viewport - scroll so it is at bottom.
								destPos += $(this).height() + 15 + settings.scrollbarMargin - paneHeight;
							}
							scrollTo(destPos);
						}
					}
				)
				
				
				if (settings.observeHash) {
					if (location.hash && location.hash.length > 1) {
						setTimeout(function(){
							scrollTo(location.hash);
						}, $.browser.safari ? 100 : 0);
					}
					
					// use event delegation to listen for all clicks on links and hijack them if they are links to
					// anchors within our content...
					$(document).bind('click', function(e){
						$target = $(e.target);
						if ($target.is('a')) {
							var h = $target.attr('href');
							if (h && h.substr(0, 1) == '#' && h.length > 1) {
								setTimeout(function(){
									scrollTo(h, !settings.animateToInternalLinks);
								}, $.browser.safari ? 100 : 0);
							}
						}
					});
				}
				
				// Deal with dragging and selecting text to make the scrollpane scroll...
				function onSelectScrollMouseDown(e)
				{
				   $(document).bind('mousemove.jScrollPaneDragging', onTextSelectionScrollMouseMove);
				   $(document).bind('mouseup.jScrollPaneDragging',   onSelectScrollMouseUp);
				  
				}
				
				var textDragDistanceAway;
				var textSelectionInterval;
				
				function onTextSelectionInterval()
				{
					direction = textDragDistanceAway < 0 ? -1 : 1;
					$this[0].scrollBy(textDragDistanceAway / 2);
				}

				function clearTextSelectionInterval()
				{
					if (textSelectionInterval) {
						clearInterval(textSelectionInterval);
						textSelectionInterval = undefined;
					}
				}
				
				function onTextSelectionScrollMouseMove(e)
				{
					var offset = $this.parent().offset().top;
					var maxOffset = offset + paneHeight;
					var mouseOffset = getPos(e, 'Y');
					textDragDistanceAway = mouseOffset < offset ? mouseOffset - offset : (mouseOffset > maxOffset ? mouseOffset - maxOffset : 0);
					if (textDragDistanceAway == 0) {
						clearTextSelectionInterval();
					} else {
						if (!textSelectionInterval) {
							textSelectionInterval  = setInterval(onTextSelectionInterval, 100);
						}
					}
				}

				function onSelectScrollMouseUp(e)
				{
				   $(document)
					  .unbind('mousemove.jScrollPaneDragging')
					  .unbind('mouseup.jScrollPaneDragging');
				   clearTextSelectionInterval();
				}

				$container.bind('mousedown.jScrollPane', onSelectScrollMouseDown);

				
				$.jScrollPane.active.push($this[0]);
				
			} else {
				$this.css(
					{
						'height':paneHeight+'px',
						'width':paneWidth-this.originalSidePaddingTotal+'px',
						'padding':this.originalPadding
					}
				);
				$this[0].scrollTo = $this[0].scrollBy = function() {};
				// clean up listeners
				$this.parent().unbind('mousewheel').unbind('mousedown.jScrollPane').unbind('keydown.jscrollpane').unbind('keyup.jscrollpane');
			}
			
		}
	)
};

$.fn.jScrollPaneRemove = function()
{
	$(this).each(function()
	{
		$this = $(this);
		var $c = $this.parent();
		if ($c.is('.jScrollPaneContainer')) {
			$this.css(
				{
					'top':'',
					'height':'',
					'width':'',
					'padding':'',
					'overflow':'',
					'position':''
				}
			);
			$this.attr('style', $this.data('originalStyleTag'));
			$c.after($this).remove();
		}
	});
}

$.fn.jScrollPane.defaults = {
	scrollbarWidth : 10,
	scrollbarMargin : 5,
	wheelSpeed : 18,
	showArrows : false,
	arrowSize : 0,
	animateTo : false,
	dragMinHeight : 1,
	dragMaxHeight : 99999,
	animateInterval : 100,
	animateStep: 3,
	maintainPosition: true,
	scrollbarOnLeft: false,
	reinitialiseOnImageLoad: false,
	tabIndex : 0,
	enableKeyboardNavigation: true,
	animateToInternalLinks: false,
	topCapHeight: 0,
	bottomCapHeight: 0,
	observeHash: true
};

// clean up the scrollTo expandos
$(window)
	.bind('unload', function() {
		var els = $.jScrollPane.active; 
		for (var i=0; i<els.length; i++) {
			els[i].scrollTo = els[i].scrollBy = null;
		}
	}
);

})(jQuery);





/* from file: jquery_timeline.js */





function titleSwitch(elementThis) {
	switch ($(elementThis).attr('id')){

	case 'title_hertzberg':
		//.hasClass יוצר קלאס שלא נמצא בדף באמת אלה בזיכרון של הדום
		if($(elementThis).hasClass('name')){
			$(elementThis).html('1827 – 1897');
				//$(elementThis).fadeOut().fadeIn();
		}
		else {
			$(elementThis).html('זאב הרצברג');
			//.css("text-align", "center");
				//$(elementThis).fadeOut().fadeIn();
		}
		$(elementThis).toggleClass('name');
				//$(elementThis).fadeOut().fadeIn();
		break;

	case 'title_frumkin':
		if($(elementThis).hasClass('name')){
			$(elementThis).html('1851 – 1914');
		}
		else {
			$(elementThis).html('ישראל דב פרומקין');
		}
		$(elementThis).toggleClass('name');
		break;
		
	case 'title_eliezer':
		if($(elementThis).hasClass('name')){
			$(elementThis).html('1858 – 1922');
		}
		else {
			$(elementThis).html('אליעזר בן-יהודה');
		}
		$(elementThis).toggleClass('name');
		break;
		
	case 'title_kook':
		if($(elementThis).hasClass('name')){
			$(elementThis).html('1865 – 1935');
		}
		else {
			$(elementThis).html('הרב אברהם קוק');
		}
		$(elementThis).toggleClass('name');
		break;
		
	case 'title_meyuchas':
		if($(elementThis).hasClass('name')){
			$(elementThis).html('1868 – 1942');
		}
		else {
			$(elementThis).html('יוסף מיוחס');
		}
		$(elementThis).toggleClass('name');
		break;
		
	case 'title_mordechai_halevy':
		if($(elementThis).hasClass('name')){
			$(elementThis).html('1875 – 1947');
		}
		else {
			$(elementThis).html('הרב מורדכי הלוי');
		}
		$(elementThis).toggleClass('name');
		break;
		
	case 'title_harav_uziel':
		if($(elementThis).hasClass('name')){
			$(elementThis).html('1880 – 1953');
		}
		else {
			$(elementThis).html('הרב עוזיאל');
		}
		$(elementThis).toggleClass('name');
		break;
		
	case 'title_itamar_leah':
		if($(elementThis).hasClass('name')){
			$(elementThis).html('1882 – 1943');
		}
		else {
			$(elementThis).html('לאה ואיתמר');
		}
		$(elementThis).toggleClass('name');
		break;
		
	case 'title_albert_ticho':
		if($(elementThis).hasClass('name')){
			$(elementThis).html('1883 – 1960');
		}
		else {
			$(elementThis).html('אלברט ואנה טיכו');
		}
		$(elementThis).toggleClass('name');
		break;
		
	case 'title_nissim_levy':
		if($(elementThis).hasClass('name')){
			$(elementThis).html('1888 – 1971');
		}
		else {
			$(elementThis).html('ניסים לוי');
		}
		$(elementThis).toggleClass('name');
		break;

	case 'title_mordechai_eliash':
		if($(elementThis).hasClass('name')){
			$(elementThis).html('1892 – 1950');
		}
		else {
			$(elementThis).html('מרדכי אליאש');
		}
		$(elementThis).toggleClass('name');
		break;
		

	case 'title_gershon_agron':
		if($(elementThis).hasClass('name')){
			$(elementThis).html('1894 – 1959');
		}
		else {
			$(elementThis).html('גרשון אגרון');
		}
		$(elementThis).toggleClass('name');
		break;
		

	case 'title_glick_family':
		if($(elementThis).hasClass('name')){
			$(elementThis).html('1897');
		}
		else {
			$(elementThis).html('משפחת גליק');
		}
		$(elementThis).toggleClass('name');
		break;
		

	case 'title_institute_blind':
		if($(elementThis).hasClass('name')){
			$(elementThis).html('1902 – 1910');
		}
		else {
			$(elementThis).html('בית חינוך עיוורים');
		}
		$(elementThis).toggleClass('name');
		break;
		
	case 'title_dailymail':
		if($(elementThis).hasClass('name')){
			$(elementThis).html('1919 – 1936');
		}
		else {
			$(elementThis).html('"דואר היום"');
		}
		$(elementThis).toggleClass('name');
		break;
		
	case 'title_alba_pharmacy':
		if($(elementThis).hasClass('name')){
			$(elementThis).html('1924');
		}
		else {
			$(elementThis).html('בית מרקחת אלבא');
		}
		$(elementThis).toggleClass('name');
		break;
		
   }
}

	$(document).ready(function () {        
		$('#timeline').mousedown(function (event) {
            $(this)
				.data('down', true)
                .data('x', event.clientX)
                .data('scrollLeft', this.scrollLeft);

            return false;
        }).mouseup(function (event) {
            $(this).data('down', false);
        }).mousemove(function (event) {
            if ($(this).data('down') == true) {
                this.scrollLeft = $(this).data('scrollLeft') + $(this).data('x') - event.clientX;
            }
        }).mousewheel(function (event, delta) {
            var currentPosition = $('#timeline').css("background-position");
			currentPosition = currentPosition.split('px');
			currentPosition = Number(currentPosition[0]);
			if (currentPosition<0){currentPosition=0}
			if (currentPosition>1200){currentPosition=1200}
			$('#timeline').css("background-position",((delta * 50)+currentPosition)+"px 0px");
			//add integration between thumb and film scroll
			this.scrollLeft -= (delta * 50);
            //this.scrollLeft -= (delta * 20);
        }).css({
            'overflow' : 'hidden',
            'cursor' : '-moz-grab',
            'opacity' : '0.8'
        });


        $('#timeline h3').hover(function () {
        	//במקום של נגיעת העכבר-מפעיל פונקציה של החלפת מילה
        	window.setTimeout(titleSwitch, 600, [this]);
		});
		
		$('.tl-events img').hover(function () {
        	$(this).fadeTo(250, 1);
        }, function () {
        	$(this).fadeTo(250, 0.8);
		});
    });
    
    $(window).mouseout(function (event) {
        if ($('#timeline').data('down')) {
            try {
                if (event.originalTarget.nodeName == 'BODY' || event.originalTarget.nodeName == 'HTML') {
                    $('#timeline').data('down', false);
                }                
            } catch (e) {}
        }
    });










/*	Website Design By: www.happyworm.com -->
 *	this code is most closer to the html file
 *	the source code is: jQuery.jPlayer.1.2.0.demos/demo-02.htm
 */

$(document).ready(function(){

	var playItem = 0;

	var myPlayList = [
		{name:"לאהוב בחורה אחת - כוכבה לוי",mp3:"jquery.jplayer/cd/5.mp3",ogg:"jquery.jplayer/cd/5.ogg"},
		{name:"חושו אחים חושו - מקהלת צדיקוב",mp3:"jquery.jplayer/cd/1.mp3",ogg:"jquery.jplayer/cd/1.ogg"},
		{name:"עצים בוכים לגשם - יצחק לוי",mp3:"jquery.jplayer/cd/2.mp3",ogg:"jquery.jplayer/cd/2.ogg"},
		{name:"על הירדן - שמעון ישראלי",mp3:"jquery.jplayer/cd/3.mp3",ogg:"jquery.jplayer/cd/3.ogg"},
		{name:"קולי שמע וראה דמע - זלמן ריבלין",mp3:"jquery.jplayer/cd/4.mp3",ogg:"jquery.jplayer/cd/4.ogg"},
		{name:"אדון הסליחות - יוסי בנאי והמקלה",mp3:"jquery.jplayer/cd/6.mp3",ogg:"jquery.jplayer/cd/6.ogg"},
		{name:"יגדל אלוהים חי - יהורם גאון והמקלה",mp3:"jquery.jplayer/cd/7.mp3",ogg:"jquery.jplayer/cd/7.ogg"},
		{name:"שמע קולנו - זלמן ריבלין והמקלה",mp3:"jquery.jplayer/cd/8.mp3",ogg:"jquery.jplayer/cd/8.ogg"}
	];

	// Local copy of jQuery selectors, for performance.
	//var jpPlayTime = $("#jplayer_play_time");
	//var jpTotalTime = $("#jplayer_total_time");
	var jpTimeLeft = $("#jplayer_time_remain");


	$("#jquery_jplayer").jPlayer({
		ready: function() {
			displayPlayList();
			playListInit(true); // Parameter is a boolean for autoplay.
		},
		oggSupport: true
	})
	.jPlayer("onProgressChange", function(loadPercent, playedPercentRelative, playedPercentAbsolute, playedTime, totalTime, timeLeft) {

		//jpPlayTime.text($.jPlayer.convertTime(playedTime));
		//jpTotalTime.text($.jPlayer.convertTime(totalTime));
		timeLeft = totalTime - playedTime;
		
		jpTimeLeft.text("-" + $.jPlayer.convertTime(timeLeft));

	})
	.jPlayer("onSoundComplete", function() {
		playListNext();
	});

	$("#jplayer_previous").click( function() {
		playListPrev();
		$(this).blur();
		return false;
	});

	$("#jplayer_next").click( function() {
		playListNext();
		$(this).blur();
		return false;
	});

	function displayPlayList() {
		$("#jplayer_playlist ul").empty()/*.css({"height" : "53px"})*/;

        
		for (i=0; i < myPlayList.length; i++) {
			var listItem = (i == myPlayList.length-1) ? "<li class='jplayer_playlist_item_last'>" : "<li>";
			listItem += "<a id='jplayer_playlist_item_"+i+"' tabindex='1'>"+ myPlayList[i].name +"</a></li>";
			$("#jplayer_playlist ul").append(listItem);
			$("#jplayer_playlist_item_"+i).data( "index", i ).click( function() {
				var index = $(this).data("index");
				if (playItem != index) {
					playListChange( index );
				} else {
					$("#jquery_jplayer").jPlayer("play");
				}
				$(this).blur();
				return false;
			});
		}
	}

	function playListInit(autoplay) {
		if(autoplay) {
			playListChange( playItem );
		} else {
			playListConfig( playItem );
		}
	}

/*	function playListConfig( index ) {
		$("#jplayer_playlist_item_"+playItem).removeClass("jplayer_playlist_current").parent().removeClass("jplayer_playlist_current");
		$("#jplayer_playlist_item_"+index).addClass("jplayer_playlist_current").parent().addClass("jplayer_playlist_current");
		playItem = index;
		$("#jquery_jplayer").jPlayer("setFile", myPlayList[playItem].mp3, myPlayList[playItem].ogg);
	}
*/
	//adding show track current song
	function playListConfig( index ) {
		$("#jplayer_title_track").text(myPlayList[playItem].name);
		playItem = index;
		$("#jquery_jplayer").jPlayer("setFile", myPlayList[playItem].mp3, myPlayList[playItem].ogg);
	}

	function playListChange( index ) {
		playListConfig( index );
		$("#jquery_jplayer").jPlayer("play");
	}

	function playListNext() {
		var index = (playItem+1 < myPlayList.length) ? playItem+1 : 0;
		playListChange( index );
	}

	function playListPrev() {
		var index = (playItem-1 >= 0) ? playItem-1 : myPlayList.length-1;
		playListChange( index );
	}
});





/* form file: jquery.jplayer.min */


/*
 * jPlayer Plugin for jQuery JavaScript Library
 * http://www.happyworm.com/jquery/jplayer
 *
 * Copyright (c) 2009 - 2010 Happyworm Ltd
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * Author: Mark J Panaghiston
 * Version: 1.2.0
 * Date: 11th July 2010
 */
// _limitValue //
(function(c){function k(a,b){var d=function(e){e=c[a][e]||[];return typeof e=="string"?e.split(/,?\s+/):e}("getter");return c.inArray(b,d)!=-1}c.fn.jPlayer=function(a){var b=typeof a=="string",d=Array.prototype.slice.call(arguments,1);if(b&&a.substring(0,1)=="_")return this;if(b&&k("jPlayer",a,d)){var e=c.data(this[0],"jPlayer");return e?e[a].apply(e,d):undefined}return this.each(function(){var h=c.data(this,"jPlayer");!h&&!b&&c.data(this,"jPlayer",new c.jPlayer(this,a))._init();h&&b&&c.isFunction(h[a])&&
h[a].apply(h,d)})};c.jPlayer=function(a,b){this.options=c.extend({},b);this.element=c(a)};c.jPlayer.getter="jPlayerOnProgressChange jPlayerOnSoundComplete jPlayerVolume jPlayerReady getData jPlayerController";c.jPlayer.defaults={cssPrefix:"jqjp",swfPath:"js",volume:80,oggSupport:false,nativeSupport:true,preload:"none",customCssIds:false,graphicsFix:true,errorAlerts:false,warningAlerts:false,position:"absolute",width:"0",height:"0",top:"0",left:"0",quality:"high",bgcolor:"#ffffff"};c.jPlayer._config=
{version:"1.2.0",swfVersionRequired:"1.2.0",swfVersion:"unknown",jPlayerControllerId:undefined,delayedCommandId:undefined,isWaitingForPlay:false,isFileSet:false};c.jPlayer._diag={isPlaying:false,src:"",loadPercent:0,playedPercentRelative:0,playedPercentAbsolute:0,playedTime:0,totalTime:0};c.jPlayer._cssId={play:"jplayer_play",pause:"jplayer_pause",stop:"jplayer_stop",loadBar:"jplayer_load_bar",playBar:"jplayer_play_bar",volumeMin:"jplayer_volume_min",volumeMax:"jplayer_volume_max",volumeBar:"jplayer_volume_bar",
volumeBarValue:"jplayer_volume_bar_value"};c.jPlayer.count=0;c.jPlayer.timeFormat={showHour:false,showMin:true,showSec:true,padHour:false,padMin:true,padSec:true,sepHour:":",sepMin:":",sepSec:""};c.jPlayer.convertTime=function(a){var b=new Date(a),d=b.getUTCHours();a=b.getUTCMinutes();b=b.getUTCSeconds();d=c.jPlayer.timeFormat.padHour&&d<10?"0"+d:d;a=c.jPlayer.timeFormat.padMin&&a<10?"0"+a:a;b=c.jPlayer.timeFormat.padSec&&b<10?"0"+b:b;return(c.jPlayer.timeFormat.showHour?d+c.jPlayer.timeFormat.sepHour:
"")+(c.jPlayer.timeFormat.showMin?a+c.jPlayer.timeFormat.sepMin:"")+(c.jPlayer.timeFormat.showSec?b+c.jPlayer.timeFormat.sepSec:"")};c.jPlayer.prototype={_init:function(){var a=this,b=this.element;this.config=c.extend({},c.jPlayer.defaults,this.options,c.jPlayer._config);this.config.diag=c.extend({},c.jPlayer._diag);this.config.cssId={};this.config.cssSelector={};this.config.cssDisplay={};this.config.clickHandler={};this.element.data("jPlayer.config",this.config);c.extend(this.config,{id:this.element.attr("id"),
swf:this.config.swfPath+(this.config.swfPath!=""&&this.config.swfPath.slice(-1)!="/"?"/":"")+"Jplayer.swf",fid:this.config.cssPrefix+"_flash_"+c.jPlayer.count,aid:this.config.cssPrefix+"_audio_"+c.jPlayer.count,hid:this.config.cssPrefix+"_force_"+c.jPlayer.count,i:c.jPlayer.count,volume:this._limitValue(this.config.volume,0,10),autobuffer:this.config.preload!="none"});c.jPlayer.count++;if(this.config.ready!=undefined)if(c.isFunction(this.config.ready))this.jPlayerReadyCustom=this.config.ready;else this._warning("Constructor's ready option is not a function.");
this.config.audio=document.createElement("audio");this.config.audio.id=this.config.aid;c.extend(this.config,{canPlayMP3:!!(this.config.audio.canPlayType?""!=this.config.audio.canPlayType("audio/mpeg")&&"no"!=this.config.audio.canPlayType("audio/mpeg"):false),canPlayOGG:!!(this.config.audio.canPlayType?""!=this.config.audio.canPlayType("audio/ogg")&&"no"!=this.config.audio.canPlayType("audio/ogg"):false),aSel:c("#"+this.config.aid)});c.extend(this.config,{html5:!!(this.config.oggSupport?this.config.canPlayOGG?
true:this.config.canPlayMP3:this.config.canPlayMP3)});c.extend(this.config,{usingFlash:!(this.config.html5&&this.config.nativeSupport),usingMP3:!(this.config.oggSupport&&this.config.canPlayOGG&&this.config.nativeSupport)});var d={setButtons:function(g,f){a.config.diag.isPlaying=f;if(a.config.cssId.play!=undefined&&a.config.cssId.pause!=undefined)if(f){a.config.cssSelector.play.css("display","none");a.config.cssSelector.pause.css("display",a.config.cssDisplay.pause)}else{a.config.cssSelector.play.css("display",
a.config.cssDisplay.play);a.config.cssSelector.pause.css("display","none")}if(f)a.config.isWaitingForPlay=false}},e={setFile:function(g,f){try{a._getMovie().fl_setFile_mp3(f);a.config.autobuffer&&b.trigger("jPlayer.load");a.config.diag.src=f;a.config.isFileSet=true;b.trigger("jPlayer.setButtons",false)}catch(j){a._flashError(j)}},clearFile:function(){try{b.trigger("jPlayer.setButtons",false);a._getMovie().fl_clearFile_mp3();a.config.diag.src="";a.config.isFileSet=false}catch(g){a._flashError(g)}},
load:function(){try{a._getMovie().fl_load_mp3()}catch(g){a._flashError(g)}},play:function(){try{a._getMovie().fl_play_mp3()&&b.trigger("jPlayer.setButtons",true)}catch(g){a._flashError(g)}},pause:function(){try{a._getMovie().fl_pause_mp3()&&b.trigger("jPlayer.setButtons",false)}catch(g){a._flashError(g)}},stop:function(){try{a._getMovie().fl_stop_mp3()&&b.trigger("jPlayer.setButtons",false)}catch(g){a._flashError(g)}},playHead:function(g,f){try{a._getMovie().fl_play_head_mp3(f)&&b.trigger("jPlayer.setButtons",
true)}catch(j){a._flashError(j)}},playHeadTime:function(g,f){try{a._getMovie().fl_play_head_time_mp3(f)&&b.trigger("jPlayer.setButtons",true)}catch(j){a._flashError(j)}},volume:function(g,f){a.config.volume=f;try{a._getMovie().fl_volume_mp3(f)}catch(j){a._flashError(j)}}},h={setFile:function(g,f,j){a.config.diag.src=a.config.usingMP3?f:j;a.config.isFileSet&&!a.config.isWaitingForPlay&&b.trigger("jPlayer.pause");a.config.audio.autobuffer=a.config.autobuffer;a.config.audio.preload=a.config.preload;
if(a.config.autobuffer){a.config.audio.src=a.config.diag.src;a.config.audio.load()}else a.config.isWaitingForPlay=true;a.config.isFileSet=true;a.jPlayerOnProgressChange(0,0,0,0,0);clearInterval(a.config.jPlayerControllerId);if(a.config.autobuffer)a.config.jPlayerControllerId=window.setInterval(function(){a.jPlayerController(false)},100);clearInterval(a.config.delayedCommandId)},clearFile:function(){a.setFile("","");a.config.isWaitingForPlay=false;a.config.isFileSet=false},load:function(){if(a.config.isFileSet)if(a.config.isWaitingForPlay){a.config.audio.autobuffer=
true;a.config.audio.preload="auto";a.config.audio.src=a.config.diag.src;a.config.audio.load();a.config.isWaitingForPlay=false;clearInterval(a.config.jPlayerControllerId);a.config.jPlayerControllerId=window.setInterval(function(){a.jPlayerController(false)},100)}},play:function(){if(a.config.isFileSet){if(a.config.isWaitingForPlay){a.config.audio.src=a.config.diag.src;a.config.audio.load()}a.config.audio.play();b.trigger("jPlayer.setButtons",true);clearInterval(a.config.jPlayerControllerId);a.config.jPlayerControllerId=
window.setInterval(function(){a.jPlayerController(false)},100);clearInterval(a.config.delayedCommandId)}},pause:function(){if(a.config.isFileSet){a.config.audio.pause();b.trigger("jPlayer.setButtons",false);clearInterval(a.config.delayedCommandId)}},stop:function(){if(a.config.isFileSet)try{b.trigger("jPlayer.pause");a.config.audio.currentTime=0;clearInterval(a.config.jPlayerControllerId);a.config.jPlayerControllerId=window.setInterval(function(){a.jPlayerController(true)},100)}catch(g){clearInterval(a.config.delayedCommandId);
a.config.delayedCommandId=window.setTimeout(function(){a.stop()},100)}},playHead:function(g,f){if(a.config.isFileSet)try{b.trigger("jPlayer.load");if(typeof a.config.audio.buffered=="object"&&a.config.audio.buffered.length>0)a.config.audio.currentTime=f*a.config.audio.buffered.end(a.config.audio.buffered.length-1)/100;else if(a.config.audio.duration>0&&!isNaN(a.config.audio.duration))a.config.audio.currentTime=f*a.config.audio.duration/100;else throw"e";b.trigger("jPlayer.play")}catch(j){b.trigger("jPlayer.play");
b.trigger("jPlayer.pause");a.config.delayedCommandId=window.setTimeout(function(){a.playHead(f)},100)}},playHeadTime:function(g,f){if(a.config.isFileSet)try{b.trigger("jPlayer.load");a.config.audio.currentTime=f/1E3;b.trigger("jPlayer.play")}catch(j){b.trigger("jPlayer.play");b.trigger("jPlayer.pause");a.config.delayedCommandId=window.setTimeout(function(){a.playHeadTime(f)},100)}},volume:function(g,f){a.config.volume=f;a.config.audio.volume=f/100;a.jPlayerVolume(f)}};this.config.usingFlash?c.extend(d,
e):c.extend(d,h);for(var i in d){e="jPlayer."+i;this.element.unbind(e);this.element.bind(e,d[i])}if(this.config.usingFlash)if(this._checkForFlash(8))if(c.browser.msie){i='<object id="'+this.config.fid+'"';i+=' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';i+=' codebase="'+document.URL.substring(0,document.URL.indexOf(":"))+'://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"';i+=' type="application/x-shockwave-flash"';i+=' width="'+this.config.width+'" height="'+this.config.height+
'">';i+="</object>";d=[];d[0]='<param name="movie" value="'+this.config.swf+'" />';d[1]='<param name="quality" value="high" />';d[2]='<param name="FlashVars" value="id='+escape(this.config.id)+"&fid="+escape(this.config.fid)+"&vol="+this.config.volume+'" />';d[3]='<param name="allowScriptAccess" value="always" />';d[4]='<param name="bgcolor" value="'+this.config.bgcolor+'" />';i=document.createElement(i);for(e=0;e<d.length;e++)i.appendChild(document.createElement(d[e]));this.element.html(i)}else{d=
'<embed name="'+this.config.fid+'" id="'+this.config.fid+'" src="'+this.config.swf+'"';d+=' width="'+this.config.width+'" height="'+this.config.height+'" bgcolor="'+this.config.bgcolor+'"';d+=' quality="high" FlashVars="id='+escape(this.config.id)+"&fid="+escape(this.config.fid)+"&vol="+this.config.volume+'"';d+=' allowScriptAccess="always"';d+=' type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';this.element.html(d)}else this.element.html("<p>Flash 8 or above is not installed. <a href='http://get.adobe.com/flashplayer'>Get Flash!</a></p>");
else{this.config.audio.autobuffer=this.config.autobuffer;this.config.audio.preload=this.config.preload;this.config.audio.addEventListener("canplay",function(){var g=0.1*Math.random();a.config.audio.volume=(a.config.volume+(a.config.volume<50?g:-g))/100},false);this.config.audio.addEventListener("ended",function(){clearInterval(a.config.jPlayerControllerId);a.jPlayerOnSoundComplete()},false);this.element.append(this.config.audio)}this.element.css({position:this.config.position,top:this.config.top,
left:this.config.left});if(this.config.graphicsFix){this.element.append('<div id="'+this.config.hid+'"></div>');c.extend(this.config,{hSel:c("#"+this.config.hid)});this.config.hSel.css({"text-indent":"-9999px"})}this.config.customCssIds||c.each(c.jPlayer._cssId,function(g,f){a.cssId(g,f)});if(!this.config.usingFlash){this.element.css({left:"-9999px"});window.setTimeout(function(){a.volume(a.config.volume);a.jPlayerReady()},100)}},jPlayerReady:function(a){if(this.config.usingFlash){this.config.swfVersion=
a;this.config.swfVersionRequired!=this.config.swfVersion&&this._error("jPlayer's JavaScript / SWF version mismatch!\n\nJavaScript requires SWF : "+this.config.swfVersionRequired+"\nThe Jplayer.swf used is : "+this.config.swfVersion)}else this.config.swfVersion="n/a";this.jPlayerReadyCustom()},jPlayerReadyCustom:function(){},setFile:function(a,b){this.element.trigger("jPlayer.setFile",[a,b])},clearFile:function(){this.element.trigger("jPlayer.clearFile")},load:function(){this.element.trigger("jPlayer.load")},
play:function(){this.element.trigger("jPlayer.play")},pause:function(){this.element.trigger("jPlayer.pause")},stop:function(){this.element.trigger("jPlayer.stop")},playHead:function(a){this.element.trigger("jPlayer.playHead",[a])},playHeadTime:function(a){this.element.trigger("jPlayer.playHeadTime",[a])},volume:function(a){a=this._limitValue(a,0,100);this.element.trigger("jPlayer.volume",[a])},cssId:function(a,b){var d=this;if(typeof b=="string")if(c.jPlayer._cssId[a]){this.config.cssId[a]!=undefined&&
this.config.cssSelector[a].unbind("click",this.config.clickHandler[a]);this.config.cssId[a]=b;this.config.cssSelector[a]=c("#"+b);this.config.clickHandler[a]=function(h){d[a](h);c(this).blur();return false};this.config.cssSelector[a].click(this.config.clickHandler[a]);var e=this.config.cssSelector[a].css("display");if(a=="play")this.config.cssDisplay.pause=e;if(!(a=="pause"&&e=="none")){this.config.cssDisplay[a]=e;a=="pause"&&this.config.cssSelector[a].css("display","none")}}else this._warning("Unknown/Illegal function in cssId\n\njPlayer('cssId', '"+
a+"', '"+b+"')");else this._warning("cssId CSS Id must be a string\n\njPlayer('cssId', '"+a+"', "+b+")")},loadBar:function(a){if(this.config.cssId.loadBar!=undefined){var b=this.config.cssSelector.loadBar.offset();a=a.pageX-b.left;b=this.config.cssSelector.loadBar.width();this.playHead(100*a/b)}},playBar:function(a){this.loadBar(a)},onProgressChange:function(a){if(c.isFunction(a))this.onProgressChangeCustom=a;else this._warning("onProgressChange parameter is not a function.")},onProgressChangeCustom:function(){},
jPlayerOnProgressChange:function(a,b,d,e,h){this.config.diag.loadPercent=a;this.config.diag.playedPercentRelative=b;this.config.diag.playedPercentAbsolute=d;this.config.diag.playedTime=e;this.config.diag.totalTime=h;this.config.cssId.loadBar!=undefined&&this.config.cssSelector.loadBar.width(a+"%");this.config.cssId.playBar!=undefined&&this.config.cssSelector.playBar.width(b+"%");this.onProgressChangeCustom(a,b,d,e,h);this._forceUpdate()},jPlayerController:function(a){var b=0,d=0,e=0,h=0,i=0;if(this.config.audio.readyState>=
1){b=this.config.audio.currentTime*1E3;d=this.config.audio.duration*1E3;d=isNaN(d)?0:d;e=d>0?100*b/d:0;if(typeof this.config.audio.buffered=="object"&&this.config.audio.buffered.length>0){h=100*this.config.audio.buffered.end(this.config.audio.buffered.length-1)/this.config.audio.duration;i=100*this.config.audio.currentTime/this.config.audio.buffered.end(this.config.audio.buffered.length-1)}else{h=100;i=e}}!this.config.diag.isPlaying&&h>=100&&clearInterval(this.config.jPlayerControllerId);a?this.jPlayerOnProgressChange(h,
0,0,0,d):this.jPlayerOnProgressChange(h,i,e,b,d)},volumeMin:function(){this.volume(0)},volumeMax:function(){this.volume(100)},volumeBar:function(a){if(this.config.cssId.volumeBar!=undefined){var b=this.config.cssSelector.volumeBar.offset();a=a.pageX-b.left;b=this.config.cssSelector.volumeBar.width();this.volume(100*a/b)}},volumeBarValue:function(a){this.volumeBar(a)},jPlayerVolume:function(a){if(this.config.cssId.volumeBarValue!=null){this.config.cssSelector.volumeBarValue.width(a+"%");this._forceUpdate()}},
onSoundComplete:function(a){if(c.isFunction(a))this.onSoundCompleteCustom=a;else this._warning("onSoundComplete parameter is not a function.")},onSoundCompleteCustom:function(){},jPlayerOnSoundComplete:function(){this.element.trigger("jPlayer.setButtons",false);this.onSoundCompleteCustom()},getData:function(a){for(var b=a.split("."),d=this.config,e=0;e<b.length;e++)if(d[b[e]]!=undefined)d=d[b[e]];else{this._warning("Undefined data requested.\n\njPlayer('getData', '"+a+"')");return}return d},_getMovie:function(){return document[this.config.fid]},
_checkForFlash:function(a){var b=false,d;if(window.ActiveXObject)try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+a);b=true}catch(e){}else if(navigator.plugins&&navigator.mimeTypes.length>0)if(d=navigator.plugins["Shockwave Flash"])if(navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/,"$1")>=a)b=true;return b},_forceUpdate:function(){this.config.graphicsFix&&this.config.hSel.text(""+Math.random())},_limitValue:function(a,b,d){return a<b?b:a>d?d:a},_flashError:function(a){this._error("Problem with Flash component.\n\nCheck the swfPath points at the Jplayer.swf path.\n\nswfPath = "+
this.config.swfPath+"\nurl: "+this.config.swf+"\n\nError: "+a.message)},_error:function(a){this.config.errorAlerts&&this._alert("Error!\n\n"+a)},_warning:function(a){this.config.warningAlerts&&this._alert("Warning!\n\n"+a)},_alert:function(a){alert("jPlayer "+this.config.version+" : id='"+this.config.id+"' : "+a)}}})(jQuery);









/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 * 
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 *
 * Version: 1.3.1 (05/03/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function(b){var m,u,x,g,D,i,z,A,B,p=0,e={},q=[],n=0,c={},j=[],E=null,s=new Image,G=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,S=/[^\.]\.(swf)\s*$/i,H,I=1,k,l,h=false,y=b.extend(b("<div/>")[0],{prop:0}),v=0,O=!b.support.opacity&&!window.XMLHttpRequest,J=function(){u.hide();s.onerror=s.onload=null;E&&E.abort();m.empty()},P=function(){b.fancybox('<p id="fancybox_error">The requested content cannot be loaded.<br />Please try again later.</p>',{scrolling:"no",padding:20,transitionIn:"none",transitionOut:"none"})},
K=function(){return[b(window).width(),b(window).height(),b(document).scrollLeft(),b(document).scrollTop()]},T=function(){var a=K(),d={},f=c.margin,o=c.autoScale,t=(20+f)*2,w=(20+f)*2,r=c.padding*2;if(c.width.toString().indexOf("%")>-1){d.width=a[0]*parseFloat(c.width)/100-40;o=false}else d.width=c.width+r;if(c.height.toString().indexOf("%")>-1){d.height=a[1]*parseFloat(c.height)/100-40;o=false}else d.height=c.height+r;if(o&&(d.width>a[0]-t||d.height>a[1]-w))if(e.type=="image"||e.type=="swf"){t+=r;
w+=r;o=Math.min(Math.min(a[0]-t,c.width)/c.width,Math.min(a[1]-w,c.height)/c.height);d.width=Math.round(o*(d.width-r))+r;d.height=Math.round(o*(d.height-r))+r}else{d.width=Math.min(d.width,a[0]-t);d.height=Math.min(d.height,a[1]-w)}d.top=a[3]+(a[1]-(d.height+40))*0.5;d.left=a[2]+(a[0]-(d.width+40))*0.5;if(c.autoScale===false){d.top=Math.max(a[3]+f,d.top);d.left=Math.max(a[2]+f,d.left)}return d},U=function(a){if(a&&a.length)switch(c.titlePosition){case "inside":return a;case "over":return'<span id="fancybox-title-over">'+
a+"</span>";default:return'<span id="fancybox-title-wrap"><span id="fancybox-title-left"></span><span id="fancybox-title-main">'+a+'</span><span id="fancybox-title-right"></span></span>'}return false},V=function(){var a=c.title,d=l.width-c.padding*2,f="fancybox-title-"+c.titlePosition;b("#fancybox-title").remove();v=0;if(c.titleShow!==false){a=b.isFunction(c.titleFormat)?c.titleFormat(a,j,n,c):U(a);if(!(!a||a==="")){b('<div id="fancybox-title" class="'+f+'" />').css({width:d,paddingLeft:c.padding,
paddingRight:c.padding}).html(a).appendTo("body");switch(c.titlePosition){case "inside":v=b("#fancybox-title").outerHeight(true)-c.padding;l.height+=v;break;case "over":b("#fancybox-title").css("bottom",c.padding);break;default:b("#fancybox-title").css("bottom",b("#fancybox-title").outerHeight(true)*-1);break}b("#fancybox-title").appendTo(D).hide()}}},W=function(){b(document).unbind("keydown.fb").bind("keydown.fb",function(a){if(a.keyCode==27&&c.enableEscapeButton){a.preventDefault();b.fancybox.close()}else if(a.keyCode==
37){a.preventDefault();b.fancybox.prev()}else if(a.keyCode==39){a.preventDefault();b.fancybox.next()}});if(b.fn.mousewheel){g.unbind("mousewheel.fb");j.length>1&&g.bind("mousewheel.fb",function(a,d){a.preventDefault();h||d===0||(d>0?b.fancybox.prev():b.fancybox.next())})}if(c.showNavArrows){if(c.cyclic&&j.length>1||n!==0)A.show();if(c.cyclic&&j.length>1||n!=j.length-1)B.show()}},X=function(){var a,d;if(j.length-1>n){a=j[n+1].href;if(typeof a!=="undefined"&&a.match(G)){d=new Image;d.src=a}}if(n>0){a=
j[n-1].href;if(typeof a!=="undefined"&&a.match(G)){d=new Image;d.src=a}}},L=function(){i.css("overflow",c.scrolling=="auto"?c.type=="image"||c.type=="iframe"||c.type=="swf"?"hidden":"auto":c.scrolling=="yes"?"auto":"visible");if(!b.support.opacity){i.get(0).style.removeAttribute("filter");g.get(0).style.removeAttribute("filter")}b("#fancybox-title").show();c.hideOnContentClick&&i.one("click",b.fancybox.close);c.hideOnOverlayClick&&x.one("click",b.fancybox.close);c.showCloseButton&&z.show();W();b(window).bind("resize.fb",
b.fancybox.center);c.centerOnScroll?b(window).bind("scroll.fb",b.fancybox.center):b(window).unbind("scroll.fb");b.isFunction(c.onComplete)&&c.onComplete(j,n,c);h=false;X()},M=function(a){var d=Math.round(k.width+(l.width-k.width)*a),f=Math.round(k.height+(l.height-k.height)*a),o=Math.round(k.top+(l.top-k.top)*a),t=Math.round(k.left+(l.left-k.left)*a);g.css({width:d+"px",height:f+"px",top:o+"px",left:t+"px"});d=Math.max(d-c.padding*2,0);f=Math.max(f-(c.padding*2+v*a),0);i.css({width:d+"px",height:f+
"px"});if(typeof l.opacity!=="undefined")g.css("opacity",a<0.5?0.5:a)},Y=function(a){var d=a.offset();d.top+=parseFloat(a.css("paddingTop"))||0;d.left+=parseFloat(a.css("paddingLeft"))||0;d.top+=parseFloat(a.css("border-top-width"))||0;d.left+=parseFloat(a.css("border-left-width"))||0;d.width=a.width();d.height=a.height();return d},Q=function(){var a=e.orig?b(e.orig):false,d={};if(a&&a.length){a=Y(a);d={width:a.width+c.padding*2,height:a.height+c.padding*2,top:a.top-c.padding-20,left:a.left-c.padding-
20}}else{a=K();d={width:1,height:1,top:a[3]+a[1]*0.5,left:a[2]+a[0]*0.5}}return d},N=function(){u.hide();if(g.is(":visible")&&b.isFunction(c.onCleanup))if(c.onCleanup(j,n,c)===false){b.event.trigger("fancybox-cancel");h=false;return}j=q;n=p;c=e;i.get(0).scrollTop=0;i.get(0).scrollLeft=0;if(c.overlayShow){O&&b("select:not(#fancybox-tmp select)").filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one("fancybox-cleanup",function(){this.style.visibility="inherit"});
x.css({"background-color":c.overlayColor,opacity:c.overlayOpacity}).unbind().show()}l=T();V();if(g.is(":visible")){b(z.add(A).add(B)).hide();var a=g.position(),d;k={top:a.top,left:a.left,width:g.width(),height:g.height()};d=k.width==l.width&&k.height==l.height;i.fadeOut(c.changeFade,function(){var f=function(){i.html(m.contents()).fadeIn(c.changeFade,L)};b.event.trigger("fancybox-change");i.empty().css("overflow","hidden");if(d){i.css({top:c.padding,left:c.padding,width:Math.max(l.width-c.padding*
2,1),height:Math.max(l.height-c.padding*2-v,1)});f()}else{i.css({top:c.padding,left:c.padding,width:Math.max(k.width-c.padding*2,1),height:Math.max(k.height-c.padding*2,1)});y.prop=0;b(y).animate({prop:1},{duration:c.changeSpeed,easing:c.easingChange,step:M,complete:f})}})}else{g.css("opacity",1);if(c.transitionIn=="elastic"){k=Q();i.css({top:c.padding,left:c.padding,width:Math.max(k.width-c.padding*2,1),height:Math.max(k.height-c.padding*2,1)}).html(m.contents());g.css(k).show();if(c.opacity)l.opacity=
0;y.prop=0;b(y).animate({prop:1},{duration:c.speedIn,easing:c.easingIn,step:M,complete:L})}else{i.css({top:c.padding,left:c.padding,width:Math.max(l.width-c.padding*2,1),height:Math.max(l.height-c.padding*2-v,1)}).html(m.contents());g.css(l).fadeIn(c.transitionIn=="none"?0:c.speedIn,L)}}},F=function(){m.width(e.width);m.height(e.height);if(e.width=="auto")e.width=m.width();if(e.height=="auto")e.height=m.height();N()},Z=function(){h=true;e.width=s.width;e.height=s.height;b("<img />").attr({id:"fancybox-img",
src:s.src,alt:e.title}).appendTo(m);N()},C=function(){J();var a=q[p],d,f,o,t,w;e=b.extend({},b.fn.fancybox.defaults,typeof b(a).data("fancybox")=="undefined"?e:b(a).data("fancybox"));o=a.title||b(a).title||e.title||"";if(a.nodeName&&!e.orig)e.orig=b(a).children("img:first").length?b(a).children("img:first"):b(a);if(o===""&&e.orig)o=e.orig.attr("alt");d=a.nodeName&&/^(?:javascript|#)/i.test(a.href)?e.href||null:e.href||a.href||null;if(e.type){f=e.type;if(!d)d=e.content}else if(e.content)f="html";else if(d)if(d.match(G))f=
"image";else if(d.match(S))f="swf";else if(b(a).hasClass("iframe"))f="iframe";else if(d.match(/#/)){a=d.substr(d.indexOf("#"));f=b(a).length>0?"inline":"ajax"}else f="ajax";else f="inline";e.type=f;e.href=d;e.title=o;if(e.autoDimensions&&e.type!=="iframe"&&e.type!=="swf"){e.width="auto";e.height="auto"}if(e.modal){e.overlayShow=true;e.hideOnOverlayClick=false;e.hideOnContentClick=false;e.enableEscapeButton=false;e.showCloseButton=false}if(b.isFunction(e.onStart))if(e.onStart(q,p,e)===false){h=false;
return}m.css("padding",20+e.padding+e.margin);b(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){b(this).replaceWith(i.children())});switch(f){case "html":m.html(e.content);F();break;case "inline":b('<div class="fancybox-inline-tmp" />').hide().insertBefore(b(a)).bind("fancybox-cleanup",function(){b(this).replaceWith(i.children())}).bind("fancybox-cancel",function(){b(this).replaceWith(m.children())});b(a).appendTo(m);F();break;case "image":h=false;b.fancybox.showActivity();
s=new Image;s.onerror=function(){P()};s.onload=function(){s.onerror=null;s.onload=null;Z()};s.src=d;break;case "swf":t='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+e.width+'" height="'+e.height+'"><param name="movie" value="'+d+'"></param>';w="";b.each(e.swf,function(r,R){t+='<param name="'+r+'" value="'+R+'"></param>';w+=" "+r+'="'+R+'"'});t+='<embed src="'+d+'" type="application/x-shockwave-flash" width="'+e.width+'" height="'+e.height+'"'+w+"></embed></object>";m.html(t);
F();break;case "ajax":a=d.split("#",2);f=e.ajax.data||{};if(a.length>1){d=a[0];if(typeof f=="string")f+="&selector="+a[1];else f.selector=a[1]}h=false;b.fancybox.showActivity();E=b.ajax(b.extend(e.ajax,{url:d,data:f,error:P,success:function(r){if(E.status==200){m.html(r);F()}}}));break;case "iframe":b('<iframe id="fancybox-frame" name="fancybox-frame'+(new Date).getTime()+'" frameborder="0" hspace="0" scrolling="'+e.scrolling+'" src="'+e.href+'"></iframe>').appendTo(m);N();break}},$=function(){if(u.is(":visible")){b("div",
u).css("top",I*-40+"px");I=(I+1)%12}else clearInterval(H)},aa=function(){if(!b("#fancybox-wrap").length){b("body").append(m=b('<div id="fancybox-tmp"></div>'),u=b('<div id="fancybox-loading"><div></div></div>'),x=b('<div id="fancybox-overlay"></div>'),g=b('<div id="fancybox-wrap"></div>'));if(!b.support.opacity){g.addClass("fancybox-ie");u.addClass("fancybox-ie")}D=b('<div id="fancybox-outer"></div>').append('<div class="fancy-bg" id="fancy-bg-n"></div><div class="fancy-bg" id="fancy-bg-ne"></div><div class="fancy-bg" id="fancy-bg-e"></div><div class="fancy-bg" id="fancy-bg-se"></div><div class="fancy-bg" id="fancy-bg-s"></div><div class="fancy-bg" id="fancy-bg-sw"></div><div class="fancy-bg" id="fancy-bg-w"></div><div class="fancy-bg" id="fancy-bg-nw"></div>').appendTo(g);
D.append(i=b('<div id="fancybox-inner"></div>'),z=b('<a id="fancybox-close"></a>'),A=b('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),B=b('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));z.click(b.fancybox.close);u.click(b.fancybox.cancel);A.click(function(a){a.preventDefault();b.fancybox.prev()});B.click(function(a){a.preventDefault();b.fancybox.next()});if(O){x.get(0).style.setExpression("height",
"document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");u.get(0).style.setExpression("top","(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");D.prepend('<iframe id="fancybox-hide-sel-frame" src="javascript:\'\';" scrolling="no" frameborder="0" ></iframe>')}}};
b.fn.fancybox=function(a){b(this).data("fancybox",b.extend({},a,b.metadata?b(this).metadata():{})).unbind("click.fb").bind("click.fb",function(d){d.preventDefault();if(!h){h=true;b(this).blur();q=[];p=0;d=b(this).attr("rel")||"";if(!d||d==""||d==="nofollow")q.push(this);else{q=b("a[rel="+d+"], area[rel="+d+"]");p=q.index(this)}C();return false}});return this};b.fancybox=function(a,d){if(!h){h=true;d=typeof d!=="undefined"?d:{};q=[];p=d.index||0;if(b.isArray(a)){for(var f=0,o=a.length;f<o;f++)if(typeof a[f]==
"object")b(a[f]).data("fancybox",b.extend({},d,a[f]));else a[f]=b({}).data("fancybox",b.extend({content:a[f]},d));q=jQuery.merge(q,a)}else{if(typeof a=="object")b(a).data("fancybox",b.extend({},d,a));else a=b({}).data("fancybox",b.extend({content:a},d));q.push(a)}if(p>q.length||p<0)p=0;C()}};b.fancybox.showActivity=function(){clearInterval(H);u.show();H=setInterval($,66)};b.fancybox.hideActivity=function(){u.hide()};b.fancybox.next=function(){return b.fancybox.pos(n+1)};b.fancybox.prev=function(){return b.fancybox.pos(n-
1)};b.fancybox.pos=function(a){if(!h){a=parseInt(a,10);if(a>-1&&j.length>a){p=a;C()}if(c.cyclic&&j.length>1&&a<0){p=j.length-1;C()}if(c.cyclic&&j.length>1&&a>=j.length){p=0;C()}}};b.fancybox.cancel=function(){if(!h){h=true;b.event.trigger("fancybox-cancel");J();e&&b.isFunction(e.onCancel)&&e.onCancel(q,p,e);h=false}};b.fancybox.close=function(){function a(){x.fadeOut("fast");g.hide();b.event.trigger("fancybox-cleanup");i.empty();b.isFunction(c.onClosed)&&c.onClosed(j,n,c);j=e=[];n=p=0;c=e={};h=false}
if(!(h||g.is(":hidden"))){h=true;if(c&&b.isFunction(c.onCleanup))if(c.onCleanup(j,n,c)===false){h=false;return}J();b(z.add(A).add(B)).hide();b("#fancybox-title").remove();g.add(i).add(x).unbind();b(window).unbind("resize.fb scroll.fb");b(document).unbind("keydown.fb");i.css("overflow","hidden");if(c.transitionOut=="elastic"){k=Q();var d=g.position();l={top:d.top,left:d.left,width:g.width(),height:g.height()};if(c.opacity)l.opacity=1;y.prop=1;b(y).animate({prop:0},{duration:c.speedOut,easing:c.easingOut,
step:M,complete:a})}else g.fadeOut(c.transitionOut=="none"?0:c.speedOut,a)}};b.fancybox.resize=function(){var a,d;if(!(h||g.is(":hidden"))){h=true;a=i.wrapInner("<div style='overflow:auto'></div>").children();d=a.height();g.css({height:d+c.padding*2+v});i.css({height:d});a.replaceWith(a.children());b.fancybox.center()}};b.fancybox.center=function(){h=true;var a=K(),d=c.margin,f={};f.top=a[3]+(a[1]-(g.height()-v+40))*0.5;f.left=a[2]+(a[0]-(g.width()+40))*0.5;f.top=Math.max(a[3]+d,f.top);f.left=Math.max(a[2]+
d,f.left);g.css(f);h=false};b.fn.fancybox.defaults={padding:10,margin:20,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.3,overlayColor:"#666",titleShow:true,titlePosition:"outside",titleFormat:null,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",
easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,onStart:null,onCancel:null,onComplete:null,onCleanup:null,onClosed:null};b(document).ready(function(){aa()})})(jQuery);



$(document).ready(function(){
	// When a link is clicked
	$("a.tab").click(function () {
		// switch all tabs off
		$(".active").removeClass("active");
		// switch this tab on
		$(this).addClass("active");
		// slide all content up
		$(".content").slideUp();
		// slide this content up
		var content_show = $(this).attr("title");
		$("#"+content_show).slideDown();
	});
});




/*
	jQuery Bubble Popup v.2.3.1
	http://maxvergelli.wordpress.com/jquery-bubble-popup/
	
	Copyright (c) 2010 Max Vergelli
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(6(a){a.1j.3C=6(){4 c=X;a(W).1g(6(d,e){4 b=a(e).1K("1U");5(b!=X&&7 b=="1a"&&!a.19(b)&&!a.18(b)&&b.3!=X&&7 b.3=="1a"&&!a.19(b.3)&&!a.18(b.3)&&7 b.3.1v!="1w"){c=b.3.1v?U:Q}12 Q});12 c};a.1j.45=6(){4 b=X;a(W).1g(6(e,f){4 d=a(f).1K("1U");5(d!=X&&7 d=="1a"&&!a.19(d)&&!a.18(d)&&d.3!=X&&7 d.3=="1a"&&!a.19(d.3)&&!a.18(d.3)&&7 d.3.1V!="1w"&&d.3.1V!=X){b=c(d.3.1V)}12 Q});6 c(d){12 2z 2Q(d*2R)}12 b};a.1j.4d=6(){4 b=X;a(W).1g(6(e,f){4 d=a(f).1K("1U");5(d!=X&&7 d=="1a"&&!a.19(d)&&!a.18(d)&&d.3!=X&&7 d.3=="1a"&&!a.19(d.3)&&!a.18(d.3)&&7 d.3.1W!="1w"&&d.3.1W!=X){b=c(d.3.1W)}12 Q});6 c(d){12 2z 2Q(d*2R)}12 b};a.1j.3G=6(){4 b=X;a(W).1g(6(e,f){4 d=a(f).1K("1U");5(d!=X&&7 d=="1a"&&!a.19(d)&&!a.18(d)&&d.3!=X&&7 d.3=="1a"&&!a.19(d.3)&&!a.18(d.3)&&7 d.3.1L!="1w"&&d.3.1L!=X){b=c(d.3.1L)}12 Q});6 c(d){12 2z 2Q(d*2R)}12 b};a.1j.3H=6(){4 b=X;a(W).1g(6(d,e){4 c=a(e).1K("1U");5(c!=X&&7 c=="1a"&&!a.19(c)&&!a.18(c)&&c.3!=X&&7 c.3=="1a"&&!a.19(c.3)&&!a.18(c.3)&&7 c.3.T!="1w"){b=a("#"+c.3.T).Z>0?a("#"+c.3.T).2p():X}12 Q});12 b};a.1j.3D=6(){4 b=X;a(W).1g(6(d,e){4 c=a(e).1K("1U");5(c!=X&&7 c=="1a"&&!a.19(c)&&!a.18(c)&&c.3!=X&&7 c.3=="1a"&&!a.19(c.3)&&!a.18(c.3)&&7 c.3.T!="1w"){b=c.3.T}12 Q});12 b};a.1j.4h=6(){4 b=0;a(W).1g(6(d,e){4 c=a(e).1K("1U");5(c!=X&&7 c=="1a"&&!a.19(c)&&!a.18(c)&&c.3!=X&&7 c.3=="1a"&&!a.19(c.3)&&!a.18(c.3)&&7 c.3.T!="1w"){a(e).2h("33");a(e).2h("2S");a(e).2h("30");a(e).2h("2G");a(e).2h("2L");a(e).2h("2x");a(e).2h("2s");a(e).2h("28");a(e).1K("1U",{});5(a("#"+c.3.T).Z>0){a("#"+c.3.T).2H()}b++}});12 b};a.1j.3x=6(){4 c=Q;a(W).1g(6(d,e){4 b=a(e).1K("1U");5(b!=X&&7 b=="1a"&&!a.19(b)&&!a.18(b)&&b.3!=X&&7 b.3=="1a"&&!a.19(b.3)&&!a.18(b.3)&&7 b.3.T!="1w"){c=U}12 Q});12 c};a.1j.48=6(){4 b={};a(W).1g(6(c,d){b=a(d).1K("1U");5(b!=X&&7 b=="1a"&&!a.19(b)&&!a.18(b)&&b.3!=X&&7 b.3=="1a"&&!a.19(b.3)&&!a.18(b.3)){44 b.3}1d{b=X}12 Q});5(a.18(b)){b=X}12 b};a.1j.4e=6(b,c){a(W).1g(6(d,e){5(7 c!="1I"){c=U}a(e).1e("2S",[b,c])})};a.1j.4c=6(b){a(W).1g(6(c,d){a(d).1e("30",[b])})};a.1j.47=6(b,c){a(W).1g(6(d,e){a(e).1e("2s",[b,c,U]);12 Q})};a.1j.46=6(b,c){a(W).1g(6(d,e){a(e).1e("2s",[b,c,U])})};a.1j.3X=6(){a(W).1g(6(b,c){a(c).1e("28",[U]);12 Q})};a.1j.3U=6(){a(W).1g(6(b,c){a(c).1e("28",[U])})};a.1j.3P=6(){a(W).1g(6(b,c){a(c).1e("2L");12 Q})};a.1j.3O=6(){a(W).1g(6(b,c){a(c).1e("2L")})};a.1j.3N=6(){a(W).1g(6(b,c){a(c).1e("2x");12 Q})};a.1j.3M=6(){a(W).1g(6(b,c){a(c).1e("2x")})};a.1j.3J=6(e){4 r={2J:W,2X:[],2Y:"1U",3w:["S","13","1b"],3n:["R","13","1c"],3j:\'<3i 1y="{1N} {3g}"{36} T="{37}"> 									<38{3b}> 									<3c> 									<2y> 										<14 1y="{1N}-S-R"{2m-2Z}>{2m-2O}</14> 										<14 1y="{1N}-S-13"{2m-3u}>{2m-20}</14> 										<14 1y="{1N}-S-1c"{2m-2U}>{2m-2P}</14> 									</2y> 									<2y> 										<14 1y="{1N}-13-R"{20-2Z}>{20-2O}</14> 										<14 1y="{1N}-1H"{31}>{2T}</14> 										<14 1y="{1N}-13-1c"{20-2U}>{20-2P}</14> 									</2y> 									<2y> 										<14 1y="{1N}-1b-R"{2l-2Z}>{2l-2O}</14> 										<14 1y="{1N}-1b-13"{2l-3u}>{2l-20}</14> 										<14 1y="{1N}-1b-1c"{2l-2U}>{2l-2P}</14> 									</2y> 									</3c> 									</38> 									</3i>\',3:{T:X,1L:X,1W:X,1V:X,1v:Q,1J:Q,1r:Q,1A:Q,1Y:Q,1B:Q,25:{}},15:"S",3v:["R","S","1c","1b"],11:"27",35:["R","27","1c","S","13","1b"],2K:["R","27","1c"],32:["S","13","1b"],1n:"3Y",1p:X,1o:X,1x:{},1u:{},1H:X,1O:{},V:{11:"27",1F:Q},1i:U,2q:U,22:Q,2k:U,23:"2E",3t:["2E","2V"],26:"2V",3o:["2E","2V"],1M:3h,1P:3h,29:0,2a:0,Y:"3e",21:"3F",2b:"3e-4f/",1h:{2A:"4a",1E:"43"},1T:6(){},1S:6(){},1m:[]};h(e);6 g(v){4 w={3:{},1p:r.1p,1o:r.1o,1x:r.1x,1u:r.1u,15:r.15,11:r.11,1n:r.1n,1M:r.1M,1P:r.1P,29:r.29,2a:r.2a,23:r.23,26:r.26,V:r.V,1H:r.1H,1O:r.1O,Y:r.Y,21:r.21,2b:r.2b,1h:r.1h,1i:r.1i,2k:r.2k,2q:r.2q,22:r.22,1T:r.1T,1S:r.1S,1m:r.1m};4 t=a.3E(Q,w,(7 v=="1a"&&!a.19(v)&&!a.18(v)&&v!=X?v:{}));t.3.T=r.3.T;t.3.1L=r.3.1L;t.3.1W=r.3.1W;t.3.1V=r.3.1V;t.3.1v=r.3.1v;t.3.1J=r.3.1J;t.3.1r=r.3.1r;t.3.1A=r.3.1A;t.3.1Y=r.3.1Y;t.3.1B=r.3.1B;t.3.25=r.3.25;t.1p=(7 t.1p=="1Q"||7 t.1p=="2c")&&10(t.1p)>0?10(t.1p):r.1p;t.1o=(7 t.1o=="1Q"||7 t.1o=="2c")&&10(t.1o)>0?10(t.1o):r.1o;t.1x=t.1x!=X&&7 t.1x=="1a"&&!a.19(t.1x)&&!a.18(t.1x)?t.1x:r.1x;t.1u=t.1u!=X&&7 t.1u=="1a"&&!a.19(t.1u)&&!a.18(t.1u)?t.1u:r.1u;t.15=7 t.15=="1Q"&&o(t.15.1X(),r.3v)?t.15.1X():r.15;t.11=7 t.11=="1Q"&&o(t.11.1X(),r.35)?t.11.1X():r.11;t.1n=(7 t.1n=="1Q"||7 t.1n=="2c")&&10(t.1n)>=0?10(t.1n):r.1n;t.1M=7 t.1M=="2c"&&10(t.1M)>0?10(t.1M):r.1M;t.1P=7 t.1P=="2c"&&10(t.1P)>0?10(t.1P):r.1P;t.29=7 t.29=="2c"&&t.29>=0?t.29:r.29;t.2a=7 t.2a=="2c"&&t.2a>=0?t.2a:r.2a;t.23=7 t.23=="1Q"&&o(t.23.1X(),r.3t)?t.23.1X():r.23;t.26=7 t.26=="1Q"&&o(t.26.1X(),r.3o)?t.26.1X():r.26;t.V=t.V!=X&&7 t.V=="1a"&&!a.19(t.V)&&!a.18(t.V)?t.V:r.V;t.V.11=7 t.V.11!="1w"?t.V.11:r.V.11;t.V.1F=7 t.V.1F!="1w"?t.V.1F:r.V.1F;t.1H=7 t.1H=="1Q"&&t.1H.Z>0?t.1H:r.1H;t.1O=t.1O!=X&&7 t.1O=="1a"&&!a.19(t.1O)&&!a.18(t.1O)?t.1O:r.1O;t.Y=j(7 t.Y=="1Q"&&t.Y.Z>0?t.Y:r.Y);t.21=7 t.21=="1Q"&&t.21.Z>0?a.3d(t.21):r.21;t.2b=7 t.2b=="1Q"&&t.2b.Z>0?a.3d(t.2b):r.2b;t.1h=t.1h!=X&&7 t.1h=="1a"&&!a.19(t.1h)&&!a.18(t.1h)&&(7 10(t.1h.2A)=="2c"&&7 10(t.1h.1E)=="2c")?t.1h:r.1h;t.1i=7 t.1i=="1I"&&t.1i==U?U:Q;t.2k=7 t.2k=="1I"&&t.2k==U?U:Q;t.2q=7 t.2q=="1I"&&t.2q==U?U:Q;t.22=7 t.22=="1I"&&t.22==U?U:Q;t.1T=7 t.1T=="6"?t.1T:r.1T;t.1S=7 t.1S=="6"?t.1S:r.1S;t.1m=a.19(t.1m)?t.1m:r.1m;5(t.15=="R"||t.15=="1c"){t.11=o(t.11,r.32)?t.11:"13"}1d{t.11=o(t.11,r.2K)?t.11:"27"}1R(4 u 2r t.V){2g(u){17"11":t.V.11=7 t.V.11=="1Q"&&o(t.V.11.1X(),r.35)?t.V.11.1X():r.V.11;5(t.15=="R"||t.15=="1c"){t.V.11=o(t.V.11,r.32)?t.V.11:"13"}1d{t.V.11=o(t.V.11,r.2K)?t.V.11:"27"}16;17"1F":t.V.1F=t.V.1F==U?U:Q;16}}12 t}6 l(t){5(t==0){12 0}5(t>0){12-(1s.1t(t))}1d{12 1s.1t(t)}}6 o(v,w){4 t=Q;1R(4 u 2r w){5(w[u]==v){t=U;16}}12 t}6 k(t){5(2W.3q){1R(4 v=t.Z-1;v>=0;v--){4 u=2W.3q("1G");u.2o=t[v];5(a.4g(t[v],r.2X)>-1){r.2X.3s(t[v])}}}}6 b(t){5(t.1m&&t.1m.Z>0){1R(4 u=0;u<t.1m.Z;u++){4 v=(t.1m[u].3m(0)!="#"?"#"+t.1m[u]:t.1m[u]);a(v).1k({34:"1F"})}}}6 s(u){5(u.1m&&u.1m.Z>0){1R(4 v=0;v<u.1m.Z;v++){4 x=(u.1m[v].3m(0)!="#"?"#"+u.1m[v]:u.1m[v]);a(x).1k({34:"3f"});4 w=a(x).Z;1R(4 t=0;t<w.Z;t++){a(w[t]).1k({34:"3f"})}}}}6 m(u){4 w=u.2b;4 t=u.21;4 v=(w.2I(w.Z-1)=="/"||w.2I(w.Z-1)=="\\\\")?w.2I(0,w.Z-1)+"/"+t+"/":w+"/"+t+"/";12 v+(u.1i==U?(a.1l.1D?"2e/":""):"2e/")}6 j(t){4 u=t.2I(0,1)=="."?t.2I(1,t.Z):t;12 u}6 q(u){5(a("#"+u.3.T).Z>0){4 t="1b-13";2g(u.15){17"R":t="13-1c";16;17"S":t="1b-13";16;17"1c":t="13-R";16;17"1b":t="S-13";16}5(o(u.V.11,r.2K)){a("#"+u.3.T).1f("14."+u.Y+"-"+t).1k("3a-11",u.V.11)}1d{a("#"+u.3.T).1f("14."+u.Y+"-"+t).1k("39-11",u.V.11)}}}6 p(v){4 H=r.3j;4 F=m(v);4 x="";4 G="";4 u="";5(!v.V.1F){2g(v.15){17"R":G="1c";u="{20-2P}";16;17"S":G="1b";u="{2l-20}";16;17"1c":G="R";u="{20-2O}";16;17"1b":G="S";u="{2m-20}";16}x=\'<1G 2o="\'+F+"V-"+G+"."+(v.1i==U?(a.1l.1D?"1C":"2n"):"1C")+\'" 2w="" 1y="\'+v.Y+\'-V" />\'}4 t=r.3w;4 z=r.3n;4 K,E,A,J;4 B="";4 y="";4 D=2z 3p();1R(E 2r t){A="";J="";1R(K 2r z){A=t[E]+"-"+z[K];A=A.42();J="{"+A+"40}";A="{"+A+"}";5(A==u){H=H.1z(A,x);B=""}1d{H=H.1z(A,"");B=""}5(t[E]+"-"+z[K]!="13-13"){y=F+t[E]+"-"+z[K]+"."+(v.1i==U?(a.1l.1D?"1C":"2n"):"1C");D.3s(y);H=H.1z(J,\' 2M="\'+B+"3L-3K:3I("+y+\');"\')}}}5(D.Z>0){k(D)}4 w="";5(v.1u!=X&&7 v.1u=="1a"&&!a.19(v.1u)&&!a.18(v.1u)){1R(4 C 2r v.1u){w+=C+":"+v.1u[C]+";"}}w+=(v.1p!=X||v.1o!=X)?(v.1p!=X?"1p:"+v.1p+"1Z;":"")+(v.1o!=X?"1o:"+v.1o+"1Z;":""):"";H=w.Z>0?H.1z("{3b}",\' 2M="\'+w+\'"\'):H.1z("{3b}","");4 I="";5(v.1x!=X&&7 v.1x=="1a"&&!a.19(v.1x)&&!a.18(v.1x)){1R(4 C 2r v.1x){I+=C+":"+v.1x[C]+";"}}H=I.Z>0?H.1z("{36}",\' 2M="\'+I+\'"\'):H.1z("{36}","");H=H.1z("{3g}",v.Y+"-"+v.21);H=v.3.T!=X?H.1z("{37}",v.3.T):H.1z("{37}","");3y(H.3z("{1N}")>-1){H=H.1z("{1N}",v.Y)}H=v.1H!=X?H.1z("{2T}",v.1H):H.1z("{2T}","");J="";1R(4 C 2r v.1O){J+=C+":"+v.1O[C]+";"}H=J.Z>0?H.1z("{31}",\' 2M="\'+J+\'"\'):H.1z("{31}","");12 H}6 f(){12 1s.3A(2z 2Q().3B()/2R)}6 c(E,N,x){4 O=x.15;4 K=x.11;4 z=x.1n;4 F=x.1h;4 I=2z 3p();4 u=N.2F();4 t=10(u.S);4 y=10(u.R);4 P=10(N.2v(Q));4 L=10(N.2u(Q));4 v=10(E.2v(Q));4 M=10(E.2u(Q));F.1E=1s.1t(10(F.1E));F.2A=1s.1t(10(F.2A));4 w=l(F.1E);4 J=l(F.1E);4 A=l(F.2A);4 H=m(x);2g(K){17"R":I.S=O=="S"?t-M-z+l(w):t+L+z+w;I.R=y+A;16;17"27":4 D=1s.1t(v-P)/2;I.S=O=="S"?t-M-z+l(w):t+L+z+w;I.R=v>=P?y-D:y+D;16;17"1c":4 D=1s.1t(v-P);I.S=O=="S"?t-M-z+l(w):t+L+z+w;I.R=v>=P?y-D+l(A):y+D+l(A);16;17"S":I.S=t+A;I.R=O=="R"?y-v-z+l(J):y+P+z+J;16;17"13":4 D=1s.1t(M-L)/2;I.S=M>=L?t-D:t+D;I.R=O=="R"?y-v-z+l(J):y+P+z+J;16;17"1b":4 D=1s.1t(M-L);I.S=M>=L?t-D+l(A):t+D+l(A);I.R=O=="R"?y-v-z+l(J):y+P+z+J;16}I.15=O;5(a("#"+x.3.T).Z>0&&a("#"+x.3.T).1f("1G."+x.Y+"-V").Z>0){a("#"+x.3.T).1f("1G."+x.Y+"-V").2H();4 G="1b";4 C="1b-13";2g(O){17"R":G="1c";C="13-1c";16;17"S":G="1b";C="1b-13";16;17"1c":G="R";C="13-R";16;17"1b":G="S";C="S-13";16}a("#"+x.3.T).1f("14."+x.Y+"-"+C).2D();a("#"+x.3.T).1f("14."+x.Y+"-"+C).2p(\'<1G 2o="\'+H+"V-"+G+"."+(x.1i==U?(a.1l.1D?"1C":"2n"):"1C")+\'" 2w="" 1y="\'+x.Y+\'-V" />\');q(x)}5(x.2q==U){5(I.S<a(1q).2i()||I.S+M>a(1q).2i()+a(1q).1o()){5(a("#"+x.3.T).Z>0&&a("#"+x.3.T).1f("1G."+x.Y+"-V").Z>0){a("#"+x.3.T).1f("1G."+x.Y+"-V").2H()}4 B="";5(I.S<a(1q).2i()){I.15="1b";I.S=t+L+z+w;5(a("#"+x.3.T).Z>0&&!x.V.1F){a("#"+x.3.T).1f("14."+x.Y+"-S-13").2D();a("#"+x.3.T).1f("14."+x.Y+"-S-13").2p(\'<1G 2o="\'+H+"V-S."+(x.1i==U?(a.1l.1D?"1C":"2n"):"1C")+\'" 2w="" 1y="\'+x.Y+\'-V" />\');B="S-13"}}1d{5(I.S+M>a(1q).2i()+a(1q).1o()){I.15="S";I.S=t-M-z+l(w);5(a("#"+x.3.T).Z>0&&!x.V.1F){a("#"+x.3.T).1f("14."+x.Y+"-1b-13").2D();a("#"+x.3.T).1f("14."+x.Y+"-1b-13").2p(\'<1G 2o="\'+H+"V-1b."+(x.1i==U?(a.1l.1D?"1C":"2n"):"1C")+\'" 2w="" 1y="\'+x.Y+\'-V" />\');B="1b-13"}}}5(I.R<0){I.R=0;5(B.Z>0){a("#"+x.3.T).1f("14."+x.Y+"-"+B).1k("3a-11","27")}}1d{5(I.R+v>a(1q).1p()){I.R=a(1q).1p()-v;5(B.Z>0){a("#"+x.3.T).1f("14."+x.Y+"-"+B).1k("3a-11","27")}}}}1d{5(I.R<0||I.R+v>a(1q).1p()){5(a("#"+x.3.T).Z>0&&a("#"+x.3.T).1f("1G."+x.Y+"-V").Z>0){a("#"+x.3.T).1f("1G."+x.Y+"-V").2H()}4 B="";5(I.R<0){I.15="1c";I.R=y+P+z+J;5(a("#"+x.3.T).Z>0&&!x.V.1F){a("#"+x.3.T).1f("14."+x.Y+"-13-R").2D();a("#"+x.3.T).1f("14."+x.Y+"-13-R").2p(\'<1G 2o="\'+H+"V-R."+(x.1i==U?(a.1l.1D?"1C":"2n"):"1C")+\'" 2w="" 1y="\'+x.Y+\'-V" />\');B="13-R"}}1d{5(I.R+v>a(1q).1p()){I.15="R";I.R=y-v-z+l(J);5(a("#"+x.3.T).Z>0&&!x.V.1F){a("#"+x.3.T).1f("14."+x.Y+"-13-1c").2D();a("#"+x.3.T).1f("14."+x.Y+"-13-1c").2p(\'<1G 2o="\'+H+"V-1c."+(x.1i==U?(a.1l.1D?"1C":"2n"):"1C")+\'" 2w="" 1y="\'+x.Y+\'-V" />\');B="13-1c"}}}5(I.S<a(1q).2i()){I.S=a(1q).2i();5(B.Z>0){a("#"+x.3.T).1f("14."+x.Y+"-"+B).1k("39-11","13")}}1d{5(I.S+M>a(1q).2i()+a(1q).1o()){I.S=(a(1q).2i()+a(1q).1o())-M;5(B.Z>0){a("#"+x.3.T).1f("14."+x.Y+"-"+B).1k("39-11","13")}}}}}}12 I}6 d(u,t){a(u).1K(r.2Y,t)}6 n(t){12 a(t).1K(r.2Y)}6 i(t){4 u=t!=X&&7 t=="1a"&&!a.19(t)&&!a.18(t)?U:Q;12 u}6 h(t){a(1q).3Q(6(){a(r.2J).1g(6(u,v){a(v).1e("2G")})});a(2W).3R(6(u){a(r.2J).1g(6(v,w){a(w).1e("33",[u.3S,u.3T])})});a(r.2J).1g(6(v,w){4 u=g(t);u.3.1L=f();u.3.T=u.Y+"-"+u.3.1L+"-"+v;d(w,u);a(w).2f("33",6(y,C,B){4 N=n(W);5(i(N)&&i(N.3)&&7 C!="1w"&&7 B!="1w"){5(N.2k){4 E=a(W);4 z=E.2F();4 L=10(z.S);4 H=10(z.R);4 F=10(E.2v(Q));4 K=10(E.2u(Q));4 J=Q;5(H<=C&&C<=F+H&&L<=B&&B<=K+L){J=U}1d{J=Q}5(J&&!N.3.1Y){N.3.1Y=U;d(W,N);5(N.23=="2E"){a(W).1e("2s")}1d{5(N.22&&a("#"+N.3.T).Z>0){4 x=a("#"+N.3.T);4 A=x.2F();4 D=10(A.S);4 I=10(A.R);4 G=10(x.2v(Q));4 M=10(x.2u(Q));5(I<=C&&C<=G+I&&D<=B&&B<=M+D){}1d{a(W).1e("28")}}1d{a(W).1e("28")}}}1d{5(!J&&N.3.1Y){N.3.1Y=Q;d(W,N);5(N.26=="2E"){a(W).1e("2s")}1d{5(N.22&&a("#"+N.3.T).Z>0){4 x=a("#"+N.3.T);4 A=x.2F();4 D=10(A.S);4 I=10(A.R);4 G=10(x.2v(Q));4 M=10(x.2u(Q));5(I<=C&&C<=G+I&&D<=B&&B<=M+D){}1d{a(W).1e("28")}}1d{a(W).1e("28")}}}1d{5(!J&&!N.3.1Y){5(N.22&&a("#"+N.3.T).Z>0&&!N.3.1r){4 x=a("#"+N.3.T);4 A=x.2F();4 D=10(A.S);4 I=10(A.R);4 G=10(x.2v(Q));4 M=10(x.2u(Q));5(I<=C&&C<=G+I&&D<=B&&B<=M+D){}1d{a(W).1e("28")}}}}}}}});a(w).2f("2S",6(A,x,z){4 y=n(W);5(i(y)&&i(y.3)&&7 x!="1w"){y.3.1W=f();5(7 z=="1I"&&z==U){y.1H=x}d(W,y);5(a("#"+y.3.T).Z>0){a("#"+y.3.T).1f("14."+y.Y+"-1H").2p(x);5(y.3.1A){a(W).1e("2G",[Q])}1d{a(W).1e("2G",[U])}}}});a(w).2f("30",6(A,z){4 x=n(W);5(i(x)&&i(x.3)){4 y=x;x=g(z);x.3.T=y.3.T;x.3.1L=y.3.1L;x.3.1W=f();x.3.1V=y.3.1V;x.3.1v=y.3.1v;x.3.1J=y.3.1J;x.3.25={};d(W,x)}});a(w).2f("2G",6(A,y){4 z=n(W);5(i(z)&&i(z.3)&&a("#"+z.3.T).Z>0&&z.3.1v==U){4 x=a("#"+z.3.T);4 C=c(x,a(W),z);4 B=2;5(7 y=="1I"&&y==U){x.1k({S:C.S,R:C.R})}1d{2g(z.15){17"R":x.1k({S:C.S,R:(C.15!=z.15?C.R-(1s.1t(z.1h.1E)*B):C.R+(1s.1t(z.1h.1E)*B))});16;17"S":x.1k({S:(C.15!=z.15?C.S-(1s.1t(z.1h.1E)*B):C.S+(1s.1t(z.1h.1E)*B)),R:C.R});16;17"1c":x.1k({S:C.S,R:(C.15!=z.15?C.R+(1s.1t(z.1h.1E)*B):C.R-(1s.1t(z.1h.1E)*B))});16;17"1b":x.1k({S:(C.15!=z.15?C.S+(1s.1t(z.1h.1E)*B):C.S-(1s.1t(z.1h.1E)*B)),R:C.R});16}}}});a(w).2f("2L",6(){4 x=n(W);5(i(x)&&i(x.3)){x.3.1J=U;d(W,x)}});a(w).2f("2x",6(){4 x=n(W);5(i(x)&&i(x.3)){x.3.1J=Q;d(W,x)}});a(w).2f("2s",6(x,A,D,G){4 H=n(W);5((7 G=="1I"&&G==U&&(i(H)&&i(H.3)))||(7 G=="1w"&&(i(H)&&i(H.3)&&!H.3.1J&&!H.3.1v))){5(7 G=="1I"&&G==U){a(W).1e("2x")}H.3.1v=U;H.3.1J=Q;H.3.1r=Q;H.3.1A=Q;5(i(H.3.25)){H=H.3.25}1d{H.3.25={}}5(i(A)){4 C=H;4 F=f();H=g(A);H.3.T=C.3.T;H.3.1L=C.3.1L;H.3.1W=F;H.3.1V=F;H.3.1v=U;H.3.1J=Q;H.3.1r=Q;H.3.1A=Q;H.3.1Y=C.3.1Y;H.3.1B=C.3.1B;H.3.25={};5(7 D=="1I"&&D==Q){C.3.1W=F;C.3.1V=F;H.3.25=C}}d(W,H);b(H);5(a("#"+H.3.T).Z>0){a("#"+H.3.T).2H()}4 y={};4 B=p(H);y=a(B);y.3V("3W");y=a("#"+H.3.T);y.1k({24:0,S:"3r",R:"3r",15:"3Z",2C:"41"});5(H.1i==U){5(a.1l.1D&&10(a.1l.2t)<9){a("#"+H.3.T+" 38").2B(H.Y+"-2e")}}q(H);4 E=c(y,a(W),H);y.1k({S:E.S,R:E.R});5(E.15==H.15){H.3.1B=Q}1d{H.3.1B=U}d(W,H);4 z=3l(6(){H.3.1r=U;d(w,H);y.3k();2g(H.15){17"R":y.2d({24:1,R:(H.3.1B?"-=":"+=")+H.1n+"1Z"},H.1M,"2j",6(){H.3.1r=Q;H.3.1A=U;d(w,H);5(H.1i==U){5(a.1l.1D&&10(a.1l.2t)>8){y.2B(H.Y+"-2e")}}H.1T()});16;17"S":y.2d({24:1,S:(H.3.1B?"-=":"+=")+H.1n+"1Z"},H.1M,"2j",6(){H.3.1r=Q;H.3.1A=U;d(w,H);5(H.1i==U){5(a.1l.1D&&10(a.1l.2t)>8){y.2B(H.Y+"-2e")}}H.1T()});16;17"1c":y.2d({24:1,R:(H.3.1B?"+=":"-=")+H.1n+"1Z"},H.1M,"2j",6(){H.3.1r=Q;H.3.1A=U;d(w,H);5(H.1i==U){5(a.1l.1D&&10(a.1l.2t)>8){y.2B(H.Y+"-2e")}}H.1T()});16;17"1b":y.2d({24:1,S:(H.3.1B?"+=":"-=")+H.1n+"1Z"},H.1M,"2j",6(){H.3.1r=Q;H.3.1A=U;d(w,H);5(H.1i==U){5(a.1l.1D&&10(a.1l.2t)>8){y.2B(H.Y+"-2e")}}H.1T()});16}},H.29)}});a(w).2f("28",6(B,x){4 A=n(W);5((7 x=="1I"&&x==U&&(i(A)&&i(A.3)&&a("#"+A.3.T).Z>0))||(7 x=="1w"&&(i(A)&&i(A.3)&&a("#"+A.3.T).Z>0&&!A.3.1J&&A.3.1v))){5(7 x=="1I"&&x==U){a(W).1e("2x")}A.3.1r=Q;A.3.1A=Q;d(W,A);4 y=a("#"+A.3.T);4 z=7 x=="1w"?A.2a:0;4 C=3l(6(){A.3.1r=U;d(w,A);y.3k();5(A.1i==U){5(a.1l.1D&&10(a.1l.2t)>8){y.49(A.Y+"-2e")}}2g(A.15){17"R":y.2d({24:0,R:(A.3.1B?"+=":"-=")+A.1n+"1Z"},A.1P,"2j",6(){A.3.1v=Q;A.3.1r=Q;A.3.1A=U;d(w,A);y.1k("2C","2N");A.1S()});16;17"S":y.2d({24:0,S:(A.3.1B?"+=":"-=")+A.1n+"1Z"},A.1P,"2j",6(){A.3.1v=Q;A.3.1r=Q;A.3.1A=U;d(w,A);y.1k("2C","2N");A.1S()});16;17"1c":y.2d({24:0,R:(A.3.1B?"-=":"+=")+A.1n+"1Z"},A.1P,"2j",6(){A.3.1v=Q;A.3.1r=Q;A.3.1A=U;d(w,A);y.1k("2C","2N");A.1S()});16;17"1b":y.2d({24:0,S:(A.3.1B?"-=":"+=")+A.1n+"1Z"},A.1P,"2j",6(){A.3.1v=Q;A.3.1r=Q;A.3.1A=U;d(w,A);y.1k("2C","2N");A.1S()});16}},z);A.3.1V=f();A.3.1J=Q;d(W,A);s(A)}})})}12 W}})(4b);',62,266,'|||privateVars|var|if|function|typeof|||||||||||||||||||||||||||||||||||||||||||||false|left|top|id|true|tail|this|null|baseClass|length|parseInt|align|return|middle|td|position|break|case|isEmptyObject|isArray|object|bottom|right|else|trigger|find|each|themeMargins|dropShadow|fn|css|browser|hideElementId|distance|height|width|window|is_animating|Math|abs|tableStyle|is_open|undefined|divStyle|class|replace|is_animation_complete|is_position_changed|gif|msie|difference|hidden|img|innerHtml|boolean|is_freezed|data|creation_datetime|openingSpeed|BASE_CLASS|innerHtmlStyle|closingSpeed|string|for|afterHidden|afterShown|private_jquerybubblepopup_options|last_display_datetime|last_modified_datetime|toLowerCase|is_mouse_over|px|MIDDLE|themeName|selectable|mouseOver|opacity|last_options|mouseOut|center|hidebubblepopup|openingDelay|closingDelay|themePath|number|animate|ie|bind|switch|unbind|scrollTop|swing|manageMouseEvents|BOTTOM|TOP|png|src|html|alwaysVisible|in|showbubblepopup|version|outerHeight|outerWidth|alt|unfreezebubblepopup|tr|new|total|addClass|display|empty|show|offset|positionbubblepopup|remove|substring|me|alignHorizontalValues|freezebubblepopup|style|none|LEFT|RIGHT|Date|1000|setbubblepopupinnerhtml|INNERHTML|RIGHT_STYLE|hide|document|cache|options_key|LEFT_STYLE|setbubblepopupoptions|INNERHTML_STYLE|alignVerticalValues|managebubblepopup|visibility|alignValues|DIV_STYLE|DIV_ID|table|vertical|text|TABLE_STYLE|tbody|trim|jquerybubblepopup|visible|TEMPLATE_CLASS|250|div|model_markup|stop|setTimeout|charAt|model_td|mouseOutValues|Array|createElement|0px|push|mouseOverValues|MIDDLE_STYLE|positionValues|model_tr|HasBubblePopup|while|indexOf|round|getTime|IsBubblePopupOpen|GetBubblePopupID|extend|azure|GetBubblePopupCreationDateTime|GetBubblePopupMarkup|url|CreateBubblePopup|image|background|UnfreezeAllBubblePopups|UnfreezeBubblePopup|FreezeAllBubblePopups|FreezeBubblePopup|resize|mousemove|pageX|pageY|HideAllBubblePopups|appendTo|body|HideBubblePopup|20px|absolute|_STYLE|block|toUpperCase|10px|delete|GetBubblePopupLastDisplayDateTime|ShowAllBubblePopups|ShowBubblePopup|GetBubblePopupOptions|removeClass|13px|jQuery|SetBubblePopupOptions|GetBubblePopupLastModifiedDateTime|SetBubblePopupInnerHtml|theme|inArray|RemoveBubblePopup'.split('|'),0,{}))



/*
$(document).ready(function(){

		// add animation for each hotspot

		// create bubble popups
		//$('.roseta,.roseta_pink').CreateBubblePopup({
				innerHtmlStyle: {
									color:'#FFFFFF', 
									'text-align':'center'
								},
				
				themeName: 	'all-blue',
				themePath: 	'images/jquerybubblepopup-theme'

			});
		//$('#hotspot1').SetBubblePopupInnerHtml("ישראל דב פרומקין");
		$('#hotspot2').SetBubblePopupInnerHtml("אליעזר בן-יהודה");
		$('#hotspot3').SetBubblePopupInnerHtml("הרב אברהם יצחק הכהן קוק");
		$('#hotspot4').SetBubblePopupInnerHtml("הרב בן-ציון מאיר חי עוזיאל");
		$('#hotspot5').SetBubblePopupInnerHtml("לאה אבושדיד ואיתמר בן אב'י");
		$('#hotspot6').SetBubblePopupInnerHtml("אברהם אלברט ואנה טיכו");
		$('#hotspot7').SetBubblePopupInnerHtml("בית הספר העירוני לבנים");
		$('#hotspot8').SetBubblePopupInnerHtml("גרשון אגרון, דואר היום");
		$('#hotspot9').SetBubblePopupInnerHtml("משפחת גליק");
		$('#hotspot10').SetBubblePopupInnerHtml("בית חינוך עיוורים");
		$('#hotspot11').SetBubblePopupInnerHtml("בית מרקחת אלבא, ישראל דב פרומקין");
});
*/