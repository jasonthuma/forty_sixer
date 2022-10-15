import { handleAuth } from "../middleware/authMiddleware";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn().mockReturnValue({ id: "jwrfgjjwefjn" }),
}));

jest.mock("../data-source.ts", () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      findOneBy: jest.fn().mockResolvedValue({
        id: "testId",
      }),
    }),
  },
}));

describe("authMiddleware testing", () => {
  const next = jest.fn(() => {});

  describe("when having a valid user token", () => {
    const headers = {
      authorization: "Bearer testToken",
    };

    const request: any = {
      headers,
    };
    const response: any = {
      status: jest.fn(),
    };
    it("should call the next function if everything succeeds", async () => {
      await handleAuth(request, response, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe("when not having a token", () => {
    const headers: any = {};

    const request: any = {
      headers,
    };
    const response: any = {
      status: jest.fn(),
    };
    it("should throw an error", async () => {
      try {
        await handleAuth(request, response, next);
      } catch (error) {
        expect(error.message).toEqual("Not authorized, no token");
      }
    });
  });
});
