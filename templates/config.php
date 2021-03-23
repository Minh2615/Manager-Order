<div id="overlay">
  <div class="cv-spinner">
    <span class="spinner_order"></span>
  </div>
</div>
<div class="container mt-5">
    <div class="input-group mb-3 col-lg-4 mx-auto">
        <div class="input-group-prepend">
            <span class="input-group-text">@</span>
        </div>
        <input type="text" class="form-control" placeholder="Name App" name="name_app">
    </div>
    <div class="input-group mb-3 col-lg-4 mx-auto">
        <div class="input-group-prepend">
            <span class="input-group-text">@</span>
        </div>
        <input type="text" class="form-control" placeholder="Client ID" name="client_id">
    </div>
    <div class="input-group mb-3 col-lg-4 mx-auto">
        <div class="input-group-prepend">
            <span class="input-group-text">@</span>
        </div>
        <input type="text" class="form-control" placeholder="Client Secret" name="client_secret">
    </div>
    <div class="input-group mb-3 col-lg-4 mx-auto">
        <div class="input-group-prepend">
            <span class="input-group-text">@</span>
        </div>
        <input type="text" class="form-control" placeholder="Redirect URI" name="redirect_uri">
    </div>
    <div class="input-group mb-3 col-lg-3 d-flex justify-content-between mx-auto">
        <button type="button" class="btn btn-primary get_code"><?php echo __( 'Get Code', 'order_sandbox' ); ?></button>
        <button type="button" class="btn btn-success get_token"><?php echo __( 'Get Token', 'order_sandbox' ); ?></button>
    </div>
</div>
<div class="container-fluid list_client_id mt-5 table-responsive-xl">
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col"><?php echo __( 'ID', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'App Name', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'App Info', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'Order', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'Products', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'Notes', 'order_sandbox' ); ?></th>
                <th scope="col"><?php echo __( 'Actions', 'order_sandbox' ); ?></th>
            </tr>
        </thead>
        <tbody>
        <?php 
        global $wpdb;
        if (isset($_GET['pageno'])) {
            $pageno = $_GET['pageno'];
        } else {
            $pageno = 1;
        }
        $records_per_page = 50;
        $admin_url = admin_url().'/admin.php?page=manager_order';
        $offset = ($pageno-1) * $records_per_page;
        $total_sql = $wpdb->get_var("SELECT count(*) FROM {$wpdb->prefix}mpo_config");
        $total_pages = ceil($total_sql / $records_per_page);
        $query_data = $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}mpo_config ORDER BY client_id DESC LIMIT %d , %d ", $offset , $records_per_page);
        $rs = $wpdb->get_results($query_data);
        $i=1;
        foreach($rs as $value){
             ?>
            <tr class="row-tk">
                <td scope="row"><?php echo $i; ?></td>
                <td><?php echo $value->name_app; ?></td>
                <td class="app_info">
                    <p>CLient ID: <span class="client_id"><?php echo $value->client_id; ?></span></p>
                    <p>CLient Secret: <span><?php echo $value->client_secret; ?></span></p>
                    <p>Token: <span class="token_id"><?php echo $value->access_token; ?></span></p>
                <td class="order_config">
                    <button type="button" class="btn btn-info get_order">GET</button>
                    <button type="button" class="btn btn-info view_order">VIEW</button>
                </td>
                <td class="form_upload">
                    <form class="form-horizontal" action="" method="post"
                        name="frmCSVImport" id="frmCSVImport"
                        enctype="multipart/form-data">
                        <div class="input-row">
                        
                            <input type="file" name="file_product" id="file_product" accept=".csv">
                            <input type="hidden" name="access_token" value="<?php echo $value->access_token; ?>">
                            <button type="submit" class="btn btn-info"><i class="fa fa-upload" aria-hidden="true"></i></button>
                        </div>
                    </form>
                </td>
                <td class="note_app">
                    <span class="icon_note_app"><i class="fa fa-pencil-square" aria-hidden="true"></i></span>
                    <textarea name="note_app" cols="20">
                        <?php echo $value->note_app; ?>
                    </textarea>
                </td>
                <td>
                    <button type="button" class="btn btn-info remove_app"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    <button type="button" class="btn btn-info upload_product"><i class="fa fa-upload" aria-hidden="true"></i></button>
                </td>
            </tr>
        <?php $i++;} ?>
        </tbody>
    </table>
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