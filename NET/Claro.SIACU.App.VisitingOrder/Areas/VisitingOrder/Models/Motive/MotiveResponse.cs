using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.Motive
{
    public class MotiveResponse
    {
        [DataMember(Name = "MessageResponse")]
        public MotiveMessageResponse MessageResponse { get; set; }
    }

    [DataContract(Name = "MessageResponse")]
    public class MotiveMessageResponse
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderRes Header { get; set; }

        [DataMember(Name = "Body")]
        public MotiveBodyResponse Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class MotiveBodyResponse
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
            [DataMember(Name = "consultamotivo")]
            public ConsultarSubtipo consultamotivo_ { get; set; }

            [DataMember(Name = "franjahorario/validaEta")]
            public FranjaHorarioValidaETA franjahorario_validaEta { get; set; }

        }
        [DataContract(Name = "consultamotivo")]
        public class ConsultarSubtipo
        {
            [DataMember(Name = "codigoRespuesta")]
            public string CodigoRespuesta { get; set; }

            [DataMember(Name = "mensajeRespuesta")]
            public string MensajeRespuesta { get; set; }

            [DataMember(Name = "listaMotivos")]
            public ICollection<ListaMotivo> ListaMotivos { get; set; }
        }

        [DataContract(Name = "franjahorario/validaEta")]
        public class FranjaHorarioValidaETA
        {
            [DataMember(Name = "codigoRespuesta")]
            public string CodigoRespuesta { get; set; }
            [DataMember(Name = "mensajeRespuesta")]
            public string MensajeRespuesta { get; set; }
            [DataMember(Name = "validaEta")]
            public ValidaEta ValidaEta { get; set; }
        }
        [DataContract(Name = "validaEta")]
        public class ValidaEta
        {
            [DataMember(Name = "codigoZona")]
            public string CodigoZona { get; set; }
            [DataMember(Name = "flagIndica")]
            public string FlagIndica { get; set; }
            [DataMember(Name = "flagReserva")]
            public string FlagReserva { get; set; }
        }

    }
}