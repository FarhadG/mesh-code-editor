$(function() {
  $textarea = $('textarea');

  $('div, iframe').height($(window).height());
  $textarea.height($(window).height() / 3.43);


  $textarea.click(function() {
    if ($(this).attr('class') === 'html') {
      $(this).height($(window).height() / 2)
      $('textarea.css, textarea.js').height($(window).height() / 5.34);
    } else if ($(this).attr('class') === 'css') {
      $(this).height($(window).height() / 2)
      $('textarea.html, textarea.js').height($(window).height() / 5.34);
    } else {
      $(this).height($(window).height() / 2)
      $('textarea.html, textarea.css').height($(window).height() / 5.34);
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