using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.TypeofOrder
{
    [DataContract(Name = "listaSubTipo")]
    public class ListaTipoTrabajo
    {
        [DataMember(Name = "codTipoOrden")]
        public string CodTipoOrden { get; set; }
        [DataMember(Name = "codSubTipoOrden")]
        public string CodSubTipoOrden { get; set; }
        [DataMember(Name = "descripcion")]
        public string Descripcion { get; set; }
        [DataMember(Name = "tipoServicio")]
        public string TipoServicio { get; set; }
        [DataMember(Name = "tiempoMin")]
        public string TiempoMin { get; set; }
        [DataMember(Name = "idSubTipoOrden")]
        public string IdSubTipoOrden { get; set; }
        [DataMember(Name = "flagDefecto")]
        public string FlagDefecto { get; set; }
    }
}