$(function() {
                                /* Chrome Smooth Scroll */
    try {
        $.browserSelector();
        if($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch(err) {

    };
                                /* Prevent Drag for a, img */
    $("img, a").on("dragstart", function(event) { event.preventDefault(); });


                                /* Scroll page to top */

    $(window).scroll(function () {
        if ($(this).scrollTop() > $(this).height()) {
            $('.top').addClass('active');
        } else {
            $('.top').removeClass('active');
        }
    });

    $('.top').click(function () {
        $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
    });

                            /* Preloader */

    $(window).on('load', function () {
        $('.preloader').delay(1000).fadeOut('slow');
    });

                            /***** Aditional scripts *****/


                                /* Text on a circle */

    function $$(selector, context) {
        context = context || document;
        var elements = context.querySelectorAll(selector);
        return Array.prototype.slice.call(elements);
    }

    $$('.circular').forEach(function(el) {
        var NS = "http://www.w3.org/2000/svg";

        var svg = document.createElementNS(NS, "svg");
        svg.setAttribute("viewBox", "0 0 100 100");

        var circle = document.createElementNS(NS, "path");
        circle.setAttribute("d", "M0,50 a50,50 0 1,1 0,1z");
        circle.setAttribute("id", "circle");

        var text = document.createElementNS(NS, "text");
        var textPath = document.createElementNS(NS, "textPath");
        textPath.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', '#circle');
        textPath.textContent = el.textContent;
        text.appendChild(textPath);

        svg.appendChild(circle);
        svg.appendChild(text);

        el.textContent = '';
        el.appendChild(svg);
    });


                 /*De-emphasizing by blurring (AND dimming) */

    var dialog = $('.dialog');
    var main = $('.main');

    $('#but').click(function() {
        dialog.attr('open', 'close');
        main.addClass('de-emphasized');
    });

    dialog.click(function() {
        if (dialog.close) {
            dialog.close();
        } else {
            dialog.removeAttr('open');
        }
        main.removeClass('de-emphasized');
    });


                  /* Interactive image comparison - with CSS range */

    $$('.image-slider2').forEach(function(slider) {

        // Создаем дополнительный блок div и оборачиваем его вокруг первого изображения
        var div = document.createElement('div');
        var img = slider.querySelector('.img2');
        console.log(img);
        console.log(div);
        slider.insertBefore( div, img);
        div.appendChild(img);

        // Создаем ползунок
        var range = document.createElement('input');
        range.type = 'range';
        range.oninput = function() {
            div.style.width = this.value + '%';
        };
        slider.appendChild(range);
    });


                /* Styling by sibling count: Color palette example */

    function $$(expr, con) { return [].slice.call((con || document).querySelectorAll(expr)); }

    var colors = [
            '#D6E055', // Agave
            '#082323', '#E6E2AF', '#A7A37E', '#EFECCA', '#046380', // Sandy stone beach
            '#1C171D', '#FEE169', '#CDD452', '#F9722E', '#C9313D', // Sushi Maki
            '#2E95A3', '#50B8B4', '#C6FFFA', '#E2FFA8'  // Agave
        ],
        palette = document.querySelector('.palette'),
        template = palette.firstElementChild;

    function addColor(template) {
        var li = template.cloneNode(true);
        var color = colors.pop();
        colors.unshift(color);
        li.style.background = color;
        palette.insertBefore(li, template.nextSibling);
    }

    palette.onclick = function(evt) {
        var button = evt.target;

        if (button.className == 'add') {
            addColor(button.parentNode.parentNode);
        }
        else if (button.className == 'delete') {
            var li = button.parentNode.parentNode;
            li.parentNode.removeChild(li);
        }
    }

});
