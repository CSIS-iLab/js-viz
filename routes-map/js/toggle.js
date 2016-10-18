'use strict';

(function () {
  // events
  var toggle = function toggle(el) {
    var wrapper = $(el).parent();
    var dropdown = $(el).parent().children('.dropdown');
    var arrow = $(el).parent().children('.arrow');
    if (dropdown.hasClass('active')) {
      reset();
    } else {
      reset();
      wrapper.addClass('active');
      dropdown.addClass('active');
      arrow.addClass('active');
    }
  };

  var reset = function reset() {
    $('.item-wrapper').removeClass('active');
    $('.dropdown').removeClass('active');
    $('.arrow').removeClass('active');
  };

  // listeners
  var init = function init() {
    $('body').on('click', '.item', function () {
      toggle(this);
    });
  };init();
})();