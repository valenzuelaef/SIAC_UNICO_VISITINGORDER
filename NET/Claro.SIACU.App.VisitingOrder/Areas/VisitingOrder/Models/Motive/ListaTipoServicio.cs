using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.Motive
{
    [DataContract(Name = "listas")]
    public class Listas
    {
        [DataMember(Name = "descripcion")]
        public string Descripcion { get; set; }
        [DataMember(Name = "valor")]
        public string Valor { get; set; }
        [DataMember(Name = "orden")]
        public string Orden { get; set; }

    }
}