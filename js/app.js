$(function() {

  $('#preview').height($(window).height());

  var html = CodeMirror.fromTextArea(document.getElementById("html"), {
    theme: "monokai",
    lineNumbers: true,
    mode: 'xml',
    htmlMode: true,
    defaultValue: "cool"
  });

  var css = CodeMirror.fromTextArea(document.getElementById("css"), {
    theme: "monokai",
    lineNumbers: true,
    mode: "text/css"
  });

  var js = CodeMirror.fromTextArea(document.getElementById("js"), {
    theme: "monokai",
    lineNumbers: true,
    mode: "text/javascript"
  });

  var previewContent = function() {
    var htmlContent = html.getValue();
    var cssContent = css.getValue();
    var jsContent = js.getValue();

    return "<html>" +  
      "<style>" +
      "*{font-size:24px;color:#999;}" +
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
    preview.write(previewContent());
    preview.close();
  }
  setTimeout(updatePreview, 300);
})