$(function() {
  var title, link, changed;

  $("a").each(function() {
    changed = false;

    link = $(this).attr('href');
    title = $(this).text();
    title = title.trim().toLowerCase();

    var _this = this;

    if (title) {
      dict["phrases"].forEach(function(phrase) {
        if (title.indexOf(phrase) > -1) {
          $(_this).text(newTitle);
          changed = true;
        }
      });
    }

    if (title && title.match(/\d+/g) && !changed) {
      if (title.match(/\d+.+\d+.+\d+/g)) {
        $(_this).text(newTitle);
        changed = true;
      } else {
        dict["number_phrases"].forEach(function(phrase) {
          if (title.indexOf(phrase) > -1) {
            $(_this).text(newTitle);
            changed = true;
          }
        });
      }
    }

    if (link && !changed) {
      dict["blocked_urls"].forEach(function(url) {
        if (link.indexOf(url) > -1) {
          $(_this).text(newTitle);
          changed = true;
        }
      });
    }

    console.log(link);
    console.log(changed);
  });
});
