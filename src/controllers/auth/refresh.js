import { verify } from "jsonwebtoken";
import { asyncWrapper, responseData } from "../../helpers/apiHelpers";
import { ForbiddenError } from "../../helpers/errors";
import { getUserByRefreshToken } from "../../services/user";
import { updateTokensById } from "../../services/auth";

const { JWT_REFRESH_SECRET } = process.env;

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;

  try {
    const { id } = verify(token, JWT_REFRESH_SECRET);
    const user = await getUserByRefreshToken(token);

    if (!user) {
      throw new ForbiddenError(403, "Invalid token");
    }

    const { accessToken, refreshToken } = await updateTokensById(id);

    res.status(200).json(
      responseData(
        {
          accessToken,
          refreshToken,
        },
        200
      )
    );
  } catch (error) {
    throw new ForbiddenError("Invalid token");
  }
};

export default asyncWrapper(refresh);
