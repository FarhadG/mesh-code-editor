$(function() {

  $('#preview').height($(window).height());
  $('div.CodeMirror').click(function() {
    $(this).css('height', $(window).height()); 
  });

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

  // $textarea.keyup(function() {
  //   var htmlContent = $('textarea.html').val();
  //   var cssContent  = $('textarea.css').val();
  //   var jsContent   = $('textarea.js').val();

  //   $("#frame").attr(
  //     "src", "data:text/html;charset=utf-8," + 
  //     "<html>" +  
  //     "<style>" +
  //     cssContent +
  //     "</style>" +
  //     htmlContent +
  //     "<script src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js\"><" + "/script>" +    
  //     "<script>" + 
  //     jsContent + 
  //     "<" +
  //     "/script>" +         
  //     "</html>"
  //   );
  // });


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