export const mockVisits = [
  {
    visId: 1,
    visDate: "2025-03-10",
    visTime: "14:30",
    visTp: "visit", // "visit": 방문, "face": 영상통화
    visRelation: "가족",
    visCnt: 3,
    visApply: "pending", // pending: 대기, permited: 승인, rejected: 거절
  },
  {
    visId: 2,
    visDate: "2025-03-11",
    visTime: "16:00",
    visTp: "face",
    visRelation: "친구",
    visCnt: 2,
    visApply: "permited",
  },
  {
    visId: 3,
    visDate: "2025-03-12",
    visTime: "10:00",
    visTp: "visit",
    visRelation: "이웃",
    visCnt: 1,
    visApply: "rejected",
  },
];
