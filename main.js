$(function() {
  var title;

  $("a").each(function() {
    title = $(this).text();
    title = title.trim().toLowerCase();

    var _this = this;

    if (title) {
      dict["phrases"].forEach(function(phrase) {
        if (title.indexOf(phrase) > -1) {
          console.log(title);
          $(_this).text(newTitle);
        }
      });
    }

    if (title && title.match(/\d+/g)) {
      dict["number_phrases"].forEach(function(phrase) {
        if (title.indexOf(phrase) > -1) {
          console.log(title);
          $(_this).text(newTitle);
        }
      });
    }
  });

});
