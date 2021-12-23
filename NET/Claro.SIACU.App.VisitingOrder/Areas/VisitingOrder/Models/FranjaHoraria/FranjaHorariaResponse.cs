﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.FranjaHoraria
{
    public class FranjaHorariaResponse
    {
        [DataMember(Name = "MessageResponse")]
        public FranjaHorariaMessageResponse MessageResponse { get; set; } 
    }

    [DataContract(Name = "MessageResponse")]
    public class FranjaHorariaMessageResponse {
        [DataMember(Name = "Header")]
        public DataPower.HeaderRes Header { get; set; }
        [DataMember(Name = "Body")]
        public FranjaHorariaBodyResponse Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class FranjaHorariaBodyResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta  { get; set; }

        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }

        [DataMember(Name = "listaFranjaHorarioSga")]
        public ICollection< FranjaHorarioSGA >listaFranjaHorarioSga { get; set; }

        [DataMember(Name = "listaFranjaHorarioConf")]
        public ICollection< FranjaHorarioXML> listaFranjaHorarioXml { get; set; }

        [DataMember(Name = "listaFranjaHorarioCapacity")]
        public ICollection<FranjaHorarioCapacity> listaFranjaHorarioCapacity { get; set; }
    }

}