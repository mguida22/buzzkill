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

$("#slider").roundSlider({
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

$('#active').famultibutton({
	classes: ['fa-4x'],
	icon: 'fa-bolt',
  onColor: '#000',
  offColor: '#ffffff',
  onBackgroundColor: '#3498DB',
  offBackgroundColor: '#bbb',
  mode: 'toggle',
});
