using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.TypeofOrder
{
    public class TypeofOrderRequest : Tools.Entity.Request
    {
        [DataMember(Name = "MessageRequest")]
        public TypeofOrderMessageRequest MessageRequest { get; set; }
    }

    [DataContract(Name = "MessageRequest")]
    public class TypeofOrderMessageRequest
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderReq Header { get; set; }

        [DataMember(Name = "Body")]
        public TypeofOrderBodyRequest Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class TypeofOrderBodyRequest
    {

        [DataMember(Name = "idTransaccion")]
        public string IdTransaccion { get; set; }
        [DataMember(Name = "idProceso")]
        public string IdProceso { get; set; }
        [DataMember(Name = "idProducto")]
        public string IdProducto { get; set; }
        [DataMember(Name = "contratoId")]
        public string ContratoId { get; set; }
        [DataMember(Name = "tipTra")]
        public string TipTra { get; set; }
        [DataMember(Name = "idLista")]
        public string IdLista { get; set; }
        [DataMember(Name = "cantDeco")]
        public string cantDeco { get; set; }
    }
}