# Kirki Responsive Colors Tabs

**Author:** Ravi Shakya  
**Author URI:** https://bizbergthemes.com  
**License:** GNU General Public License v2 or later  
**License URI:** http://www.gnu.org/licenses/gpl-2.0.html  
**Version:** 0.1

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
