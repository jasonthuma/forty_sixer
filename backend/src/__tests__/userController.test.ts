import {
  handleForgotPassword,
  handleGetLoggedUser,
  handleLogin,
  handleRegister,
  handleResetPassword,
  generateToken,
} from "../controllers/userController";

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
        .mockResolvedValueOnce(null)

        .mockResolvedValueOnce({
          id: 1,
          name: "test2",
        })

        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
          id: 1,
          name: "test2",
        })
        .mockResolvedValueOnce({
          id: 1,
          name: "test2",
        })
        .mockResolvedValueOnce(null),
      create: jest.fn().mockResolvedValue({
        email: "test@email.com",
        username: "testUsername",
        password: "testHashedPassword",
      }),
      merge: jest.fn(),
      save: jest
        .fn()
        .mockResolvedValueOnce({
          id: "testId",
          email: "test@email.com",
          username: "testUsername",
        })
        .mockResolvedValueOnce(null),
      delete: jest.fn(),
    }),
  },
}));

jest.mock("../../../node_modules/bcryptjs", () => ({
  genSalt: jest.fn().mockResolvedValue("testSalt"),
  hash: jest.fn().mockResolvedValue("testHashedPassword"),
  compare: jest
    .fn()
    .mockResolvedValueOnce(true)
    .mockResolvedValueOnce(true)
    .mockResolvedValueOnce(false),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("testToken"),
}));

jest.mock("../utils/sendEmail.ts", () => ({
  sendEmail: jest.fn().mockResolvedValueOnce(true),
}));

describe("userController testing", () => {
  describe("handleRegister function testing", () => {
    it("should throw an error if not all fields are present in the request body", async () => {
      try {
        const req: any = {
          body: {
            username: "testUsername",
            password: "testPassword",
          },
        };
        const res: any = {
          json: jest.fn(),
          status: jest.fn(),
        };

        await handleRegister(req, res);
      } catch (error) {
        expect(error.message).toEqual("Please add all fields");
      }
    });

    it("should throw an error if the user already exists", async () => {
      try {
        const req: any = {
          body: {
            username: "testUsername",
            email: "test@email.com",
            password: "testPassword",
          },
        };
        const res: any = {
          json: jest.fn(),
          status: jest.fn(),
        };

        await handleRegister(req, res);
      } catch (error) {
        expect(error.message).toEqual("User already exists");
      }
    });

    it("should call the json function if the user is created successfully", async () => {
      const req: any = {
        body: {
          username: "testUsername",
          email: "test@email.com",
          password: "testPassword",
        },
      };
      const res: any = {
        json: jest.fn(),
        status: jest.fn(),
      };

      await handleRegister(req, res);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if it fails to save the user to the DB", async () => {
      try {
        const req: any = {
          body: {
            username: "testUsername",
            email: "test@email.com",
            password: "testPassword",
          },
        };
        const res: any = {
          json: jest.fn(),
          status: jest.fn(),
        };

        await handleRegister(req, res);
      } catch (error) {
        expect(error.message).toEqual("Failed to register new user");
      }
    });
  });

  describe("handleLogin function testing", () => {
    it("should throw an error if the request body does not contain all fields", async () => {
      try {
        const req: any = {
          body: {
            username: "testUsername",
          },
        };
        const res: any = {
          json: jest.fn(),
          status: jest.fn(),
        };
        await handleLogin(req, res);
      } catch (error) {
        expect(error.message).toEqual("Please add all fields");
      }
    });

    it("should call the json function if the username and password match a user in the DB", async () => {
      const req: any = {
        body: {
          email: "test@email.com",
          password: "testPassword",
        },
      };
      const res: any = {
        json: jest.fn(),
        status: jest.fn(),
      };
      await handleLogin(req, res);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if no user is found with the provided email", async () => {
      try {
        const req: any = {
          body: {
            email: "test@email.com",
            password: "testPassword",
          },
        };
        const res: any = {
          json: jest.fn(),
          status: jest.fn(),
        };
        await handleLogin(req, res);
      } catch (error) {
        expect(error.message).toEqual("Username or password is incorrect");
      }
    });

    it("should throw an error if user is found but password does not match", async () => {
      try {
        const req: any = {
          body: {
            email: "test@email.com",
            password: "testPassword",
          },
        };
        const res: any = {
          json: jest.fn(),
          status: jest.fn(),
        };
        await handleLogin(req, res);
      } catch (error) {
        expect(error.message).toEqual("Username or password is incorrect");
      }
    });
  });

  describe("handleForgotPassword function testing", () => {
    it("should throw an error if email is not present in request body", async () => {
      try {
        const req: any = {
          body: {},
        };
        const res: any = {
          json: jest.fn(),
          status: jest.fn(),
        };
        await handleForgotPassword(req, res);
      } catch (error) {
        expect(error.message).toEqual("Email is required");
      }
    });

    it("should call the json function if the user exists in DB", async () => {
      const req: any = {
        body: {
          email: "test@email.com",
        },
      };
      const res: any = {
        json: jest.fn(),
        status: jest.fn(),
      };
      await handleForgotPassword(req, res);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the email is not found in the DB", async () => {
      try {
        const req: any = {
          body: {
            email: "test@email.com",
          },
        };
        const res: any = {
          json: jest.fn(),
          status: jest.fn(),
        };
        await handleForgotPassword(req, res);
      } catch (error) {
        expect(error.message).toEqual(
          "Could not find user with provided email"
        );
      }
    });
  });
});
