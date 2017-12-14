/**
 * ------------------------------------------------------------------------
 * Mega Menu via http://fellowtuts.com/twitter-bootstrap/mega-menu-multi-column-container-bootstrap-nav-dropdown/
 * ------------------------------------------------------------------------
 */


jQuery('li.has-mega-menu').each(function(idx, val){
		var set = 10, //Number of links to display in each column
			buffer = [],
			dropdown = jQuery('.dropdown-menu', this),
			children = dropdown.children(),
			cols = Math.ceil(children.length/set),
			col_class = 'col-6 col-md-' + (cols >= 5 ? '2' : (cols == 4 ? '3' : (cols == 3 ? '4' : 'x'))),
			container_class = 'px-0 container container-' + (cols == 2 ? 'sm' : (cols == 3 ? 'md' : (cols == 4 ? 'lg' : (cols >= 5 ? 'xl' : 'x'))));

		for(var i = 0; i < cols; i++) {
			buffer.push('<div class="' + col_class + '">');
			children.slice(i*set, (i+1)*set).each(function(){
				buffer.push(jQuery(this).prop('outerHTML'));
			});
			buffer.push('</div>');
		}

		dropdown.html('<div class="' + container_class + '"><div class="row">' + buffer.join('\n') + '</div></div>');
	});

	(function(){
		setTimeout(function(){
			jQuery( window ).resize(function() {
				if(jQuery(window).width() >= 750){
					jQuery('#navbarNavDropdown').removeClass('show');
				}
			});
			jQuery('.navbar-toggler').click(function(){
				jQuery('#navbarNavDropdown').toggleClass('in');
			})
			jQuery('.searchToggler').click(function(){
				jQuery('.search-menu-bar').toggleClass('show');
			})
		},0)

	})();
