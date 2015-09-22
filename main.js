var currentUrl;
var isFacebook = false;

function formatCurrentUrl() {
  // send to lowercase for easier matching later
  currentUrl = window.location.href.toLowerCase();
  // remove http stuff (ex. 'https://')
  currentUrl = currentUrl.replace(/^https?:\/\//g, '');
  // remove items after tld (ex. '/posts/120')
  currentUrl = (/.+\.\w+\//g).exec(currentUrl)[0];

  if (!currentUrl) {
    currentUrl = window.location.href;
  }

  if (currentUrl.indexOf('facebook') > -1) {
    isFacebook = true;
  }
}

function changeFacebookLink(_this) {
  var uilinkSubtle, UFINoWrap, UFIShareLink, UFICommentLink, UFICommentLike;

  console.log('a');
  console.log(_this);

  uilinkSubtle = $(_this).hasClass("uiLinkSubtle");
  UFINoWrap = $(_this).hasClass("UFINoWrap");
  UFIShareLink = $(_this).hasClass("UFIShareLink");
  UFICommentLink = $(_this).hasClass("UFICommentLink");
  UFICommentLike = $(_this).hasClass("UFICommentLikeButton");

  if ()

  if (uilinkSubtle || UFINoWrap || UFIShareLink || UFICommentLink || UFICommentLike) {
    console.log('b');
    return;
  } else {
    console.log('c');
    changeLink(_this);
  }
}

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
    dict["number_phrases"].forEach(function(phrase) {
      if (title.indexOf(phrase) > -1) {
        $(_this).text(newTitle);
        changed = true;
      }
    });
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
  formatCurrentUrl();
  main();
});

function main() {
  $("a").each(function() {
    // if we're on facebook and it's a link to facebook handle it specially
    if (isFacebook && $(this).attr('href') && $(this).attr('href').indexOf(currentUrl) > -1) {
      changeFacebookLink(this);
    } else {
      changeLink(this);
    }
  });
}
