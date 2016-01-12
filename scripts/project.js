function Project (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.publishedOn = opts.publishedOn;
  this.img = opts.img;
  this.about = opts.about;
}

Project.all = [];

Project.prototype.toHtml = function() {
  var $newProject = $('project.template').clone();
  $newProject.removeClass('template');


  $newProject.attr('data-category', this.category);


  $newProject.find('h1:first').html(this.title);
  $newProject.find('img').attr('src', this.img);
  $newProject.find('.project-about').html(this.about);
  $newProject.find('time[pubdate]').attr('datetime', this.publishedOn);
  $newProject.find('time[pubdate]').attr('title', this.publishedOn);
  $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  return $newProject;
};

Project.loadAll = function(rawData){
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(ele) {
    Project.all.push(new Project(ele));
  });

};

Project.newData = function() {
  $.ajax({
    type: 'GET',
    url: 'data/myProjects.json',
    success: function(rawData, textStatus, request){
      var eTag = request.getResponseHeader('ETag');
      localStorage.eTag = eTag;
      localStorage.rawData = JSON.stringify(rawData);
      Project.loadAll(rawData);
      projectView.initIndexPage();
    },
    error: function (request, textStatus, errorThrown) {
      console.log('error');
    }
  });
};
Project.fetchAll = function() {
  if(localStorage.rawData) {
    $.ajax({
      type: 'HEAD',
      url: 'data/myProjects.json',
      complete: function(xhr){
        if(localStorage.eTag === xhr.getResponseHeader('ETag')){
          Project.loadAll(JSON.parse(localStorage.rawData));
          projectView.initIndexPage();
        } else {
          Project.newData();
        }
      }
    });
  } else {
    Project.newData();
  }
};
