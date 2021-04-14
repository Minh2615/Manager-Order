
<div class="container-fluid list_client_id mt-5">
    <div class="row flex-head-order">
        <div class="col-lg-12">
            <p class="h1"><?php echo __( 'List Camp', 'order_sandbox' ); ?></p>
        </div>
    </div>

    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col"><?php echo __( 'STT', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'App Name', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'Camp Name', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'Status', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'Budget', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'GMV', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'Spend', 'order_sandbox' ); ?></th>
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
            $i=1;
            global $wpdb;
            foreach($data as $value){
            $query_app_name = $wpdb->get_results("SELECT name_app FROM {$wpdb->prefix}mpo_config WHERE access_token = '{$value->access_token}'"); 
        ?> 
            <tr class="row-tk">
                <td scope="row"><?php echo $i; ?></td>
                <td scope="row" class="camp_id" style="display:none;"><?php echo $value->camp_id; ?></td>
                <td scope="row" class="access_token" style="display:none;"><?php echo $value->access_token; ?></td>
                <td scope="row" class="merchant_budget" style="display:none;"><?php echo $value->merchant_budget; ?></td>
                <td scope="row" class="product_id" style="display:none;"><?php echo $value->product_id; ?></td>
                <td scope="row" class="scheduled_add_budget_amount" style="display:none;"><?php echo $value->scheduled_add_budget_amount; ?></td>
                <td scope="row" class="scheduled_add_budget_days" style="display:none;"><?php echo $value->scheduled_add_budget_days; ?></td>
                <td scope="row" class="camp_renew" style="display:none;"><?php echo $value->auto_renew; ?></td>
                <td scope="row" class="currency_code" style="display:none;"><?php echo $value->currency_code; ?></td>
                <td scope="row"><?php echo $query_app_name[0]->name_app; ?></td>
                <td scope="row" class="camp_name"><?php echo $value->campaign_name; ?></td>
                <td scope="row" class="camp_state"><?php echo $value->state_camp; ?></td>
                <td scope="row"><span class="mr-2"><i class="fa fa-usd" aria-hidden="true"></i></span><span class="max_budget"><?php echo $value->amount_max_budget; ?></span></td>
                <td scope="row" class="total_campaign_gmv"><?php echo $value->amount_gmv; ?></td>
                <td scope="row" class="total_campaign_spend"><?php echo $value->total_campaign_spend; ?></td>
                <?php $value->amount_gmv ? $spend_gmv = round(($value->total_campaign_spend / $value->amount_gmv ) * 100 , 2) : $spend_gmv = 0;  ?>
                <td scope="row" class="spend_gmc"><?php echo $spend_gmv ; ?>%</td>
                <td scope="row" class="camp_sale"><?php echo $value->sales; ?></td>
                <td scope="row"><span class="mr-2"><i class="fa fa-calendar" aria-hidden="true"></i></span><span class="start_at"><?php echo date('Y-m-d', strtotime($value->start_at)); ?></span></td>
                <td scope="row"><span class="mr-2"><i class="fa fa-calendar" aria-hidden="true"></i></span><span class="end_at"><?php echo date('Y-m-d', strtotime($value->end_at)); ?></span></td>
                <td scope="row">
                    <input id="renew_camps" type="checkbox" <?php echo $value->auto_renew ? 'checked' : ''; ?> data-toggle="toggle" data-on="On" data-off="Off" data-onstyle="primary" data-offstyle="secondary" data-style="ios" data-size="small">
                </td>                
                <td scope="row">
                    <button type="button" class="btn btn-info mr-2 remove_camp"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    <button type="button" class="btn btn-info mr-2 update_camp"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
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