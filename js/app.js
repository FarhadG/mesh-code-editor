$(function() {

  var appRef = new Firebase('https://mesh-editor.firebaseio.com/');


  /*==========  User's Cursor  ==========*/
  
  var position = {
    html: { line: 0, ch: 0 },
    css:  { line: 0, ch: 0 },
    js:   { line: 0, ch: 0 }
  };


  /*==========  MESH CODE EDITOR BOXES  ==========*/

  var html = CodeMirror.fromTextArea(document.getElementById("html"), {
    lineNumbers: true,
    lineWrapping: true,
    mode: 'xml',
    htmlMode: true
  });

  var css = CodeMirror.fromTextArea(document.getElementById("css"), {
    lineNumbers: true,
    lineWrapping: true,
    mode: "text/css"
  });

  var js = CodeMirror.fromTextArea(document.getElementById("js"), {
    lineNumbers: true,
    lineWrapping: true,
    mode: "text/javascript"
  });


  /*==========  FIREBASE DATA FETCHING  ==========*/    

  var notifyFireBase = true;

  appRef.on('value', function(snapshot) {
    var content = snapshot.val();
    
    notifyFireBase = false;
    html.setValue(content.htmlBox.text);
    css.setValue(content.cssBox.text);
    js.setValue(content.jsBox.text);
    notifyFireBase = true;
    
    html.setCursor({
      line: position.html.line,
      ch: position.html.ch
    });

    css.setCursor({
      line: position.css.line,
      ch: position.css.ch
    });

    js.setCursor({
      line: position.js.line,
      ch: position.js.ch
    });

  });


  /*==========  PREVIEW FRAME CONTENT BUILDER  ==========*/

  var getContent = function() {
    var htmlContent = html.getValue();
    var cssContent = css.getValue();
    var jsContent = js.getValue();

    return '<link rel="stylesheet" href="http://raw.github.com/necolas/normalize.css/master/normalize.css" type="text/css">'
      + '<style>'
        + cssContent 
      + '</style>'
      + htmlContent
      + '<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>'
      + '<script>'
        + '$(function(){'
          + jsContent
        + '});'
      + '</script>'
  };

  /*==========  CODE EVENT LISTENERS  ==========*/

  var sync = function() {
    var htmlContent = html.getValue();
    var cssContent = css.getValue();
    var jsContent = js.getValue();

    position.html = html.getCursor();
    position.css = css.getCursor();
    position.js = js.getCursor();

    appRef.set({
      htmlBox: {
        text: htmlContent
      },
      cssBox: {
        text: cssContent
      },
      jsBox: {
        text: jsContent
      }
    });
  };
  
  html.on("change", function() {
    updatePreview();
    if (notifyFireBase) sync();
  });

  css.on("change", function() {
    updatePreview();
    if (notifyFireBase) sync();
  });

  js.on("change", function() {
    updatePreview();
    if (notifyFireBase) sync();
  });


  /*==========  PREVIEW UPDATING  ==========*/
  var delay;
  var updatePreview = function() {
    clearTimeout(delay);

    var update = function() {
      var previewFrame = document.getElementById('preview');
      var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
      preview.open();
      preview.write(getContent());
      preview.close();
    };

    delay = setTimeout(update, 500);
  }

  setInterval(updatePreview, 1000);  


  /*==========  STYLING & DYNAMIC BOX SIZING  ==========*/

  $('.lights').click(function(el) {
    el.preventDefault();
    $('.cm-s-default').toggleClass('cm-s-monokai');
    $(this).toggleClass('lights-on');
  }).click();

  $('#frame').animate({
    "height" : ($(window).height() / 1.8),
    "width"  : ($(window).width() / 2)
  }, 1000);

  var resizeBoxes = function() { 
    var windowHeight = $(window).height();
    var windowWidth  = $(window).width();
    $textBoxes = $('.CodeMirror');
    $.each($textBoxes, function(idx, box) {
      $(box).height(windowHeight / 2.2);
      $(box).width(windowWidth / 2.15);
    });
  };

  resizeBoxes();

  $(window).resize(function() {
    resizeBoxes();
  });

  $('#frame').draggable().resizable({
    handles: 'n, e, s, w, ne, se, sw, nw'
  });

});