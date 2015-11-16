$(function() {

  var $window = $(window);
  var appRef = new Firebase('https://mesh-editor.firebaseio.com/');

  /*==========  User's Cursor  ==========*/

  var position = {
    html: { line: 0, ch: 0 },
    css:  { line: 0, ch: 0 },
    js:   { line: 0, ch: 0 }
  };


  /*==========  MESH CODE EDITOR BOXES  ==========*/

  var htmlBox = CodeMirror.fromTextArea(document.getElementById('html'), {
    lineNumbers: true,
    lineWrapping: true,
    mode: 'xml',
    htmlMode: true
  });

  var cssBox = CodeMirror.fromTextArea(document.getElementById('css'), {
    lineNumbers: true,
    lineWrapping: true,
    mode: 'text/css'
  });

  var jsBox = CodeMirror.fromTextArea(document.getElementById('js'), {
    lineNumbers: true,
    lineWrapping: true,
    mode: 'text/javascript'
  });


  /*==========  FIREBASE DATA FETCHING  ==========*/

  var notifyFireBase = true;

  appRef.on('value', function(snapshot) {
    var content = snapshot.val();

    notifyFireBase = false;
    htmlBox.setValue(content.html.text);
    cssBox.setValue(content.css.text);
    jsBox.setValue(content.js.text);
    notifyFireBase = true;

    htmlBox.setCursor({
      line: position.html.line,
      ch: position.html.ch
    });

    cssBox.setCursor({
      line: position.css.line,
      ch: position.css.ch
    });

    jsBox.setCursor({
      line: position.js.line,
      ch: position.js.ch
    });

  });


  /*==========  PREVIEW FRAME CONTENT BUILDER  ==========*/

  var getContent = function() {
    var htmlContent = htmlBox.getValue();
    var cssContent  = cssBox.getValue();
    var jsContent   = jsBox.getValue();

    var reset = function() {
      appRef.set({
        html: {
          text: ['<!-- HTML -->',
                '<h1>[ mesh ]</h1>',
                '<ul>',
                '  <li> Realtime, Collaborative Code Editor </li>',
                '  <li> Live Preview Box (Draggabe & Resizable) </li>',
                '  <li> Dark and Light Theme </li>',
                '  <li> Syntax Highlighting </li>',
                '</ul>'].join('\n')
        },
        css: {
          text: ['/* CSS */',
                'body { background: #3D3D3B; color: #aaa; }',
                'h1 { padding: 0px 40px; color: gold; }',
                'li { line-height: 1.7; }'].join('\n')
        },
        js: {
          text: ['// JavaScript & jQuery',
                '$(\'body\').click(function() {',
                '  confirm("You\'re awesome, you know that?");',
                '});'].join('\n')
        }
      });
    };

    // Helper function (for demo) for resetting editors, once every hour
    setInterval(reset, 3600000);

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
    var htmlContent = htmlBox.getValue();
    var cssContent  = cssBox.getValue();
    var jsContent   = jsBox.getValue();

    position.html   = htmlBox.getCursor();
    position.css    = cssBox.getCursor();
    position.js     = jsBox.getCursor();

    appRef.set({
      html: {
        text: htmlContent
      },
      css: {
        text: cssContent
      },
      js: {
        text: jsContent
      }
    });
  };

  htmlBox.on('change', function() {
    updatePreview();
    if (notifyFireBase) sync();
  });

  cssBox.on('change', function() {
    updatePreview();
    if (notifyFireBase) sync();
  });

  jsBox.on('change', function() {
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
    $(this).toggleClass('button-on');
  }).click();

  $('.together').click(function(el) {
    el.preventDefault();
    $(this).toggleClass('button-on');
  }).click();

  $('#frame').animate({
    'height': ($window.height() / 1.8),
    'width': ($window.width() / 2)
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

  $window.resize(function() {
    resizeBoxes();
  });

  $('#frame').draggable().resizable({
    handles: 'n, e, s, w, ne, se, sw, nw'
  });

});
