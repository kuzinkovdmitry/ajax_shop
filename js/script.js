$(document).ready(function(){ 
    var total_elem = 0;
    var new_page = 0;
    var new_arr = [];
    var urlAjax = "/php/list.php";
    var deffered = [];
    function doneAjax(){
        $('.preloader').css("display", "none").css("opacity", "0.8");
    }
    
    getAjax();
    
    $('#load_more').click(function(){
        if(deffered.state() == "resolved"){
            firstAdd(new_arr);
            secondAdd();
        }else{
            $('.preloader').css("display", "block");
        }
    })
    
    function getAjax(){
        new_page += 1;
        $.ajax({
            type: "GET",
            url: urlAjax,
            data:{page: new_page},
            beforeSend: function(){
                $('.preloader').css("display", "block").css("opacity", 1);
            },
            success: function Success(data){
                doneAjax();
                getSuccess();
                function getSuccess(){
                    var arr = JSON.parse(data);
                    firstAdd(arr);
                    secondAdd();
                }
            }     
        })
    }
    

                function firstAdd(arr){
                    var container = $('.first_row');
                    arr.entities.forEach(function(item, i){
                        var template = $(
                            "<div class='col-md-4 col-sm-6 col-lg-4 prodcut_item fadeIn'>" + 
                                "<div class='img_block'>" + 
                                    "<div class='sale_block'>" + "SALE" + "</div>" +
                                    "<div class='new_block'>" + "NEW" + "</div>" +
                                    "<img src='' alt=''>" + 
                                "</div>" +
                                "<h4>" + "</h4>" +
                                "<p>" + "</p>" +
                                "<div class='cost_block'>" + "<h3>" + "</h3>" + "<span class='old_price'>" + "</span>" + "</div>" +
                                "<div class='div_but'>" + 
                                        "<a href='#' id='first_but'>ADD TO CART</a>" +
                                        "<a href='#' id='second_but'><span id='second_but_view'>VIEW</span></a>" +
                                "</div>" +
                            "</div>"
                        );
                        var new_src = item.img;
                        template.find('img').attr("src", new_src);
                        template.find('h4').html(item.title);
                        template.find('p').html(item.description);
                        template.find('h3').html("$" + item.cost);
                        if(item.discountCost > 0){
                            var newCost = item.cost - item.discountCost;
                            template.find('h3').html("$" + newCost);
                            template.find('.old_price').html("$" + item.cost);
                            template.find('.sale_block').css("display", "block");
                        }
                        if(item.new == true){
                            template.find('.new_block').css("display", "block");
                        }
                        template.appendTo(container);
                    })
                    total_elem += arr.entities.length;
                    if (total_elem == arr.total){
                        $("#load_more").css("display", "none");
                        $(".third_row").css("height", "60px");
                    }
                }
    
    function secondAdd(){
        new_page += 1
        deffered = $.ajax({
            type: "GET",
            url: urlAjax,
            data: {page: new_page},
            complete: doneAjax,
            success: function Success(data){
                new_arr = JSON.parse(data);
            }
        })
    }
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
})