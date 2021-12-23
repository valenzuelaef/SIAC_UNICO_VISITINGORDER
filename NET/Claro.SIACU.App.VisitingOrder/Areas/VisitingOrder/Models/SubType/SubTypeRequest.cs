using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.SubType
{
    public class SubTypeRequest : Tools.Entity.Request
    {
        [DataMember(Name = "MessageRequest")]
        public SubTypeMessageRequest MessageRequest { get; set; }
    }

    [DataContract(Name = "MessageRequest")]
    public class SubTypeMessageRequest
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderReq Header { get; set; }

        [DataMember(Name = "Body")]
        public SubTypeBodyRequest Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class SubTypeBodyRequest
    {

        [DataMember(Name = "idTransaccion")]
        public string IdTransaccion { get; set; }
        [DataMember(Name = "idProceso")]
        public string IdProceso { get; set; }
        [DataMember(Name = "idProducto")]
        public string IdProducto { get; set; }
        [DataMember(Name = "tipTrab")]
        public string TipTrab { get; set; }
    }
}