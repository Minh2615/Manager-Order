<?php

class CustomCamPaign{

    private static $instance;

    public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
    

    public function __construct(){

        self::init();
    }

    public function init(){
        $this->show_list_camp_mpo();
        
    }

    public function show_list_camp_mpo(){

        global $wpdb;

        mpo_get_templage('list-camp.php');

    }

}

$custom_camp = CustomCamPaign::instance();
