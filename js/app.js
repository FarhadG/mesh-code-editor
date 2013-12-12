$(function() {
  var html = CodeMirror.fromTextArea(document.getElementById("html"), {
    theme: "monokai",
    lineNumbers: true,
    mode: 'xml',
    htmlMode: true
  });

  var css = CodeMirror.fromTextArea(document.getElementById("css"), {
    theme: "monokai",
    lineNumbers: true,
    indentUnit: 2
  });

  var js = CodeMirror.fromTextArea(document.getElementById("js"), {
    theme: "monokai",
    lineNumbers: true,
    mode: "text/javascript"
  });

  var code = html.getValue();

  var delay;
  html.on("change", function() {
    code = html.getValue();
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
  
  function updatePreview() {
    var previewFrame = document.getElementById('preview');
    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(code);
    preview.close();
  }
  setTimeout(updatePreview, 300);
})