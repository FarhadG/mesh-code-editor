$(function() {
  var contents  = $('iframe').contents();
  var body      = contents.find('body');
  var styleTag  = $('<style>').appendTo(contents.find('head'));
  var scriptTag  = $('<script>').appendTo(contents.find('body'));
  var jquery    = $('<script type="text/javascript" src="./js/app.js"></script>');
  jquery.appendTo(contents.find('head'));

  $('textarea').keyup(function() {
    var $this = $(this);
    var val   = $this.val();

    if ($this.attr('class') === 'html') {
      body.html(val);

    } else if ($this.attr('class') === 'css') {
      styleTag.text(val);

    } else {
      // insert javascript
    }
  });
});