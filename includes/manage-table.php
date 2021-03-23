<?php 


class Mpo_Table{

	private $_wpdb;
	private $_charset_collate = '';
	private static $_instance;

    private function __construct() {
		global $wpdb;

		// include what needs to be included
		require_once ( ABSPATH . 'wp-admin/includes/upgrade.php' );

		// assign the global wpdb to a variable
		$this->_wpdb = &$wpdb;

		// set the charset for the new database tables
		if ( $this->_wpdb->has_cap( 'collation' ) ) {
			$this->_charset_collate = $wpdb->get_charset_collate();
		}
	}

    public static function init() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}
    public function make() {
		// make the tables
		$this->make_or_update_the_tables();

	}

    private function make_or_update_the_tables() {
		$this->mpo_config();
		$this->mpo_order();
		$this->mpo_product();
		$this->addColumnNoteConfigMpo();
	}

    private function mpo_config() {
		$table_name = $this->_wpdb->prefix . 'mpo_config';

		$sql = "CREATE TABLE IF NOT EXISTS $table_name (
				name_app varchar(255) NOT NULL,
				client_id varchar(255) NOT NULL,
				client_secret varchar(255) NOT NULL,
				redirect_uri  varchar(255) NOT NULL,
                access_token  varchar(255) NOT NULL,
                PRIMARY KEY  (client_id)
			) " . $this->_charset_collate . ';';

		dbDelta( $sql );
	}

    private function mpo_order() {
		$table_name = $this->_wpdb->prefix . 'mpo_order';

		$sql = "CREATE TABLE IF NOT EXISTS $table_name (
                order_id varchar(255),
				client_id varchar(255),
                access_token varchar(255),
				transaction_id varchar(255),
				tracking_number varchar(255),
				tracking_provider text,
				country_code text,
				order_time varchar(255),
                hours_to_fulfill int,
                product_id varchar(255),
				product_name varchar(255),
				product_image_url varchar(255),
				product_type text,
                size longtext ,
                color longtext ,
                currency_code text,
				status_order text,
                price varchar(255),
                cost varchar(255),
                shipping varchar(255),
                shipping_cost varchar(255),
                quantity bigint(20),
                order_total varchar(255),
                warehouse_name varchar(255),
                warehouse_id varchar(255),
                shipping_name varchar(255),
				shipping_phone text,
                shipping_country varchar(255),
				shipping_zipcode text,
				shipping_address_1 varchar(255),
				shipping_address_2 varchar(255),
				shipping_state varchar(255),
				shipping_city varchar(255),
				shipped_date varchar(255),
				tracking_confirmed text,
				custom_note varchar(255),
				custom_note_cc varchar(255),
				PRIMARY KEY (order_id)
			) " . $this->_charset_collate . ';';

		dbDelta( $sql );
	}
	private function mpo_product() {
		$table_name = $this->_wpdb->prefix . 'mpo_product';

		$sql = "CREATE TABLE IF NOT EXISTS $table_name (
				id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
                product_sku varchar(255) NOT NULL,
				product_name varchar(255) NOT NULL,
				access_token varchar(255) NOT NULL,
				name_file varchar(255) NOT NULL,
				product_parent varchar(255) NOT NULL,
				product_des varchar(255) NOT NULL,
				product_price varchar(255) NOT NULL,
				product_img varchar(255) NOT NULL,
				product_shipping varchar(255) NOT NULL,
				shipping_time varchar(255) NOT NULL,
				landing_page_url varchar(255),
				product_upc varchar(255) NOT NULL,
				merchant_name varchar(255) NOT NULL,
				declared_name varchar(255) NOT NULL,
				declared_local_name varchar(255) NOT NULL,
				localized_shipping text,
				product_pieces bigint(20),
				product_color text,
				product_size text NOT NULL,
				product_quantity bigint(20) NOT NULL,
				product_tags varchar(255) NOT NULL,
				localized_currency_code text NOT NULL,
				PRIMARY KEY (id)
			) " . $this->_charset_collate . ';';



		dbDelta( $sql );
	}

	private function addColumnNoteConfigMpo() {
		global $wpdb;

		$table_name = $this->_wpdb->prefix . 'mpo_config';

		$sql = "ALTER TABLE $table_name
				ADD note_app varchar(255) AFTER name_app";

		$wpdb->query($sql);
	}
}