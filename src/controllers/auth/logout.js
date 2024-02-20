import { asyncWrapper } from "../../helpers/apiHelpers";
import { auth as service } from "../../services";

const logout = async (req, res) => {
  const { id } = req.user;

  await service.logout(id);

  res.sendStatus(204);
};

export default asyncWrapper(logout);
