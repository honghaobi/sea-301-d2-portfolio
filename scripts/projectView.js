// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
(function(module) {

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
        $('.template').hide();
        $('project').hide();
        var categoryDisplay = $(this).val();
        $('project').filter('[data-category = "' + categoryDisplay + '"]').fadeIn('slow');
      } else {
        $('project').hide();
      }
      $('#project-filter').val('');
    });
  };

  // projectView.handleMainNav = function() {
  //   $('#about').hide();
  //   $('.main-nav li').on('click', function() {
  //     $('.tab-content').hide();
  //     $('#' + $(this).data('content')).show();
  //   });
  //
  //   $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
  // };

  var stickyNavTop = $('.main-nav').offset().top;

  projectView.stickyNav = function(){
    var scrollTop = $(window).scrollTop();
    if(scrollTop > stickyNavTop) {
      $('.main-nav').addClass('sticky');
    } else {
      $('.main-nav').removeClass('sticky');
    }
    if(scrollTop > stickyNavTop) {
      $('#bg').addClass('stickyBehind');
    } else {
      $('#bg').removeClass('stickyBehind');
    }
  };

  // projectView.hoverProject = function(){
  //   $('.img-container img').on('mouseenter', this, function(){
  //     $(this).css('opacity','.8');
  //   });
  //
  //   $('.img-container img').on('mouseleave', this, function(){
  //     $(this).css('opacity','1');
  //   });
  // };

  projectView.clickProject = function(){
    // $('.img-container img').on('click', this, function(){
    //   $(this).parent().parent().find('header').css('opacity','.8').toggle('slide');
    // });
    $('#shade').hide();
    $('.img-container img').on('click', this, function(){
      $(this).clone().appendTo('#lb').addClass('lightbox');
      $('#shade').show();
    });
    $('#lb').on('click', this, function(){
      $(this).children().remove();
      $('#shade').hide();
    });
  };



  $(window).scroll(function(){
    projectView.stickyNav();
  });

  projectView.initIndexPage = function() {
    Project.all.forEach(function(a){
      $('#projects').append(a.toHtml());
    });
    projectView.populateFilters();
    projectView.handleCategoryFilter();
    // projectView.handleMainNav();
    // projectView.hoverProject();
    projectView.clickProject();
  };

  module.projectView = projectView;
})(window);
