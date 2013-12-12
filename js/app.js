$(function() {
  $('div, iframe').height( $(window).height() );
  $('textarea').height( $(window).height() / 3.17 );

  var contents  = $('iframe').contents();
  var body      = contents.find('body');
  var $styleTag  = $('<style>');
  var $scriptTag = $('<script>');

  contents.find('head').append($styleTag);
  contents.find('body').append($scriptTag);

  $('textarea').width(window.width / 2);

  $('textarea').keyup(function() {
    var $this = $(this);
    var val   = $this.val();

    if ($this.attr('class') === 'html') {
      body.html(val);

    } else if ($this.attr('class') === 'css') {
      $styleTag.text(val);

    } else {
      $scriptTag.text(val);
    }
  });
});