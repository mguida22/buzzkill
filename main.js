function changeLink(_this) {
  var title, link;
  var changed = false;

  link = $(_this).attr('href');
  title = $(_this).text();
  title = title.trim().toLowerCase();


  if (title) {
    dict["phrases"].forEach(function(phrase) {
      if (title.indexOf(phrase) > -1) {
        $(_this).text(newTitle);
        changed = true;
      }
    });
  }

  if (title && title.match(/\d+/g) && !changed) {
    if (title.match(/\d+.*\s+.*\d+.*\s+.*\d+/g)) {
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
}

// runs on scroll stopped
// idea from http://stackoverflow.com/a/12618549
(function() {
  var timer;
  $(window).bind('scroll',function () {
    clearTimeout(timer);
    timer = setTimeout(main(), 150 );
  });
})();

// runs on page load
$(function() {
  main();
});

function main() {
  $("a").each(function() {
    changeLink(this);
  });
}
