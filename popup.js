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


    function changeTooltip(e) {
    var val = e.value, sensitivity;
    if (val < 20) sensitivity = "Low";
    else if (val < 40) sensitivity = "Normal";
    else if (val < 70) sensitivity = "High";
    else sensitivity = "Everything";

    return val;
}

$('#demo').famultibutton({
	classes: ['fa-4x'],
	icon: 'fa-bolt',
    onColor: '#000',
    offColor: '#ffffff',
    onBackgroundColor: '#3498DB',
    offBackgroundColor: '#bbb',
    mode: 'toggle', 
});
