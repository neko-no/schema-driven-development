import "@typespec/http";
import "../../common";

using Http;
@service(#{ title: "Notice Service" })
@server("https://localhost", "テストサーバー")
namespace SDDService;

@route("/notices")
interface NoticesService {
    @get
    @doc("Get all notices")
    @summary("Retrive all notices")
    @opExample(#{ parameters: #{ page: 1, limit: 10 } })
    getNotices(
        @query page?: integer,
        @query limit?: integer,
    ): NoticeListResponse | SDDServiceBadRequestResponse | SDDServiceInternalServerErrorResponse;

    @get
    @doc("Get a specific notice by ID")
    @summary("Retrice a notice by ID")
    @opExample(#{ parameters: #{ id: "fafasdfasdfadfasdfa" } })
    getNotice(@path id: string):
        | NoticeResponse
        | SDDServiceBadRequestResponse
        | SDDServiceNotFoundResponse
        | SDDServiceInternalServerErrorResponse;
}
