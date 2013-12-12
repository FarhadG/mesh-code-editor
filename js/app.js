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

  // event listeners

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
  
  function updatePreview(el) {
    var previewFrame = document.getElementById('preview');
    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(html.getValue());
    preview.close();
  }
  setTimeout(updatePreview, 300);
})