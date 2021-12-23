using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.TypeofJob
{
    public class TypeofJobResponse
    {
        [DataMember(Name = "MessageResponse")]
        public TypeofJobMessageResponse MessageResponse { get; set; }
    }

    [DataContract(Name = "MessageResponse")]
    public class TypeofJobMessageResponse
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderRes Header { get; set; }

        [DataMember(Name = "Body")]
        public TypeofJobBodyResponse Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class TypeofJobBodyResponse
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
            [DataMember(Name = "tipostrabajo/consultarTipoTrabajo")]
            public ConsultarTipoTrabajo tipostrabajo_consultarTipoTrabajo { get; set; }
        }

        [DataContract(Name = "tipostrabajo/consultarTipoTrabajo")]
        public class ConsultarTipoTrabajo
        {
            [DataMember(Name = "codigoRespuesta")]
            public string CodigoRespuesta { get; set; }

            [DataMember(Name = "mensajeRespuesta")]
            public string MensajeRespuesta { get; set; }

            [DataMember(Name = "listaTipoTrabajo")]
            public ICollection<ListaTipoTrabajo> ListaTipoTrabajo { get; set; }
        }

    }
}