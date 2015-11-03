$("#buzzkill-slider").roundSlider({
  value: 50,
  radius: 43,
  width: 6,
  handleSize: "10,8",
  handleShape: "square",
  sliderType: "min-range",
  mouseScrollAction: true,
  editableTooltip: false,
  tooltipFormat: "changeTooltip"
});

var btn = $('#buzzkill-active').famultibutton({
	classes: ['fa-4x'],
	icon: 'fa-bolt',
  onColor: '#000',
  offColor: '#ffffff',
  onBackgroundColor: '#3498DB',
  offBackgroundColor: '#bbb',
  mode: 'toggle',
  toggleOn: function() {
    chrome.storage.sync.set({'active': true});
  },
  toggleOff: function() {
    chrome.storage.sync.set({'active': false});
  }
});

$("#buzzkill-save").click(function() {
  $("#buzzkill-save").css("backgroundColor", "#bbb");
  var sWhitelist = $("#buzzkill-whitelist").val();
  sWhitelist = sWhitelist.replace(/ /g, '').split(',');

  if (!sWhitelist) {
    sWhitelist = [];
  }
  chrome.storage.sync.set({'whitelist': sWhitelist}, function() {
    setTimeout(function () {
      $("#buzzkill-save").css("backgroundColor", "#3498DB");
    }, 100);
  });
});

chrome.storage.sync.get(['active', 'whitelist'], function(data) {
  if (data.active === false) {
    btn.setOff();
  } else {
    btn.setOn();
  }

  if (data.whitelist) {
    $("#buzzkill-whitelist").val(data.whitelist.join(", "));
  }
});
