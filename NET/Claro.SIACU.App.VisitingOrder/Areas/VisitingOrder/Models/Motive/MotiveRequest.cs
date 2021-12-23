using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Models.Motive
{
    public class MotiveRequest : Tools.Entity.Request
    {
        [DataMember(Name = "MessageRequest")]
        public MotiveMessageRequest MessageRequest { get; set; }
    }

    [DataContract(Name = "MessageRequest")]
    public class MotiveMessageRequest
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderReq Header { get; set; }

        [DataMember(Name = "Body")]
        public MotiveBodyRequest Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class MotiveBodyRequest
    {

        [DataMember(Name = "idTransaccion")]
        public string IdTransaccion { get; set; }
        [DataMember(Name = "idProceso")]
        public string IdProceso { get; set; }
        [DataMember(Name = "idProducto")]
        public string IdProducto { get; set; }
        [DataMember(Name = "tipTra")]
        public string TipTra { get; set; }
        [DataMember(Name = "tipMotivo")]
        public string TipMotivo { get; set; }

        [DataMember(Name = "origen")]
        public string Origen { get; set; }
        [DataMember(Name = "idPlano")]
        public string IdPlano { get; set; }
        [DataMember(Name = "ubigeo")]
        public string Ubigeo { get; set; }
        [DataMember(Name = "tipSrv")]
        public string TipSrv { get; set; }

    }
}