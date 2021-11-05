<?php

/**
* Plugin Name: Kirki Responsive Colors Tabs ( Normal / Hover )
* Author: Ravi Shakya
* Version: 0.3
* Requires WP:   4.9
* Requires PHP:  5.3
* Description: By using this control, you can select different colors for different devices ( Laptop / Tablet / Mobile ).
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'init' , function(){
	add_filter( 'kirki_control_types', function ( $controls ) {
			$controls['color-normal-hover'] = 'KIRKI_COLOR_NORMAL_HOVER';
			return $controls;
		}
	);	
});

add_action( 'customize_register', 'kirki_color_normal_hover_customize_register' );
function kirki_color_normal_hover_customize_register(){

	class KIRKI_COLOR_NORMAL_HOVER extends Kirki_Control_Base {

		public $type = 'kirki-color-normal-hover';

		public function enqueue() {
			wp_enqueue_style( 'wp-color-picker' );
			wp_enqueue_script( 
				'kirki-color-normal-hover-js', 
				plugin_dir_url( __FILE__ ) . 'js/scripts.js', 
				array( 'jquery' )
			);
			wp_enqueue_style( 
				'kirki-color-normal-hover-css', 
				plugin_dir_url( __FILE__ ) . 'css/style.css' 
			);
		}

		public function render_content() {

			$default = empty( $this->value() ) ? [] : json_decode( $this->value(), true );

			$devices  = !empty( $default['devices'] ) ? $default['devices'] : array('desktop','tablet','mobile');
			$devices  = array_unique( $devices );

			$colors   = !empty( $default['colors'] ) ? $default['colors'] : array(); ?>

			<div class="kcnh-color-tabs-wrapper">
				<div class="kcnh-toggle-desc-wrap">
					<label class="customizer-text">
						<span class="titledesc_wrapper">
							<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
							<span class="description customize-control-description">
								<?php echo esc_html( $this->description ); ?>
							</span>
						</span>
						<span class="kcnh-adv-toggle-icon dashicons"></span>
					</label>
				</div>

				<div class="kcnh-field-settings-wrap" style="display: none;">
					<div class="kcnh-field-settings-modal">
						<ul class="kcnh-fields-wrap">
							<div id="kcnh-settings-colors-tabs" class="kcnh-group-tabs">
								<ul class="kcnh-group-list ui-tabs-nav">
									<li class="active ui-tabs-tab ui-corner-top ui-state-active" data-selected="normal">
										<a href="#tab-Normal"class="ui-tabs-anchor tab_normal">
											<span>Normal</span>
										</a>
									</li>
									<li class="ui-tabs-tab ui-corner-top ui-state-default" data-selected="hover">
										<a href="#tab-Hover" class="ui-tabs-anchor tab_hover">
											<span>Hover</span>
										</a>
									</li>
								</ul>
								<div class="kcnh-tab-content">

									<div class="kcnh_icon_wrapper">

										<?php 
										foreach ( $devices as $key => $device ) {

											if( in_array( $device, array('desktop','tablet','mobile') ) ){ ?>
												
												<a 
												href="javascript:void(0)" 
												class="<?php echo $key == 0 ? 'active' : ''; ?> dashicons normal icon_normal_<?php echo esc_attr( $device ); ?>"></a>

												<a 
												style="display: none;" 
												href="javascript:void(0)" 
												class="<?php echo $key == 0 ? 'active' : ''; ?> dashicons hover icon_hover_<?php echo esc_attr( $device ); ?>"></a>

												<?php
											} 

										} ?>

									</div>

									<?php 
									foreach ( $devices as $key => $device ) { 

										if( in_array( $device, array('desktop','tablet','mobile') ) ){ ?>
											
											<div 
											id="tab-Normal-<?php echo esc_attr( $device ); ?>" 
											class="tab-Normal tab-Normal-<?php echo esc_attr( $key ); ?>"
											style="display: <?php echo ($key>0) ? 'none' : ''; ?>;">
												<label class="customize-control-title"><?php echo esc_html( $this->label ) . ' Color'; ?></label>
												<input 
												type="text" 
												data-alpha="true" 
												value="<?php echo kcnh_get_default_values( $colors, 'normal_'.$device ); ?>" 
												class="tab-normal-color-<?php echo (esc_attr($this->id) . '-' . esc_attr( $device )); ?>" 
												data-default-color="<?php echo kcnh_get_default_values( $colors, 'normal_'.$device ); ?>" />
											</div>

											<div 
											id="tab-Hover-<?php echo esc_attr( $device ); ?>" 
											class="tab-Hover tab-Hover-<?php echo esc_attr( $key ); ?>" 
											style="display:none;">
												<label class="customize-control-title"><?php echo esc_html( $this->label ) . ' Color'; ?></label>
												<input 
												type="text" 
												data-alpha="true" 
												value="<?php echo kcnh_get_default_values( $colors, 'hover_'.$device ); ?>" 
												class="tab-hover-color-<?php echo (esc_attr($this->id) . '-' . esc_attr( $device )); ?>" 
												data-default-color="<?php echo kcnh_get_default_values( $colors, 'hover_'.$device ); ?>" />
											</div>

											<script>

												jQuery('.tab-normal-color-<?php echo (esc_attr($this->id) . '-' . esc_attr( $device )); ?>').wpColorPicker({

													clear: function() {
														kcnh_change_colors( jQuery(this), '', '<?php echo esc_attr( 'normal_' . $device ); ?>' );
													},
												    change: function(event, ui) {											    	
												    	kcnh_change_colors( jQuery(this), ui.color.toString(), '<?php echo esc_attr( 'normal_' . $device ); ?>' );
												    }

												});

												jQuery('.tab-hover-color-<?php echo (esc_attr($this->id) . '-' . esc_attr( $device )); ?>').wpColorPicker({

													clear: function() {
														kcnh_change_colors( jQuery(this), '', '<?php echo esc_attr( 'hover_' . $device ); ?>' );
													},
												    change: function(event, ui) {											    	
												    	kcnh_change_colors( jQuery(this), ui.color.toString(), '<?php echo esc_attr( 'hover_' . $device ); ?>' );
												    }											    

												});

											</script>

											<?php
										}

									} ?>
									
								</div>

							</div>
						</ul>
					</div>
				</div>

				<?php 

				printf(
				'<input type="hidden" class="kcnh-color-tab-json" name="%s" value="%s" %s/>',
					esc_attr( $this->id ), esc_attr( json_encode( $this->value() ) ), $this->get_link()
				);
				
				?>

			</div>
	
			<?php
		}

	}

}

function kcnh_get_default_values( $colors, $key ){
	if( empty( $colors[$key] ) ){
		return '';
	}
	return esc_attr( $colors[$key] ); 
}