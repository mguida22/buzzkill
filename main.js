$(function() {
  var title;
  $("a").each(function() {
    title = $(this).text();

    if (title && title.match(/\d+/g) !== null) {
      console.log(title);
    }
  });
});
