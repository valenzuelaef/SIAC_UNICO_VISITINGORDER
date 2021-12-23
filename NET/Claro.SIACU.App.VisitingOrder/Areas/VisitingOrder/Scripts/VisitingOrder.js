(function ($, undefined) {

    'use strict';

    var Form = function ($element, options) {
        $.extend(this, $.fn.form.defaults, $element.data(), typeof options === 'object' && options);

        this.setControls({
            form: $element,
            body: $('body'),
            divMainBody:          $('#navbar-body'),
            divMainHeader:        $('#main-header'),
            divMainFooter:        $('#main-footer'),
            modalResume:          $('#modal-resume'),
            btnNext:              $('#btn-next'),
            btnBack:              $('#btn-back'),
            btnNextResume:        $('#btn-next-resume'),
            acord:                $('#accordion')
        });
    }

    Form.prototype = {
        constructor: Form,

        init: function () {
            var that = this,
                controls = this.getControls();

            that.render();
        },

        render: function () {
            var that = this,
                controls = this.getControls();
        
            //controls.btnNext.on('click', { element: controls }, that.showModal);
            controls.btnBack.hide();
            controls.btnNext.hide();
            controls.btnNextResume.hide();
            controls.btnNext.addEvent(that, 'click', that.btnNext_Click);
            controls.btnNextResume.addEvent(that, 'click', that.btnNextResume_Click);
            controls.btnBack.addEvent(that, 'click', that.btnBack_Click);

            //controls.btnNext.on('click', { element: controls }, that.showModal);
            that.resizeContent();
        },

        btnNextResume_Click: function () {
            var that = this;
            var controls = this.getControls();
            that.showModal();
        },

        btnBack_Click: function () {
            var that = this;
            var controls = that.getControls();

            var urlBase = location.protocol + '//' + location.host + '/VisitingOrder/Home/Address';

            return $.ajax({
                type: 'GET',
                contentType: "application/html; charset=utf-8",
                dataType: 'html',
                url: urlBase,
                success: function (result) {
                    controls.btnNext.show();
                    controls.btnBack.hide();
                    controls.btnNextResume.hide();
                    $('#containerVisitingOrder_operacion').html(result);
                }
            });
        },

        btnNext_Click: function () {
            var that = this;
            var controls = this.getControls();
            var urlBase = location.protocol + '//' + location.host + '/VisitingOrder/Home/Scheduling';

            return $.ajax({
                type: 'GET',
                contentType: "application/html; charset=utf-8",
                dataType: 'html',                
                url: urlBase,
                success: function (result) {
                    controls.btnNext.hide();
                    controls.btnBack.show();
                    controls.btnNextResume.show();
                    $('#containerVisitingOrder_operacion').html(result);
                }
            });
        },

        getControls: function () {
            return this.m_controls || {};
        },

        setControls: function (value) {
            this.m_controls = value;
        },

        resizeContent: function () {
        
            var controls = this.getControls();
            controls.divMainBody.css('height', $(window).outerHeight() - controls.divMainHeader.outerHeight() - controls.divMainFooter.outerHeight());
        },

        showModal: function () {

            $('#modal-resume').modal()
            //e.data.element.modalResume.modal('show')
        }
    }

    $.fn.form = function () {
        var option = arguments[0],
            args = arguments,
            value,
            allowedMethods = ['resizeContent', 'getControls'];

        this.each(function () {
            var $this = $(this),
                data = $this.data('form'),
                options = $.extend({}, $.fn.form.defaults,
                    $this.data(), typeof option === 'object' && option);

            if (!data) {
                data = new Form($this, options);
                $this.data('form', data);
            }

            if (typeof option === 'string') {
                if ($.inArray(option, allowedMethods) < 0) {
                    throw "Unknown method: " + option;
                }
                value = data[option](args[1]);
            } else {
                data.init();
                if (args[1]) {
                    value = data[args[1]].apply(data, [].slice.call(args, 2));
                }
            }
        });

        return value || this;
    };

    $.fn.form.defaults = {
    }

    $('#main-contenedor').form();

})(jQuery, null);

function openRules() {
    document.getElementById("myRulenav").style.width = "25%";
}

function closeRules() {
    document.getElementById("myRulenav").style.width = "0";
}