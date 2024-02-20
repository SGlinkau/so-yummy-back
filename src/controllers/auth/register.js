import { randomUUID } from "crypto";
import { url } from "gravatar";

import { auth as service, user as userService } from "../../services";
import { asyncWrapper, responseData } from "../../helpers/apiHelpers";
import { DatabaseError } from "../../helpers/errors";
import { convertUserData } from "../../helpers/convertUserData";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const candidate = await userService.getUserByEmail(email);

  if (candidate) {
    throw new DatabaseError("Email is already in use");
  }

  const avatarURL = "https:" + url(email);
  const verificationToken = randomUUID();
  const user = await service.register({
    name,
    email,
    password,
    avatarURL,
    verificationToken,
  });

  res.status(201).json(
    responseData(
      {
        user: convertUserData(user),
      },
      201
    )
  );
};

export default asyncWrapper(register);
