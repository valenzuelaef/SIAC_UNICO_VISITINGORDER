﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.Motive
{
    [DataContract(Name = "listaMotivos")]
    public class ListaMotivo
    {
        [DataMember(Name = "codMotivo")]
        public string CodMotivo { get; set; }
        [DataMember(Name = "descripcion")]
        public string Descripcion { get; set; }

    }
}