var MapPreviewController = function(openPanelHandler, locationData, getPanel) {

  return {
    openMapPreviewHandler: function(controller, event) {
      var panel = getPanel(event);

      panel.collapse("toggle")
      setTimeout(function(event, panel) { //Needs a little timeout to have the correct width of the panel
        var width = panel.width();
        var height = 0.75 * width;
        var lat = locationData.position[0];
        var lng = locationData.position[1];
        var imageUrl = "http://staticmap.openstreetmap.de/staticmap.php?center=" + lat + "," + lng + "&zoom=16&size=" + width + "x" + height + "&maptype=mapnik"
        panel.find(".frame")
          .css('background-image', 'url(' + imageUrl + ')')
          .css('height', height);
        panel.find(".mapMarker")
          .css("left", Math.floor(width / 2) - 12) // minus the width of the marker
          .css("top", Math.floor(height / 2) - 41) // minus the height of the marker
      }, 50, event, panel.find("div.panel-body"))

      openPanelHandler.call(this);
    },

  };
};