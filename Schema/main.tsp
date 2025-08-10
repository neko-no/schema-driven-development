import "@typespec/http";
import "./common";
import "./app";

using Http;
@service(#{ title: "Notice Service" })
namespace SDDService;
