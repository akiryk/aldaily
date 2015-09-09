// Generated by CoffeeScript 1.3.1
/*
  Endless Scroll plugin for jQuery

  v1.7.1

  Copyright (c) 2008-2012 Fred Wu

  Dual licensed under the MIT and GPL licenses:
    http://www.opensource.org/licenses/mit-license.php
    http://www.gnu.org/licenses/gpl.html
*/

/*
  Usage:

  // using default options
  $(window).endlessScroll();

  // using some custom options
  $(window).endlessScroll({
    fireOnce: false,
    fireDelay: false,
    loader: '<div class="loading"><div>',
    callback: function(){
      alert('test');
    }
  });

  Configuration options:

  inflowPixels      integer         the number of pixels from the boundary of the element that triggers the event
  fireOnce          boolean         only fire once until the execution of the current event is completed
  fireDelay         integer         delay the subsequent firing, in milliseconds, 0 or false to disable delay
  loader            string          the HTML to be displayed during loading
  content           string|function Plain HTML content to insert after each call, can be either a string or a function
                                    that returns a string, when passed as a function it accepts three arguments:
                                      <fireSequence> the number of times the event triggered during the current page session
                                      <pageSequence> a positive or negative value that represents the scroll direction sequence
                                      <scrollDirection> a string of either 'prev' or 'next'
  insertBefore      string          jQuery selector syntax: where to put the loader as well as the plain HTML data
  insertAfter       string          jQuery selector syntax: where to put the loader as well as the plain HTML data
  callback          function        callback function, accepts three arguments:
                                      <fireSequence> the number of times the event triggered during the current page session
                                      <pageSequence> a positive or negative value that represents the scroll direction sequence
                                      <scrollDirection> a string of either 'prev' or 'next'
  resetCounter      function        resets the fire sequence counter if the function returns true, this function
                                    could also perform hook actions since it is applied at the start of the event
  ceaseFire         function        stops the event (no more endless scrolling) if the function returns true,
                                    accepts three arguments:
                                      <fireSequence> the number of times the event triggered during the current page session
                                      <pageSequence> a positive or negative value that represents the scroll direction sequence
                                      <scrollDirection> a string of either 'prev' or 'next'
  intervalFrequency integer         set the frequency of the scroll event checking, the larger the frequency number,
                                    the less memory it consumes - but also the less sensitive the event trigger becomes

  Usage tips:

  The plugin is more useful when used with the callback function, which can then make AJAX calls to retrieve content.
  The fire sequence argument (for the callback function) is useful for 'pagination'-like features.
*/

var EndlessScroll;

