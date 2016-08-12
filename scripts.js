$( document ).ready(function() {
        var counter = 0;
        var spiner = 0;
        var on_dice = 0;
        var current_position = 0;
        var next_position = 0;
        var offset = 0;
        var player = 1; // Первый ход
        var all_players = $( ".players img" ).length;
        var finish = parseInt($('.cell').last().attr("id").substr(5)); // Финишная ячейка
        $('.trow').click(function() {
            $('.trow').attr("disabled","disabled");
            counter = 0;
            spiner = Math.floor(Math.random() * (18 - 12)) + 12; // рандом врашения кубика от 12 и до 18 раз
            trow();
        });
        function trow(){
            
            counter++;
            // Заканчиваем рекурсию после n-раз прокручивания
            if(counter>spiner){
                current_position = parseInt($('#player-'+player).attr("place")); // Текущай позиция
                next_position = current_position + on_dice; // Новая позиция
                $('#player-'+player).attr("place",next_position); // Берем текущее положение и добавляем новое
                goNext(current_position,next_position);
                counter = 0;
                return;
            }
            
            spin();
            
            // Собственно сама рекурсия
            setTimeout(trow, 200);
        }
        function goNext(cur_pos,next_pos){
            if(cur_pos<next_pos){
                if(next_pos>finish){
                    next_pos = finish;
                }
                cur_pos++;
                offset = $('#cell-'+cur_pos).position();
                $("#player-"+player).animate({ 
                    left: offset.left+45,
                    top: offset.top
                }, 500, function() {
                    goNext(cur_pos, next_pos);
                });
            }else{
                if($('#cell-'+next_pos).attr('bonus')){
                    if($('#cell-'+next_pos).attr('bonus')>0){
                        jumpTo(cur_pos,next_pos+parseInt($('#cell-'+next_pos).attr('bonus')));
                    }else if($('#cell-'+next_pos).attr('bonus')<0){
                        jumpTo(cur_pos,next_pos+parseInt($('#cell-'+next_pos).attr('bonus')));
                    }else if($('#cell-'+next_pos).attr('bonus')==0){
                        jumpTo(cur_pos,0);
                    }
                }
                $('.trow').removeAttr("disabled");
                player++;
                if(player>all_players){
                    checkFinish(finish);
                    player = 1; // Если прошел круг, то снова первый игрок
                }
                return false;
            }         
        }
        function jumpTo(cur,next){
            offset = $('#cell-'+next).position();
            $("#player-"+player).animate({ 
                left: offset.left+45,
                top: offset.top
            }, 1000);
            $('#player-'+player).attr("place",next); // Берем текущее положение и добавляем новое 
            if($('#cell-'+next).attr('bonus')){
                if($('#cell-'+next).attr('bonus')>0){
                    jumpTo(cur,next+parseInt($('#cell-'+next).attr('bonus')));
                }else if($('#cell-'+next).attr('bonus')<0){
                    jumpTo(cur,next+parseInt($('#cell-'+next).attr('bonus')));
                }else if($('#cell-'+next).attr('bonus')==0){
                    jumpTo(cur,0);
                }
            }
            if(player>all_players){
                checkFinish(finish);
            }
            
        }
        function checkFinish(fin){
            $(".player").each(function(){
                if(parseInt($(this).attr("place"))==fin){
                    console.log($(this).attr("id"));
                    $('.trow').attr("disabled","disabled"); // Игра окончена
                }
            });
        }
        function spin(){
            var currentVal = $('#cubic').attr('class');
            switch(currentVal) {
                case 'six':
                    $('#dice-1-1').html('');
                    $('#dice-1-2').html('');
                    $('#dice-1-3').html('');
                    $('#dice-2-1').html('');
                    $('#dice-2-2').html('&bull;');
                    $('#dice-2-3').html('');
                    $('#dice-3-1').html('');
                    $('#dice-3-2').html('');
                    $('#dice-3-3').html('');
                    $('#cubic').removeClass('six').addClass('one');
                    on_dice = 1;
                    break
                case 'five':
                    $('#dice-1-1').html('&bull;');
                    $('#dice-1-2').html('');
                    $('#dice-1-3').html('&bull;');
                    $('#dice-2-1').html('&bull;');
                    $('#dice-2-2').html('');
                    $('#dice-2-3').html('&bull;');
                    $('#dice-3-1').html('&bull;');
                    $('#dice-3-2').html('');
                    $('#dice-3-3').html('&bull;');
                    $('#cubic').removeClass('five').addClass('six');
                    on_dice = 6;
                    break
                case 'four':
                    $('#dice-1-1').html('&bull;');
                    $('#dice-1-2').html('');
                    $('#dice-1-3').html('&bull;');
                    $('#dice-2-1').html('');
                    $('#dice-2-2').html('&bull;');
                    $('#dice-2-3').html('');
                    $('#dice-3-1').html('&bull;');
                    $('#dice-3-2').html('');
                    $('#dice-3-3').html('&bull;');
                    $('#cubic').removeClass('four').addClass('five');
                    on_dice = 5;
                    break
                case 'three':
                    $('#dice-1-1').html('&bull;');
                    $('#dice-1-2').html('');
                    $('#dice-1-3').html('&bull;');
                    $('#dice-2-1').html('');
                    $('#dice-2-2').html('');
                    $('#dice-2-3').html('');
                    $('#dice-3-1').html('&bull;');
                    $('#dice-3-2').html('');
                    $('#dice-3-3').html('&bull;');
                    $('#cubic').removeClass('three').addClass('four');
                    on_dice = 4;
                    break
                case 'two':
                    $('#dice-1-1').html('');
                    $('#dice-1-2').html('');
                    $('#dice-1-3').html('&bull;');
                    $('#dice-2-1').html('');
                    $('#dice-2-2').html('&bull;');
                    $('#dice-2-3').html('');
                    $('#dice-3-1').html('&bull;');
                    $('#dice-3-2').html('');
                    $('#dice-3-3').html('');
                    $('#cubic').removeClass('two').addClass('three');
                    on_dice = 3;
                    break
                case 'one':
                    $('#dice-1-1').html('');
                    $('#dice-1-2').html('');
                    $('#dice-1-3').html('&bull;');
                    $('#dice-2-1').html('');
                    $('#dice-2-2').html('');
                    $('#dice-2-3').html('');
                    $('#dice-3-1').html('&bull;');
                    $('#dice-3-2').html('');
                    $('#dice-3-3').html('');
                    $('#cubic').removeClass('one').addClass('two');
                    on_dice = 2;
                    break
                default:
                    alert('Я таких значений не знаю')
            }
        }
});