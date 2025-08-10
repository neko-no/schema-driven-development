import "@typespec/http";

using Http;
@service(#{ title: "Notice Service" })
namespace SDDService;

const noticeExample: Notice = #{
  id: 1,
  title: "Notice Title",
  content: "Notice Content",
  released_at: plainDate.fromISO("2025-08-10T00:00:00Z"),
  created_at: utcDateTime.fromISO("2025-08-10T00:00:00Z"),
  updated_at: utcDateTime.fromISO("2025-08-10T00:00:00Z"),
};

@example(noticeExample)
model Notice {
  id: int32;
  title: string;
  content: string;
  released_at: plainDate;
  created_at: utcDateTime;
  updated_at: utcDateTime;
}

@route("/notices")
interface NoticesService {
  @get
  @doc("Get all notices")
  @summary("Retrive all notices")
  @opExample(#{ parameters: #{ page: 1, limit: 10 } })
  getNotices(@query page?: integer, @query limit?: integer): Notice[];

  @get
  @doc("Get a specific notice by ID")
  @summary("Retrice a notice by ID")
  @opExample(#{ parameters: #{ id: "fafasdfasdfadfasdfa" } })
  getNotice(@path id: string): Notice;
}