EndlessScroll = (function() {
  var defaults;

  EndlessScroll.name = 'EndlessScroll';

  defaults = {
    inflowPixels: 50,
    fireOnce: true,
    fireDelay: 150,
    loader: 'Loading...',
    content: '',
    insertBefore: null,
    insertAfter: null,
    intervalFrequency: 250,
    resetCounter: function() {
      return false;
    },
    callback: function() {
      return true;
    },
    ceaseFire: function() {
      return false;
    }
  };

  function EndlessScroll(scope, options) {
    var _this = this;
    this.options = $.extend({}, defaults, options);
    this.contentStack = [];
    this.scrollDirection = 'next';
    this.firing = true;
    this.fired = false;
    this.fireSequence = 0;
    this.pageSequence = 0;
    this.nextSequence = 1;
    this.prevSequence = -1;
    this.lastScrollTop = 0;
    this.insertLocation = this.options.insertAfter;
    this.didScroll = false;
    this.isScrollable = true;
    this.target = scope;
    this.targetId = '';
    this.content = '';
    this.innerWrap = $('.endless_scroll_inner_wrap', this.target);
    this.handleDeprecatedOptions();
    this.setInsertPositionsWhenNecessary();
    $(scope).scroll(function() {
      _this.detectTarget(scope);
      return _this.detectScrollDirection();
    });
  }

  EndlessScroll.prototype.run = function() {
    var _this = this;
    return setInterval((function() {
      if (!_this.shouldTryFiring()) {
        return;
      }
      if (_this.ceaseFireWhenNecessary()) {
        return;
      }
      if (!_this.shouldBeFiring()) {
        return;
      }
      _this.resetFireSequenceWhenNecessary();
      _this.acknowledgeFiring();
      _this.insertLoader();
      if (_this.hasContent()) {
        _this.showContent();
        _this.fireCallback();
        _this.delayFireingWhenNecessary();
      }
      return _this.removeLoader();
    }), this.options.intervalFrequency);
  };

  EndlessScroll.prototype.handleDeprecatedOptions = function() {
    if (this.options.data) {
      this.options.content = this.options.data;
    }
    if (this.options.bottomPixels) {
      return this.options.inflowPixels = this.options.bottomPixels;
    }
  };

  EndlessScroll.prototype.setInsertPositionsWhenNecessary = function() {
    if (defaults.insertBefore === null) {
      this.options.insertBefore = "" + this.target.selector + " div:first";
    }
    if (defaults.insertAfter === null) {
      return this.options.insertAfter = "" + this.target.selector + " div:last";
    }
  };

  EndlessScroll.prototype.detectTarget = function(scope) {
    this.target = scope;
    return this.targetId = $(this.target).attr('id');
  };

  EndlessScroll.prototype.detectScrollDirection = function() {
    var currentScrollTop;
    this.didScroll = true;
    currentScrollTop = $(this.target).scrollTop();
    if (currentScrollTop > this.lastScrollTop) {
      this.scrollDirection = 'next';
    } else {
      this.scrollDirection = 'prev';
    }
    return this.lastScrollTop = currentScrollTop;
  };

  EndlessScroll.prototype.shouldTryFiring = function() {
    var shouldTryOrNot;
    shouldTryOrNot = this.didScroll && this.firing === true;
    if (shouldTryOrNot) {
      this.didScroll = false;
    }
    return shouldTryOrNot;
  };

  EndlessScroll.prototype.ceaseFireWhenNecessary = function() {
    if (this.options.ceaseFire.apply(this.target, [this.fireSequence, this.pageSequence, this.scrollDirection])) {
      this.firing = false;
      return true;
    } else {
      return false;
    }
  };

  EndlessScroll.prototype.wrapContainer = function() {
    if (this.innerWrap.length === 0) {
      return this.innerWrap = $(this.target).wrapInner('<div class="endless_scroll_inner_wrap" />').find('.endless_scroll_inner_wrap');
    }
  };

  EndlessScroll.prototype.setScrollPositionWhenNecessary = function(target) {
    if (this.scrollDirection === 'prev' && target.scrollTop() <= this.options.inflowPixels) {
      return target.scrollTop(this.options.inflowPixels);
    }
  };

  EndlessScroll.prototype.scrollableAreaMargin = function(innerWrap, target) {
    switch (this.scrollDirection) {
      case 'next':
        return innerWrap.height() - $(target).height() <= $(target).scrollTop() + this.options.inflowPixels;
      case 'prev':
        return $(target).scrollTop() <= this.options.inflowPixels;
    }
  };

  EndlessScroll.prototype.calculateScrollableCanvas = function() {
    if (this.target === document || this.target === window) {
      this.isScrollable = this.scrollableAreaMargin(document, window);
      return this.setScrollPositionWhenNecessary(window);
    } else {
      this.wrapContainer();
      this.isScrollable = this.innerWrap.length > 0 && this.scrollableAreaMargin(this.innerWrap, this.target);
      return this.setScrollPositionWhenNecessary(this.target);
    }
  };

  EndlessScroll.prototype.shouldBeFiring = function() {
    this.calculateScrollableCanvas();
    return this.isScrollable && (this.options.fireOnce === false || (this.options.fireOnce === true && this.fired !== true));
  };

  EndlessScroll.prototype.resetFireSequenceWhenNecessary = function() {
    if (this.options.resetCounter.apply(this.target) === true) {
      return this.fireSequence = 0;
    }
  };

  EndlessScroll.prototype.acknowledgeFiring = function() {
    this.fired = true;
    this.fireSequence++;
    switch (this.scrollDirection) {
      case 'next':
        return this.pageSequence = this.nextSequence++;
      case 'prev':
        return this.pageSequence = this.prevSequence--;
    }
  };

  EndlessScroll.prototype.insertContent = function(content) {
    switch (this.scrollDirection) {
      case 'next':
        return $(this.options.insertAfter).after(content);
      case 'prev':
        return $(this.options.insertBefore).before(content);
    }
  };

  EndlessScroll.prototype.insertLoader = function() {
    return this.insertContent("<div class=\"endless_scroll_loader_" + this.targetId + "      endless_scroll_loader\">" + this.options.loader + "</div>");
  };

  EndlessScroll.prototype.removeLoader = function() {
    return $('.endless_scroll_loader_' + this.targetId).fadeOut(function() {
      return $(this).remove();
    });
  };

  EndlessScroll.prototype.hasContent = function() {
    if (typeof this.options.content === 'function') {
      this.content = this.options.content.apply(this.target, [this.fireSequence, this.pageSequence, this.scrollDirection]);
    } else {
      this.content = this.options.content;
    }
    return this.content !== false;
  };

  EndlessScroll.prototype.showContent = function() {
    $('#endless_scroll_content_current').removeAttr('id');
    return this.insertContent("<div id=\"endless_scroll_content_current\"      class=\"endless_scroll_content\" rel=\"" + this.pageSequence + "\">" + this.content + "</div>");
  };

  EndlessScroll.prototype.fireCallback = function() {
    return this.options.callback.apply(this.target, [this.fireSequence, this.pageSequence, this.scrollDirection]);
  };

  EndlessScroll.prototype.delayFireingWhenNecessary = function() {
    var _this = this;
    if (this.options.fireDelay > 0) {
      $('body').after('<div id="endless_scroll_marker"></div>');
      return $('#endless_scroll_marker').fadeTo(this.options.fireDelay, 1, function() {
        $('#endless_scroll_marker').remove();
        return _this.fired = false;
      });
    } else {
      return this.fired = false;
    }
  };

  return EndlessScroll;

})();

(function($) {
  return $.fn.endlessScroll = function(options) {
    return new EndlessScroll(this, options).run();
  };
})(jQuery);