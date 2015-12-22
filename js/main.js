var currentUrl;
var isFacebook = false;
var isBuzzfeed = false;
var whitelistedUrl = false;

var active;
var whitelist = [];


function updateFromStorage(cb) {
  chrome.storage.sync.get(['active', 'whitelist'], function(data) {
    active = data.active;
    whitelist = data.whitelist;
    cb();
  });
}

function formatUrl(url) {
  // send to lowercase for easier matching later
  url = url.toLowerCase();
  // remove http stuff (ex. 'https://')
  url = url.replace(/^https?:\/\//g, '');
  // remove items after tld (ex. '/posts/120')
  url = (/.+\.\w+\//g).exec(url);
  if (url) {
    return url[0];
  }
  return null;
}

function formatCurrentUrl() {
  currentUrl = formatUrl(window.location.href);

  if (!currentUrl) {
    currentUrl = window.location.href;
  }

  if (currentUrl.indexOf('facebook') > -1) {
    isFacebook = true;
  }

  if (currentUrl.indexOf('buzzfeed') > -1) {
    isBuzzfeed = true;
  }

  whitelistedUrl = false;
  if (whitelist) {
    whitelist.forEach(function(url) {
      if (!url) {
        return;
      }

      if (url.length > currentUrl.length) {
        if (url.indexOf(currentUrl) > -1) {
          whitelistedUrl = true;
        }
      } else {
        if (currentUrl.indexOf(url) > -1) {
          whitelistedUrl = true;
        }
      }
    });
  }
}

function changeFacebookLink(_this) {
  var uilinkSubtle, UFINoWrap, UFIShareLink, UFICommentLink, UFICommentLike;

  uilinkSubtle = $(_this).hasClass("uiLinkSubtle");
  UFINoWrap = $(_this).hasClass("UFINoWrap");
  UFIShareLink = $(_this).hasClass("UFIShareLink");
  UFICommentLink = $(_this).hasClass("UFICommentLink");
  UFICommentLike = $(_this).hasClass("UFICommentLikeButton");

  if (uilinkSubtle || UFINoWrap || UFIShareLink || UFICommentLink || UFICommentLike) {
    return;
  } else {
    changeLink(_this);
  }
}

function changeBuzzfeedLink(_this) {
  var ledeLink;

  ledeLink = $(_this).hasClass("lede__link");

  if (ledeLink) {
    $(_this).text(newTitle);
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
        $(_this).closest('span').remove();
        changed = true;
      }
    });
  }
}

// runs on scroll stopped
// idea from http://stackoverflow.com/a/12618549
(function() {
  if (!whitelistedUrl) {
    var timer;
    $(window).bind('scroll',function () {
      clearTimeout(timer);
      timer = setTimeout(main(), 99999);
    });
  }
})();

// runs on page load
$(function() {
  updateFromStorage(function() {
    if (active) {
      formatCurrentUrl();
      if (!whitelistedUrl) {
        main();
      }
    }
  });
});

function main() {
  $("a").each(function() {
    var link = $(this).attr('href');
    if (isFacebook && link && (link.indexOf(currentUrl) > -1 || link.charAt(0) === '/')) {
      changeFacebookLink(this);
    } else if (isBuzzfeed && link) {
      changeBuzzfeedLink(this);
    }
    else {
      changeLink(this);
    }
  });
}
