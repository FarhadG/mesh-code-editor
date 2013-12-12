$(function() {
  $('div, iframe').height( $(window).height() );
  $('textarea').height( $(window).height() / 3.3 );

  $('textarea').width(window.width / 2);

  $('textarea').keyup(function() {
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