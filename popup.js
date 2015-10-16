chrome.storage.sync.get(['active', 'whitelist'], function(data) {
  $("#active").prop('checked', data.active);
  $("#whitelist").val(data.whitelist.join(", "));
});

// grabs the current url of the tab
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    callback(url);
  });
}

$("#save").click(function() {
  var sActive = $("#active").is(":checked");
  var sWhitelist = $("#whitelist").val();

  sWhitelist = sWhitelist.replace(/ /g, '').split(',');

  var formattedWhitelist = [];
  sWhitelist.forEach(function(url) {
    url = formatUrl(url);
    if (url) {
      formattedWhitelist.push(url);
    }
  });

  chrome.storage.sync.set({'active': sActive});
  chrome.storage.sync.set({'whitelist': formattedWhitelist});
});
