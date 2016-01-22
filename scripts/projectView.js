// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
(function(module) {

  var projectView = {};
  var stickyNavTop = $('.main-nav').offset().top;

  projectView.stickyNav = function(){
    var scrollTop = $(window).scrollTop();
    if(scrollTop > stickyNavTop) {
      $('.main-nav').addClass('sticky');
      $('#bg').addClass('stickyBehind');
    } else {
      $('.main-nav').removeClass('sticky');
      $('#bg').removeClass('stickyBehind');
    }
  };

  projectView.bgColor = function(){
    var scroll_pos = $(window).scrollTop();
    var animation_begin_pos = 0;
    var animation_end_pos = 1000;
    var beginning_color = new $.Color( 'rgb(226,235,236)' );
    var ending_color = new $.Color( 'rgb(230,250,247)' );
    var percentScrolled = scroll_pos / ( animation_end_pos - animation_begin_pos );
    var newRed = beginning_color.red() + ( ( ending_color.red() - beginning_color.red() ) * percentScrolled );
    var newGreen = beginning_color.green() + ( ( ending_color.green() - beginning_color.green() ) * percentScrolled );
    var newBlue = beginning_color.blue() + ( ( ending_color.blue() - beginning_color.blue() ) * percentScrolled );
    var newColor = new $.Color( newRed, newGreen, newBlue );

    if(scroll_pos >= animation_begin_pos && scroll_pos <= animation_end_pos ) {
      console.log( scroll_pos);
      console.log( newColor.red(), newColor.green(), newColor.blue());
      $('body').animate({ backgroundColor: newColor }, 0);
    } else if ( scroll_pos > animation_end_pos ) {
      $('body').animate({ backgroundColor: ending_color }, 0);
    } else if ( scroll_pos < animation_begin_pos ) {
      $('body').animate({ backgroundColor: beginning_color }, 0);
    } else { }
  };

  $(window).scroll(function(){
    projectView.stickyNav();
    projectView.bgColor();
  });

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
      $('.template').hide();
      if ($(this).val()) {
        $('project').hide();
        var categoryDisplay = $(this).val();
        $('project').filter('[data-category = "' + categoryDisplay + '"]').fadeIn('slow');
      } else {
        $('project').hide();
      }
      $('#project-filter').val('');
    });
  };

  projectView.hoverProject = function(){
    $('.img-container img').on('mouseenter', this, function(){
      $(this).parent().parent()
             .addClass('opacity70')
             .removeClass('scale100')
             .addClass('scale105');
    });

    $('.img-container img').on('mouseleave', this, function(){
      $(this).parent().parent()
             .removeClass('opacity70')
             .addClass('opacity100')
             .removeClass('scale1050')
             .addClass('scale100');
    });
  };

  projectView.clickProject = function(){
    $(this).parent().parent().removeClass('scale110').removeClass('opacity70');
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

  projectView.initIndexPage = function() {
    Project.all.forEach(function(a){
      $('#projects').append(a.toHtml());
    });
    projectView.populateFilters();
    projectView.handleCategoryFilter();
    projectView.hoverProject();
    projectView.clickProject();
  };

  module.projectView = projectView;
})(window);
