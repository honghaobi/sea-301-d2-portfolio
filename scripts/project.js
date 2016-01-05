var projects = [];

function Project (opts) {

  this.title  = opts.title;
  this.category = opts.category;
  this.publishedOn = opts.publishedOn;
  this.about = opts.about;
}

Project.prototype.toHtml = function() {
  var $newProject = $('project.template').clone();

  $newProject.data('title', this.title);
  $newProject.data('category', this.category);
  $newProject.data('publishedOn', this.publishedOn);
  $newProject.data('about', this.about)

  // Include the publication date as a 'title' attribute to show on hover:
  $newProject.find('time[pubdate]').attr('title', this.publishedOn)

  // Display the date as a relative number of "days ago":
  $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago')

  $newProject.append('<hr>');

  // TODO: This cloned article is no longer a template, so we should remove that class...
  $('project').removeClass('template');
  return $newArticle;
}

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  articles.push(new Article(ele));
})

articles.forEach(function(a){
  $('#articles').append(a.toHtml())
});
