import {
  getAllMountains,
  handleMountainById,
  handleMountainByName,
} from "../controllers/mountainController";

jest.mock("../data-source.ts", () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      find: jest
        .fn()
        .mockResolvedValueOnce([
          { id: 1, name: "test1" },
          { id: 2, name: "test2" },
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
    }),
  },
}));

describe("mountainController testing", () => {
  describe("getAllMountains function testing", () => {
    it("should call the json function if mountains are found", async () => {
      const req: any = {};
      const res: any = {
        json: jest.fn(),
      };
      await getAllMountains(req, res);

      expect(res.json).toBeCalledTimes(1);
    });
    it("should throw an error if no mountains are found", async () => {
      try {
        const req: any = {};
        const res: any = {
          json: jest.fn(),
          status: jest.fn(),
        };
        await getAllMountains(req, res);
      } catch (error) {
        expect(error.message).toEqual("No mountains found");
      }
    });
  });

  describe("getMountainById testing", () => {
    it("should call the send function if a mountain is found", async () => {
      const req: any = {
        params: {
          id: 1,
        },
      };
      const res: any = {
        send: jest.fn(),
      };
      await handleMountainById(req, res);
      expect(res.send).toBeCalledTimes(1);
    });

    it("should throw an error if no mountain matches the requested id", async () => {
      try {
        const req: any = {
          params: {
            id: 50,
          },
        };
        const res: any = {
          send: jest.fn(),
          status: jest.fn(),
        };
        await handleMountainById(req, res);
      } catch (error) {
        expect(error.message).toEqual("Mountain not found");
      }
    });
  });

  describe("getMountainByName testing", () => {
    it("should call the send function if a mountain is found", async () => {
      const req: any = {
        query: {
          name: "test1",
        },
      };
      const res: any = {
        send: jest.fn(),
      };
      await handleMountainByName(req, res);
      expect(res.send).toBeCalledTimes(1);
    });
    it("should throw an error if no mountain matches the requested name", async () => {
      try {
        const req: any = {
          query: {
            name: "test50",
          },
        };
        const res: any = {
          send: jest.fn(),
          status: jest.fn(),
        };
        await handleMountainByName(req, res);
      } catch (error) {
        expect(error.message).toEqual("Mountain not found");
      }
    });
  });
});
