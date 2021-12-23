using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.SubType
{
    public class SubTypeResponse
    {
        [DataMember(Name = "MessageResponse")]
        public SubTypeMessageResponse MessageResponse { get; set; }
    }

    [DataContract(Name = "MessageResponse")]
    public class SubTypeMessageResponse
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderRes Header { get; set; }

        [DataMember(Name = "Body")]
        public SubTypeBodyResponse Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class SubTypeBodyResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public int CodigoRespuesta { get; set; }

        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }

        [DataMember(Name = "servicios")]
        public Servicios servicios { get; set; }

        [DataContract(Name = "servicios")]
        public class Servicios
        {
            [DataMember(Name = "consultasubtipo/obtenerTipoOrden")]
            public ObtenerTipoOrden consultasubtipo_obtenerTipoOrden { get; set; }
        }

        [DataContract(Name = "consultasubtipo/obtenerTipoOrden")]
        public class ObtenerTipoOrden
        {
            [DataMember(Name = "codRespuesta")]
            public string CodRespuesta { get; set; }

            [DataMember(Name = "menRespuesta")]
            public string MenRespuesta { get; set; }

            [DataMember(Name = "listaTipoOrden")]
            public ICollection<ListaTipoOrden> ListaTipoOrden { get; set; }
        }

    }
}