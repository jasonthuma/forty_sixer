import {
  deleteHike,
  getHikes,
  handleCreateHike,
  handleUpdateHike,
} from "../controllers/hikeController";

jest.mock("../data-source.ts", () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      findBy: jest
        .fn()
        .mockResolvedValueOnce([
          { id: "test1", hikers: "test1" },
          { id: "test2", hikers: "test2" },
        ])
        .mockResolvedValueOnce(null),
      findOneBy: jest
        .fn()
        .mockResolvedValueOnce({
          id: 1,
          name: "test1",
        })
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
          id: 1,
          name: "test2",
        })
        .mockResolvedValueOnce(null),
      create: jest.fn(),
      merge: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    }),
  },
}));

describe("hikeController testing", () => {
  describe("getHikes function testing", () => {
    it("should call the json function if hikes are found", async () => {
      const req: any = {
        user: {
          id: "testId",
        },
      };
      const res: any = {
        json: jest.fn(),
        status: jest.fn(),
      };
      await getHikes(req, res);
      expect(res.json).toBeCalledTimes(1);
    });

    it("should throw an error if no hikes are found", async () => {
      try {
        const req: any = {
          user: {
            id: "testId",
          },
        };
        const res: any = {
          json: jest.fn(),
          status: jest.fn(),
        };
        await getHikes(req, res);
      } catch (error) {
        expect(error.message).toEqual("No hikes found");
      }
    });
  });

  describe("handleCreateHike function testing", () => {
    it("should throw an error if not all expected fields are present in the req body", async () => {
      try {
        const req: any = {
          user: {
            id: "testId",
          },
          body: {
            hikeDate: "testDate",
            weather: "testWeather",
            tripReport: "testReport",
            mountainName: "testMountainName",
          },
        };
        const res: any = {
          json: jest.fn(),
          status: jest.fn(),
        };
        await handleCreateHike(req, res);
      } catch (error) {
        expect(error.message).toEqual("Please add all fields");
      }
    });

    it("should call the json function if the hike is created", async () => {
      const req: any = {
        user: {
          id: "testId",
        },
        body: {
          hikeDate: "testDate",
          hikers: "testHikers",
          weather: "testWeather",
          tripReport: "testReport",
          mountainName: "testMountainName",
        },
      };
      const res: any = {
        json: jest.fn(),
        status: jest.fn(),
      };
      await handleCreateHike(req, res);
      expect(res.json).toBeCalledTimes(1);
    });

    it("should throw an error if the provided mountain name doesn't exist", async () => {
      try {
        const req: any = {
          user: {
            id: "testId",
          },
          body: {
            hikeDate: "testDate",
            hikers: "testHikers",
            weather: "testWeather",
            tripReport: "testReport",
            mountainName: "testMountainName",
          },
        };
        const res: any = {
          json: jest.fn(),
          status: jest.fn(),
        };
        await handleCreateHike(req, res);
      } catch (error) {
        expect(error.message).toEqual("Mountain not found");
      }
    });
  });

  describe("handleUpdateHike function testing", () => {
    it("should call the json function if the hike was found and updated", async () => {
      const req: any = {
        params: {
          id: "testId",
        },
      };
      const res: any = {
        send: jest.fn(),
        status: jest.fn(),
      };
      await handleUpdateHike(req, res);
      expect(res.send).toBeCalledTimes(1);
    });

    it("should throw an error if the requested hike to update was not found", async () => {
      try {
        const req: any = {
          params: {
            id: "testId",
          },
        };
        const res: any = {
          send: jest.fn(),
          status: jest.fn(),
        };
        await handleUpdateHike(req, res);
      } catch (error) {
        expect(error.message).toEqual("Hike not found");
      }
    });
  });

  describe("deleteHike function testing", () => {
    it("should call the send function if the hike gets deleted", async () => {
      const req: any = {
        params: {
          id: "testId",
        },
      };
      const res: any = {
        send: jest.fn(),
        status: jest.fn(),
      };
      await deleteHike(req, res);
      expect(res.send).toBeCalledTimes(1);
    });
  });
});
