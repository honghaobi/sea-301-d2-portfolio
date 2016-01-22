(function(module) {
  var projectsController = {};

  projectsController.index = function() {
    Project.fetchAll(projectView.initIndexPage);
    $('#about').fadeOut(100);
    $('#projects').fadeIn(800);
  };

  module.projectsController = projectsController;
})(window);
