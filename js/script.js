$(document).ready(function(){

  /* price-bar */

    $('.more').bind('click', function(){
        var target = $(this)[0].attributes['data-target'].value;
        var defaultContent = $('#b-price2');
        var blockHeight;
        $('#b-price2').hide();
        $('#'+target).fadeIn(200);
        blockHeight = $('#'+target).find('.right').height();
        $('#'+target).find('.left').height(blockHeight);
        $('#'+target).find('a.close').bind('click', function(){
            $('#'+target).hide();
            defaultContent.fadeIn(200);
            $(this).unbind();
            return false;
        });
        return false;
    });

    
    /* on position */
    var defaultPosition,
        elementsForMoving = $('.b-slider li'),
        timerForDefaults = 10000,
        timers;
    
    /* set default positions of elements */
    defaultPosition = {
        a : {
            top : '55px',
            left: '0px'         
        },
        b : {
            top : '55px',
            left: '341px'         
        },
        c : {
            top : '55px',
            left: '680px'         
        },
        d : {
            top : '380px',
            left: '159px'         
        },
        e : {
            top : '380px',
            left: '500px'         
        }
    }
    
    /* set position for first click on anyone element */
    activePosition = {
        0 : {
            top : '385px',
            left: '0px'         
        },
        1 : {
            top : '385px',
            left: '232px'         
        },
        2 : {
            top : '385px',
            left: '459px'         
        },
        3 : {
            top : '385px',
            left: '680px'         
        }
    } 

    /* position of click-element */
    activeElemPos = {
        top : '55px',
        left: '0px'    
    }
    
    $(elementsForMoving[0]).css({top: defaultPosition.a.top, left: defaultPosition.a.left});
    $(elementsForMoving[1]).css({top: defaultPosition.b.top, left: defaultPosition.b.left});
    $(elementsForMoving[2]).css({top: defaultPosition.c.top, left: defaultPosition.c.left});
    $(elementsForMoving[3]).css({top: defaultPosition.d.top, left: defaultPosition.d.left});
    $(elementsForMoving[4]).css({top: defaultPosition.e.top, left: defaultPosition.e.left}); 
           
    function onDefaults(){
        $('#type-content').hide(function(){
            $(elementsForMoving[0]).animate({top: defaultPosition.a.top, left: defaultPosition.a.left});
            $(elementsForMoving[1]).animate({top: defaultPosition.b.top, left: defaultPosition.b.left});
            $(elementsForMoving[2]).animate({top: defaultPosition.c.top, left: defaultPosition.c.left});
            $(elementsForMoving[3]).animate({top: defaultPosition.d.top, left: defaultPosition.d.left});
            $(elementsForMoving[4]).animate({top: defaultPosition.e.top, left: defaultPosition.e.left});
        });   
        $(elementsForMoving).removeClass('current');
        $(elementsForMoving).unbind('click');
        bindingMovingEvent(); 
    }

    function bindingMovingEvent(){
        $(elementsForMoving).bind('click', function(){
            moveElementsCur(this);
            return false;
        });
    }

    function showContent(elem){
        var contentId,
            targetContent;

        contentId = $(elem).find('a')[0].attributes['data-types'].value;
        targetContent = $('#'+contentId).html();
        $('#type-content').html(targetContent);
        $('#type-content').show(100);    
    }

    function moveEveryBody(elem){
        var topPosition,
            leftPosition,
            currentElem,
            toBeCurrentElem;

        topPosition = $(elem).css('top');
        leftPosition = $(elem).css('left');

        /* move current element first in HTML */
        currentElem = $('.current');
        $('.current').remove();
        $(elem).after(currentElem);
        $(currentElem).bind('click', function(){
            moveEveryBody(this);
            return false;
        });
        toBeCurrentElem = $(elem);
        $(elem).remove();
        $($('.b-slider li')[0]).before(toBeCurrentElem);
        $(toBeCurrentElem).bind('click', function(){
            moveEveryBody(this);
            return false;
        });

        /* animate and show new content */
        $('#type-content').hide();
        $(elem).animate({top: activeElemPos.top, left: activeElemPos.left});
        $('.b-slider li.current').animate({top: topPosition, left: leftPosition}, function(){
            showContent(elem);
        });
        $('.b-slider li').removeClass('current');
        $(elem).addClass('current'); 
        clearTimeout(timers);

        /* set default position */
        timers = setTimeout(function(){
            onDefaults();
        }, timerForDefaults);     
    }

    function moveElementsCur(currentElement){
        var otherElements,
        otherElements = [],
        delIndex;

        $(currentElement).animate({top: activeElemPos.top, left: activeElemPos.left}, function(){
            showContent(currentElement);
        }).addClass('current');
        $(elementsForMoving).unbind('click');

        for(var i=0; i<elementsForMoving.length; i++){
            var curClassName;
            curClassName = currentElement.className;
            
            otherElements = elementsForMoving.slice();

            if(elementsForMoving[i].className === curClassName){
                delIndex = i;    
            }
        }
        otherElements.splice(delIndex,1);

        for(i=0; i<otherElements.length; i++){
            $(otherElements[i]).animate({top: activePosition[i].top, left: activePosition[i].left});
        }

        $(elementsForMoving).bind('click', function(){
            moveEveryBody(this);
            return false;
        });

        /* set default position */
        timers = setTimeout(function(){
            onDefaults();
        }, timerForDefaults);
    }

    bindingMovingEvent();
});
