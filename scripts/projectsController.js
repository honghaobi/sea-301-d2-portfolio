(function(module) {
  var projectsController = {};

  projectsController.index = function() {
    Project.fetchAll(projectView.initIndexPage);
    $('#about').hide();
    $('#projects').show();
  };

  module.projectsController = projectsController;
})(window);
