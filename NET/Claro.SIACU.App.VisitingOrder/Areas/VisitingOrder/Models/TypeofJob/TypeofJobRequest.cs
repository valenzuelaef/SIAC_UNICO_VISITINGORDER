using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.TypeofJob
{
    public class TypeofJobRequest : Tools.Entity.Request
    {
        [DataMember(Name = "MessageRequest")]
        public TypeofJobMessageRequest MessageRequest { get; set; }
    }

    [DataContract(Name = "MessageRequest")]
    public class TypeofJobMessageRequest
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderReq Header { get; set; }

        [DataMember(Name = "Body")]
        public TypeofJobBodyRequest Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class TypeofJobBodyRequest
    {

        [DataMember(Name = "idTransaccion")]
        public string IdTransaccion { get; set; }
        [DataMember(Name = "idProceso")]
        public string IdProceso { get; set; }
        [DataMember(Name = "idProducto")]
        public string IdProducto { get; set; }
        [DataMember(Name = "tecnologia")]
        public string Tecnologia { get; set; }
    }
}