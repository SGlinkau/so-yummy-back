import { asyncWrapper } from "../../helpers/apiHelpers";
import { updateTokensById } from "../../services/auth";

const { FRONT_END_URL } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;
  const { accessToken, refreshToken } = await updateTokensById(id);

  res.redirect(
    `${FRONT_END_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
};

export default asyncWrapper(googleAuth);
