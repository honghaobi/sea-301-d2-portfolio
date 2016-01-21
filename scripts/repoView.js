(function(module) {
  var repoView = {};

  var ui = function() {
    var $about = $('#about');
  };

  var render = function(repo) {
    return $('<li>').html(repo.name);
  };

  repoView.index = function() {
    ui();

    if($('#about-container ul li').length === 0){
      $('#about ul').append(
        repos.with('name').map(render)
      );
    }
  };

  module.repoView = repoView;
})(window);
