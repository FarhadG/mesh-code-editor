$(function() {

  var appRef = new Firebase('https://mesh-editor.firebaseio.com/');
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
    htmlMode: true,
    showCursorWhenSelecting: true,
    pollInterval: 1000
  });

  var css = CodeMirror.fromTextArea(document.getElementById("css"), {
    lineNumbers: true,
    lineWrapping: true,
    mode: "text/css",
    showCursorWhenSelecting: true,
    pollInterval: 1000
  });

  var js = CodeMirror.fromTextArea(document.getElementById("js"), {
    lineNumbers: true,
    lineWrapping: true,
    mode: "text/javascript",
    showCursorWhenSelecting: true,
    pollInterval: 1000
  });


  /*==========  FIREBASE DATA FETCHING  ==========*/    

  appRef.on('value', function(snapshot) {
    var content = snapshot.val();
    html.setValue(content.htmlBox.text);
    html.setCursor({
      line: position.html.line,
      ch: position.html.ch
    });

    css.setValue(content.cssBox.text);
    css.setCursor({
      line: position.css.line,
      ch: position.css.ch
    });

    js.setValue(content.jsBox.text);
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

  var delay;
  html.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(function() {
      updatePreview();
    }, 300);
  });

  css.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(function() {
      updatePreview();
    }, 300);
  });

  js.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(function() {
      updatePreview();
    }, 300);
  });


  /*==========  PREVIEW UPDATING  ==========*/

  var updatePreview = function() {
    var previewFrame = document.getElementById('preview');
    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(getContent());
    preview.close();
  }

  setInterval(updatePreview, 300);

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

    sync();
  };

  setTimeout(sync, 1500);
  


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