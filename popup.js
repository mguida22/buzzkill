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
  var active = $("#active").is(":checked");
  var whitelist = $("#whitelist").val();

  whitelist = whitelist.replace(/ /g, '').split(',');

  chrome.storage.sync.set({'active': active});
  chrome.storage.sync.set({'whitelist': whitelist});
});
