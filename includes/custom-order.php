<?php

class CustomOrder{

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
        $this->show_order_by_token();
        
    }

    public function show_order_by_token(){

        global $wpdb;

        $client_id = isset($_GET['client_id']) ? $_GET['client_id'] : '';

        $short_by = isset($_GET['shortby']) ? $_GET['shortby'] : 'ASC';
        // if($short_by == 'DESC'){
        //     $short_by = 'DESC';
        // }else{
        //     $short_by = 'ASC';
        // }
       
        if (isset($_GET['pageno'])) {
            $pageno = $_GET['pageno'];
        } else {
            $pageno = 1;
        }

        $param_kv = '';
        if (isset($_GET['val_search']) && isset($_GET['key_search']) ) {
            $param_kv = 'AND '.$_GET['key_search'].'='.'"'.$_GET['val_search'].'"'.'';
        }

        $records_per_page = 50;

        $offset = ($pageno-1) * $records_per_page;
        //order time
        $today=date("Y-m-d");
        $yesterday = date('Y-m-d',strtotime("-1 days"));

        $time = isset($_GET['time']) ? $_GET['time'] : '';

        if($time == 1){
            $param_time = 'order_time >= "'.$today.'"';
        }else if($time == 0){
            $param_time = 'order_time <= date_sub(now(), interval 0 day)';
        }else if($time == 2){
            $param_time = 'order_time BETWEEN "'.$yesterday.'" and "'.$today.'"';
        }else if($time == 7){
            $param_time = 'order_time >= date_sub(now(), interval 7 day)';
        }else if($time == 30){
            $param_time = 'order_time >= date_sub(now(), interval 30 day)';
        }
        // custom param
        $admin_url = admin_url().'/admin.php?page=mpo_list_order';

        if(!empty($_GET['shortby'])){
            $admin_url.='&shortby='.$_GET['shortby'];
        }
        if(!empty($_GET['time'])){
            $admin_url.='&time='.$_GET['time'];
        }
        if(!empty($_GET['val_search'])){
            $admin_url.='&val_search='.$_GET['val_search'];
        }
        if(!empty($_GET['key_search'])){
            $admin_url.='&key_search='.$_GET['key_search'];
        }
        
        // end custom param
        if(!empty($client_id)){
            
            $admin_url .= '&client_id='.$client_id;
        
            $query_total = $wpdb->prepare( "SELECT count(order_id) FROM {$wpdb->prefix}mpo_order WHERE client_id = %s AND {$param_time} {$param_kv} AND status_order = 'APPROVED' OR status_order IS NULL OR status_order = '' ORDER BY hours_to_fulfill {$short_by}" ,$client_id );

            $total_sql = $wpdb->get_var($query_total);
            
            $total_pages = ceil($total_sql / $records_per_page);

            $query_data = $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}mpo_order WHERE client_id = %s AND {$param_time} {$param_kv} AND status_order = 'APPROVED' OR status_order IS NULL OR status_order = ''  ORDER BY hours_to_fulfill {$short_by} LIMIT %d , %d", $client_id , $offset , $records_per_page );

            $data = $wpdb->get_results($query_data);
            
        }else{
            
            $total_sql = $wpdb->get_var( "SELECT count(order_id) FROM {$wpdb->prefix}mpo_order WHERE status_order = 'APPROVED' AND {$param_time} {$param_kv} OR status_order IS NULL OR status_order = '' " );    
            
            $total_pages = ceil($total_sql / $records_per_page);

            $query_data = $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}mpo_order WHERE status_order = 'APPROVED' AND {$param_time} {$param_kv} OR status_order IS NULL OR status_order = '' ORDER BY hours_to_fulfill {$short_by} LIMIT %d , %d" , $offset , $records_per_page );
            
            $data = $wpdb->get_results($query_data);

        }

        mpo_get_templage('list-order.php',array('data'=>$data,'total_pages'=>$total_pages,'pageno'=>$pageno,'admin_url'=>$admin_url, 'total_sql'=>$total_sql));

    }

}

$custom_order = CustomOrder::instance();
