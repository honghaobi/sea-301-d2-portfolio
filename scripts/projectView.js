// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var projectView = {};

projectView.populateFilters = function() {
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
      $('project').filter("[data-category = '" + categoryDisplay + "']").fadeIn();
      $('#category-filter').reset();
    } else {
      $('project').hide();
    }
    $('#project-filter').val('');
  });
};

projectView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).show();
  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

$(document).ready(function(){
projectView.populateFilters();
projectView.handleCategoryFilter();
projectView.handleMainNav();
});
