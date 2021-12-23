using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.SubType
{
    [DataContract(Name = "listaTipoOrden")]
    public class ListaTipoOrden
    {
        [DataMember(Name = "valor")]
        public string Valor { get; set; }
        [DataMember(Name = "descripcion")]
        public string Descripcion { get; set; }
        
    }
}