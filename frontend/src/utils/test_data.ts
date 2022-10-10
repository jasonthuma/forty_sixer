import { IHike } from "../@types/hike";

export const test_hikes_with_duplicates: IHike[] = [
  {
    id: "testId1",
    hikeDate: "2022-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report1",
    userId: "testUserId",
    mountainId: 1,
  },
  {
    id: "testId2",
    hikeDate: "2022-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report2",
    userId: "testUserId",
    mountainId: 2,
  },
  {
    id: "testId3",
    hikeDate: "2022-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report3",
    userId: "testUserId",
    mountainId: 3,
  },
  {
    id: "testId4",
    hikeDate: "2022-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report4",
    userId: "testUserId",
    mountainId: 8,
  },
  {
    id: "testId5",
    hikeDate: "2022-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report5",
    userId: "testUserId",
    mountainId: 1,
  },
  {
    id: "testId6",
    hikeDate: "2022-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report6",
    userId: "testUserId",
    mountainId: 10,
  },
];

export const test_hikes_no_duplicates: IHike[] = [
  {
    id: "testId1",
    hikeDate: "2022-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report1",
    userId: "testUserId",
    mountainId: 1,
  },
  {
    id: "testId2",
    hikeDate: "2022-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report2",
    userId: "testUserId",
    mountainId: 2,
  },
  {
    id: "testId3",
    hikeDate: "2022-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report3",
    userId: "testUserId",
    mountainId: 3,
  },
  {
    id: "testId4",
    hikeDate: "2022-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report4",
    userId: "testUserId",
    mountainId: 8,
  },
  {
    id: "testId5",
    hikeDate: "2022-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report5",
    userId: "testUserId",
    mountainId: 9,
  },
  {
    id: "testId6",
    hikeDate: "2022-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report6",
    userId: "testUserId",
    mountainId: 10,
  },
];
