import { auth as service } from "../../services";
import { asyncWrapper, responseData } from "../../helpers/apiHelpers";
import { convertUserData } from "../../helpers/convertUserData";

const login = async (req, res) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken, user } = await service.login({
    email,
    password,
  });

  res.status(200).json(
    responseData(
      {
        accessToken,
        refreshToken,
        user: convertUserData(user),
      },
      200
    )
  );
};

export default asyncWrapper(login);
