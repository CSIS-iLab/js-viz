/*
 * Helper function to convert a number into a string
 * and add commas to it to improve presentation.
 */
function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}

// Enable SVG events, gets around d3's limitations
$.fn.triggerSVGEvent = function(eventName) {
 var event = document.createEvent('SVGEvents');
 event.initEvent(eventName,true,true);
 this[0].dispatchEvent(event);
 return $(this);
};