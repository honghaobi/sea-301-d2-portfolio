// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var projectView = {};

projectView.populateFilters = function() {
  $('.template').hide();
  $('project').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).attr('data-category');
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

projectView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('project').hide();
      var categoryDisplay = $(this).val();
      $('project').filter("[data-category = '" + categoryDisplay + "']").fadeIn("slow");
    } else {
      $('project').hide();
    }
    $('#project-filter').val('');
    $('.template').hide();
  });
};

projectView.handleMainNav = function() {
  $('.main-nav li').on('click', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).show();
  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

var stickyNavTop = $('.main-nav').offset().top;

projectView.stickyNav = function(){
  var scrollTop = $(window).scrollTop();
  if(scrollTop > stickyNavTop) {
    $('.main-nav').addClass('sticky');
  } else {
    $('.main-nav').removeClass('sticky');
  }
};

projectView.hoverProject = function(){
  $('img', this).on('hover', function(){
    console.log('hoverWorks');
    $('header').fadeIn();
  });
};



$(window).scroll(function(){
  projectView.stickyNav();
});

$(document).ready(function(){
  projectView.populateFilters();
  projectView.handleCategoryFilter();
  projectView.handleMainNav();
  projectView.hoverProject();
});
