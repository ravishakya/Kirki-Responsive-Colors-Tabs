# Kirki Responsive Colors Tabs

**Author:** Ravi Shakya  
**Author URI:** https://bizbergthemes.com  
**License:** GNU General Public License v2 or later  
**License URI:** http://www.gnu.org/licenses/gpl-2.0.html  
**Version:** 0.3

## Description ##

By using this control, you can select different colors for different devices ( Laptop / Tablet / Mobile ). 

![49411720726a7ad9cd0a7eacc93e8774](https://user-images.githubusercontent.com/11089018/138320158-d31a75ca-7abc-4ccb-a995-2cc073554c82.gif)

## Example Code ##

````php
add_action( 'init' , function(){
	
	Kirki::add_field( 'bizberg', array(
		'type'              => 'color-normal-hover',
		'label'             => 'Body Background',
		'section'           => 'detail_page',
		'settings'          => 'body_background',
		'default' => json_encode(
			array(				
				'colors' => array(
					'normal_desktop' => '#8224e3',
					'normal_tablet'  => '#1e73be',
					'normal_mobile'  => '#81d742',
					'hover_desktop'  => '#eeee22',
					'hover_tablet'   => '#dd9933',
					'hover_mobile'   => '#dd3333'
				),
				'devices' => array(
					'desktop',
					'tablet',
					'mobile'
				)		
			)
		) 
	) );
  
});
````
## How to get colors in the frontend ? ##
````php
$body_background = get_theme_mod( 'body_background' );
$body_background = json_decode( $body_background, true );
echo esc_attr( $body_background['colors']['normal_desktop'] );
````
**Parameters**

Note: `Defalult value` is required for this to work. 

**colors**       - `(array)` `(required)` If you don't want any colors by default just pass an empty string. eg. `'normal_desktop' => ''` `'normal_tablet'  => ''`
````php
'colors' => array(
	'normal_desktop' => '#8224e3',
	'normal_tablet'  => '#1e73be',
	'normal_mobile'  => '#81d742',
	'hover_desktop'  => '#eeee22',
	'hover_tablet'   => '#dd9933',
	'hover_mobile'   => '#dd3333'
),
````
**devices**       - `(array)` `(required)` You can choose all three devices or just one.
````php
'devices' => array(
	'desktop',
	'tablet',
	'mobile'
)
````
## Note ##
You will need to install the kirki plugin first https://wordpress.org/plugins/kirki/

## Extras ##
If you want to use `'transport' => 'postMessage'`, you can use this js and php code to change the css on the previewer without refreshing the page.
````javascript
jQuery(document).ready(function(){

    var controls = {
        'body_background':{  // Your control name
            'normal' : {
                'element'  : 'body a', // element to target
                'property' : 'color'   // CSS property
            },
            'hover' : {
                'element'  : 'body a:hover',
                'property' : 'color'
            },
        },
        'body_background4':{ // Your control name
            'normal' : {
                'element'  : 'body',      // element to target
                'property' : 'background' // CSS property
            },
            'hover' : {
                'element'  : 'body:hover',
                'property' : 'background'
            },
        },
    };

    jQuery.each(controls , function(index, control) { 

        wp.customize(

            index, function( value ) {

                value.bind(

                    function( to ) {
                        var toArray = JSON.parse( decodeURI( to ) );
                        var style = '<div class="kirki_color_normal_hover_' + index + '">' + "\n";
                        style += '<style>' + "\n";

                        // For desktop
                        if( toArray.colors.normal_desktop != undefined ){
                            style += control.normal.element + '{' + control.normal.property + ':' + toArray.colors.normal_desktop + ' !important}' + "\n";
                        }

                        if( toArray.colors.hover_desktop != undefined ){
                            style += control.hover.element + '{' + control.hover.property + ':' + toArray.colors.hover_desktop + ' !important}' + "\n\n";
                        }

                        // For tablet
                        style += '@media (min-width: 481px) and (max-width: 1024px){' + "\n";

                        if( toArray.colors.normal_tablet != undefined ){
                            style += control.normal.element + '{' + control.normal.property + ':' + toArray.colors.normal_tablet + ' !important}' + "\n";
                        }

                        if( toArray.colors.hover_tablet != undefined ){
                            style += control.hover.element + '{' + control.hover.property + ':' + toArray.colors.hover_tablet + ' !important}' + "\n";
                        }
                        
                        style += '}' + "\n\n";

                        // For mobile
                        style += '@media (min-width: 320px) and (max-width: 480px){' + "\n";

                        if( toArray.colors.normal_mobile != undefined ){
                            style += control.normal.element + '{' + control.normal.property + ':' + toArray.colors.normal_mobile + ' !important}' + "\n";
                        }

                        if( toArray.colors.hover_mobile != undefined ){
                            style += control.hover.element + '{' + control.hover.property + ':' + toArray.colors.hover_mobile + ' !important}' + "\n";
                        }

                        style += '}' + "\n";

                        style += '</style>' + "\n";
                        style += '</div>';

                        jQuery('.kirki_color_normal_hover_'+index).remove();
                        jQuery('body').append( style );
                    }

                );
                
            }

        );

    });

});
````

````php
add_action( 'wp_head', 'my_custom_styles' );
function my_custom_styles(){

	$controls = [
        'body_background' => [  // Your control name
            'normal' => [
                'element'  => 'body a', // element to target
                'property' => 'color'   // CSS property
            ],
            'hover' => [
                'element'  => 'body a:hover',
                'property' => 'color'
            ],
        ],
        'body_background4' => [ // Your control name
            'normal' => [
                'element'  => 'body',      // element to target
                'property' => 'background' // CSS property
            ],
            'hover' => [
                'element'  => 'body:hover',
                'property' => 'background'
            ],
        ],
    ];

    $css = '';
    echo "\n<style>";
    foreach ($controls as $key => $value) {    	
    	$db_colors = get_theme_mod( $key );
    	$db_colors = json_decode( $db_colors , true );

    	if( !empty( $db_colors['colors']['normal_desktop'] ) ){
    		$css .= $value['normal']['element'] . '{' . $value['normal']['property']  . ':' . $db_colors['colors']['normal_desktop'] . '}';
    	}
    	if( !empty( $db_colors['colors']['hover_desktop'] ) ){
    		$css .= $value['hover']['element'] . '{' . $value['hover']['property']  . ':' . $db_colors['colors']['hover_desktop'] . '}';
    	}
    	if( !empty( $db_colors['colors']['normal_tablet'] ) ){
    		$css .= '@media (min-width: 481px) and (max-width: 1024px){';
    		$css .= $value['normal']['element'] . '{' . $value['normal']['property']  . ':' . $db_colors['colors']['normal_tablet'] . '}';
    		$css .= '}';
    	}
    	if( !empty( $db_colors['colors']['hover_tablet'] ) ){
    		$css .= '@media (min-width: 481px) and (max-width: 1024px){';
    		$css .= $value['hover']['element'] . '{' . $value['hover']['property']  . ':' . $db_colors['colors']['hover_tablet'] . '}';
    		$css .= '}';
    	}
    	if( !empty( $db_colors['colors']['normal_mobile'] ) ){
    		$css .= '@media (min-width: 320px) and (max-width: 480px){';
    		$css .= $value['normal']['element'] . '{' . $value['normal']['property']  . ':' . $db_colors['colors']['normal_mobile'] . '}';
    		$css .= '}';
    	}
    	if( !empty( $db_colors['colors']['hover_mobile'] ) ){
    		$css .= '@media (min-width: 320px) and (max-width: 480px){';
    		$css .= $value['hover']['element'] . '{' . $value['hover']['property']  . ':' . $db_colors['colors']['hover_mobile'] . '}';
    		$css .= '}';
    	}
    }
    echo esc_attr( $css );
    echo "</style>\n";
}
````

## Changelog ##

= 0.3 =
- Added alpha control

= 0.2 =
- Fixed CSS
- Added description field
- When clicked on customizer devices icon, change the content on modal as well ( if the modal is opened )

= 0.1 =
- Initial Release
