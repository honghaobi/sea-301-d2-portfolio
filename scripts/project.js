var projects = [];

function Project (opts) {

  this.title = opts.title;
  this.category = opts.category;
  this.publishedOn = opts.publishedOn;
  this.img = opts.img;
  this.about = opts.about;
}

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

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $('#projects').append(a.toHtml());
});
