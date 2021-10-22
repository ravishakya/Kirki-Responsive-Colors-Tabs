/**
* Show normal and hover tab content
*/

jQuery(document).on('click','.tab_normal,.tab_hover',function(e){

    e.preventDefault();

    // Change background color on tab headings
    jQuery(this).closest('.kcnh-group-list').find('li').removeClass('active ui-state-active');
    jQuery(this).closest('li').addClass('active ui-state-active');

    if( jQuery(this).attr('href') == '#tab-Normal' ){ // When click on normal tab

        // Hide hover color and show normal color
        jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content .tab-Normal-0').show();
        jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content .tab-Hover-0').hide();

        // Hide hover icons and show normal icons
        jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content .kcnh_icon_wrapper a.normal').show();
        jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content .kcnh_icon_wrapper a.hover').hide();

        // When clicked on normal tab, set selected icon to first one and color to the first one
        jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content .kcnh_icon_wrapper a:nth-child(1)').trigger('click');

    } else { // When click on hover tab

        // Hide normal color and show hover color
        jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content .tab-Normal-0').hide();
        jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content .tab-Hover-0').show();

        // Hide normal icons and show hover icons
        jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content .kcnh_icon_wrapper a.normal').hide();
        jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content .kcnh_icon_wrapper a.hover').show();

        // When clicked on hover tab, set selected icon to first one and color to the first one
        jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content .kcnh_icon_wrapper a:nth-child(2)').trigger('click');

    }

    return false;

});

/**
* Show/hide popup when click on icon
*/

jQuery(document).on( 'click' , '.kcnh-adv-toggle-icon' , function(){

    var tab_content = jQuery(this).closest('.kcnh-color-tabs-wrapper').find('.kcnh-field-settings-wrap');

    jQuery('.kcnh-field-settings-wrap').removeClass('selected'); // Remove globally "selected" class
    tab_content.addClass('selected'); //  Add "selected" class only for the clicked section
    jQuery('.kcnh-field-settings-wrap:not(.selected)').hide(); // Hide all open tabs except the clicked one 

    jQuery('.kcnh-adv-toggle-icon').removeClass('open'); // Remove globally "open" class
    
    if( tab_content.is(":visible") ){
        tab_content.hide();
        jQuery(this).closest('.kcnh-color-tabs-wrapper').find('.kcnh-adv-toggle-icon').removeClass('open'); // remove class 'open' to change the icon to pencil
        jQuery(this).closest('.customize-control-color-normal-hover').removeClass('selected_item');
    } else {
        tab_content.show();
        jQuery(this).closest('.kcnh-color-tabs-wrapper').find('.kcnh-adv-toggle-icon').addClass('open'); // add class 'open' to change the icon to remove
        jQuery(this).closest('.customize-control-color-normal-hover').addClass('selected_item');
    }   

    kcnh_change_screen_size( 'desktop' ); 

    // Set default open tab to normal
    jQuery(this).closest('.customize-control-color-normal-hover').find('.kcnh-group-list li:first-child a').trigger('click');

});

/**
* When clicked outside of the popup close the popup
*/

jQuery(document).on('click', function (e) {

    // Don't close the opened tab content if clicked on screen size options
    if( jQuery(e.target).hasClass('preview-tablet') || jQuery(e.target).hasClass('preview-desktop') || jQuery(e.target).hasClass('preview-mobile') ){
        return;
    }

    if ( jQuery(e.target).closest(".customize-control-color-normal-hover.selected_item").length === 0 ) { // If clicked outside the color tab div close the color tab
        jQuery('.kcnh-field-settings-wrap').removeClass('selected');
        jQuery('.kcnh-field-settings-wrap').hide();
        jQuery('.kcnh-adv-toggle-icon').removeClass('open');
        jQuery('.customize-control-color-normal-hover').removeClass('selected_item');
    }
});

/**
* When clicked device icon show the respective color picker
*/

