using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.DatosAdicionales
{
    public class DatosAdicionalesResponse
    {
        [DataMember(Name = "MessageResponse")]
        public DatosAdicionalesMessageResponse MessageResponse { get; set; }
    }

    [DataContract(Name = "MessageResponse")]
    public class DatosAdicionalesMessageResponse
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderRes Header { get; set; }

        [DataMember(Name = "Body")]
        public DatosAdicionalesBodyResponse Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class DatosAdicionalesBodyResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public int CodigoRespuesta { get; set; }

        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }

        [DataMember(Name = "servicios")]
        public Servicios servicios { get; set; }
    }

    [DataContract(Name = "servicios")]
    public class Servicios
    {
        [DataMember(Name = "configuracionesfija/obtenerConfiguraciones")]
        public ConfiguracionesfijaObtenerConfiguraciones configuracionesfija_obtenerConfiguraciones { get; set; }

        [DataMember(Name = "consultatipificacion/obtenerInformacionTipificacion")]
        public TipificacionreglasObtenerInformacionTipificacion tipificacionreglas_obtenerInformacionTipificacion { get; set; }

        [DataMember(Name = "gestionprogramacionesfija/validarTareasProgramadas")]
        public GestionProgramacionesFijaValidarTareasProgramadas gestionprogramacionesfija_validarTareasProgramadas { get; set; }

        [DataMember(Name = "datosinstalacioncliente/obtenerDatosInstalacion")]
        public DatosInstalacionClienteObtenerDatosInstalacion datosinstalacioncliente_obtenerDatosInstalacion { get; set; }
    }

    [DataContract(Name = "configuracionesfija/obtenerConfiguraciones")]
    public class ConfiguracionesfijaObtenerConfiguraciones
    {
        [DataMember(Name = "idTransaccion")]
        public string TransactionID { get; set; }

        [DataMember(Name = "codigoRespuesta")]
        public string CodeResponse { get; set; }

        [DataMember(Name = "mensajeRespuesta")]
        public string MessageResponse { get; set; }

        [DataMember(Name = "transaccionProducto")]
        public TransaccionProducto ProductTransaction { get; set; }
    }

    [DataContract(Name = "consultatipificacion/obtenerInformacionTipificacion")]
    public class TipificacionreglasObtenerInformacionTipificacion
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }

        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }

        [DataMember(Name = "listaTipificacionRegla")]
        public ICollection<ListaTipificacionRegla> listaTipificacionRegla { get; set; }
    }

    [DataContract(Name = "gestionprogramacionesfija/validarTareasProgramadas")]
    public class GestionProgramacionesFijaValidarTareasProgramadas 
    { 
        
        [DataMember(Name = "idTransaccion")]
        public string IdTransaccion { get; set;}

        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }
            
        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set;}
            
        [DataMember(Name = "cantidadTareasProgramadas")]
        public string CantidadTareasProgramadas { get; set; }

        [DataMember(Name = "listaOpcionalResponse")]
        public string ListaOpcionalResponse { get; set; }
    
    }

    [DataContract(Name = "datosinstalacioncliente/obtenerDatosInstalacion")]
    public class DatosInstalacionClienteObtenerDatosInstalacion
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }

        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }

        [DataMember(Name = "direccion")]
        public string Direccion { get; set; }

        [DataMember(Name = "notaDireccion")]
        public string NotaDireccion { get; set; }

        [DataMember(Name = "pais")]
        public string Pais { get; set; }
        [DataMember(Name = "departamento")]
        public string Departamento { get; set; }
        [DataMember(Name = "provincia")]
        public string Provincia { get; set; }
        [DataMember(Name = "distrito")]
        public string Distrito { get; set; }
        [DataMember(Name = "codPlano")]
        public string CodPlano { get; set; }
        [DataMember(Name = "codUbigeo")]
        public string CodUbigeo { get; set; }
        [DataMember(Name = "ubigeo")]
        public string Ubigeo { get; set; }
        [DataMember(Name = "zona")]
        public string Zona { get; set; }

    }
}