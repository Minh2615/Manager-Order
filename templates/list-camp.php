
<div class="container-fluid list_client_id mt-5">
    <div class="row flex-head-order">
        <div class="col-lg-12">
            <p class="h1"><?php echo __( 'List Camp', 'order_sandbox' ); ?></p>
        </div>
    </div>

    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col"><?php echo __( 'App Name', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'Camp Name', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'Status', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'Budget', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'Spend/GMV', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'Order', 'order_sandbox' ); ?></th>    
                <th scope="col"><?php echo __( 'Start Date', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'End Date', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'Auto Renew', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'Actions', 'order_sandbox' ); ?></th>
            </tr>
        </thead>
        <tbody>
        <?php 
            $i=0;
            global $wpdb;
            foreach($data as $value){
            $query_app_name = $wpdb->get_results("SELECT name_app FROM {$wpdb->prefix}mpo_config WHERE access_token = '{$value->access_token}'"); 
        ?> 
            <tr class="row-tk">
                <td scope="row"><?php echo $query_app_name[0]->name_app; ?></td>
                <td scope="row"><?php echo $value->campaign_name; ?></td>
                <td scope="row"><?php echo $value->state_camp; ?></td>
                <td scope="row"><?php echo $value->amount_max_budget; ?></td>
                <td scope="row"><?php echo $value->total_campaign_spend; ?> / <?php echo $value->amount_gmv; ?></td>
                <td scope="row"><?php echo $value->sales; ?></td>
                <td scope="row"><?php echo $value->start_at; ?></td>
                <td scope="row"><?php echo $value->end_at; ?></td>
                <td scope="row">
                    <button type="button" class="btn btn-info mr-2 remove_camp"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </td>
            </tr>
        <?php $i++;} ?>
        </tbody>
    </table>
    <script>
        jQuery(document).ready(function(){
            
        });
    </script>
    <nav class="mt-5">
         <ul class="pagination">
            <?php for($i=1;$i<=$total_pages;$i++): ?>
                <?php if ($i==$pageno): ?>
                    <li class="page-item active">
                        <a class="page-link" href="#"><?php echo $i; ?><span class="sr-only">(current)</span></a>
                    </li>
                <?php else: ?>
                    <li class="page-item"><a class="page-link" href="<?php echo $admin_url; ?>&pageno=<?php echo $i; ?>" title="<?php echo $i; ?>"><?php echo $i; ?></a></li>
                <?php endif ?>
            <?php endfor; ?>
        </ul>
    </nav>
</div>