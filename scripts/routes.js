page.base('');
page('/', index);
page('/about', about);
page();
function index(){
  projectsController.index();
};

function about(){
  aboutController.index();
};
