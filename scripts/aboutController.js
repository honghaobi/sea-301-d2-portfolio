(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    repos.requestRepos(repoView.index);
    $('#projects').fadeOut(100);
    $('#about').fadeIn(800);
  };

  module.aboutController = aboutController;
})(window);
