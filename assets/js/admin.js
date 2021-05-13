jQuery(document).ready(function($){
    //tooltip
    $('[data-toggle="tooltip"]').tooltip();
    // ajax send
    
    // get code 
    $(document).on('click','.get_code',function(){
        var client_id = $('input[name="client_id"]').val();
        var url_data = 'https://merchant.wish.com/v3/oauth/authorize?client_id='+client_id;

        var name_app = $('input[name="name_app"]').val();
        var client_secret = $('input[name="client_secret"]').val();
        var redirect_uri = $('input[name="redirect_uri"]').val();

       jQuery.ajax({
            url : mo_localize_script.ajaxurl,
            type: "post",
            data: {
                action: 'sent_client_id',
                name_app: name_app,
                client_id: client_id,
                client_secret: client_secret,
                redirect_uri: redirect_uri,
            },
            success: function(result){
                window.open(url_data);
            },
            error: function(xhr){
                console.log(xhr.status);
            },
        })

        window.localStorage.removeItem( 'clientId' );
        window.localStorage.removeItem( 'clientSecret' );
        window.localStorage.removeItem( 'redirectUri' );
        window.localStorage.removeItem( 'nameApp' );


        var clientId = window.localStorage.setItem("clientId", client_id );
        var clientSecret=  window.localStorage.setItem("clientSecret", client_secret );
        var redirectUri = window.localStorage.setItem("redirectUri", redirect_uri );

    });
    //get token
    $(document).on('click','.get_token',function(){

        var code = location.search.split('code=')[1];
        var clientId = window.localStorage.getItem("clientId");
        var clientSecret=  window.localStorage.getItem("clientSecret");
        var redirectUri = window.localStorage.getItem("redirectUri");

        jQuery.ajax({
            url : mo_localize_script.ajaxurl,
            type: "post",
            data: {
                action: 'get_access_token',
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                code: code,
            },
            success: function(result){
               var kq = result.data;
               console.log(kq);
               var data = kq.data;
               var message = kq.message;
               if(message === ""){
                       swal({title: "Success", type: 
                           "success"}).then(function(){ 
                               location.reload();
                       }
                   );
               }else{
                   swal({title:"Error: " + message  , type: 
                       "error"}).then(function(){ 
                           location.reload();
                       }
                   );
               }
            },
            error: function(xhr){
                swal({title: "Error", type: 
                    "error"}).then(function(){ 
                        location.reload();
                    }
                );
                console.log(xhr.status);
            },
        })
    
    });

    //location.search.split('code=')[1]
    // get list order by token
    $(document).on('click','.get_order',function(){
        $(document).ajaxSend(function() {
            $("#overlay").fadeIn(300);　
        });
        var token_id = jQuery(this).closest('tr.row-tk').find('span.token_id').html();
        var client_id = jQuery(this).closest('tr.row-tk').find('span.client_id').html();
       
        jQuery.ajax({
            url : mo_localize_script.ajaxurl,
            type: "post",
            data: {
                action: 'get_list_order',
                token : token_id,
                client_id : client_id,
            },
            success: function(result){
                console.log(result);
                var data = result.data;
                if(Array.isArray(data.data) && data.data != ''){
                    swal({title: "Success", type: 
                        "success"}).then(function(){ 
                            location.reload();
                        }
                    );
                }else{
                    swal({title:"Empty Orders" , type: 
                        "error"}).then(function(){ 
                            location.reload();
                        }
                    );
                }
                
            },
            error: function(xhr){
                swal({title: "Error", type: 
                    "error"}).then(function(){ 
                        location.reload();
                    }
                );
                console.log(xhr.status);
            },
        }).done(function() {
            setTimeout(function(){
              $("#overlay").fadeOut(300);
            },500);
        });
    
    });

    //view order by client id
    jQuery(document).on('click','.view_order',function(){
        var client_id = jQuery(this).closest('tr.row-tk').find('span.client_id').html();
        var url_order =  mo_localize_script.page_order+'&client_id='+client_id;
        window.location.href = url_order;
    })
    
    // shorby to fulfil

    if(location.search.split('client_id=')[1]){
        jQuery('span.short_day').click(function(){
            var url_string =  new URL(window.location.href);
            var val_search = url_string.searchParams.get('val_search');
            var key_search = url_string.searchParams.get('key_search');

            var client_id = url_string.searchParams.get('client_id');
            var url_short = url_string.searchParams.get('shortby');
            var param_short= location.search.split('shortby=')[1];
            var time = url_string.searchParams.get('time');
            var param_time = '' , param_s_val ='' , param_s_key = '';
            if(time){
                param_time = '&time='+time;
            }
            if(val_search){
                param_s_val = '&val_search='+val_search;
            }
            if(key_search){
                param_s_key = '&key_search='+key_search;
            }
            if(param_short){
                if(url_short == 'DESC'){
                    var short_order =  mo_localize_script.page_order+'&client_id='+client_id+'&shortby=ASC' + param_s_val + param_s_key + param_time;
                }else{
                    var short_order =  mo_localize_script.page_order+'&client_id='+client_id+'&shortby=DESC' + param_s_val + param_s_key + param_time;
                }
            }else{
                var short_order =  mo_localize_script.page_order+'&client_id='+client_id+'&shortby=DESC' + param_s_val + param_s_ke + param_time;
            }
            window.location.href = short_order;
        });
    }else{

        jQuery('span.short_day').click(function(){
           
            var url_string =  new URL(window.location.href);
            var val_search = url_string.searchParams.get('val_search');
            var key_search = url_string.searchParams.get('key_search');
            var param_short= location.search.split('shortby=')[1];
            var url_short = url_string.searchParams.get('shortby');
            var time = url_string.searchParams.get('time');
            var param_time = '' , param_s_val ='' , param_s_key = '' ;
            if(time){
                param_time = '&time='+time;
            }
            if(val_search){
                param_s_val = '&val_search='+val_search;
            }
            if(key_search){
                param_s_key = '&key_search='+key_search;
            }
            if(param_short){
                if(url_short == 'DESC'){
                    var short_order =  mo_localize_script.page_order+'&shortby=ASC'+ param_s_val + param_s_key + param_time;
                }else{
                    var short_order =  mo_localize_script.page_order+'&shortby=DESC'+ param_s_val+ param_s_key + param_time;
                }
            }
            else{
                var short_order =  mo_localize_script.page_order+'&shortby=DESC'+ param_s_val+ param_s_key+ param_time;
            }
            window.location.href = short_order;
        });
    }
    
    // update tracking number 

    jQuery(document).on('click','button.submit_tracking',function(){
        var track_id = jQuery(this).closest('tr.row-tk').find('#track_id').val();
        var order_id = jQuery(this).closest('tr.row-tk').find('td.order_id').html();
        var track_provider = jQuery(this).closest('tr.row-tk').find('#track_provider').val();
        var country_code = jQuery(this).closest('tr.row-tk').find('#country_code').val();

        jQuery.ajax({
            url : mo_localize_script.ajaxurl,
            type: "post",
            data: {
                action: 'update_tracking_id',
                track_id : track_id,
                order_id : order_id,
                track_provider: track_provider,
                country_code: country_code,
            },
            success: function(result){
                console.log(result);
                var data = result.data.data;
                var message = result.data.message;
                if(typeof data === 'object' && data.success == true){
                        swal({title: "Success", type: 
                            "success"}).then(function(){ 
                                location.reload();
                        }
                    );
                }else{
                    swal({title:"Error: " + message  , type: 
                        "error"}).then(function(){ 
                            location.reload();
                        }
                    );
                }
                
            },
            error: function(xhr){
                swal({title: "Error", type: 
                    "error"}).then(function(){ 
                        location.reload();
                    }
                );
                console.log(xhr.status);
            },
        })
    });
    

    // remove config app
    jQuery(document).on('click','.btn.remove_app',function(){
        var client_id = jQuery(this).closest('tr.row-tk').find('span.client_id').html();
        var token = jQuery(this).closest('tr.row-tk').find('span.token_id').html();
        jQuery.ajax({
            url : mo_localize_script.ajaxurl,
            type: "post",
            data: {
                action: 'remove_app_config',
                client_id : client_id,
                token : token,
            },
            success: function(result){ 
                if(result.data === 1){
                        swal({title: "Success", type: 
                            "success"}).then(function(){ 
                                location.reload();
                        }
                    );
                }else{
                    swal({title:"Error", type: 
                        "error"}).then(function(){ 
                            location.reload();
                        }
                    );
                }               
            },
            error: function(xhr){
                swal({title: "Error", type: 
                    "error"}).then(function(){ 
                        location.reload();
                    }
                );
                console.log(xhr.status);
            },
        })
    });

    //view shipping detail
    jQuery('.view_shiping').click(function(e){
        var shipping_name = jQuery(this).closest('.content-shiping').find('.shiping_name').html();
        var shipping_phone = jQuery(this).closest('.content-shiping').find('.shipping_phone').html();
        var shipping_country = jQuery(this).closest('.content-shiping').find('.shipping_country').html();
        var shipping_zipcode = jQuery(this).closest('.content-shiping').find('.shipping_zipcode').html();
        var shipping_address_1 = jQuery(this).closest('.content-shiping').find('.shipping_address_1').html();
        var shipping_address_2 = jQuery(this).closest('.content-shiping').find('.shipping_address_2').html();
        var shipping_state = jQuery(this).closest('.content-shiping').find('.shipping_state').html();
        var shipping_city = jQuery(this).closest('.content-shiping').find('.shipping_city').html();
        swal({
            title: 'Shipping Details',
            html:
            ' <table class="table table-bordered table-striped"><tbody>' + 
            '<tr><th>Name</th><td>'+shipping_name+'</td></tr>' +
            '<tr><th>Street Address 1</th><td>'+shipping_address_1+'</td></tr>'+
            '<tr><th>Street Address 2</th><td>'+shipping_address_2+'</td></tr>' +
            '<tr><th>City</th><td>'+shipping_city+'</td></tr> ' + 
            '<tr><th>State</th><td>'+shipping_state+'</td> </tr> ' + 
            '<tr><th>ZIP Code</th><td>'+shipping_zipcode+'</td> </tr>' + 
            '<tr><th>Country/Region</th><td>'+shipping_country+'</td> </tr>' +
            '<tr><th>Phone number</th><td>'+shipping_phone+'</td> </tr>' + 
            '</tbody></table>'+   
            '<hr>'+ 
            '<div class="envelope-address">' + 
                '<div class="name">'+shipping_name+'</div>' + 
                '<div class="street-address">'+shipping_address_1+'</div>' +  
                '<div class="street-address">'+shipping_address_2+'</div>' + 
                '<div class="loc"> '+shipping_city+', '+shipping_state+', '+shipping_zipcode+' </div>' +  
                '<div class="country">'+shipping_country+'</div>'+
            '</div>',
            showCloseButton: true,
            focusConfirm: false,
          })
    });

    //update note order
    jQuery('.icon_note').hide();
    jQuery('.order_note' ).keyup(function() {
        jQuery(this).closest('.row_order_note').find('.icon_note').show();
    });
    jQuery(document).on('click','.icon_note',function(){
        var note_order = jQuery(this).closest('.row_order_note').find('.order_note').val();
        var order_id = jQuery(this).closest('.row-tk').find('td.order_id').html();
        console.log(note_order);
        console.log(order_id);
        jQuery.ajax({
            url : mo_localize_script.ajaxurl,
            type: "post",
            data: {
                action: 'save_note_order_mpo',
                order_id : order_id,
                note_order : note_order,
            },
            success: function(result){ 
                if(result.data === 1){
                    swal({title: "Success",
                            type: "success"
                    });
                }else{
                    swal({title:"Error", type: 
                        "error"}).then(function(){ 
                            location.reload();
                        }
                    );
                }               
            },
            error: function(xhr){
                swal({title: "Error", type: 
                    "error"}).then(function(){ 
                        location.reload();
                    }
                );
                console.log(xhr.status);
            },
        })
    });


    //update note order_cc
    jQuery('.icon_note_cc').hide();
    jQuery( ".order_note_cc" ).keyup(function() {
        jQuery(this).closest('.note_cc').find('.icon_note_cc').show();
    });
    jQuery(document).on('click','.icon_note_cc',function(){
        var note_order_cc = jQuery(this).closest('.row_order_note.note_cc').find('.order_note_cc').val();
        var order_id = jQuery(this).closest('.row-tk').find('td.order_id').html();
        jQuery.ajax({
            url : mo_localize_script.ajaxurl,
            type: "post",
            data: {
                action: 'save_note_order_cc_mpo',
                order_id : order_id,
                note_order_cc : note_order_cc,
            },
            success: function(result){ 
                if(result.data === 1){
                        swal({title: "Success", type: 
                            "success"});
                }else{
                    swal({title:"Error", type: 
                        "error"}).then(function(){ 
                            location.reload();
                        }
                    );
                }               
            },
            error: function(xhr){
                swal({title: "Error", type: 
                    "error"}).then(function(){ 
                        location.reload();
                    }
                );
                console.log(xhr.status);
            },
        })
    });

    // export order csv
    convertArrayOfObjectsToCSV = args => {  
        const data = args.data;
        if (!data || !data.length) return;
      
        const columnDelimiter = args.columnDelimiter || ',';
        const lineDelimiter = args.lineDelimiter || '\n';
      
        const keys = Object.keys(data[0]);
      
        let result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;
      
        data.forEach(item => {
          ctr = 0;
          keys.forEach(key => {
            if (ctr > 0) result += columnDelimiter;
            result += item[key];
            ctr++;
          });
          result += lineDelimiter;
        });
      
        return result;
      }
      jQuery('.btn.export_csv').click(function(){
        let csv = convertArrayOfObjectsToCSV({
            data: [
              {
                  mockUpFront: jQuery(this).closest('tr.row-tk').find('td.product_img img').attr('src'),
                  mockUpBack:'',
                  designFront:'',
                  designBack: '',
                  designSleeve: '',
                  designHood: '',
                  type: '',
                  title : jQuery(this).closest('tr.row-tk').find('td.product_name').html(),
                  sku: jQuery(this).closest('tr.row-tk').find('td.product_sku').html(),
                  size: jQuery(this).closest('tr.row-tk').find('span.product_size').html(),
                  color: jQuery(this).closest('tr.row-tk').find('span.product_color').html(),
                  orderNumber: jQuery(this).closest('tr.row-tk').find('td.order_id').html(),
                  quantity: jQuery(this).closest('tr.row-tk').find('td.order_quantity').html(),
                  name: jQuery(this).closest('tr.row-tk').find('p.shiping_name').html(),
                  address1: jQuery(this).closest('tr.row-tk').find('p.shipping_address_1').html(),
                  address2: jQuery(this).closest('tr.row-tk').find('p.shipping_address_2').html(),
                  city: jQuery(this).closest('tr.row-tk').find('p.shipping_city').html(),
                  state: jQuery(this).closest('tr.row-tk').find('p.shipping_state').html(),
                  country: jQuery(this).closest('tr.row-tk').find('p.shipping_country').html(),
                  phone: jQuery(this).closest('tr.row-tk').find('p.shipping_phone').html(),
                  email: '',
                  postalCode: jQuery(this).closest('tr.row-tk').find('p.shipping_zipcode').html(),
              }
            ]
          });
        if (!csv) return;
        const filename = 'export-order.csv';
        var universalBOM = "\uFEFF";
          const data = encodeURI(csv);
          const link = document.createElement('a');
          link.setAttribute('href', 'data:text/csv; charset=utf-8,' + encodeURIComponent(universalBOM + csv));
          link.setAttribute('download', filename);
          link.click();
      });
      // end export

    //view payment status
    jQuery('.payment-detail-btn').click(function(e){
        e.preventDefault();
        var total_cost = jQuery(this).closest('tr.row-tk').find('td.order_total').html();
        var shipped_date = jQuery(this).closest('tr.row-tk').find('.shipped_date').html();
        var track_provider = jQuery(this).closest('tr.row-tk').find('#track_provider').val();
        var track_id = jQuery(this).closest('tr.row-tk').find('#track_id').val();
        var tracking_confirmed = jQuery(this).closest('tr.row-tk').find('.tracking_confirmed').html();
        swal({
            title: 'To Be Paid After Confirmed Shipped',
            html:
            '<table class="table table-bordered tb-confirmed-ship"> <tbody>' + 
            '<tr class="info">' +
            '<td class="text-right span4"> <strong> You Will Be Paid </strong> <i class="icon-question-sign popover-hover" data-content="This is the total amount you will receive." data-placement="right"></i></td><td>'+total_cost+'</td></tr>' +
            '<tr class="info"> <td class="text-right span4"><strong> Total Cost </strong></td><td>'+total_cost+'</td></tr>' + 
            '<tr><td class="carrier-tier-info" colspan="2"> Orders are eligible for payment as soon as we can confirm them as shipped. If we are unable to confirm the shipment, then the order will be eligible for payment 30 days after it was marked shipped !  <br></td></tr> ' + 
            '<tr><td class="text-right span4"><strong>Marked Shipped</strong></td> <td>'+shipped_date+'</tr>' +
            '<tr><td class="text-right span4"><strong>Shipping Carrier</strong></td> <td>'+track_provider+'</td> </tr> '+
            '<tr> <td class="text-right span4"><strong>Tracking Number</strong></td> <td>'+track_id+'</td></tr> ' + 
            '<tr><td class="text-right span4"><strong>Confirmed Shipped</strong></td><td>'+tracking_confirmed+'</td> </tr> ' +
            '</tbody></table>',
            showCloseButton: true,
            width:1200,
            focusConfirm: false,
          })
    });

    //seach order
    if(location.search.split('client_id=')[1]){
        jQuery('.btn-search_order').click(function(){

            var val_search = jQuery(this).siblings('input[name="val_search"]').val();
            var key_search = $('#key_search').find(":selected").val();

            var url_string =  new URL(window.location.href);
            var c_page = url_string.searchParams.get('page');

            var client_id = url_string.searchParams.get('client_id');
            var url_short = url_string.searchParams.get('shortby');
            var param_short= location.search.split('shortby=')[1];
            var time = url_string.searchParams.get('time');
            var param_time = '';
            if(time){
                param_time = '&time='+time;
            }
            if(val_search){
                param_s_val = '&val_search='+val_search;
            }
            if(key_search){
                param_s_key = '&key_search='+key_search;
            }
            if(param_short){
                if(url_short == 'DESC'){
                    if(c_page =='mpo_list_order'){
                        var short_order =  mo_localize_script.page_order+'&client_id='+client_id+'&shortby=ASC' + param_s_val + param_s_key + param_time;
                    }else{
                        var short_order =  mo_localize_script.page_history+'&client_id='+client_id+'&shortby=ASC' + param_s_val + param_s_key + param_time;
                    }
                }else{
                    if(c_page =='mpo_list_order'){
                        var short_order =  mo_localize_script.page_order+'&client_id='+client_id+'&shortby=DESC' + param_s_val + param_s_key + param_time;
                    }else{
                        var short_order =  mo_localize_script.page_history+'&client_id='+client_id+'&shortby=DESC' + param_s_val + param_s_key + param_time;
                    }
                }
            }else{
                if(c_page =='mpo_list_order'){
                    var short_order =  mo_localize_script.page_order+'&client_id=' + client_id + param_s_val + param_s_key + param_time;
                }else{
                    var short_order =  mo_localize_script.page_history+'&client_id=' + client_id + param_s_val + param_s_key + param_time;
                }
            }
            window.location.href = short_order;
        });
    }else{

        jQuery('.btn-search_order').click(function(){
            var val_search = jQuery(this).siblings('input[name="val_search"]').val();
            var key_search = $('#key_search').find(":selected").val();
            var url_string =  new URL(window.location.href);
            var c_page = url_string.searchParams.get('page');
            var param_short= location.search.split('shortby=')[1];
            var url_short = url_string.searchParams.get('shortby');
            var time = url_string.searchParams.get('time');

            var param_time = '' , param_s_val = '' , param_s_key = '';
            
            if(time){
                param_time = '&time='+time;
            }
            if(val_search){
                param_s_val = '&val_search='+val_search;
            }
            if(key_search){
                param_s_key = '&key_search='+key_search;
            }
             
            if(param_short){
                if(url_short == 'DESC'){
                    if(c_page =='mpo_list_order'){
                        var short_order =  mo_localize_script.page_order+'&shortby=ASC'+param_s_val+param_s_key+param_time;
                    }else{
                        var short_order =  mo_localize_script.page_history+'&shortby=ASC'+param_s_val+param_s_key+param_time;
                    }
                       
                }else{
                    if(c_page =='mpo_list_order'){
                        var short_order =  mo_localize_script.page_order+'&shortby=DESC'+param_s_val+param_s_key+param_time;
                    }else{
                        var short_order =  mo_localize_script.page_history+'&shortby=DESC'+param_s_val+param_s_key+param_time;
                    }
                }
            }
            else{
                if(c_page =='mpo_list_order'){
                    var short_order =  mo_localize_script.page_order+param_s_val + param_s_key + param_time;
                }else{
                    var short_order =  mo_localize_script.page_history+param_s_val + param_s_key + param_time;
                }
            }
            window.location.href = short_order;
        });
    }

   
    jQuery(document).on('click','.submit_csv',function(){
        jQuery(document).ajaxSend(function() {
            jQuery("#overlay").fadeIn(300);　
        });
        var name_file = jQuery(this).closest('.frmCSVImport').find('input[name="file_product"]').val().replace(/C:\\fakepath\\/i, '');
        var token = jQuery(this).closest('.frmCSVImport').find('input[name="access_token"]').val();
        var action_form = jQuery(this).closest('.frmCSVImport').find('select[name="action_form"]').val();
        var client_id = jQuery(this).closest('.frmCSVImport').find('input[name="client_id"]').val();
        var name_store = jQuery(this).closest('.frmCSVImport').find('input[name="name_store"]').val();

        jQuery('input[name="file_product"]').parse({
            config: {
                complete: function(results, file) {
                    var data_csv = results.data;  
                    var newDataLength = 0;

                    run_import( data_csv, newDataLength, name_file, token , action_form , client_id , name_store);            
                }
            },
        });
    });

    function run_import( data_csv, newDataLength, name_file, token , action_form , client_id , name_store) {

        var newData = data_csv.slice( newDataLength, newDataLength + 20);
        var action_ajax = '';
        if(action_form = 'upload_product'){
            action_ajax = 'start_upload_product_merchant';
        }else{
            action_ajax = 'start_remove_product_merchant';
        }
        jQuery.ajax({
            url : mo_localize_script.ajaxurl,
            cache: false,
            type: "POST",
            data: {
                action: action_ajax,
                data_csv: JSON.stringify( newData ),
                name_file : name_file,
                access_token : token,
                action_form: action_form,       
            },
            success: function( result ){
                setTimeout(function(){
                    $("#overlay").fadeOut(300);
                },500);
                
                var dataCsv = data_csv;
                newDataLength = newDataLength + 20;
                if ( newDataLength <= dataCsv.length ) {
                    run_import( dataCsv, newDataLength, name_file, token , action_form , client_id , name_store);
                }else{
                    var dt = new Date();
                    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
                    jQuery('.content-cmt').append('<p class="text-success"> - Upload File: '+ name_file + 'by: ' + name_store +' at : ' + time + '</p>');
                    save_messages(name_file,client_id , name_store);
                    console.log(result);
                }    
            },
            error: function(xhr){
                swal({title: "Error", type: 
                    "error"}).then(function(){ 
                        location.reload(true);
                    });
                
                console.log(xhr.status);
            },

        });
    }

    function save_messages(name_file , client_id , name_store){
        jQuery.ajax({
            url : mo_localize_script.ajaxurl,
            cache: false,
            type: "POST",
            data: {
                action: 'save_messages_after_upload_product', 
                name_file : name_file,
                client_id : client_id,
                name_store : name_store,
            },
            success: function( result ){
                
            },
            error: function(xhr){
                swal({title: "Error", type: 
                    "error"}).then(function(){ 
                        location.reload(true);
                    });
                
                console.log(xhr.status);
            },

        });
    }

    //note config app
    jQuery('.icon_note_app').hide();
    jQuery( "textarea[name='note_app']" ).keyup(function() {
        jQuery(this).closest('td.note_app').find('.icon_note_app').show();
    });
    
    jQuery(document).on('click','.icon_note_app',function(){
        var note_order_app = jQuery(this).siblings('textarea[name="note_app"]').val();
        var client_id = jQuery(this).closest('.row-tk').find('span.client_id').html();
        jQuery.ajax({
            url : mo_localize_script.ajaxurl,
            type: "post",
            data: {
                action: 'save_note_config_app_mpo',
                client_id : client_id,
                note_order_app : note_order_app,
            },
            success: function(result){ 
                if(result.data === 1){
                        swal({title: "Success", type: 
                            "success"});
                }else{
                    swal({title:"Error", type: 
                        "error"}).then(function(){ 
                            location.reload();
                        }
                    );
                }               
            },
            error: function(xhr){
                swal({title: "Error", type: 
                    "error"}).then(function(){ 
                        location.reload();
                    }
                );
                console.log(xhr.status);
            },
        }).done(function() {
            setTimeout(function(){
                $("#overlay").fadeOut(300);
            },500);
        });
    });
    $("textarea").each(function(){
        $(this).val($(this).val().trim());
    });


    //create camp
    jQuery(document).on('click','.create_camp',function(){
        var product_id = jQuery(this).closest('tr.row-tk').find('td.product_id_camp').html();
        var img_url = jQuery(this).closest('tr.row-tk').find('td.product_img img').attr('src');
        var currency_code = jQuery(this).closest('tr.row-tk').find('td.order_currency_code').html();
        var token = jQuery(this).closest('tr.row-tk').find('td.access_token').html();
        swal({
            title: 'Create Campaign',
            html:
                '<div class="container mt-5 custom_create">' + 
                '<div class="detail_product">'+
                '<img src=' + img_url +' width="150" height="150">'+
                '<h5 class="mt-3"><b>Product ID:</b> '+ product_id + '</h5></div>'+ 
                '<div class="form_camp"><div class="input-group mb-3 col-lg-12">' +
                '<div class="input-group-prepend"><span class="input-group-text">@</span></div>'+ 
                '<input type="text" class="form-control" placeholder="Name" name="campaign_name"></div>'+
                '<div class="custom_date mb-3 col-lg-12">' +
                '<div class="input-group-prepend"><span class="input-group-text">@</span></div>'+ 
                '<input data-toggle="datepicker_start" type="text" id="#swal-input2" class="form-control" placeholder="Start Date" name="start_date_camp"></div>'+
                '<div class="custom_date mb-3 col-lg-12">' +
                '<div class="input-group-prepend"><span class="input-group-text">@</span></div>'+ 
                '<input data-toggle="datepicker_end" type="text" id="#swal-input1" class="form-control" placeholder="End Date" name="end_date_camp"></div>'+
                '<div class="input-group mb-3 col-lg-12">' +
                '<div class="input-group-prepend"><span class="input-group-text">@</span></div>'+ 
                '<input type="text" class="form-control" placeholder="Amount max Budget" name="max_budget"></div>'+
                '<div class="input-group mb-3 col-lg-12">' +
                '<div class="input-group-prepend"><span class="input-group-text">@</span></div>'+ 
                '<input type="text" class="form-control" placeholder="Amount merchant Budget" name="merchant_budget"></div>'+
                '<div class="input-group mb-3 col-lg-12">' +
                '<div class="input-group-prepend"><span class="input-group-text">@</span></div>'+ 
                '<input type="text" class="form-control" placeholder="The amount of budget automatically added to the campaign on the scheduled days" name="scheduled_add_budget_amount"></div>'+
                // '<div class="input-group mb-3 col-lg-12">' +
                // '<div class="input-group-prepend"><span class="input-group-text">@</span></div>'+ 
                // '<input type="text" class="form-control" placeholder="Days of the week budget is automatically added to this campaign" name="scheduled_add_budget_days"></div>'+
                '</div></div>',
                onOpen: function() {
                    $('[data-toggle="datepicker_start"]').datepicker({
                        dateFormat:'yy-mm-dd',
                        startView: 2,
                        autoHide: true,
                        inline: true,
                        zIndex: 999999
                    });
                    $('[data-toggle="datepicker_end"]').datepicker({
                        dateFormat:'yy-mm-dd',
                        startView: 2,
                        autoHide: true,
                        inline: true,
                        zIndex: 999999
                    });
                },
                width:1200,
                showLoaderOnConfirm: true,
                confirmButtonText: 'Create',
                preConfirm: function () {
                    var campaign_name = jQuery('input[name="campaign_name"]').val();
                    var end_date = jQuery('input[name="end_date_camp"]').val();
                    var start_date = jQuery('input[name="start_date_camp"]').val();
                    var max_budget = jQuery('input[name="max_budget"]').val();
                    var merchant_budget = jQuery('input[name="merchant_budget"]').val();
                    var scheduled_add_budget_amount = jQuery('input[name="scheduled_add_budget_amount"]').val();
                    var scheduled_add_budget_days = jQuery('input[name="scheduled_add_budget_days"]').val();
                    
                    return new Promise(function (resolve) {
                      jQuery.ajax({
                        url : mo_localize_script.ajaxurl,
                        type: "post",
                        data: {
                            action: 'create_campaign_mpo',
                            campaign_name: campaign_name,
                            token: token,
                            product_id: product_id,
                            end_date: end_date,
                            start_date: start_date,
                            max_budget: max_budget,
                            merchant_budget: merchant_budget,
                            scheduled_add_budget_amount: scheduled_add_budget_amount,
                            scheduled_add_budget_days: scheduled_add_budget_days,
                            currency_code: currency_code,
                        },
                      })
                        .done(function (rs) {
                            console.log(rs);
                            if(rs.data.message){
                                swal.hideLoading();
                                swal.showValidationError(
                                    'Request failed:'+rs.data.message
                                )
                            }else{
                                swal({title: "Create Success", type: 
                                "success"});
                            }    
                        })
                        .fail(function (erordata) {
                          console.log(erordata);
                          swal('cancelled!', 'The action have been cancelled by the user :-)', 'error');
                        })
                
                    })
                  },
          })
    });

    // get camp by token
    jQuery(document).on('click','.get_camp',function(){
        $(document).ajaxSend(function() {
            $("#overlay").fadeIn(300);　
        });
        var token = jQuery(this).closest('tr.row-tk').find('span.token_id').html();
        jQuery.ajax({
            url : mo_localize_script.ajaxurl,
            type: "post",
            data: {
                action: 'get_campaign_by_token_mpo',
                token : token,
            },
            success: function(result){ 
                console.log(result);
                var remove_mes = result.data.message;
                if(remove_mes === ""){
                        swal({title: "Success", type: 
                            "success"});
                }else{
                    swal({title: remove_mes , type: 
                        "error"}).then(function(){ 
                            location.reload();
                        }
                    );
                }               
            },
            error: function(xhr){
                swal({title: "Error", type: 
                    "error"}).then(function(){ 
                        location.reload();
                    }
                );
                console.log(xhr.status);
            },
        }).done(function() {
            setTimeout(function(){
              $("#overlay").fadeOut(300);
            },500);
        });
    });


    // view camp
    jQuery(document).on('click','.view_camp',function(){
        var token = jQuery(this).closest('tr.row-tk').find('span.token_id').html();
        var url_camp =  mo_localize_script.page_camp+'&token='+token;
        window.location.href = url_camp;
    });
    
    // update campain
    
    jQuery(document).on('click','.update_camp' ,function() {
        
        var camp_id = jQuery(this).closest('tr.row-tk').find('td.camp_id').html();
        var token = jQuery(this).closest('tr.row-tk').find('td.access_token').html();
        var camp_name_old = jQuery(this).closest('tr.row-tk').find('td.camp_name').html();
        var camp_state_old = jQuery(this).closest('tr.row-tk').find('td.camp_state').html();
        var max_budget_old = jQuery(this).closest('tr.row-tk').find('span.max_budget').html();
        var merchant_budget_old = jQuery(this).closest('tr.row-tk').find('td.merchant_budget').html();
        var product_id = jQuery(this).closest('tr.row-tk').find('td.product_id').html();
        var start_at_old = jQuery(this).closest('tr.row-tk').find('span.start_at').html();
        var end_at_old = jQuery(this).closest('tr.row-tk').find('span.end_at').html();
        var scheduled_add_budget_amount_old = jQuery(this).closest('tr.row-tk').find('td.scheduled_add_budget_amount').html();
        var scheduled_add_budget_days_old = jQuery(this).closest('tr.row-tk').find('td.scheduled_add_budget_days').html();
        var camp_renew_old = jQuery(this).closest('tr.row-tk').find('td.camp_renew').html(); 
        var currency_code =  jQuery(this).closest('tr.row-tk').find('td.currency_code').html(); 
        var checked;
        if(camp_renew_old == 1){
            checked = 'checked';
        }else{
            checked = '';
        }
        

        swal({
            title: 'Update Campaign',
            html:
                '<div class="container mt-5 custom_create">' + 
                '<div class="form_camp one"><div class="input-group mb-3 col-lg-12">' +
                '<div class="input-group-prepend w-left"><span class="input-group-text">Camp name</span></div>'+ 
                '<input type="text" class="form-control w-right" placeholder="Name" name="campaign_name" value="'+camp_name_old+'"></div>'+
                '<div class="custom_date mb-3 col-lg-12">' +
                '<div class="input-group-prepend w-left"><span class="input-group-text">Start at</span></div>'+ 
                '<input data-toggle="datepicker_start" type="text" id="#swal-input2" class="form-control w-right" placeholder="Start Date" name="start_date_camp"></div>'+
                '<div class="custom_date mb-3 col-lg-12">' +
                '<div class="input-group-prepend w-left"><span class="input-group-text">End at</span></div>'+ 
                '<input data-toggle="datepicker_end" type="text" id="#swal-input1" class="form-control w-right" placeholder="End Date" name="end_date_camp"></div>'+
                '<div class="input-group mb-3 col-lg-12">' +
                '<div class="input-group-prepend w-left"><span class="input-group-text">Camp state</span></div>'+ 
                '<select class="custom-select mr-sm-2 change_camp_stt" name="camp_state">'+
                '<option value="SAVED">SAVED (Lưu lại)</option>' +
                '<option value="NEW">NEW (Mới)</option>' +
                '<option value="STARTED">STARTED (Đã bắt đầu)</option>'+
                '<option value="ENDED">ENDED (Kết thúc)</option>'+
                '<option value="CANCELLED">CANCELLED (Hủy camp)</option>'+
                '<option value="PENDING">PENDING (Đang chờ xử lý)</option>'+
                '</select>'+
                // '<input type="text" class="form-control w-right" placeholder="Amount max Budget" name="camp_state" value="'+camp_state_old+ '">
                '</div>'+
                '<div class="input-group mb-3 col-lg-12">' +
                '<div class="input-group-prepend w-left"><span class="input-group-text">Amount budget ($)</span></div>'+ 
                '<input type="text" class="form-control w-right" placeholder="Amount max Budget" name="max_budget" value="'+ max_budget_old + '"></div>'+
                '<div class="input-group mb-3 col-lg-12">' +
                '<div class="input-group-prepend w-left"><span class="input-group-text">Amount merchant budget ($)</span></div>'+ 
                '<input type="text" class="form-control w-right" placeholder="Amount merchant Budget" name="merchant_budget" value="' + merchant_budget_old + '"></div>'+
                '<div class="input-group mb-3 col-lg-12">' +
                '<div class="input-group-prepend w-left"><span class="input-group-text">Scheduled add budget amount ($)</span></div>'+ 
                '<input type="text" class="form-control w-right" placeholder="The amount of budget automatically added to the campaign on the scheduled days" name="scheduled_add_budget_amount" value="' + scheduled_add_budget_amount_old +'"></div>'+
                // '<div class="input-group mb-3 col-lg-12">' +
                // '<div class="input-group-prepend"><span class="input-group-text">@</span></div>'+ 
                // '<input type="text" class="form-control" placeholder="Days of the week budget is automatically added to this campaign" name="scheduled_add_budget_days"></div>'+
                '<div class="input-group mb-3 col-lg-12">' +
                '<div class="input-group-prepend"><span style="font-weight:bold;">Auto Renew Camp: </span></div>'+ 
                '<input id="renew_cam_update" type="checkbox" '+ checked + ' data-toggle="toggle"></div>'+
                '</div></div>',
                onOpen: function() {
                    $('[data-toggle="datepicker_start"]').datepicker({
                        dateFormat:'yy-mm-dd',
                        startView: 2,
                        autoHide: true,
                        inline: true,
                        zIndex: 999999
                    });
                    jQuery("select.change_camp_stt").val(camp_state_old);
                    $('[data-toggle="datepicker_start"]').datepicker('setDate',start_at_old);

                    $('[data-toggle="datepicker_end"]').datepicker({
                        dateFormat:'yy-mm-dd',
                        startView: 2,
                        autoHide: true,
                        inline: true,
                        zIndex: 999999
                    });
                    $('[data-toggle="datepicker_end"]').datepicker('setDate',end_at_old);
                },
                width:1000,
                showLoaderOnConfirm: true,
                confirmButtonText: 'Update',
                preConfirm: function () {
                    var campaign_name = jQuery('input[name="campaign_name"]').val();
                    var end_date = jQuery('input[name="end_date_camp"]').val();
                    var start_date = jQuery('input[name="start_date_camp"]').val();
                    var max_budget = jQuery('input[name="max_budget"]').val();
                    var merchant_budget = jQuery('input[name="merchant_budget"]').val();
                    var scheduled_add_budget_amount = jQuery('input[name="scheduled_add_budget_amount"]').val();
                    var scheduled_add_budget_days = jQuery('input[name="scheduled_add_budget_days"]').val();
                    var camp_renew = jQuery('input#renew_cam_update').prop("checked");
                    var state_camp = jQuery("select.change_camp_stt").val();

                    return new Promise(function (resolve) {
                      jQuery.ajax({
                        url : mo_localize_script.ajaxurl,
                        type: "post",
                        data: {
                            action: 'update_campaign_mpo',
                            campaign_name: campaign_name,
                            token: token,
                            camp_id : camp_id,
                            product_id: product_id,
                            end_date: end_date,
                            start_date: start_date,
                            max_budget: max_budget,
                            merchant_budget: merchant_budget,
                            scheduled_add_budget_amount: scheduled_add_budget_amount,
                            scheduled_add_budget_days: scheduled_add_budget_days,
                            currency_code: currency_code,
                            camp_renew : camp_renew,
                            state_camp : state_camp
                        },
                      })
                        .done(function (rs) {
                            console.log(rs);
                            if(rs.data.message){
                                swal.hideLoading();
                                swal.showValidationError(
                                    'Request failed:'+rs.data.message
                                )
                            }else{
                                swal({title: "Success" , type: 
                                    "success"}).then(function(){ 
                                        location.reload(true);
                                    }
                                );
                            }    
                        })
                        .fail(function (erordata) {
                          console.log(erordata);
                          swal('cancelled!', 'The action have been cancelled by the user :-)', 'error');
                        })
                
                    })
                  },
          })
    })
      
    
    
});