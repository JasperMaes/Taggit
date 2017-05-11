var ImagePreviewController = function(locationData, options) {

  var defaultOptions = {
    canDelete: true
  }

  options = $.extend({}, defaultOptions, options)

  var images = ko.pureComputed(function() {
    return ko.unwrap(ko.unwrap(locationData).images)
  })

  var imageIndex = ko.observable(null);

  var url = ko.pureComputed(function() {
    if (hasImage()) {
      var imageData = images()[imageIndex()];
      return "url(" + imageData + ")";
    } else {
      return null;
    }
  })

  var hasImage = ko.pureComputed(function() {
    return imageIndex() != null;
  })

  function backButtonHandler() {
    imageIndex(null)
  }

  /* WARNING: Delete only works if the images variable is an observable */
  function deleteButtonHandler() {
    if (!ko.isObservable(ko.unwrap(locationData).images)) {
      console.error("Images array is not in an observable; not deleting image");
      return;
    }

    var array = ko.unwrap(images);
    array.splice(imageIndex(), 1);
    ko.unwrap(locationData).images(array)

    backButtonHandler();
  }

  return {
    canDelete: options.canDelete,
    locationData: locationData,
    hasImage: hasImage,
    imageIndex: imageIndex,
    url: url,
    backButtonHandler: backButtonHandler,
    deleteButtonHandler: deleteButtonHandler
  };

};
