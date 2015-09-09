var $j = jQuery.noConflict();

$j(function(){

	var $expanded = false;
	var $searchOpen = false;
	// infinitescroll() is called on the element that surrounds 
// the items you will be loading more of

  $j('#posts').infinitescroll({
 		
    navSelector  : "#paged-navigation",            
                   // selector for the paged navigation (it will be hidden)
    nextSelector : "#paged-navigation a:first",    
                   // selector for the NEXT link (to page 2)
    itemSelector : ".post-container",        
                   // selector for all items you'll retrieve
    pixelsFromNavToBottom: 100,
    
    loadingText  : "Loading more posts...",      
                 // text accompanying loading image
                 // default: "<em>Loading the next set of posts...</em>"
 
    
    finishedMsg     : "I think we've hit the end, Jim"
                 // text displayed when all items have been retrieved
                 // default: "<em>Congratulations, you've reached the end of the internet.</em>"
    
  });
  
  beResponsive(); // moves the search form into a new div for 'mobile' or small screen layouts
  
  $j(window).resize(function() {
  	// update on resize
  	beResponsive();  // moves the search form into a new div for 'mobile' or small screen layouts
  });
    
  $j('#dropdown-title').removeClass('hide');
  $j('.menu-categories-container').hide().addClass('expandable');
  $j('#dropdown-title').toggle(function(){
  			if($searchOpen){
  				// search is open so close it first
  				$j('#search-menu').trigger('click');	
  			}
  			dropDown(this);
  	  }, function(){
  	  	pullUp(this);
    })
  
   $j('#search-menu').toggle(function(){
   		if($expanded) {
   			// if dropdown is expanded, pull it up and show search
   			$j('#dropdown-title').trigger('click');	
   		};
   		showSearch()
  }, function(){
  		hideSearch();
  });
  
  function dropDown($obj){
  	$j($obj).addClass('clicked'); // add color to header
  	$expanded = true;
		$j('.menu-categories-container').slideDown(300); // slide in the menu
  }
  function pullUp($obj){
  	$expanded = false;
  	$j($obj).removeClass('clicked');
  	$j('.menu-categories-container').fadeOut('300', function(){
  		// animation complete
  		
  	});
  }
  function showSearch(){
  	$j('#search-menu a').addClass('active');
  	$j('#search').addClass('show');
  	$searchOpen = true;
  }
  function hideSearch(){
	  $j('#search-menu a').removeClass('active');
  	$j('#search').removeClass('show');
  	$searchOpen = false;
  }
  
   function beResponsive(){

		w = $j(window).width();
	  if ( w <= 768 ){
	  	// we have a small screen
	  	// Move search into menus
	  	var $search = $j('#search');
	  	$j('#menus').append($search);	
	  	
	  } else {
	  	var $search = $j('#search');
	  	$j('#sidebar').prepend($search);	
			
	  }
	  
	  
	 }

});
