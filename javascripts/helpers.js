(function() {

  $._.doAfter = function(time, func) {
    return setTimeout(func, time);
  };

  (function($) {
    $.fn.addClassUntil = function(className, time, onComplete) {
      var el;
      if (time == null) {
        time = 400;
      }
      if (onComplete == null) {
        onComplete = (function() {
          return true;
        });
      }
      el = this;
      el.addClass(className);
      setTimeout((function() {
        el.removeClass(className);
        return onComplete();
      }), time);
      return this;
    };
    $.fn.addClassAfter = function(className, time, onComplete) {
      var el;
      if (time == null) {
        time = 400;
      }
      if (onComplete == null) {
        onComplete = (function() {
          return true;
        });
      }
      el = this;
      return setTimeout((function() {
        el.addClass(className);
        return onComplete();
      }), time);
    };
    $.fn.fadeOut = function(className, time, onComplete) {
      var el;
      if (className == null) {
        className = 'fade-out';
      }
      if (time == null) {
        time = 400;
      }
      if (onComplete == null) {
        onComplete = (function() {
          return true;
        });
      }
      el = this;
      if (typeof className === "function") {
        onComplete = className;
        className = 'fade-out';
      }
      if (typeof className === "number") {
        time = className;
        className = 'fade-out';
      }
      if (typeof time === "function") {
        onComplete = time;
        time = 400;
      }
      el.addClassUntil(className, time);
      el.addClassAfter('hide', time, onComplete);
      return this;
    };
    $.fn.hideAfter = function(time, onComplete) {
      var el;
      if (time == null) {
        time = 400;
      }
      if (onComplete == null) {
        onComplete = (function() {
          return true;
        });
      }
      el = this;
      el.addClassAfter('hide', time, onComplete);
      return this;
    };
    return $.fn.showUntil = function(time, onComplete) {
      var el;
      if (time == null) {
        time = 400;
      }
      if (onComplete == null) {
        onComplete = (function() {
          return true;
        });
      }
      el = this;
      el.removeClass('hide');
      el.addClassAfter('hide', time, onComplete);
      return this;
    };
  })($);

}).call(this);
