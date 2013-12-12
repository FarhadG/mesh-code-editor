$(function() {

  $('#preview').height($(window).height());
  // $('div.CodeMirror').click(function() {
  //   $(this).css('height', $(window).height()); 
  // });

  // $textarea.click(function() {
  //   var $this = $(this);

  //   if ($this.attr('class') === 'html') {
  //     $this.animate({
  //       height: $(window).height() / 2
  //     }, 200);
  //     $('textarea.css, textarea.js').animate({
  //       height: $(window).height() / 4.1
  //     }, 200);

  //   } else if ($this.attr('class') === 'css') {
  //     $this.animate({
  //       height: $(window).height() / 2
  //     }, 200);
  //     $('textarea.html, textarea.js').animate({
  //       height: $(window).height() / 4.1
  //     }, 200);

  //   } else {
  //     $this.animate({
  //       height: $(window).height() / 2
  //     }, 200);
  //     $('textarea.html, textarea.css').animate({
  //       height: $(window).height() / 4.1
  //     }, 200);
  //   }
  // });

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
    indentUnit: 2
  });

  var js = CodeMirror.fromTextArea(document.getElementById("js"), {
    theme: "monokai",
    lineNumbers: true,
    mode: "text/javascript"
  });

  var code = function() {
    var htmlContent = html.getValue();
    var cssContent = css.getValue();
    var jsContent = js.getValue();

    return "<html>" +  
      "<style>" +
      "*{font-size:24px;color:#999;}" +
      cssContent +
      "</style>" +
      htmlContent +
      "<script src=\"http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js\"><" + 
      "/script>" +    
      "<script>" +
      "$(function(){" + 
      jsContent +
      "});" + 
      "<" +
      "/script>" +         
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
  
  function updatePreview() {
    var previewFrame = document.getElementById('preview');
    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(code());
    preview.close();
  }
  setTimeout(updatePreview, 300);
})