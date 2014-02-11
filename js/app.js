$(function() {

  var appRef = new Firebase("https://mesh-editor.firebaseio.com/");

  /************
    TEXT BOXES
   ************/

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

  var empty = !(html.getValue() || css.getValue() || js.getValue());

  if (empty) {
    appRef.set({
      htmlBox: {
        text:     "<!-- Insert your HTML here -->\n" +
                  "<p><span>Mesh</span> up your\n" +
                  "HTML, CSS and JavaScript.<br /><br />\n\n" +
                  "For maximum pleasure,\n" +
                  "drag and resize the preview box\n" +
                  "by slowly using your pointer\n" +
                  "along its sexy border lines.<br /><br />\n\n" + 
                  "To spice it up, you can turn on/off the lights.</p>\n",
        position: {line: 0, ch: 0}
      },

      cssBox: {
        text:     "/* Insert your CSS here */\n" +
                  "* { padding: 5px; color: #999; }\n" +
                  "span { color: red; }\n",
        position: {line: 0, ch: 0}
      },

      jsBox: {
        text:     "/* Insert your JavaScript here */\n" +
                  "$('body').click(function() {\n" + 
                  "\tconsole.log(\"jQuery's also meshed\");\n" +
                  "});\n",
        position: {line: 0, ch: 0}
      }
    });
  }

  appRef.on('value', function(snapshot) {
    var content = snapshot.val(); 
    html.setValue(content.htmlBox.text);
    html.setCursor({
      line: content.htmlBox.position.line,
      ch: content.htmlBox.position.ch
    });

    css.setValue(content.cssBox.text);
    css.setCursor({
      line: content.cssBox.position.line,
      ch: content.cssBox.position.ch
    });

    js.setValue(content.jsBox.text);
    js.setCursor({
      line: content.jsBox.position.line,
      ch: content.jsBox.position.ch
    });
  });


  /************************
    Iframe Content Builder 
   ************************/

  var getContent = function() {
    var htmlContent = html.getValue();
    var cssContent = css.getValue();
    var jsContent = js.getValue();

    var htmlCursor = html.getCursor();
    var cssCursor = css.getCursor();
    var jsCursor = js.getCursor();

    appRef.set({
      htmlBox: {
        text: htmlContent,
        position: htmlCursor
      },
      cssBox: {
        text: cssContent,
        position: cssCursor
      },
      jsBox: {
        text: jsContent,
        position: jsCursor
      }
    });

    return "<link rel=\"stylesheet\" " +
      "href=\"http://raw.github.com/necolas/normalize.css/master/normalize.css\" " +
      "type=\"text/css\">" +
      "<style>" +
      cssContent +
      "</style>" +
      htmlContent +
      "<script src=\"http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js\">" +
      "</script>" +
      "<script>" +
      "$(function(){" + 
      jsContent +
      "});" + 
      "</script>"
  };


  /*****************
    Event Listeners 
   *****************/

  var delay;
  html.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(function() {
      updatePreview(html.getCursor());
    }, 300);
  });

  css.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(function() {
      updatePreview(css.getCursor());
    }, 300);
  });

  js.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(function() {
      updatePreview(js.getCursor());
    }, 300);
  });

  var updatePreview = function(position) {
    var previewFrame = document.getElementById('preview');
    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(getContent(position));
    preview.close();
  }

  setInterval(updatePreview, 300);

  $('.lights').click(function(el) {
    el.preventDefault();
    $('.cm-s-default').toggleClass('cm-s-monokai');
    $(this).toggleClass('lights-on');
  }).click();

  /*************************
    Dynamic Text Box Sizing 
   *************************/

  $('#frame').animate({
    "height" : ($(window).height() / 1.8),
    "width" : ($(window).width() / 2)
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