jQuery(document).on('click','.kcnh_icon_wrapper a',function(){

    // When clicked on device icon, hide all the colors( normal and hover ), later will be shown individually
    jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content').find('.tab-Normal').hide();
    jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content').find('.tab-Hover').hide();

    // Remove all active class on device icons, later will be added individually
    jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content .kcnh_icon_wrapper a').removeClass('active');

    if( jQuery(this).hasClass('icon_normal_desktop') ){

        jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content').find('#tab-Normal-desktop').show(); // Show respective color field on click
        jQuery(this).addClass('active');
        kcnh_change_screen_size( 'desktop' );

    } else if( jQuery(this).hasClass('icon_normal_tablet') ){

        jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content').find('#tab-Normal-tablet').show();
        jQuery(this).addClass('active');
        kcnh_change_screen_size( 'tablet' );

    } else if( jQuery(this).hasClass('icon_normal_mobile') ){

        jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content').find('#tab-Normal-mobile').show();
        jQuery(this).addClass('active');
        kcnh_change_screen_size( 'mobile' );

    } else if( jQuery(this).hasClass('icon_hover_desktop') ){

        jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content').find('#tab-Hover-desktop').show();
        jQuery(this).addClass('active');
        kcnh_change_screen_size( 'desktop' );

    } else if( jQuery(this).hasClass('icon_hover_tablet') ){

        jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content').find('#tab-Hover-tablet').show();
        jQuery(this).addClass('active');
        kcnh_change_screen_size( 'tablet' );

    } else if( jQuery(this).hasClass('icon_hover_mobile') ){

        jQuery(this).closest('#kcnh-settings-colors-tabs').find('.kcnh-tab-content').find('#tab-Hover-mobile').show();
        jQuery(this).addClass('active');
        kcnh_change_screen_size( 'mobile' );

    }

});

function kcnh_change_screen_size( device ){

    setTimeout(function(){ 
        
        switch( device ){

            case 'desktop':     
                kcnh_customizer_desktop_view();
                break;

            case 'tablet':
                kcnh_customizer_tablet_view();
                break;

            default:
                kcnh_customizer_mobile_view()
                break;

        }

    }, 100);

}

function kcnh_customizer_desktop_view(){
    jQuery('button.preview-desktop').click();
}

function kcnh_customizer_tablet_view(){
    jQuery('button.preview-tablet').click();
}

function kcnh_customizer_mobile_view(){
    jQuery('button.preview-mobile').click();
}

/**
* When color is changed, refresh the iframe and changed the hidden content as well
*/

function kcnh_change_colors( $this, selected_color, key ){
    var saved_value = $this.closest('.kcnh-color-tabs-wrapper').find('.kcnh-color-tab-json').val();
    var save_db     = $this.closest('.kcnh-color-tabs-wrapper').find('.kcnh-color-tab-json');

    setTimeout( function(){
        var color = selected_color;
        saved_value = saved_value === '' ? {} : JSON.parse(saved_value);
        saved_value['colors'][key] = color;
        save_db.val(JSON.stringify(saved_value)).change();
    }, 100 );
}

/**
* When clicked on devices icon on customizer, change the tab content as well
* For this to work the tab content should be opened
*/

jQuery(document).on('click','.devices-wrapper .devices button', function(e){

    e.preventDefault();

    // Check which device is clicked
    if( jQuery(this).hasClass('active') ){

        var device = jQuery(this).data('device');
        var selected = jQuery('.kcnh-field-settings-wrap.selected .kcnh-group-list li.active').data('selected');

        // Globally hide, will show individually in below condition
        jQuery('.kcnh-field-settings-wrap.selected .kcnh_icon_wrapper a').removeClass('active');
        jQuery('.kcnh-tab-content .tab-Normal').hide();
        jQuery('.kcnh-tab-content .tab-Hover').hide();

        switch( device ){

            case 'desktop':                

                if( selected == 'normal' ){
                    jQuery('.kcnh-field-settings-wrap.selected .icon_normal_desktop').addClass('active');
                    jQuery('.kcnh-field-settings-wrap.selected #tab-Normal-desktop').show();
                } else{
                    jQuery('.kcnh-field-settings-wrap.selected .icon_hover_desktop').addClass('active');
                    jQuery('.kcnh-field-settings-wrap.selected #tab-Hover-desktop').show();
                }

                break;

            case 'tablet':                
                
                if( selected == 'normal' ){
                    jQuery('.kcnh-field-settings-wrap.selected .icon_normal_tablet').addClass('active');
                    jQuery('.kcnh-field-settings-wrap.selected #tab-Normal-tablet').show();
                } else{
                    jQuery('.kcnh-field-settings-wrap.selected .icon_hover_tablet').addClass('active');
                    jQuery('.kcnh-field-settings-wrap.selected #tab-Hover-tablet').show();
                }

                break;

            case 'mobile':                
                
                if( selected == 'normal' ){
                    jQuery('.kcnh-field-settings-wrap.selected .icon_normal_mobile').addClass('active');
                    jQuery('.kcnh-field-settings-wrap.selected #tab-Normal-mobile').show();
                } else{
                    jQuery('.kcnh-field-settings-wrap.selected .icon_hover_mobile').addClass('active');
                    jQuery('.kcnh-field-settings-wrap.selected #tab-Hover-mobile').show();
                }

                break;
        }
    }

    return;

});