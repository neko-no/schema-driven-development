import "@typespec/http";
using Http;

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

model NoticeListResponse {
    ...OkResponse;
    ...Body<Notice[]>;
}

model NoticeResponse {
    ...OkResponse;
    ...Body<Notice>;
}
