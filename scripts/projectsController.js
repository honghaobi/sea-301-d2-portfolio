(function(module) {
  var projectsController = {};

  projectsController.index = function() {
    Project.fetchAll(projectView.initIndexPage);
    $('#about').fadeOut();
    $('#projects').fadeIn();
  };

  module.projectsController = projectsController;
})(window);
