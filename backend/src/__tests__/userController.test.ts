import {
  handleForgotPassword,
  handleLogin,
  handleRegister,
  handleResetPassword,
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
        //1 register user already exists
        .mockResolvedValueOnce({
          id: 1,
          name: "test1",
        })
        //2 register no user success
        .mockResolvedValueOnce(null)
        //3 register no user fail
        .mockResolvedValueOnce(null)
        //4 login success
        .mockResolvedValueOnce({
          id: 1,
          name: "test2",
        })
        //5 login no user found
        .mockResolvedValueOnce(null)
        //6 login user found but email doesn't match
        .mockResolvedValueOnce({
          id: 1,
          name: "test2",
        })
        //7
        .mockResolvedValueOnce({
          id: 1,
          name: "test2",
        })
        //8
        .mockResolvedValueOnce({
          id: 1,
          name: "test2",
        })
        //9 found passwordReset repo
        .mockResolvedValueOnce({
          expiration: new Date(Date.now() + 12000),
          token: "testToken",
        })
        //10 found user for password reset
        .mockResolvedValueOnce({
          id: 1,
          name: "test2",
        })
        //11 no password reset repo
        .mockResolvedValueOnce(null)
        //12 reset link expired
        .mockResolvedValueOnce({
          expiration: new Date(Date.now() - 12000),
          token: "testToken",
        })
        //13 rest details invalid
        .mockResolvedValueOnce({
          expiration: new Date(Date.now() + 12000),
          token: "testToken",
        }),
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
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
          id: "testId",
          email: "test@email.com",
          username: "testUsername",
        }),
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
        //1
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
      //2
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
        //3
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
      //4
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
        //5
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
        //6
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
          body: {
            reDirectUrl: "testUrl",
          },
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
          reDirectUrl: "testUrl",
        },
      };
      const res: any = {
        json: jest.fn(),
        status: jest.fn(),
      };
      //7
      await handleForgotPassword(req, res);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the email is not found in the DB", async () => {
      try {
        const req: any = {
          body: {
            email: "test@email.com",
            reDirectUrl: "testUrl",
          },
        };
        const res: any = {
          json: jest.fn(),
          status: jest.fn(),
        };
        //8
        await handleForgotPassword(req, res);
      } catch (error) {
        expect(error.message).toEqual(
          "Could not find user with provided email"
        );
      }
    });
  });

  describe("handleResetPassword function testing", () => {
    it("should call the send response function if a password is reset successfully", async () => {
      const req: any = {
        body: {
          userId: "testId",
          resetString: "testResetString",
          newPassword: "testPassword",
        },
      };
      const res: any = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn(),
      };
      //9 & 10
      await handleResetPassword(req, res);
      expect(res.send).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if there is no reset scheduled in the DB", async () => {
      try {
        const req: any = {
          body: {
            userId: "testId",
            resetString: "testResetString",
            newPassword: "testPassword",
          },
        };
        const res: any = {
          json: jest.fn(),
          send: jest.fn(),
          status: jest.fn(),
        };
        //11
        await handleResetPassword(req, res);
      } catch (error) {
        expect(error.message).toEqual("Password reset request not found");
      }
    });

    it("should throw an error if the reset link has expired", async () => {
      try {
        const req: any = {
          body: {
            userId: "testId",
            resetString: "testResetString",
            newPassword: "testPassword",
          },
        };
        const res: any = {
          json: jest.fn(),
          send: jest.fn(),
          status: jest.fn(),
        };
        //12
        await handleResetPassword(req, res);
      } catch (error) {
        expect(error.message).toEqual("Reset link has expired");
      }
    });

    it("should throw an error if the reset string doesn't match the saved token", async () => {
      try {
        const req: any = {
          body: {
            userId: "testId",
            resetString: "testResetString",
            newPassword: "testPassword",
          },
        };
        const res: any = {
          json: jest.fn(),
          send: jest.fn(),
          status: jest.fn(),
        };
        //13
        await handleResetPassword(req, res);
      } catch (error) {
        expect(error.message).toEqual("Invalid reset details");
      }
    });
  });
});
