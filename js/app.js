$(function() {

  /************
    TEXT BOXES
   ************/

  var html = CodeMirror.fromTextArea(document.getElementById("html"), {
    theme: "monokai html",
    lineNumbers: true,
    mode: 'xml',
    htmlMode: true,
    defaultValue: "cool"
  });

  var css = CodeMirror.fromTextArea(document.getElementById("css"), {
    theme: "monokai css",
    lineNumbers: true,
    mode: "text/css"
  });

  var js = CodeMirror.fromTextArea(document.getElementById("js"), {
    theme: "monokai js",
    lineNumbers: true,
    mode: "text/javascript"
  });

  html.setValue("<p><span id=\"mesh\"> Mesh </span> up your magic </p>\n");
  css.setValue("/* Insert your CSS here */\n" +
                "#mesh { color: red; }\n");
  js.setValue("/* Insert your JavaScript here */\n");


  /************************
    Iframe Content Builder 
   ************************/

  var buildContent = function() {
    var htmlContent = html.getValue();
    var cssContent = css.getValue();
    var jsContent = js.getValue();

    return "<html>" +  
      "<style>" +
      "*{color:#999;" +
      "font-family:sans-serif;" +
      "font-weight: normal;}" +
      cssContent +
      "</style>" +
      htmlContent +
      "<script src=\"http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js\">" +
      "</script>" +
      "<script>" +
      "$(function(){" + 
      jsContent +
      "});" + 
      "</script>" +
      "</html>";
  };


  /*****************
    Event Listeners 
   *****************/

  var delay;
  html.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
  });

  css.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
  });

  js.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
  });
  
  var updatePreview = function() {
    var previewFrame = document.getElementById('preview');
    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(buildContent());
    preview.close();
  }
  setTimeout(updatePreview, 300);


  /*************************
    Dynamic Text Box Sizing 
   *************************/

  var windowHeight = $(window).height();
  var windowWidth   = $(window).width();

  var frameHeight = $('#frame').height(windowHeight / 2);
  var frameWidth  = $('#frame').width(windowWidth / 2);

  $('#preview').height(frameHeight);
  $('#preview').width(frameWidth);  
  
  $textBoxes = $('.CodeMirror');
  $.each($textBoxes, function(idx, box) {
    $(box).height(windowHeight / 2.2);
    $(box).width(windowWidth / 2.15);
  });

  $('#frame').draggable().resizable({
    handles: 'n, e, s, w, ne, se, sw, nw'
  });
});