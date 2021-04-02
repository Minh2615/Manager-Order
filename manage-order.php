<?php
/**
 * Plugin Name: Manager Order
 * Plugin URI: https://physcode.com/
 * Description: Call Api Sandbox
 * Version: 1.0.0
 * Author: Physcode
 * Author URI: https://physcode.com
 * Text Domain: order_sandbox
 * Domain Path: /i18n/languages/
 */
defined( 'ABSPATH' ) || exit;


class ManagerOrder{

    private static $instance;
    
    public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
    
    public function __construct(){
        $this->plugin_defines();
        self::init();
    }

    protected function init() {

        $this->register_menu();

		require_once ( 'includes/ajax.php' );
        require_once ( 'includes/manage-table.php' );
        require_once ( 'includes/functions.php' );
        
        // add enqueue_scripts
        if ( is_admin() ) {
			add_action( 'admin_enqueue_scripts', array( $this, 'load_enqueue_scripts_on_admin' ) );
            
		} else {
			
		}

        self::init_hook();
    }

    protected static function init_hook() {
		register_activation_hook( __FILE__, array( __CLASS__, 'on_activation' ) );
		register_deactivation_hook( __FILE__, array( __CLASS__, 'on_deactivation' ) );

	}

    public static function on_activation() {

        /**
         * @var Mpo_Table
         */
		$mpoDatabase = Mpo_Table::init();
		$mpoDatabase->make();
	}

    public static function on_deactivation() {

	}

    protected function plugin_defines() {
		define( 'MO_PHYS_PATH', trailingslashit( WP_PLUGIN_DIR . '/' . str_replace( basename( __FILE__ ), "", plugin_basename( __FILE__ ) ) ) );
		define( 'MO_PHYS_URL', plugin_dir_url( __FILE__ ) );
	}

    public function register_menu(){
        add_action('admin_menu',array($this,'add_admin_pages')); 
    }

    public function add_admin_pages(){ 
        add_menu_page(
            __( 'Manager Order', 'order_sandbox' ),
            __( 'Manager Order', 'order_sandbox' ),
            'manage_options',
            'manager_order',
            '',
            'dashicons-welcome-learn-more',
            10
        );
        add_submenu_page( 
            'manager_order',
            __( 'Configs', 'order_sandbox' ),
            __( 'Configs', 'order_sandbox' ),
            'manage_options',
            'manager_order',
            array($this,'mpo_config_callback'),
        );
        add_submenu_page( 
            'manager_order',
            __( 'Order', 'order_sandbox' ),
            __( 'Order', 'order_sandbox' ),
            'manage_options',
            'mpo_list_order',
            array($this,'mpo_list_order_callback'),
        );
        add_submenu_page( 
            'manager_order',
            __( 'History', 'order_sandbox' ),
            __( 'History', 'order_sandbox' ),
            'manage_options',
            'mpo_order_history',
            array($this,'mpo_order_history_callback'),
        );
        add_submenu_page( 
            'manager_order',
            __( 'Remove Product', 'order_sandbox' ),
            __( 'Remove Product', 'order_sandbox' ),
            'manage_options',
            'mpo_remove_product',
            array($this,'mpo_remove_products_callback'),
        );
        add_submenu_page( 
            'manager_order',
            __( 'Campaign', 'order_sandbox' ),
            __( 'Campaign', 'order_sandbox' ),
            'manage_options',
            'mpo_list_campaign',
            array($this,'mpo_list_campaign_callback'),
        );
    }

    public function mpo_config_callback(){
        require_once plugin_dir_path(__FILE__).'/templates/config.php';
    }

    public function mpo_list_order_callback(){
        require_once plugin_dir_path(__FILE__).'/includes/custom-order.php';
    }
    public function mpo_remove_products_callback(){
        require_once plugin_dir_path(__FILE__).'/templates/remove-product.php';
    }

    public function mpo_order_history_callback(){
        require_once plugin_dir_path(__FILE__).'/includes/history-order.php';
    }

    public function mpo_list_campaign_callback(){
        require_once plugin_dir_path(__FILE__).'/includes/custom-camp.php';
    }
    
    function load_enqueue_scripts_on_admin() {
        $v_rand = uniqid();

		// style
		wp_enqueue_style( 'mo-phys-bootstrap-reboot', MO_PHYS_URL . 'assets/css/bootstrap-reboot.min.css', array(), '4.0' );
		wp_enqueue_style( 'mo-phys-bootstrap', MO_PHYS_URL . 'assets/css/bootstrap.min.css', array(), '4.3.1' );
        wp_enqueue_style( 'mo-phys-jquery-ui-css', MO_PHYS_URL . 'assets/css/jquery-ui.min.css', array(), '1.12.1' );
        wp_enqueue_style( 'mo-phys-swee-css', MO_PHYS_URL . 'assets/css/sweetalert2.min.css', array(), '7.2.0' );
        wp_enqueue_style( 'mo-phys-font-css', MO_PHYS_URL . 'assets/css/font-awesome.min.css', array(), '4.7.0' );
        wp_enqueue_style( 'mo-phys-admin-css', MO_PHYS_URL . 'assets/css/main-admin.css', array(),$v_rand);
		//wp_register_style( 'gmc-phys-main-css', MO_PHYS_URL . 'assets/css/main-admin.css', array(), '1.0.0' );

		// script
        wp_enqueue_script( 'mo-phys-jquery-ui-js', MO_PHYS_URL . 'assets/js/jquery-ui.min.js', array(), '1.12.1', true );
        wp_enqueue_script( 'mo-phys-popper-js', MO_PHYS_URL . 'assets/js/popper.min.js', array(), '1.12.9', true );
        wp_enqueue_script( 'mo-phys-swee-js', MO_PHYS_URL . 'assets/js/sweetalert2.all.min.js', array(), '7.2.0', true );
		wp_enqueue_script( 'mo-phys-bootstrap-js', MO_PHYS_URL . 'assets/js/bootstrap.min.js', array(), '4.3.1', true );
		wp_enqueue_script( 'mo-phys-admin-js', MO_PHYS_URL . 'assets/js/admin.js', array( 'jquery' ), $v_rand, true );
        wp_localize_script( 'mo-phys-admin-js', 'mo_localize_script',
            array( 
                'ajaxurl' => admin_url( 'admin-ajax.php' ),
                'page_order'=>get_site_url() .'/wp-admin/admin.php?page=mpo_list_order',
                'page_history'=>get_site_url() .'/wp-admin/admin.php?page=mpo_order_history',
            )
        );  
	}

    
}

$manager_order = ManagerOrder::instance();