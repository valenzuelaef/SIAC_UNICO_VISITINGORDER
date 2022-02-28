using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.DatosAdicionales;
using Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.Transversal;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Controllers
{
    public class HomeController : Controller
    {
        static DatosAdicionalesResponse oDatosAdi = new DatosAdicionalesResponse();
        static string stridSession;
        static string strIpSession = "172.19.84.167";//Utils.Common.GetApplicationIp();
        static byte[] databytesFile;

        public ActionResult Index()
        {
            return PartialView();
        }

        [HttpPost]
        public JsonResult GetDatosFranjaHorario(Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.FranjaHoraria.FranjaHorariaBodyRequest request)
        {
            string strUrl = ConfigurationManager.AppSettings["DPGetObtenerFranjaHorario"];
            Models.FranjaHoraria.FranjaHorariaRequest oDataRequest = new Models.FranjaHoraria.FranjaHorariaRequest();
            Models.FranjaHoraria.FranjaHorariaResponse oDataResponse = new Models.FranjaHoraria.FranjaHorariaResponse();
            Tools.Entity.AuditRequest oAuditRequest = Utils.Common.CreateAuditRequest<Tools.Entity.AuditRequest>(stridSession);

            oDataRequest.Audit = oAuditRequest;

            oDataRequest.MessageRequest = new Models.FranjaHoraria.FranjaHorariaMessageRequest
            {
                Header = new Models.DataPower.HeaderReq
                {
                    HeaderRequest = new Models.DataPower.HeaderRequest
                    {
                        consumer = "TCRM",
                        country = "PERU",
                        dispositivo = "MOVIL",
                        language = "ES",
                        modulo = "sisact",
                        msgType = "REQUEST",
                        operation = "obtenerFranjaHorario",
                        pid = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                        system = "SIAC",
                        timestamp = DateTime.Now.ToString("o"),
                        userId = Utils.Common.CurrentUser,
                        wsIp = strIpSession
                    }
                },
                Body = new Models.FranjaHoraria.FranjaHorariaBodyRequest
        {
                    FlagValidaEta = request.FlagValidaEta,
                    Disponibilidad = request.Disponibilidad,
                    TipTra = request.TipTra,
                    TipSrv = request.TipSrv,
                    FechaAgenda = request.FechaAgenda,
                    Origen = request.Origen,
                    IdPlano = request.IdPlano,
                    Ubigeo = request.Ubigeo,
                    TipoOrden = request.TipoOrden,
                    SubtipoOrden = request.SubtipoOrden,
                    CodZona = request.CodZona,
                    Customer = request.Customer,
                    Contrato = request.Contrato,
                    ReglaValidacion = request.ReglaValidacion,
                    listaCampoActividadCapacidad = request.listaCampoActividadCapacidad
        }
            };

            try
            {
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Url: " + strUrl);
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Request GetDatosFranjaHorario DP PostVisitingOrder: " + JsonConvert.SerializeObject(oDataRequest));
                oDataResponse = Utils.RestService.PostInvoque<Models.FranjaHoraria.FranjaHorariaResponse>(strUrl, oDataRequest.Audit, oDataRequest, true);
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Response GetDatosFranjaHorario DP PostVisitingOrder: " + JsonConvert.SerializeObject(oDataResponse));
            }
            catch (Exception ex)
            {
                Tools.Traces.Logging.Error(stridSession, oDataRequest.Audit.Transaction, ex.Message);
                string sep = " - ";
                int posResponse = ex.Message.IndexOf(sep);
                string result = ex.Message.Substring(posResponse + sep.Length);
                oDataResponse = JsonConvert.DeserializeObject<Models.FranjaHoraria.FranjaHorariaResponse>(result);
            }
            return Json(new
        {
                dataCapacity = oDataResponse,
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetInitialConfiguration(Models.InitialData.InitialDataBodyRequest oBodyRequest, string SessionID, string TransactionID)
        {
            oDatosAdi = new DatosAdicionalesResponse();
            Models.InitialData.InitialDataRequest oInitialDataRequest = new Models.InitialData.InitialDataRequest();
            Models.InitialData.AdditionalFixedDataRequest oDatosAdicionalesDataRequest = new Models.InitialData.AdditionalFixedDataRequest();
            Models.InitialData.InitialDataResponse oInitialDataResponse = new Models.InitialData.InitialDataResponse();
            Models.InitialData.AdditionalFixedDataResponse oAdditionalFixedDataResponse = new Models.InitialData.AdditionalFixedDataResponse();
            Tools.Entity.AuditRequest oAuditRequest = Utils.Common.CreateAuditRequest<Tools.Entity.AuditRequest>(SessionID);
            Dictionary<string, string> oConfiguraciones = new Dictionary<string, string>();
            string strUrl;

            try
            {
                strUrl = ConfigurationManager.AppSettings["DPGetCargaDatosClienteFija"];
                oInitialDataRequest.Audit = oAuditRequest;
                oInitialDataRequest.MessageRequest = new Models.InitialData.InitialDataMessageRequest
                {
                    Header = new Models.DataPower.HeaderReq
                    {
                        HeaderRequest = new Models.DataPower.HeaderRequest
                        {
                            consumer = "SIACU",
                            country = "PE",
                            dispositivo = "MOVIL",
                            language = "ES",
                            modulo = "siacu",
                            msgType = "Request",
                            operation = "obtenerDatosInicial",
                            pid = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                            system = "SIACU",
                            timestamp = DateTime.Now.ToString("o"),
                            userId = Utils.Common.CurrentUser,
                            wsIp = strIpSession
                        }
                    },
                    Body = new Models.InitialData.InitialDataBodyRequest
                    {
                        ContractID = oBodyRequest.ContractID,
                        CustomerID = oBodyRequest.CustomerID,
                        UserAccount = oBodyRequest.UserAccount,
                        codeRol = oBodyRequest.codeRol,
                        codeCac = oBodyRequest.codeCac,
                        state = oBodyRequest.state,
                        Type = oBodyRequest.Type,
                        flagConvivencia = ConfigurationManager.AppSettings["flagConvivenciaAsIsToBeReingFija"]
                    }
                };

                Tools.Traces.Logging.Info(SessionID, oInitialDataRequest.Audit.Transaction, "Url: " + strUrl);
                Tools.Traces.Logging.Info(SessionID, oInitialDataRequest.Audit.Transaction, "Request Process 0 - VisitingOrder: " + JsonConvert.SerializeObject(oInitialDataRequest));
                oInitialDataResponse = Utils.RestService.PostInvoque<Models.InitialData.InitialDataResponse>(strUrl, oInitialDataRequest.Audit, oInitialDataRequest, true);
                Tools.Traces.Logging.Info(SessionID, oInitialDataRequest.Audit.Transaction, "Response Process 0 - VisitingOrder: " + JsonConvert.SerializeObject(oInitialDataResponse));

                this.GetDatosAdicionales(new DatosAdicionalesBodyRequest
                {
                    IdTransaccion = Tools.Utils.Constants.numeroCuatro.ToString(),
                    IdProceso = Tools.Utils.Constants.numeroUno.ToString(),
                    IdProducto = oInitialDataResponse.MessageResponse.Body.CoreServices.Technology,
                    ContratoId = oBodyRequest.ContractID
                });

                if (oDatosAdi.MessageResponse.Body.servicios.configuracionesfija_obtenerConfiguraciones.ProductTransaction != null)
                {
                    foreach (var item in oDatosAdi.MessageResponse.Body.servicios.configuracionesfija_obtenerConfiguraciones.ProductTransaction.ConfigurationAttributes.Where(x => x.AttributeType == "CONFIGURACIONES"))
                    {
                        oConfiguraciones[item.AttributeName + "_" + item.AttributeIdentifier] = item.AttributeValue;
                    }
                }

                Models.InitialData.PuntoAtencionResponse oPointAttention;
                if (oInitialDataResponse.MessageResponse != null)
                {
                    if (oInitialDataResponse.MessageResponse.Body != null)
                    {
                        oPointAttention = oInitialDataResponse.MessageResponse.Body.PuntoAtencion;
                        if (oPointAttention != null)
                        {
                            if (oPointAttention.CodigoRespuesta == "0")
                            {
                                oInitialDataResponse.MessageResponse.Body.PuntoAtencion.listaRegistros = oPointAttention.listaRegistros.OrderBy(x => x.nombre).ToList();
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Tools.Traces.Logging.Error(SessionID, oInitialDataRequest.Audit.Transaction, ex.Message);
                string sep = " - ";
                int posResponse = ex.Message.IndexOf(sep);
                string result = ex.Message.Substring(posResponse + sep.Length);
                oInitialDataResponse = JsonConvert.DeserializeObject<Models.InitialData.InitialDataResponse>(result);
            }
            return Json(new
            {
                oInitialDataResponse,
                oDatosAdi,
                oConfiguraciones,
                oAuditRequest
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetDatosAdicionales(DatosAdicionalesBodyRequest request)
        {
            string strUrl = ConfigurationManager.AppSettings["DPGetObtenerDatosAcionales"];
            DatosAdicionalesRequest oDatosAcicionalesDataRequest = new DatosAdicionalesRequest();
            DatosAdicionalesResponse oDatosAcicionalesDataResponse = new DatosAdicionalesResponse();
            Tools.Entity.AuditRequest oAuditRequest = Utils.Common.CreateAuditRequest<Tools.Entity.AuditRequest>(stridSession);

            oDatosAcicionalesDataRequest.Audit = oAuditRequest;

            oDatosAcicionalesDataRequest.MessageRequest = new DatosAdicionalesMessageRequest
            {
                Header = new Models.DataPower.HeaderReq
                {
                    HeaderRequest = new Models.DataPower.HeaderRequest
                    {
                        consumer = "SIACU",
                        country = "PE",
                        dispositivo = "MOVIL",
                        language = "ES",
                        modulo = "siacu",
                        msgType = "Request",
                        operation = "obtenerDatosInicial",
                        pid = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                        system = "SIACU",
                        timestamp = DateTime.Now.ToString("o"),
                        userId = Utils.Common.CurrentUser,
                        wsIp = strIpSession
                    }
                },
                Body = new DatosAdicionalesBodyRequest
                {
                    IdTransaccion = request.IdTransaccion,
                    IdProceso = request.IdProceso,
                    IdProducto = request.IdProducto,
                    ContratoId = request.ContratoId,
                    CodPais = request.CodPais == null ? "" : request.CodPais,
                    IdTipoUrba = request.IdTipoUrba == null ? "" : request.IdTipoUrba,
                    IdTipoInt = request.IdTipoInt == null ? "" : request.IdTipoInt,
                    IdCodVia = request.IdCodVia == null ? "" : request.IdCodVia,
                    CodUbi = request.CodUbi == null ? "" : request.CodUbi,
                    Ubigeo = request.Ubigeo == null ? "" : request.Ubigeo,
                    IdPoblado = request.IdPoblado == null ? "" : request.IdPoblado,
                    TipTrabajo = request.TipTrabajo == null ? "" : request.TipTrabajo,
                    FlagCE = request.FlagCE == null ? "" : request.FlagCE,
                    TipoServicio = request.TipoServicio == null ? "" : request.TipoServicio,
                    TipTra = request.TipTra == null ? "" : request.TipTra,
                    Origen = request.Origen == null ? "" : request.Origen,
                    IdPlano = request.IdPlano == null ? "" : request.IdPlano,
                    FechaDesde = string.Empty,
                    FechaHasta = string.Empty,
                    Estado = "1",
                    Asesor = string.Empty,
                    Cuenta = string.Empty,
                    TipoTransaccion = string.Empty,
                    CodIteraccion = string.Empty,
                    CadDac = "DAC",
                    CoId = request.ContratoId
                }
            };

            try
            {
                Tools.Traces.Logging.Info(stridSession, oDatosAcicionalesDataRequest.Audit.Transaction, "Url: " + strUrl);
                Tools.Traces.Logging.Info(stridSession, oDatosAcicionalesDataRequest.Audit.Transaction, "Request Process 1 - VisitingOrder: " + JsonConvert.SerializeObject(oDatosAcicionalesDataRequest));
                oDatosAcicionalesDataResponse = Utils.RestService.PostInvoque<DatosAdicionalesResponse>(strUrl, oDatosAcicionalesDataRequest.Audit, oDatosAcicionalesDataRequest, true);
                Tools.Traces.Logging.Info(stridSession, oDatosAcicionalesDataRequest.Audit.Transaction, "Response Process 1 - VisitingOrder: " + JsonConvert.SerializeObject(oDatosAcicionalesDataResponse));
                oDatosAdi = oDatosAcicionalesDataResponse;
            }
            catch (Exception ex)
            {
                Tools.Traces.Logging.Error(stridSession, oDatosAcicionalesDataRequest.Audit.Transaction, ex.Message);
                string sep = " - ";
                int posResponse = ex.Message.IndexOf(sep);
                string result = ex.Message.Substring(posResponse + sep.Length);
                oDatosAcicionalesDataResponse = JsonConvert.DeserializeObject<Models.DatosAdicionales.DatosAdicionalesResponse>(result);
            }
            return Json(new
            {
                data = oDatosAcicionalesDataResponse
            },
            JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetTypeofJob(Models.TypeofJob.TypeofJobBodyRequest oBodyRequest, string SessionID, string TransactionID)
        {
            Models.TypeofJob.TypeofJobRequest oTypeofJobRequest = new Models.TypeofJob.TypeofJobRequest();
            Models.TypeofJob.TypeofJobResponse oTypeofJobResponse = new Models.TypeofJob.TypeofJobResponse();
            Tools.Entity.AuditRequest oAuditRequest = Utils.Common.CreateAuditRequest<Tools.Entity.AuditRequest>(SessionID);
            string strUrl;

            try
            {
                strUrl = ConfigurationManager.AppSettings["DPGetObtenerDatosAcionales"];
                oTypeofJobRequest.Audit = oAuditRequest;
                oTypeofJobRequest.MessageRequest = new Models.TypeofJob.TypeofJobMessageRequest
                {
                    Header = new Models.DataPower.HeaderReq
                    {
                        HeaderRequest = new Models.DataPower.HeaderRequest
                        {
                            consumer = "SIACU",
                            country = "PE",
                            dispositivo = "MOVIL",
                            language = "ES",
                            modulo = "siacu",
                            msgType = "Request",
                            operation = "obtenerDatosInicial",
                            pid = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                            system = "SIACU",
                            timestamp = DateTime.Now.ToString("o"),
                            userId = Utils.Common.CurrentUser,
                            wsIp = strIpSession
                        }
                    },
                    Body = new Models.TypeofJob.TypeofJobBodyRequest
                    {
                        IdTransaccion = oBodyRequest.IdTransaccion,
                        IdProceso = oBodyRequest.IdProceso,
                        IdProducto = oBodyRequest.IdProducto,
                        Tecnologia = oBodyRequest.Tecnologia
                    }
                };

                Tools.Traces.Logging.Info(SessionID, oTypeofJobRequest.Audit.Transaction, "Url: " + strUrl);
                Tools.Traces.Logging.Info(SessionID, oTypeofJobRequest.Audit.Transaction, "Request Process 0 - VisitingOrder: " + JsonConvert.SerializeObject(oTypeofJobRequest));
                oTypeofJobResponse = Utils.RestService.PostInvoque<Models.TypeofJob.TypeofJobResponse>(strUrl, oTypeofJobRequest.Audit, oTypeofJobRequest, true);
                Tools.Traces.Logging.Info(SessionID, oTypeofJobRequest.Audit.Transaction, "Response Process 0 - VisitingOrder: " + JsonConvert.SerializeObject(oTypeofJobResponse));
            }
            catch (Exception ex)
            {
                Tools.Traces.Logging.Error(SessionID, oTypeofJobRequest.Audit.Transaction, ex.Message);
                string sep = " - ";
                int posResponse = ex.Message.IndexOf(sep);
                string result = ex.Message.Substring(posResponse + sep.Length);
                oTypeofJobResponse = JsonConvert.DeserializeObject<Models.TypeofJob.TypeofJobResponse>(result);
            }
            return Json(new
            {
                oTypeofJobResponse
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetSubType(Models.SubType.SubTypeBodyRequest oBodyRequest, string SessionID, string TransactionID)
        {
            Models.SubType.SubTypeRequest oSubTypeRequest = new Models.SubType.SubTypeRequest();
            Models.SubType.SubTypeResponse oSubTypeResponse = new Models.SubType.SubTypeResponse();
            Tools.Entity.AuditRequest oAuditRequest = Utils.Common.CreateAuditRequest<Tools.Entity.AuditRequest>(SessionID);
            string strUrl;

            try
            {
                strUrl = ConfigurationManager.AppSettings["DPGetObtenerDatosAcionales"];
                oSubTypeRequest.Audit = oAuditRequest;
                oSubTypeRequest.MessageRequest = new Models.SubType.SubTypeMessageRequest
            {
                Header = new Models.DataPower.HeaderReq
                {
                    HeaderRequest = new Models.DataPower.HeaderRequest
                    {
                        consumer = "SIACU",
                        country = "PE",
                        dispositivo = "MOVIL",
                        language = "ES",
                        modulo = "siacu",
                        msgType = "Request",
                        operation = "obtenerDatosInicial",
                        pid = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                        system = "SIACU",
                        timestamp = DateTime.Now.ToString("o"),
                        userId = Utils.Common.CurrentUser,
                        wsIp = strIpSession
                    }
                },
                    Body = new Models.SubType.SubTypeBodyRequest
                    {
                        IdTransaccion = oBodyRequest.IdTransaccion,
                        IdProceso = oBodyRequest.IdProceso,
                        IdProducto = oBodyRequest.IdProducto,
                        TipTrab = oBodyRequest.TipTrab
                    }
                };

                Tools.Traces.Logging.Info(SessionID, oSubTypeRequest.Audit.Transaction, "Url: " + strUrl);
                Tools.Traces.Logging.Info(SessionID, oSubTypeRequest.Audit.Transaction, "Request Process 0 - VisitingOrder: " + JsonConvert.SerializeObject(oSubTypeRequest));
                oSubTypeResponse = Utils.RestService.PostInvoque<Models.SubType.SubTypeResponse>(strUrl, oSubTypeRequest.Audit, oSubTypeRequest, true);
                Tools.Traces.Logging.Info(SessionID, oSubTypeRequest.Audit.Transaction, "Response Process 0 - VisitingOrder: " + JsonConvert.SerializeObject(oSubTypeResponse));
            }
            catch (Exception ex)
            {
                Tools.Traces.Logging.Error(SessionID, oSubTypeRequest.Audit.Transaction, ex.Message);
                string sep = " - ";
                int posResponse = ex.Message.IndexOf(sep);
                string result = ex.Message.Substring(posResponse + sep.Length);
                oSubTypeResponse = JsonConvert.DeserializeObject<Models.SubType.SubTypeResponse>(result);
            }
            return Json(new
            {
                oSubTypeResponse
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Process4(Models.TypeofOrder.TypeofOrderBodyRequest oBodyRequest, string SessionID, string TransactionID)
        {
            Models.TypeofOrder.TypeofOrderRequest oTypeofOrderRequest = new Models.TypeofOrder.TypeofOrderRequest();
            Models.TypeofOrder.TypeofOrderResponse oTypeofOrderResponse = new Models.TypeofOrder.TypeofOrderResponse();
            Tools.Entity.AuditRequest oAuditRequest = Utils.Common.CreateAuditRequest<Tools.Entity.AuditRequest>(SessionID);
            string strUrl;

            try
            {
                strUrl = ConfigurationManager.AppSettings["DPGetObtenerDatosAcionales"];
                oTypeofOrderRequest.Audit = oAuditRequest;
                oTypeofOrderRequest.MessageRequest = new Models.TypeofOrder.TypeofOrderMessageRequest
                {
                    Header = new Models.DataPower.HeaderReq
                    {
                        HeaderRequest = new Models.DataPower.HeaderRequest
                        {
                            consumer = "SIACU",
                            country = "PE",
                            dispositivo = "MOVIL",
                            language = "ES",
                            modulo = "siacu",
                            msgType = "Request",
                            operation = "obtenerDatosInicial",
                            pid = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                            system = "SIACU",
                            timestamp = DateTime.Now.ToString("o"),
                            userId = Utils.Common.CurrentUser,
                            wsIp = strIpSession
                        }
                    },
                    Body = new Models.TypeofOrder.TypeofOrderBodyRequest
                    {
                        IdTransaccion = oBodyRequest.IdTransaccion,
                        IdProceso = oBodyRequest.IdProceso,
                        IdProducto = oBodyRequest.IdProducto,
                        ContratoId = oBodyRequest.ContratoId,
                        TipTra = oBodyRequest.TipTra,
                        IdLista = oBodyRequest.IdLista,
                        cantDeco = oBodyRequest.cantDeco
                    }
            };

                Tools.Traces.Logging.Info(SessionID, oTypeofOrderRequest.Audit.Transaction, "Url: " + strUrl);
                Tools.Traces.Logging.Info(SessionID, oTypeofOrderRequest.Audit.Transaction, "Request Process 0 - VisitingOrder: " + JsonConvert.SerializeObject(oTypeofOrderRequest));
                oTypeofOrderResponse = Utils.RestService.PostInvoque<Models.TypeofOrder.TypeofOrderResponse>(strUrl, oTypeofOrderRequest.Audit, oTypeofOrderRequest, true);
                Tools.Traces.Logging.Info(SessionID, oTypeofOrderRequest.Audit.Transaction, "Response Process 0 - VisitingOrder: " + JsonConvert.SerializeObject(oTypeofOrderResponse));
            }
            catch (Exception ex)
            {
                Tools.Traces.Logging.Error(SessionID, oTypeofOrderRequest.Audit.Transaction, ex.Message);
                string sep = " - ";
                int posResponse = ex.Message.IndexOf(sep);
                string result = ex.Message.Substring(posResponse + sep.Length);
                oTypeofOrderResponse = JsonConvert.DeserializeObject<Models.TypeofOrder.TypeofOrderResponse>(result);
            }
            return Json(new
            {
                oTypeofOrderResponse
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Process5(Models.Motive.MotiveBodyRequest oBodyRequest, string SessionID, string TransactionID)
        {
            Models.Motive.MotiveRequest oMotiveRequest = new Models.Motive.MotiveRequest();
            Models.Motive.MotiveResponse oMotiveResponse = new Models.Motive.MotiveResponse();
            Tools.Entity.AuditRequest oAuditRequest = Utils.Common.CreateAuditRequest<Tools.Entity.AuditRequest>(SessionID);
            string strUrl;
            try
            {
                strUrl = ConfigurationManager.AppSettings["DPGetObtenerDatosAcionales"];
                oMotiveRequest.Audit = oAuditRequest;
                oMotiveRequest.MessageRequest = new Models.Motive.MotiveMessageRequest
                {
                    Header = new Models.DataPower.HeaderReq
                    {
                        HeaderRequest = new Models.DataPower.HeaderRequest
                        {
                            consumer = "SIACU",
                            country = "PE",
                            dispositivo = "MOVIL",
                            language = "ES",
                            modulo = "siacu",
                            msgType = "Request",
                            operation = "obtenerDatosInicial",
                            pid = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                            system = "SIACU",
                            timestamp = DateTime.Now.ToString("o"),
                            userId = Utils.Common.CurrentUser,
                            wsIp = strIpSession
                        }
                    },
                    Body = new Models.Motive.MotiveBodyRequest
                    {
                        IdTransaccion = oBodyRequest.IdTransaccion,
                        IdProceso = oBodyRequest.IdProceso,
                        IdProducto = oBodyRequest.IdProducto,
                        TipTra = oBodyRequest.TipTra,
                        TipMotivo = oBodyRequest.TipMotivo,
                        Origen = oBodyRequest.Origen,
                        IdPlano = oBodyRequest.IdPlano,
                        Ubigeo = oBodyRequest.Ubigeo,
                        TipSrv = oBodyRequest.TipSrv
                    }
                };

                Tools.Traces.Logging.Info(SessionID, oMotiveRequest.Audit.Transaction, "Url: " + strUrl);
                Tools.Traces.Logging.Info(SessionID, oMotiveRequest.Audit.Transaction, "Request Process 0 - VisitingOrder: " + JsonConvert.SerializeObject(oMotiveRequest));
                oMotiveResponse = Utils.RestService.PostInvoque<Models.Motive.MotiveResponse>(strUrl, oMotiveRequest.Audit, oMotiveRequest, true);
                Tools.Traces.Logging.Info(SessionID, oMotiveRequest.Audit.Transaction, "Response Process 0 - VisitingOrder: " + JsonConvert.SerializeObject(oMotiveResponse));
            }
            catch (Exception ex)
            {
                Tools.Traces.Logging.Error(SessionID, oMotiveRequest.Audit.Transaction, ex.Message);
                string sep = " - ";
                int posResponse = ex.Message.IndexOf(sep);
                string result = ex.Message.Substring(posResponse + sep.Length);
                oMotiveResponse = JsonConvert.DeserializeObject<Models.Motive.MotiveResponse>(result);
            }
            return Json(new
            {
                oMotiveResponse
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult postGeneraTransaccion(GuardarDatosDataBodyRequest request, string SessionID, string TransactionID)
        {
            request.idFlujo = TransactionID == Tools.Utils.Constants.NumberFourString ? ConfigurationManager.AppSettings["IdFlujoOrdendeVisitaFTTH"] : ConfigurationManager.AppSettings["IdFlujoOrdendeVisitaFTTHONE"];
            string strUrl = ConfigurationManager.AppSettings["DPGetGuardarDatosAgendamiento"];
            Models.Transversal.GuardarDatosRequest oDataRequest = new Models.Transversal.GuardarDatosRequest();
            Models.Transversal.GuardarDatosResponse oDataResponse = new Models.Transversal.GuardarDatosResponse();
            Tools.Entity.AuditRequest oAuditRequest = Utils.Common.CreateAuditRequest<Tools.Entity.AuditRequest>(SessionID);
            string record = string.Empty;

            oDataRequest.Audit = oAuditRequest;

            oDataRequest.MessageRequest = new Models.Transversal.GuardarDatosDataMessageRequest
            {
                Header = new Models.DataPower.HeaderReq
                {
                    HeaderRequest = new Models.DataPower.HeaderRequest
                    {
                        consumer = "SIACU",
                        country = "PE",
                        dispositivo = "MOVIL",
                        language = "ES",
                        modulo = "siacu",
                        msgType = "Request",
                        operation = "guardardatosagendamiento",
                        pid = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                        system = "SIACU",
                        timestamp = DateTime.Now.ToString("o"),
                        userId = Utils.Common.CurrentUser,
                        wsIp = strIpSession
                    }
                },
                Body = new Models.Transversal.GuardarDatosDataBodyRequest
                {
                    idFlujo = request.idFlujo,
                    Servicios = request.Servicios
                }
            };

            //Encriptamos a base64 la notas -  Tipificacion
            request.Servicios.Where(m => m.Servicio == "Tipificacion")
           .Select(m => new Models.Transversal.Servicios
           {
               Servicio = m.Servicio,
               parametros = m.parametros.Where(u => u.parametro == "Notas").ToList()
           }).ToList().ForEach(y => y.parametros.FirstOrDefault().valor = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(y.parametros.FirstOrDefault().valor)));

            //Encriptamos a base64 la inter_30 - Tipificacion
            request.Servicios.Where(m => m.Servicio == "Plantilla")
           .Select(m => new Models.Transversal.Servicios
           {
               Servicio = m.Servicio,
               parametros = m.parametros.Where(u => u.parametro == "inter30").ToList()
           }).ToList().ForEach(y => y.parametros.FirstOrDefault().valor = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(y.parametros.FirstOrDefault().valor)));


               request.Servicios.Where(m => m.Servicio == "Constancia")
                .Select(m => new Models.Transversal.Servicios
                {
                    Servicio = m.Servicio,
                    parametros = m.parametros.Where(u => u.parametro == "DRIVE_CONSTANCIA").ToList()
                })
               .ToList().ForEach(y => y.parametros.FirstOrDefault().valor = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(y.parametros.FirstOrDefault().valor)));

            request.Servicios.Where(m => m.Servicio == "Tramas")
                .Select(m => new Models.Transversal.Servicios
                {
                    Servicio = m.Servicio,
                    parametros = m.parametros.Where(u => u.parametro == "Trama_Ventas").ToList()
                })
               .ToList().ForEach(y => y.parametros.FirstOrDefault().valor = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(y.parametros.FirstOrDefault().valor)));


            try
            {
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Url: " + strUrl);
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Request DP PostVisitingOrder: " + JsonConvert.SerializeObject(oDataRequest));
                oDataResponse = Utils.RestService.PostInvoque<Models.Transversal.GuardarDatosResponse>(strUrl, oDataRequest.Audit, oDataRequest, true);
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Response DP PostVisitingOrder: " + JsonConvert.SerializeObject(oDataResponse));

                record = (oDataResponse.MessageResponse.Body.constancia == null) ? "" : oDataResponse.MessageResponse.Body.constancia;
                databytesFile = Convert.FromBase64String(record);
            }
            catch (Exception ex)
            {
                Tools.Traces.Logging.Error(stridSession, oDataRequest.Audit.Transaction, ex.Message);
                string sep = " - ";
                int posResponse = ex.Message.IndexOf(sep);
                string result = ex.Message.Substring(posResponse + sep.Length);
                oDataResponse = JsonConvert.DeserializeObject<Models.Transversal.GuardarDatosResponse>(result);
            }

            return Json(new
            {
                oDataResponse
            }, JsonRequestBehavior.AllowGet);
        }
    }
}