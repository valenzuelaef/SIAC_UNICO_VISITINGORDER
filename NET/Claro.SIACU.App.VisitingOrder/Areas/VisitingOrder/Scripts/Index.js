(function ($, undefined) {

    'use strict';

    var Form = function ($element, options) {
        $.extend(this, $.fn.VisitingOrder.defaults, $element.data(), typeof options === 'object' && options);

        this.setControls({
            form: $element,
            idSession: $('#idSession'),
            divCustomerInformation: $('#divCustomerDataView', $element),
            txtCalendar: $('#txtCalendar', $element),
            divMainBody: $('#navbar-body'),
            divMainHeader: $('#main-header'),
            divMainFooter: $('#main-footer'),
            btnSave: $('#btn-save'),
            ddlCenterofAttention: $('#ddlCenterofAttention', $element),
            ErrorMessageddlCenterofAttention: $('#ErrorMessageddlCenterofAttention', $element),
            txtAddress: $('#txtAddress', $element),
            txtAddressNote: $('#txtAddressNote', $element),
            txtCountry: $('#txtCountry', $element),
            txtDepartment: $('#txtDepartment', $element),
            txtProvince: $('#txtProvince', $element),
            txtDistrict: $('#txtDistrict', $element),
            txtPlane: $('#txtPlane', $element),
            txtUbigeo: $('#txtUbigeo', $element),
            ddlTypeofJob: $('#ddlTypeofJob', $element),
            ddlSubType: $('#ddlSubType', $element),
            ddlTypeofService: $('#ddlTypeofService', $element),
            ddlMotive: $('#ddlMotive', $element),
            ddlTimeZone: $('#ddlTimeZone', $element),
            WorkTypeErrorMessage: $('#ErrorMessageddlTypeofJob', $element),
            subWorkTypeErrorMessage: $('#ErrorMessageddlSubWorkType', $element),
            calendarErrorMessage: $('#ErrorMessagetxtCalendar', $element),
            ddlTypeofServiceErrorMessage: $('#ErrorMessageddlTypeofService', $element),
            ddlMotiveErrorMessage: $('#ErrorMessageddlMotive', $element),
            timeZoneErrorMessage: $('#ErrorMessageddlTimeZone', $element),
            txtSendMail: $('#txtSendMail', $element),
            chkSendMail: $('#chkSendMail', $element),
            ErrorMessagetxtSendMail: $('#ErrorMessagetxtSendMail', $element),
            btnConstancy: $('#btn-constancy'),
            txtNotes: $('#txtNotes', $element),
            txtTelephone: $('#txtTelephone', $element),
            ddlAnnexes: $('#ddlAnnexes', $element),
            divFooterInfoSot: $('.footer-info-sot'),
            divAnexos: $('#divAnexos')

        });
    }

    Form.prototype = {
        constructor: Form,

        init: function () {
            var that = this,
                controls = this.getControls();

            moment.locale('es');
            that.reloj();
            that.render();
        },

        render: function () {
            var that = this,
                controls = this.getControls();

            moment.locale('es');
            that.visitingOrderInit();
            controls.ddlTypeofJob.addEvent(that, 'change', that.onChangeTypeofJob);
            controls.ddlSubType.addEvent(that, 'change', that.onChangedSubType);
            controls.ddlTypeofService.addEvent(that, 'change', that.onChangeTypeofService);
            controls.txtCalendar.change(function () { that.txtCalendar_Change() });
            controls.btnSave.addEvent(that, 'click', that.onClickSave);
        },

        onChangeTypeofJob: function () {
            var that = this,
                controls = that.getControls();
            if ($("#ddlTypeofJob option:selected").html() != '-Seleccionar-') {
                that.getLoadingPage();
                that.visitingProcess4();
            }
        },

        onChangedSubType: function () {
            var that = this,
                controls = that.getControls();
            controls.txtCalendar.val('');
            controls.ddlTimeZone.empty();

        },

        onClickSave: function () {
            var that = this,
              controls = that.getControls(),
              filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;


            //if (!that.validateSaveTransaction())
            if (controls.chkSendMail.is(':checked')) {
                if (!filter.test(controls.txtSendMail.val())) {
                    controls.txtSendMail.closest('.form-control').addClass('has-error');
                    controls.ErrorMessagetxtSendMail.text('Ingrese una dirección de correo válida.');
                    controls.txtSendMail.focus();
                    return false;
                }
                else {
                    controls.ErrorMessagetxtSendMail.closest('.form-control').removeClass('has-error');
                    controls.ErrorMessagetxtSendMail.text('');

                }
            }
            else {
                controls.ErrorMessagetxtSendMail.closest('.form-control').removeClass('has-error');
                controls.ErrorMessagetxtSendMail.text('');
            }

            if (!$.app.validateControl('divIndex', null))
                return;

            confirm("¿Está seguro de guardar los cambios?", null, function () {
                that.getLoadingPage();
                try {
                    that.saveTransaction();
                }
                catch (ex) {
                    alert("No se pudo ejecutar la transacción. Informe o vuelva a intentar. " + ex, "Alerta");
                }
            }, null, null);

        },

        validateSaveTransaction: function () {
            var that = this,
                controls = that.getControls(),
                filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            if ($("#ddlTypeofJob option:selected").html() == '-Seleccionar-') {
                controls.ddlTypeofJob.closest('.form-control').addClass('has-error');
                controls.WorkTypeErrorMessage.text('Seleccione un Tipo de Trabajo válido');
                alert('Seleccione un Tipo de Trabajo válido');
                controls.ddlTypeofJob.focus();
                return false;
            }
            else {
                controls.ddlTypeofJob.closest('.form-control').removeClass('has-error');
                controls.WorkTypeErrorMessage.text('');
            }


            if ($("#ddlSubType option:selected").html() == '-Seleccionar-') {
                controls.ddlSubType.closest('.form-control').addClass('has-error');
                controls.subWorkTypeErrorMessage.text('Seleccione un Sub Tipo de Trabajo válido');
                alert('Seleccione un Sub Tipo de Trabajo válido');
                controls.ddlSubType.focus();
                return false;
            } else {
                controls.ddlSubType.closest('.form-control').removeClass('has-error');
                controls.subWorkTypeErrorMessage.text('');
            }


            if ($("#ddlTypeofService option:selected").html() == '-Seleccionar-') {
                controls.ddlTypeofService.closest('.form-control').addClass('has-error');
                controls.ddlTypeofServiceErrorMessage.text('Seleccione un Tipo de Servicio válido');
                alert('Seleccione un Tipo de Servicio válido');
                controls.ddlTypeofService.focus();
                return false;
            } else {
                controls.ddlTypeofService.closest('.form-control').removeClass('has-error');
                controls.ddlTypeofServiceErrorMessage.text('');
            }

            if ($("#ddlMotive option:selected").html() == '-Seleccionar-') {
                controls.ddlMotive.closest('.form-control').addClass('has-error');
                controls.ddlMotiveErrorMessage.text('Seleccione un Motivo SOT válido');
                alert('Seleccione un Motivo SOT válido');
                controls.ddlMotive.focus();
                return false;
            } else {
                controls.ddlMotive.closest('.form-control').removeClass('has-error');
                controls.ddlMotiveErrorMessage.text('');
            }

            if (controls.txtCalendar.val().length <= 0) {
                controls.txtCalendar.closest('.form-control').addClass('has-error');
                controls.calendarErrorMessage.text('Ingrese una fecha válida');
                alert('Ingrese una fecha válida');
                controls.txtCalendar.focus();
                return false;
            } else {
                controls.txtCalendar.closest('.form-control').removeClass('has-error');
                controls.calendarErrorMessage.text('');
            }



            if ($("#ddlTimeZone option:selected").html() == 'Seleccionar') {
                controls.ddlTimeZone.closest('.form-control').addClass('has-error');
                controls.timeZoneErrorMessage.text('Seleccione un Horario válido');
                alert('Seleccione un Horario válido');
                controls.ddlTimeZone.focus();
                return false;
            } else {
                controls.ddlTimeZone.closest('.form-control').removeClass('has-error');
                controls.timeZoneErrorMessage.text('');
            }

            if (controls.chkSendMail.is(':checked')) {
                if (!filter.test(controls.txtSendMail.val())) {
                    controls.txtSendMail.closest('.form-control').addClass('has-error');
                    controls.ErrorMessagetxtSendMail.text('Ingrese una dirección de correo válida.');
                    controls.txtSendMail.focus();
                    return false;
                }
                else {
                    controls.ErrorMessagetxtSendMail.closest('.form-control').removeClass('has-error');
                    controls.ErrorMessagetxtSendMail.text('');

                }
            }
            else {
                controls.ErrorMessagetxtSendMail.closest('.form-control').removeClass('has-error');
                controls.ErrorMessagetxtSendMail.text('');
            }


            if (controls.ddlCenterofAttention.val() == '') {
                controls.ddlCenterofAttention.closest('.form-control').addClass('has-error');
                controls.ErrorMessageddlCenterofAttention.text('Seleccione punto de atención.');
                controls.ddlCenterofAttention.focus();
                return false;
            } else {
                controls.ErrorMessageddlCenterofAttention.closest('.form-control').removeClass('has-error');
                controls.ErrorMessageddlCenterofAttention.text('');
            }
            return true;
        },

        onChangeTypeofService: function () {
            var that = this,
                controls = that.getControls();

            if ($("#ddlTypeofService option:selected").html() != '-Seleccionar-') {
                that.visitingProcess5();
            }



        },

        onChangeMotive: function () {
            var that = this,
                controls = that.getControls();

            if ($("#ddlMotive option:selected").html() != '-Seleccionar-') {
                alert("Event");
            }
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

        reloj: function () {
            var that = this,
                controls = that.getControls();

            that.resizeContent();
            var text2 = moment().format('DD/MM/YYYY hh:mm:ss a');
            controls.idSession.html('Session ID : ' + Session.UrlParams.IdSession + '&nbsp&nbsp  ' + text2 + '');
            var t = setTimeout(function () { that.reloj() }, 500);
        },

        visitingOrderSession: {},

        visitingOrderInit: function () {

            var that = this,
                controls = that.getControls();
            //Session.SessionParams.DATACUSTOMER.ContractID = '29983351';//'29983351' //para generar sot
            //Session.SessionParams.DATACUSTOMER.CustomerID = '44853381';//'44853381' //para generar sot
            //Session.SessionParams.DATACUSTOMER.ContractID = "13326803";
            //Session.SessionParams.DATACUSTOMER.CustomerID = "11619817";
            debugger;
            var plataformaAT = !$.string.isEmptyOrNull(Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT) ? Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT : '';
            var idTransactionFront = $.app.getTypeClientAsIsOrToBe(plataformaAT, '4', '12');
            var customerInformationPromise = $.reusableViews.viewOfTheLeftSide(controls.divCustomerInformation);
            var initialConfigurationPromise = $.app.transactionInitialConfigurationPromise(Session.SessionParams, idTransactionFront);
            Promise.all([customerInformationPromise, initialConfigurationPromise])
                .then(function (res) {

                    var initialConfiguration = res[1].oInitialDataResponse.MessageResponse.Body,
                        AdditionalFixedData = res[1].oDatosAdi.MessageResponse.Body,
                        AuditRequest = res[1].oAuditRequest,
                        Configuraciones = res[1].oConfiguraciones,
                        AdditionalServices = initialConfiguration.AdditionalServices || {},
                        Igv = initialConfiguration.Igv,
                        CoreServices = initialConfiguration.CoreServices || {},
                        CustomerInformation = initialConfiguration.CustomerInformation || {},
                        PuntoAtencion = initialConfiguration.PuntoAtencion || {},
                        DatosUsuarioCtaRed = initialConfiguration.obtenerDatosUsuarioCuentaRed || {},
                        OficinaVentaUsuario = initialConfiguration.obtenerOficinaVentaUsuario || {},
                        AuditRequest = AuditRequest || {};

                    that.visitingOrderSession.Data = {};
                    that.visitingOrderSession.Data.idTransactionFront = idTransactionFront;
                    that.visitingOrderSession.Data.plataformaAT = plataformaAT;
                    var Configuration = AdditionalFixedData.servicios.configuracionesfija_obtenerConfiguraciones || {},
                            Tipificacion = AdditionalFixedData.servicios.tipificacionreglas_obtenerInformacionTipificacion || {},
                            Programacion = AdditionalFixedData.servicios.gestionprogramacionesfija_validarTareasProgramadas || {},
                            Direccion = AdditionalFixedData.servicios.datosinstalacioncliente_obtenerDatosInstalacion || {};

                    that.visitingOrderSession.Data.Configuration = (Configuration.CodeResponse == '0') ? Configuraciones : [];
                    that.visitingOrderSession.Data.Tipificacion = (Tipificacion.CodigoRespuesta == '0') ? Tipificacion.listaTipificacionRegla : [];
                    that.visitingOrderSession.Data.Programacion = Programacion;
                    that.visitingOrderSession.Data.Direccion = Direccion;
                    //}

                    //getting lists.
                    that.visitingOrderSession.Data.CoreServices = (CoreServices.CodeResponse == '0') ? CoreServices.ServiceList : [];
                    that.visitingOrderSession.Data.AdditionalServices = (AdditionalServices.CodeResponse == '0') ? AdditionalServices.AdditionalServiceList : [];
                    that.visitingOrderSession.Data.AdditionalEquipment = (AdditionalServices.CodeResponse == '0') ? AdditionalServices.AdditionalEquipmentList : [];
                    that.visitingOrderSession.Data.ListIgv = (Igv.CodeResponse == '0') ? Igv.listaIGV : [];
                    that.visitingOrderSession.Data.CustomerInformation = (CustomerInformation.CodeResponse == '0') ? CustomerInformation.CustomerList[0] : [];
                    that.visitingOrderSession.Data.PuntoAtencion = (PuntoAtencion.CodigoRespuesta == '0') ? PuntoAtencion.listaRegistros : [];
                    that.visitingOrderSession.Data.DatosUsuarioCtaRed = (DatosUsuarioCtaRed.CodigoRespuesta == '0') ? DatosUsuarioCtaRed.listaDatosUsuarioCtaRed : [];
                    that.visitingOrderSession.Data.OficinaVentaUsuario = (OficinaVentaUsuario.CodigoRespuesta == '0') ? OficinaVentaUsuario.listaOficinaVenta : [];
                    that.visitingOrderSession.Data.AuditRequest = AuditRequest;

                    that.visitingOrderSession.Data.Technology = CoreServices.Technology;
                    that.visitingOrderSession.Data.planCode = CoreServices.planCode;
                    /***INI-Nuevas configuraciones***/
                    debugger;
                    if (that.visitingOrderSession.Data.Technology == "9") {
                        //Actualizar el nuevo tipo de trbajo para FTTH CBIO
                        that.visitingOrderSession.Data.Configuration.Constantes_TipoSrv = Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT !== 'TOBE' ? that.visitingOrderSession.Data.Configuration.Constantes_Tipotrabajo : '0101';
                        that.visitingOrderSession.Data.Configuration.Constantes_Tipotrabajo = Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT !== 'TOBE' ? that.visitingOrderSession.Data.Configuration.Constantes_Tipotrabajo : '1103';
                    }
                    if (that.visitingOrderSession.Data.Technology == "5") {
                        //Actualizar el nuevo tipo de trbajo para HFC CBIO
                        that.visitingOrderSession.Data.Configuration.Constantes_Tipotrabajo = Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT !== 'TOBE' ? that.visitingOrderSession.Data.Configuration.Constantes_Tipotrabajo : '1104';
                    }
                    
                    console.log('Technology: ' + that.visitingOrderSession.Data.Technology)
                    console.log('Constantes_Tipotrabajo: ' + that.visitingOrderSession.Data.Configuration.Constantes_Tipotrabajo)
                    /***FIN-Nuevas configuraciones***/

                    $.reusableBusiness.getIgv(that.visitingOrderSession.Data.ListIgv, function (igv) {

                        that.visitingOrderSession.Data.Configuration.Constantes_Igv = igv
                        // Load Customer Information - Left Panel
                        $.app.renderCustomerInformation(that.visitingOrderSession);
                        // Load Core Service Information - Left Panel

                        debugger;
                        //if (!$.array.isEmptyOrNull(that.visitingOrderSession.Data.CoreServices))
                        $.app.renderCoreServices(that.visitingOrderSession);
                        // Load Additional Service Information - Left Panel
                        //if (!$.array.isEmptyOrNull(that.visitingOrderSession.Data.AdditionalServices))
                        $.app.renderAdditionalServices(that.visitingOrderSession);
                        // Load Additional Equipment Information - Left Panel
                        //if (!$.array.isEmptyOrNull(that.visitingOrderSession.Data.AdditionalEquipment))
                        $.app.renderAdditionalEquipment(that.visitingOrderSession);
                    });
                    // Load Address Instalation Customer - Top Panel
                    that.renderAddressInstalation();

                    $.reusableBusiness.LoadPointOfAttention(controls.ddlCenterofAttention, that.visitingOrderSession);

                    controls.ddlSubType.append($('<option>', { value: '', html: '-Seleccionar-' }));
                    controls.ddlTypeofService.append($('<option>', { value: '', html: '-Seleccionar-' }));
                    controls.ddlMotive.append($('<option>', { value: '', html: '-Seleccionar-' }));
                    controls.ddlTimeZone.append($('<option>', { value: '', html: '-Seleccionar-' }));

                    controls.txtSendMail.val(that.visitingOrderSession.Data.CustomerInformation.Email);

                    /*CARGA TIPO DE TRABAJO*/
                    that.visitingTypeofJob();

                    if (that.visitingOrderSession.Data.Configuration == []) {
                        alert('No se obtuvo configuraciones.');
                        $('#navbar-body').showMessageErrorLoadingTransaction();
                        return false;
                    }
                    if (!that.InitialValidation()) {
                        return false;
                    }

                })
                .catch(function (e) {
                    $.unblockUI();
                    alert(string.format('Ocurrio un error al cargar la transacción - {0}', e));
                    $('#navbar-body').showMessageErrorLoadingTransaction();
                })
        },
        InitialValidation: function () {
            var that = this,
                controls = that.getControls(),
                stateContract = !$.string.isEmptyOrNull(that.visitingOrderSession.Data.CustomerInformation.ContractStatus) ? that.visitingOrderSession.Data.CustomerInformation.ContractStatus : '',
                stateService = !$.string.isEmptyOrNull(that.visitingOrderSession.Data.CustomerInformation.ServiceStatus) ? that.visitingOrderSession.Data.CustomerInformation.ServiceStatus : '';
            //debugger;
            console.log('stateContracto: ' + stateContract);
            console.log('stateService:  ' + stateService);
            console.log('Plataforma:  ' + Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT);
            if (!$.array.isEmptyOrNull(that.visitingOrderSession.Data.CustomerInformation)) {

                if (Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT === 'TOBE') {
                    if (stateContract.trim().toUpperCase() != 'ACTIVO' || stateService.trim().toUpperCase() != 'ACTIVO') {
                        alert("El contrato no se encuentra activo.", 'Alerta', function () {
                            $.unblockUI();
                            parent.window.close();
                        });
                        return false;
                    }
                }
                else {
                    if (stateContract.trim().toUpperCase() != 'ACTIVO') {
                        alert("El contrato no se encuentra activo.", 'Alerta', function () {
                            $.unblockUI();
                            parent.window.close();
                        });
                        return false;
                    }
                }
            }
            return true;
        },
        visitingTypeofJob: function () {
            var that = this,
                controls = that.getControls();

            var oBodyRequest = {
                IdTransaccion: that.visitingOrderSession.Data.idTransactionFront,
                IdProceso: "2",
                IdProducto: that.visitingOrderSession.Data.Technology,
                Tecnologia: that.visitingOrderSession.Data.Technology
            }

            that.visitingOrderGetTypeofJobPromise(oBodyRequest)
                .then(function (res) {
                    debugger;
                    var TypeofJobResponse = (res.oTypeofJobResponse.MessageResponse != null) ? res.oTypeofJobResponse.MessageResponse.Body : null;
                    var TypeofJob = TypeofJobResponse.servicios.tipostrabajo_consultarTipoTrabajo || {};
                    var tipoTrabajoDefault = $.string.isEmptyOrNull(that.visitingOrderSession.Data.Configuration.Constantes_Tipotrabajo) ? '' : that.visitingOrderSession.Data.Configuration.Constantes_Tipotrabajo;

                    controls.ddlTypeofJob.empty();
                    controls.ddlTypeofJob.append($('<option>', { value: '', html: '-Seleccionar-' }));
                    $.each(TypeofJob.ListaTipoTrabajo, function (index, value) {

                        controls.ddlTypeofJob.attr('disabled', 'disabled');
                        //that.visitingOrderSession.Data.Configuration.Constantes_Tipotrabajo = '480';

                        if (value.TipoTrabajo == tipoTrabajoDefault) { // "480") {
                            controls.ddlTypeofJob.append($('<option>', { value: value.TipoTrabajo, html: value.Descripcion, selected: true }));
                        }
                        else {
                            controls.ddlTypeofJob.removeAttr("disabled");
                            controls.ddlTypeofJob.append($('<option>', { value: value.TipoTrabajo, html: value.Descripcion }));
                        }
                    });
                    that.onChangeTypeofJob();
                }
                )
        },

        visitingSubType: function () {
            var that = this,
                controls = that.getControls();
            debugger;
            var oBodyRequest = {
                IdTransaccion: that.visitingOrderSession.Data.idTransactionFront,
                IdProceso: "3",
                IdProducto: that.visitingOrderSession.Data.Technology,
                TipTrab: controls.ddlTypeofJob.val()
            }

            that.visitingOrderGetSubTypePromise(oBodyRequest)
                .then(function (res) {
                    var SubTypeResponse = (res.oSubTypeResponse.MessageResponse != null) ? res.oSubTypeResponse.MessageResponse.Body : null;
                    var TypeofJob = SubTypeResponse.servicios.consultasubtipo_obtenerTipoOrden || {};

                    that.visitingOrderSession.Data.SubTypeofJob = TypeofJob.ListaTipoOrden;

                    that.visitingOrderSession.Data.Orden = TypeofJob.ListaTipoOrden[0].Valor;
                    alert(that.visitingOrderSession.Data.Orden);
                }
                    )
                    .catch(function (e) {
                        $.unblockUI();
                        alert(string.format('Ocurrio un error al obtener la Configuración - {0}', e));
                    })
                .then(function () {
                    $.unblockUI();
                });
        },

        visitingProcess4: function () {
            var that = this,
                controls = that.getControls();
            var oBodyRequest = {
                IdTransaccion: that.visitingOrderSession.Data.idTransactionFront,
                IdProceso: "4",
                IdProducto: that.visitingOrderSession.Data.Technology,
                ContratoId: Session.SessionParams.DATACUSTOMER.ContractID,
                TipTra: controls.ddlTypeofJob.val(),
                IdLista: that.visitingOrderSession.Data.Configuration.Constantes_IdLista,
                cantDeco: '0'
            }
            debugger;
            that.visitingOrderProcess4Promise(oBodyRequest)
                .then(function (res) {
                    var TypeofOrderResponse = (res.oTypeofOrderResponse.MessageResponse != null) ? res.oTypeofOrderResponse.MessageResponse.Body : null;
                    var TypeofOrder = TypeofOrderResponse.servicios.consultasubtipo_consultarSubtipo || {};
                    var TypeofService = TypeofOrderResponse.servicios.datostiposerviciofija_listarTiposServicioFija || {};

                    controls.ddlSubType.empty();
                    controls.ddlSubType.append($('<option>', { value: '', html: '-Seleccionar-' }));
                    $.each(TypeofOrder.ListaSubTipo, function (index, value) {
                        controls.ddlSubType.append('<option   selected="selected"    codTipoOrden = "' + value.CodTipoOrden + '" CodTipoSubOrden = "' + value.IdSubTipoOrden + '"   idTipoServicio = "' + value.TipoServicio + '" disponibilidad = "' + value.TiempoMin + '" value  = "' + value.CodSubTipoOrden + '" >' + value.Descripcion + '</option>');
                    });

                    controls.ddlTypeofService.empty();
                    controls.ddlTypeofService.append($('<option>', { value: '', html: '-Seleccionar-' }));
                    $.each(TypeofService.Listas, function (index, value) {
                        controls.ddlTypeofService.append($('<option>', { value: value.Valor, html: value.Descripcion }));
                    });
                }
            )
            .catch(function (e) {
                that.visitingProcess4();
            })
            .then(function () {
                $.unblockUI();
            });

        },

        visitingProcess5: function () {
            var that = this,
                controls = that.getControls();
            var oBodyRequest = {
                IdTransaccion: that.visitingOrderSession.Data.idTransactionFront,
                IdProceso: "5",
                IdProducto: that.visitingOrderSession.Data.Technology,
                TipTra: controls.ddlTypeofJob.val(),
                TipMotivo: controls.ddlTypeofService.val(),
                Origen: "P",//that.VisitingOrder.Configuration.Constants.Constantes_Origen,
                IdPlano: that.visitingOrderSession.Data.Direccion.CodPlano,
                Ubigeo: "0",
                TipSrv: that.visitingOrderSession.Data.Configuration.Constantes_TipoSrv//"0061"
            }
            debugger;
            try {
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        oBodyRequest: oBodyRequest,
                        SessionID: Session.UrlParams.IdSession,
                        TransactionID: Session.UrlParams.IdTransaction,
                    }),
                    url: '/VisitingOrder/Home/Process5',
                    success: function (response) {
                        var MotiveResponse = (response.oMotiveResponse.MessageResponse != null) ? response.oMotiveResponse.MessageResponse.Body : null;
                        var TypeofService = MotiveResponse.servicios.consultamotivo_ || {};
                        var ValidaEta = MotiveResponse.servicios.franjahorario_validaEta || {};

                        that.visitingOrderSession.Data.CodigoZona = ValidaEta.ValidaEta.CodigoZona
                        that.visitingOrderSession.Data.FlagIndica = ValidaEta.ValidaEta.FlagIndica;

                        controls.ddlMotive.empty();
                        controls.ddlMotive.append($('<option>', { value: '', html: '-Seleccionar-' }));
                        $.each(TypeofService.ListaMotivos, function (index, value) {
                            controls.ddlMotive.append($('<option>', {
                                value: value.CodMotivo, html: value.Descripcion
                            }));
                        });
                    },
                    error: function (err) {
                        alert('Error al consultar los motivos Sot. : ' + err);
                    },
                });
            }
            catch (ex) {
                that.onChangeTypeofService();
            }

        },

        visitingOrderGetTypeofJobPromise: function (oBodyRequest) {
            return new Promise(function (resolve, reject) {

                $.ajax({
                    url: '/VisitingOrder/Home/GetTypeofJob',
                    contentType: "application/json; charset=utf-8",
                    type: 'POST',
                    data: JSON.stringify({
                        oBodyRequest: oBodyRequest,
                        SessionID: Session.UrlParams.IdSession,
                        TransactionID: Session.UrlParams.IdTransaction,
                    }),
                    success: function (res) { resolve(res); },
                    error: function (err) { reject(err) }
                });

            });

        },

        visitingOrderGetSubTypePromise: function (oBodyRequest) {
            return new Promise(function (resolve, reject) {

                $.ajax({
                    url: '/VisitingOrder/Home/GetSubType',
                    contentType: "application/json; charset=utf-8",
                    type: 'POST',
                    data: JSON.stringify({
                        oBodyRequest: oBodyRequest,
                        SessionID: Session.UrlParams.IdSession,
                        TransactionID: Session.UrlParams.IdTransaction,
                    }),
                    success: function (res) { resolve(res); },
                    error: function (err) { reject(err) }
                });

            });

        },

        visitingOrderProcess4Promise: function (oBodyRequest) {
            return new Promise(function (resolve, reject) {

                $.ajax({
                    url: '/VisitingOrder/Home/Process4',
                    contentType: "application/json; charset=utf-8",
                    type: 'POST',
                    data: JSON.stringify({
                        oBodyRequest: oBodyRequest,
                        SessionID: Session.UrlParams.IdSession,
                        TransactionID: Session.UrlParams.IdTransaction,
                    }),
                    success: function (res) { resolve(res); },
                    error: function (err) { reject(err) }
                });
            });
        },

        renderAddressInstalation: function () {
            var that = this;
            var controls = this.getControls();

            controls.txtAddress.text(that.visitingOrderSession.Data.Direccion.Direccion);
            controls.txtAddressNote.text(that.visitingOrderSession.Data.Direccion.NotaDireccion);
            controls.txtCountry.text(that.visitingOrderSession.Data.Direccion.Pais);
            controls.txtDepartment.text(that.visitingOrderSession.Data.Direccion.Departamento);
            controls.txtProvince.text(that.visitingOrderSession.Data.Direccion.Provincia);
            controls.txtDistrict.text(that.visitingOrderSession.Data.Direccion.Distrito);
            controls.txtPlane.text(that.visitingOrderSession.Data.Direccion.CodPlano);
            controls.txtUbigeo.text(that.visitingOrderSession.Data.Direccion.Ubigeo);
        },

        viewsRenderPromise: function () {
            var that = this,
                controls = that.getControls();

            return new Promise(function (resolve, reject) {
                var transactionViews = that.visitingOrderSession.Configuration.Views;
                $.app.ViewsRender(transactionViews, transactionViews, '', 'transactionContent', resolve);
            });
        },


        txtCalendar_Change: function () {
            var that = this;
            var controls = this.getControls();

            if (!$.app.validateControl('divIndex', 'txtCalendar')) {
                return;
            }
            controls.ddlTimeZone.empty();


            that.getLoadingPage();

            var objLoadParameters = {};
            objLoadParameters.customer = Session.SessionParams.DATACUSTOMER.CustomerID;
            objLoadParameters.contrato = Session.SessionParams.DATACUSTOMER.ContractID;
            objLoadParameters.tipTra = controls.ddlTypeofJob.val();
            objLoadParameters.subtipoOrden = controls.ddlSubType.val();
            objLoadParameters.fechaAgenda = controls.txtCalendar.val();
            objLoadParameters.flagValidaEta = that.visitingOrderSession.Data.FlagIndica;
            objLoadParameters.codZona = that.visitingOrderSession.Data.CodigoZona;
            objLoadParameters.idPlano = that.visitingOrderSession.Data.Direccion.CodPlano;
            objLoadParameters.ubigeo = that.visitingOrderSession.Data.Direccion.Ubigeo;
            objLoadParameters.reglaValidacion = 'DIA_SIGUIENTE';
            objLoadParameters.origen = 'P';
            objLoadParameters.disponibilidad = $('#ddlSubType option:selected').attr('disponibilidad');
            objLoadParameters.tipSrv = $('#ddlSubType option:selected').attr('idtiposervicio');
            objLoadParameters.tipoOrden = $('#ddlSubType option:selected').attr('codtipoorden');

            $.reusableBusiness.LoadTimeZone(controls.ddlTimeZone, objLoadParameters)

        },

        getLoadingPage: function () {
            var strUrlLogo = window.location.protocol + '//' + window.location.host + '/Content/images/SUFija/loading_Claro.gif';
            $.blockUI({
                message: '<div align="center"><img src="' + strUrlLogo + '" width="25" height="25" /> Cargando ... </div>',
                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff',
                }
            });
        },

        getFechaActual: function () {
            var that = this;
            var d = new Date();
            var FechaActual = that.AboveZero(d.getDate()) + "/" + (that.AboveZero(d.getMonth() + 1)) + "/" + d.getFullYear();
            return FechaActual;
        },

        AboveZero: function (i) {
            if (i < 10) {
                i = '0' + i;
            }
            return i;
        },

        getHoraActual: function () {
            var that = this;
            var d = new Date();
            var HoraActual = that.AboveZero(d.getHours()) + ":" + (that.AboveZero(d.getMinutes() + 1)) + ":" + d.getSeconds();
            return HoraActual;
        },

        getXMLTramaConstancia: function () {
            var that = this,
                controls = that.getControls();

            var feed = "";
            //feed += "<FORMATO_TRANSACCION>{0}</FORMATO_TRANSACCION>";
            //feed += "<TRANSACCION_DESCRIPCION>{1}</TRANSACCION_DESCRIPCION>";
            //feed += "<CENTRO_ATENCION_AREA>{2}</CENTRO_ATENCION_AREA>";
            //feed += "<TITULAR_CLIENTE>{3}</TITULAR_CLIENTE>";
            //feed += "<REPRES_LEGAL>{4}</REPRES_LEGAL>";
            //feed += "<TIPO_DOC_IDENTIDAD>{5}</TIPO_DOC_IDENTIDAD>";
            //feed += "<NRO_DOC_IDENTIDAD>{6}</NRO_DOC_IDENTIDAD>";
            //feed += "<FECHA_TRANSACCION_PROGRAM>{7}</FECHA_TRANSACCION_PROGRAM>";
            //feed += "<ACCION_RETENCION>{8}</ACCION_RETENCION>";
            //feed += "<NRO_SERVICIO>{9}</NRO_SERVICIO>";
            //feed += "<FECHA_SUSP>{10}</FECHA_SUSP>";
            //feed += "<FECHA_ACTIVACION>{11}</FECHA_ACTIVACION>";
            //feed += "<COSTO_REACTIVACION>{12}</COSTO_REACTIVACION>";
            //feed += "<CASO_INTER>{13}</CASO_INTER>";
            //feed += "<FECHA_AUTORIZACION>{14}</FECHA_AUTORIZACION>";
            //feed += "<CUENTA_POSTPAGO>{15}</CUENTA_POSTPAGO>";
            //feed += "<CONTRATO>{16}</CONTRATO>";



            //feed = string.format(feed,
            //that.visitingOrderSession.Data.Configuration.Constancia_FormatoTransaccion,
            //that.visitingOrderSession.Data.Configuration.Constancia_TransaccionDescripcion,
            //$("#ddlCenterofAttention option:selected").html(),
            //that.visitingOrderSession.Data.CustomerInformation.CustomerName,
            //that.visitingOrderSession.Data.CustomerInformation.LegalRepresentative,
            //that.visitingOrderSession.Data.CustomerInformation.LegalRepresentativeDocument,
            //that.visitingOrderSession.Data.CustomerInformation.DocumentNumber,
            //that.getFechaActual(),
            //"",
            //that.visitingOrderSession.Data.Configuration.Tipificacion_KeyCustomerInteract + that.visitingOrderSession.Data.CustomerInformation.CustomerID,
            //"",
            //"",
            //"SIN IGV",
            //"@idInteraccion",
            //that.getFechaActual(),
            //Session.SessionParams.DATACUSTOMER.Account,
            //that.visitingOrderSession.Data.CustomerInformation.ContractNumber
            //)

            return "<PLANTILLA>" + feed + "</PLANTILLA>";
        },

        getEnvioCorreo: function () {
            var that = this,
                controls = that.getControls();

            var feed = "";
            feed += "<html><head><style type='text/css'><!--.Estilo1 {font-family: Arial, Helvetica, sans-serif;font-size:12px;}.Estilo2 {font-family: Arial, Helvetica, sans-serif;font-weight:bold;font-size:12px;}--></style>";
            feed += "<body><table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td>";
            feed += "<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td width='100%' class='Estilo1'>Estimado Cliente:</td></tr>";
            feed += "<tr><td height='10'></td><tr><td class='Estilo1'>Por la presente queremos informarle que su solicitud de Generación de Orden de Visita para Mantenimiento fue atendida.</td></tr>";
            feed += "<tr><td height='10'></td><tr><td align='center'><Table width='90%' border='0' cellpadding='0' cellspacing='0'>";
            feed += "<TR><TD width='180' class='Estilo2' height='22'>CAC/DAC:</TD><TD class='Estilo1'>" + $("#ddlCenterofAttention option:selected").html() + "</TD>";
            feed += "<TD width='20'>&nbsp;</TD><TD width='180' class='Estilo2'>Fecha:</TD><TD class='Estilo1'>" + that.getFechaActual() + "</TD>";
            feed += "</TR><TR><TD width='180' class='Estilo2' height='22'>Titular:</TD><TD class='Estilo1'>" + that.visitingOrderSession.Data.CustomerInformation.CustomerName + "</TD>";
            feed += "<TD width='20'>&nbsp;</TD><TD width='180' class='Estilo2'>Caso / Interacción:</TD><TD class='Estilo1'></TD>";
            feed += "</TR><TR><TD width='180' class='Estilo2' height='22'>Representante Legal:</TD><TD class='Estilo1'>" + that.visitingOrderSession.Data.CustomerInformation.LegalRepresentative + "</TD>";
            feed += "<TD width='20'>&nbsp;</TD><TD width='180' class='Estilo2'>Customer ID:</TD><TD class='Estilo1'>" + that.visitingOrderSession.Data.Configuration.Tipificacion_KeyCustomerInteract + that.visitingOrderSession.Data.CustomerInformation.CustomerID + "</TD>";
            feed += "</TR><TR><TD width='180' class='Estilo2' height='22'>Tipo Doc. Identidad:</TD><TD class='Estilo1'>" + that.visitingOrderSession.Data.CustomerInformation.LegalRepresentativeDocument + "</TD>";
            feed += "<TD width='20'>&nbsp;</TD><TD width='180'></TD><TD></TD></TR><TR><TD width='180' class='Estilo2' height='22'>Nro. Documento:</TD>";
            feed += "<TD class='Estilo1'>" + that.visitingOrderSession.Data.CustomerInformation.DocumentNumber + "</TD>";
            feed += "<TD width='20'>&nbsp;</TD><TD width='180'></TD><TD></TD></TR></table></td></tr></table>";
            feed += "</td></tr><tr><td height='10'></td><tr><td height='10'></td><tr><td height='10'></td><tr><td><TABLE id='tblCambiosMenores' width='100%' style='HEIGHT: 300px' cellSpacing='0' cellPadding='0' width='712' border='0' runat='server'>";
            feed += "<TR><td align='center'><Table width='90%' border='0' cellpadding='0' cellspacing='0'><TR width='650px'>";
            feed += "<TD class='Estilo2' style='HEIGHT: 20px' align='left' colSpan='6' height='20'>DETALLES&nbsp;DE LA&nbsp;TRANSACCIÓN:</TD>";
            feed += "</TR><TR><TD width='600' colSpan='6' height='1'></TD></TR><TR><TD style='HEIGHT: 15px' class='Estilo2' width='180' height='15'>SOT:</TD>";
            feed += "<TD style='HEIGHT: 15px' class='Estilo1' align='left' width='129'><asp:label id='lblSot' runat='server' Width='152px'></asp:label></TD>";
            feed += "<TD></TD><TD></TD><TD></TD></TR><tr height='1'><td width='600' colSpan='6' height='1'></td></tr><tr align='left'>";
            feed += "<TD style='HEIGHT: 15px' width='180' class='Estilo2' height='15'>Dirección de Destino:</TD>";
            feed += "<TD style='HEIGHT: 15px' class='Estilo1' align='left' width='129'><asp:label id='lblDirección' class='Estilo1' runat='server' Width='350px'>" + that.visitingOrderSession.Data.Direccion.Direccion + " " + that.visitingOrderSession.Data.Direccion.Departamento + " " + that.visitingOrderSession.Data.Direccion.Provincia + " " + that.visitingOrderSession.Data.Direccion.Distrito + "</asp:label></TD>";
            feed += "<td class='Estilo1'>&nbsp;</td><td class='Estilo2'>País:</td><td class='Estilo1'>" + that.visitingOrderSession.Data.Direccion.Pais + "</td>";
            feed += "</tr><tr height='1'><td width='600' colSpan='6' height='1'></td></tr><tr align='left'><TD style='HEIGHT: 15px' width='180' class='Estilo2' height='15'>Notas de Dirección:</TD>";
            feed += "<TD style='HEIGHT: 15px' class='Estilo1' align='left'>" + that.visitingOrderSession.Data.Direccion.NotaDireccion + "</TD>";
            feed += "<td class='Estilo1'>&nbsp;</td><td class='Estilo2'>Provincia:</td><td class='Estilo1'>" + that.visitingOrderSession.Data.Direccion.Provincia + "</td>";
            feed += "</tr><tr height='1'><td width='600' colSpan='6' height='1'></td></tr><tr align='left'>";
            feed += "<TD style='HEIGHT: 15px' width='180' class='Estilo2' height='15'>Departamento:</TD><TD style='HEIGHT: 15px' class='Estilo1' align='left'>" + that.visitingOrderSession.Data.Direccion.Departamento + "</TD>";
            feed += "<td class='Estilo1'>&nbsp;</td><td class='Estilo2'>Código Plano:</td><td class='Estilo1'>" + that.visitingOrderSession.Data.Direccion.CodPlano + "</td>";
            feed += "</tr><tr height='1'><td width='600' colSpan='6' height='1'></td></tr><tr align='left'><td  style='HEIGHT: 15px' width='180' class='Estilo2' height='15'>Distrito:</td>";
            feed += "<td style='HEIGHT: 15px' class='Estilo1' align='left'>" + that.visitingOrderSession.Data.Direccion.Distrito + "</td>";
            feed += "<td class='Estilo1'>&nbsp;</td><TD class='Estilo2' HEIGHT: '15px' width='180' height='15'>Código Ubigeo:</TD>";
            feed += "<TD style='HEIGHT: 15px' class='Estilo1' align='left'><asp:label id='lblCodUbigeo' runat='server' Width='160px'>" + that.visitingOrderSession.Data.Direccion.Ubigeo + "</asp:label></TD>";
            feed += "</tr></Table></td></tr></TABLE></td></tr><tr><td height='10'></td>";
            feed += "<tr><td height='10'></td><tr><td height='10'></td>";
            feed += "<tr><td class='Estilo1'>Cordialmente</td></tr><tr><td class='Estilo1'>Atención al Cliente</td></tr>";
            feed += "<tr><td height='10'></td><tr><td height='10'></td>";
            feed += "<tr><td class='Estilo1'>Consultas, llame gratis desde su celular Claro al 123 o al 0801-123-23 (costo de llamada local)</td></tr>";
            feed += "</table></body></html>";

            return feed;
        },

        getXMLTramaVenta: function () {
            var that = this,
                controls = that.getControls();

            var feed = "";
            feed += "<APLICACION>{0}</APLICACION>";
            feed += "<COD_ID>{1}</COD_ID>";
            feed += "<CUSTOMER_ID>{2}</CUSTOMER_ID>";
            feed += "<OBSERVACION>{3}</OBSERVACION>";
            feed += "<TIPO_PRODUCTO>{4}</TIPO_PRODUCTO>";
            feed += "<TIPO_TRANS>{5}</TIPO_TRANS>";
            feed += "<TIPOSERVICIO>{6}</TIPOSERVICIO>";
            feed += "<TIPTRA>{7}</TIPTRA>";
            feed += "<CODMOTOT>{8}</CODMOTOT>";
            feed += "<FECPROG>{9}</FECPROG>";
            feed += "<FRANJA>{10}</FRANJA>";
            feed += "<CODPLANO>{11}</CODPLANO>";
            feed += "<CANTIDAD>{12}</CANTIDAD>";
            feed += "<CARGO>{13}</CARGO>";
            feed += "<TIPSERV>{14}</TIPSERV>";
            /****/
            feed += "<COD_INTERCASO>{15}</COD_INTERCASO>";
            feed += "<FRANJA_HOR>{16}</FRANJA_HOR>";
            feed += "<SUBTIPO_ORDEN>{17}</SUBTIPO_ORDEN>";
            feed += "<ID_BUCKET>{18}</ID_BUCKET>";
            feed += "<ID_CONSULTA_ETA>{19}</ID_CONSULTA_ETA>";
            feed += "<CODPLAN>{20}</CODPLAN>";
            feed += "<USUREG>{21}</USUREG>";
            feed += "<NODOPOSTVENTA>{22}</NODOPOSTVENTA>";
            feed = string.format(feed,
            that.visitingOrderSession.Data.Configuration.Constantes_UsrAplicacion,
            Session.SessionParams.DATACUSTOMER.ContractID,
            Session.SessionParams.DATACUSTOMER.CustomerID,
            controls.txtNotes.val().replace(/\n/g, "\\n"),
            that.visitingOrderSession.Data.Configuration.Constantes_DesProducto,
       /*5*/that.visitingOrderSession.Data.Configuration.Constantes_DesTransaccion,
            that.visitingOrderSession.Data.Configuration.Constantes_TipoSrv,
            controls.ddlTypeofJob.val(),
            controls.ddlMotive.val(),
            $('#txtCalendar').val(),
      /*10*/ $.string.isEmptyOrNull($("#ddlTimeZone option:selected").attr('Franja')) ? '' : $("#ddlTimeZone option:selected").attr('franja'),
            that.visitingOrderSession.Data.Direccion.CodPlano,
            1,
            1,
            $("#ddlTypeofService option:selected").html(),
      /*15*/"@idInteraccion",
            $.string.isEmptyOrNull($("#ddlTimeZone option:selected").attr('idHorario')) ? '' : $("#ddlTimeZone option:selected").attr('idHorario'),
            $.string.isEmptyOrNull($("#ddlSubType option:selected").attr('CodTipoSubOrden')) ? '' : $("#ddlSubType option:selected").attr('CodTipoSubOrden'),
            $.string.isEmptyOrNull($("#ddlTimeZone option:selected").attr('idBucket')) ? '' : $("#ddlTimeZone option:selected").attr('idBucket'),
            $.string.isEmptyOrNull($("#ddlTimeZone option:selected").attr('idConsulta')) ? '' : $("#ddlTimeZone option:selected").attr('idConsulta'),
            that.visitingOrderSession.Data.planCode,
            Session.SessionParams.USERACCESS.login,
            'Nodo ' + $("#spnNode").text()
            )
            return "<BODY>" + feed + "</BODY>";
        },

        saveTransaction: function () {
            var that = this,
                controls = that.getControls(),
                objParameters = {},
                Services = [
                    {
                        "servicio": "Cliente",
                        "parametros": [
                            {
                                "parametro": "phone",
                                "valor": that.visitingOrderSession.Data.Configuration.Tipificacion_KeyCustomerInteract + that.visitingOrderSession.Data.CustomerInformation.CustomerID
                            },
                            {
                                "parametro": "usuario",
                                "valor": Session.SessionParams.USERACCESS.login
                            },
                            {
                                "parametro": "nombres",
                                "valor": that.visitingOrderSession.Data.CustomerInformation.CustomerName
                            },
                            {
                                "parametro": "apellidos",
                                "valor": that.visitingOrderSession.Data.CustomerInformation.CustomerName
                            },
                            {
                                "parametro": "razonsocial",
                                "valor": that.visitingOrderSession.Data.CustomerInformation.LegalRepresentative
                            },
                            {
                                "parametro": "tipoDoc",
                                "valor": that.visitingOrderSession.Data.CustomerInformation.LegalRepresentativeDocument
                            },
                            {
                                "parametro": "numDoc",
                                "valor": that.visitingOrderSession.Data.CustomerInformation.DocumentNumber
                            },
                            {
                                "parametro": "domicilio",
                                "valor": Session.SessionParams.DATACUSTOMER.Address
                            },
                            {
                                "parametro": "distrito",
                                "valor": that.visitingOrderSession.Data.CustomerInformation.BillingDistrict
                            },
                            {
                                "parametro": "departamento",
                                "valor": that.visitingOrderSession.Data.CustomerInformation.BillingDepartment
                            },
                            {
                                "parametro": "provincia",
                                "valor": that.visitingOrderSession.Data.CustomerInformation.BillingProvince
                            },
                            {
                                "parametro": "modalidad",
                                "valor": that.visitingOrderSession.Data.Configuration.Tipificacion_Modalidad
                            }
                        ]
                    },
                    {
                        "servicio": "Tipificacion",
                        "parametros": [
                            {
                                "parametro": "coid",
                                "valor": that.visitingOrderSession.Data.CustomerInformation.ContractNumber
                            },
                            {
                                "parametro": "customer_id",
                                "valor": that.visitingOrderSession.Data.CustomerInformation.CustomerID
                            },
                            {
                                "parametro": "Phone",
                                "valor": that.visitingOrderSession.Data.Configuration.Tipificacion_KeyCustomerInteract + that.visitingOrderSession.Data.CustomerInformation.CustomerID
                            },
                            {
                                "parametro": "flagReg",
                                "valor": that.visitingOrderSession.Data.Configuration.Tipificacion_FlagReg
                            },
                            {
                                "parametro": "contingenciaClarify",
                                "valor": that.visitingOrderSession.Data.Configuration.Tipificacion_ContingenciaClarify
                            },
                            {
                                "parametro": "tipo",
                                "valor": that.visitingOrderSession.Data.Tipificacion[0].Tipo
                            },
                            {
                                "parametro": "clase",
                                "valor": that.visitingOrderSession.Data.Tipificacion[0].Clase
                            },
                            {
                                "parametro": "SubClase",
                                "valor": that.visitingOrderSession.Data.Tipificacion[0].SubClase
                            },
                            {
                                "parametro": "metodoContacto",
                                "valor": that.visitingOrderSession.Data.Configuration.Tipificacion_MetodoContacto
                            },
                            {
                                "parametro": "tipoTipificacion",
                                "valor": that.visitingOrderSession.Data.Configuration.Tipificacion_TipoTipificacion
                            },
                            {
                                "parametro": "agente",
                                "valor": Session.SessionParams.USERACCESS.login
                            },
                            {
                                "parametro": "usrProceso",
                                "valor": that.visitingOrderSession.Data.Configuration.Constantes_UsrAplicacion
                            },
                            {
                                "parametro": "hechoEnUno",
                                "valor": that.visitingOrderSession.Data.Configuration.Tipificacion_HechoDeUno
                            },
                            {
                                "parametro": "Notas",
                                "valor": $.string.isEmptyOrNull(controls.txtNotes.val()) ? '-' : controls.txtNotes.val().replace(/\n/g, "\\n")
                            },
                            {
                                "parametro": "flagCaso",
                                "valor": that.visitingOrderSession.Data.Configuration.Tipificacion_FlagCaso
                            },
                            {
                                "parametro": "resultado",
                                "valor": that.visitingOrderSession.Data.Configuration.Tipificacion_Resultado
                            },
                            {
                                "parametro": "inconvenCode",
                                "valor": ""
                            },
                            {
                                "parametro": "tipoInter",
                                "valor": that.visitingOrderSession.Data.Configuration.Tipificacion_TipoInter
                            }
                        ]
                    },
                    {
                        "servicio": "Plantilla",
                        "parametros": [
                            {
                                "parametro": "xinter1",
                                "valor": ""
                            },
                            {
                                "parametro": "MARITAL_STATUS",
                                "valor": that.getFechaActual()
                            },
                            {
                                "parametro": "xinter2",
                                "valor": that.visitingOrderSession.Data.Direccion.Departamento
                            },
                            {
                                "parametro": "xinter3",
                                "valor": ""
                            },
                            {
                                "parametro": "inter4",
                                "valor": that.visitingOrderSession.Data.Direccion.Provincia
                            },
                            {
                                "parametro": "inter5",
                                "valor": ""
                            },
                            {
                                "parametro": "inter6",
                                "valor": that.visitingOrderSession.Data.Direccion.Distrito
                            },
                            {
                                "parametro": "inter7",
                                "valor": ""
                            },
                            {
                                "parametro": "inter8",
                                "valor": ""
                            },
                            {
                                "parametro": "inter15",
                                "valor": $("#ddlCenterofAttention option:selected").html()
                            },
                            {
                                "parametro": "inter16",
                                "valor": ""
                            },
                            {
                                "parametro": "inter17",
                                "valor": controls.ddlTypeofJob.val()
                            },
                            {
                                "parametro": "inter18",
                                "valor": controls.txtTelephone.val()
                            },
                            {
                                "parametro": "inter19",
                                "valor": controls.ddlMotive.val()
                            },
                            {
                                "parametro": "inter20",
                                "valor": that.getFechaActual()
                            },
                            {
                                "parametro": "inter21",
                                "valor": controls.ddlTypeofService.val()
                            },
                            {
                                "parametro": "inter22",
                                "valor": controls.ddlAnnexes.val()
                            },
                            {
                                "parametro": "inter29",
                                "valor": ""//that.visitingOrderSession.Data.Configuration.NroSOT
                            },
                            {
                                "parametro": "inter30",
                                "valor": $.string.isEmptyOrNull(controls.txtNotes.val()) ? '-' : controls.txtNotes.val().replace(/\n/g, "\\n")
                            },
                            //{
                            //    "parametro": "P_BIRTHDAY",
                            //    "valor": that.getFechaActual()
                            //},
                            //{
                            //    "parametro": "P_NAME_LEGAL_REP",
                            //    "valor": that.TransactionSession.Data.CustomerInformation.LegalRepresentative
                            //},
                            //{
                            //    "parametro": "P_PLUS_INTER2INTERACT",
                            //    "valor": ""
                            //},
                            {
                                "parametro": "P_ADDRESS",
                                "valor": that.visitingOrderSession.Data.Direccion.Direccion
                            },
                            //{
                            //    "parametro": "P_CLARO_LDN1",
                            //    "valor": that.TransactionSession.Data.CustomerInformation.LegalRepresentativeDocument
                            //},
                            //{
                            //    "parametro": "P_CLARO_LDN2",
                            //    "valor": that.TransactionSession.Data.CustomerInformation.DocumentNumber
                            //},
                            {
                                "parametro": "P_CLAROLOCAL3",
                                "valor": ""
                            },
                            {
                                "parametro": "P_CLAROLOCAL4",
                                "valor": ""
                            },
                            {
                                "parametro": "P_CLAROLOCAL5",
                                "valor": ""
                            },
                            {
                                "parametro": "P_CLAROLOCAL6",
                                "valor": ""
                            },
                            {
                                "parametro": "P_EMAIL",
                                "valor": controls.txtSendMail.val()
                            },
                            {
                                "parametro": "P_FIRST_NAME",
                                "valor": that.visitingOrderSession.Data.CustomerInformation.CustomerName
                            },
                            {
                                "parametro": "P_LAST_NAME",
                                "valor": that.visitingOrderSession.Data.CustomerInformation.CustomerName
                            },
                            {
                                "parametro": "P_FIXED_NUMBER",
                                "valor": ""
                            },
                            {
                                "parametro": "P_LASTNAME_REP",
                                "valor": ""
                            },
                            //{
                            //    "parametro": "P_REASON",
                            //    "valor": ""
                            //},
                            {
                                "parametro": "P_MODEL",
                                "valor": ""
                            },
                            {
                                "parametro": "P_LOT_CODE",
                                "valor": ""
                            },
                            {
                                "parametro": "P_FLAG_REGISTERED",
                                "valor": ""
                            },
                            {
                                "parametro": "P_REGISTRATION_REASON",
                                "valor": controls.txtSendMail.val()
                            },
                            {
                                "parametro": "P_CLARO_NUMBER",
                                "valor": that.visitingOrderSession.Data.Configuration.Tipificacion_KeyCustomerInteract + that.visitingOrderSession.Data.CustomerInformation.CustomerID
                            },
                            {
                                "parametro": "P_MONTH",
                                "valor": ""
                            },
                            {
                                "parametro": "P_BASKET",
                                "valor": ""
                            },
                            {
                                "parametro": "P_CITY",
                                "valor": that.visitingOrderSession.Data.Direccion.Ubigeo
                            },
                            {
                                "parametro": "P_DEPARTMENT",
                                "valor": ""
                            },
                            {
                                "parametro": "P_DISTRICT",
                                "valor": that.visitingOrderSession.Data.Direccion.NotaDireccion
                            },
                            {
                                "parametro": "P_FLAG_CHARGE",
                                "valor": ""
                            },
                            {
                                "parametro": "P_REFERENCE_ADDRESS",
                                "valor": ""
                            },
                            {
                                "parametro": "P_TYPE_DOCUMENT",
                                "valor": that.visitingOrderSession.Data.CustomerInformation.CustomerType
                            },
                            {
                                "parametro": "P_DOCUMENT_NUMBER",
                                "valor": that.visitingOrderSession.Data.CustomerInformation.DocumentNumber
                            },
                            {
                                "parametro": "P_NOMBRE_TRANSACCION",
                                "valor": that.visitingOrderSession.Data.Configuration.Tipificacion_Tipo
                            },
                            {
                                "parametro": "P_ICCID",
                                "valor": ""
                            }
                        ]
                    },
                    {
                        "servicio": "Tramas", /*(Generacion de SOT)*/
                        "parametros": [
                            {
                                "parametro": "Trama_Ventas",
                                "valor": that.getXMLTramaVenta()
                            },
                            {
                                "parametro": "Trama_Servicios",
                                "valor": ""
                            }
                        ]
                    },
                    {
                        "servicio": "Constancia",
                        "parametros": [
                            {
                                "parametro": "DRIVE_CONSTANCIA",
                                "valor": that.getXMLTramaConstancia()
                            }
                        ]
                    },
		            {
		                "servicio": "Correo",
		                "parametros": [
				            {
				                "parametro": "remitente",
				                "valor": that.visitingOrderSession.Data.Configuration.Correo_Remitente
				            },
				            {
				                "parametro": "destinatario",
				                "valor": controls.txtSendMail.val()
				            },
				            {
				                "parametro": "asunto",
				                "valor": that.visitingOrderSession.Data.Configuration.Correo_Asunto
				            },
				            {
				                "parametro": "htmlFlag",
				                "valor": that.visitingOrderSession.Data.Configuration.Correo_HtmlFlag
				            },
				            {
				                "parametro": "driver/fileName",
				                "valor": that.visitingOrderSession.Data.Configuration.Correo_Driver
				            },
				            {
				                "parametro": "formatoConstancia",
				                "valor": that.visitingOrderSession.Data.Configuration.Correo_FormatoConstancia
				            },
                            {
                                "parametro": "p_fecha",
                                "valor": "dd_MM_yyyy"
                            },
				            {
				                "parametro": "directory",
				                "valor": that.visitingOrderSession.Data.Configuration.Correo_Directory
				            },
				            {
				                "parametro": "fileName",
				                "valor": "@idInteraccion_@p_fecha_" + that.visitingOrderSession.Data.Configuration.Correo_FileName + "@extension"
				            },
				            {
				                "parametro": "mensaje",
				                "valor": that.getEnvioCorreo()
				            }
		                ]
		            },
                    {
                        "servicio": "Auditoria",
                        "parametros": [
                            {
                                "parametro": "ipcliente",
                                "valor": that.visitingOrderSession.Data.AuditRequest.idApplication
                            },
                            {
                                "parametro": "nombrecliente",
                                "valor": that.visitingOrderSession.Data.CustomerInformation.CustomerName
                            },
                            {
                                "parametro": "ipservidor",
                                "valor": that.visitingOrderSession.Data.AuditRequest.IPAddress
                            },
                            {
                                "parametro": "nombreservidor",
                                "valor": that.visitingOrderSession.Data.AuditRequest.ApplicationName
                            },
                            {
                                "parametro": "cuentausuario",
                                "valor": Session.SessionParams.USERACCESS.login
                            },
                            {
                                "parametro": "monto",
                                "valor": that.visitingOrderSession.Data.Configuration.Constantes_Monto
                            },
                            {
                                "parametro": "texto",
                                "valor": string.format("N° Contrato: {0}, Fecha y Hora: {1} {2}", that.visitingOrderSession.Data.CustomerInformation.ContractNumber, that.getFechaActual(), that.getHoraActual())
                            },
                            {
                                "parametro": "TRANSACCION_DESCRIPCION",
                                "valor": that.visitingOrderSession.Data.Tipificacion[0].SubClase
                            },
                            {
                                "parametro": "idTransaccion",
                                "valor": that.visitingOrderSession.Data.AuditRequest.Transaction
                            }
                        ]
                    }
                ];

            objParameters = {};
            objParameters.idFlujo = '',
            objParameters.servicios = Services,
            objParameters.SessionID = Session.UrlParams.IdSession
            objParameters.TransactionID = that.visitingOrderSession.Data.idTransactionFront;
            debugger;
            $.ajax({
                url: '/VisitingOrder/Home/postGeneraTransaccion',
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                data: JSON.stringify(objParameters),
                success: function (response) {
                    debugger;
                    if (response.oDataResponse != null) {
                        if (response.oDataResponse != null && response.oDataResponse.MessageResponse != null) {
                            if ((response.oDataResponse.MessageResponse.Body.numeroSOT === "") || (response.oDataResponse.MessageResponse.Body.numeroSOT === null)) {
                                alert('No se pudo ejecutar la transacción. Informe o vuelva a intentar')
                            }
                            else {
                                var nroSot = response.oDataResponse.MessageResponse.Body.numeroSOT;
                                alert('La transacción se ha grabado satisfactoriamente.<br/>- Nro. SOT: ' + nroSot);
                                controls.btnConstancy.show();
                                controls.btnSave.hide();
                                controls.divFooterInfoSot.show();
                                controls.divFooterInfoSot.prepend('Nro. SOT: ' + nroSot + ' </p>');
                                controls.ddlTypeofJob.attr('disabled', true);
                                controls.ddlSubType.attr('disabled', true);
                                controls.ddlTypeofService.attr('disabled', true);
                                controls.ddlMotive.attr('disabled', true);
                                controls.ddlAnnexes.attr('disabled', true);
                                controls.ddlTimeZone.attr('disabled', true);
                                controls.txtCalendar.attr('disabled', true);
                                controls.txtSendMail.attr('disabled', true);
                                controls.chkSendMail.attr('disabled', true);
                                controls.txtTelephone.attr('disabled', true);
                                controls.txtNotes.attr('disabled', true);
                                controls.ddlCenterofAttention.attr('disabled', true);
                            }
                        }
                        else {
                            alert('No se pudo ejecutar la transacción. Informe o vuelva a intentar');
                        }
                    }
                    else {
                        alert('No se pudo ejecutar la transacción. Informe o vuelva a intentar')
                    }

                },
                complete: function () {
                    $.unblockUI();
                },
                error: function (err) {
                    alert('No se pudo ejecutar la transacción. Informe o vuelva a intentar. ' + err.statusText);
                    $.unblockUI();
                }
            });
        }
    }

    $.fn.VisitingOrder = function () {
        var option = arguments[0],
            args = arguments,
            value,
            allowedMethods = [];

        this.each(function () {
            var $this = $(this),
                data = $this.data('VisitingOrder'),
                options = $.extend({}, $.fn.VisitingOrder.defaults,
                    $this.data(), typeof option === 'object' && option);

            if (!data) {
                data = new Form($this, options);
                $this.data('VisitingOrder', data);
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

    $.fn.VisitingOrder.defaults = {}

    $('#divIndex').VisitingOrder();

})(jQuery, null);