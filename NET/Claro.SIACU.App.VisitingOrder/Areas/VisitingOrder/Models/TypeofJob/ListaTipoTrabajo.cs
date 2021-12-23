using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.TypeofJob
{
    [DataContract(Name = "listaTipoTrabajo")]
    public class ListaTipoTrabajo
    {
        [DataMember(Name = "tipoTrabajo")]
        public string TipoTrabajo { get; set; }
        [DataMember(Name = "descripcion")]
        public string Descripcion { get; set; }
        [DataMember(Name = "flagFranja")]
        public string FlagFranja { get; set; }
        [DataMember(Name = "tecnologia")]
        public string Tecnologia { get; set; }
    }
}