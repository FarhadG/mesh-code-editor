$(function() {
  $textarea = $('textarea');

  $('div, iframe').height($(window).height());
  $textarea.height($(window).height() / 3.43);


  $textarea.click(function() {
    var $this = $this;

    if ($this.attr('class') === 'html') {
      $this.animate({
        height: $(window).height() / 2
      }, 200);
      $('textarea.css, textarea.js').animate({
        height: $(window).height() / 4.1
      }, 200);

    } else if ($this.attr('class') === 'css') {
      $this.animate({
        height: $(window).height() / 2
      }, 200);
      $('textarea.html, textarea.js').animate({
        height: $(window).height() / 4.1
      }, 200);

    } else {
      $this.animate({
        height: $(window).height() / 2
      }, 200);
      $('textarea.html, textarea.css').animate({
        height: $(window).height() / 4.1
      }, 200);
    }
  });

  $textarea.keyup(function() {
    var htmlContent = $('textarea.html').val();
    var cssContent  = $('textarea.css').val();
    var jsContent   = $('textarea.js').val();

    $("#frame").attr(
      "src", "data:text/html;charset=utf-8," + 
      "<html>" +  
      "<style>" +
      cssContent +
      "</style>" +
      htmlContent +
      "<script src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js\"><" + "/script>" +    
      "<script>" + 
      jsContent + 
      "<" +
      "/script>" +         
      "</html>"
    );
  });
});