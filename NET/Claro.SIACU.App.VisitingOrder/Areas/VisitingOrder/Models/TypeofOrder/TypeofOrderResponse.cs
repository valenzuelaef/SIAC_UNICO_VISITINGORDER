using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.TypeofOrder
{
    public class TypeofOrderResponse
    {
        [DataMember(Name = "MessageResponse")]
        public TypeofOrderMessageResponse MessageResponse { get; set; }
    }

    [DataContract(Name = "MessageResponse")]
    public class TypeofOrderMessageResponse
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderRes Header { get; set; }

        [DataMember(Name = "Body")]
        public TypeofOrderBodyResponse Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class TypeofOrderBodyResponse
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
            [DataMember(Name = "consultasubtipo/consultarSubtipo")]
            public ConsultarSubtipo consultasubtipo_consultarSubtipo { get; set; }

            [DataMember(Name = "datostiposerviciofija/listarTiposServicioFija")]
            public ListarTiposServicio datostiposerviciofija_listarTiposServicioFija { get; set; }
        }
        [DataContract(Name = "consultasubtipo/consultarSubtipo")]
        public class ConsultarSubtipo
        {
            [DataMember(Name = "codigoRespuesta")]
            public string CodigoRespuesta { get; set; }

            [DataMember(Name = "mensajeRespuesta")]
            public string MensajeRespuesta { get; set; }

            [DataMember(Name = "listaSubTipo")]
            public ICollection<ListaTipoTrabajo> ListaSubTipo { get; set; }
        }
        [DataContract(Name = "datostiposerviciofija/listarTiposServicioFija")]
        public class ListarTiposServicio
        {
            [DataMember(Name = "codigoRespuesta")]
            public string CodigoRespuesta { get; set; }

            [DataMember(Name = "mensajeRespuesta")]
            public string MensajeRespuesta { get; set; }

            [DataMember(Name = "listas")]
            public ICollection<Listas> Listas { get; set; }
        }

    }
}