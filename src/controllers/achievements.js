import { asyncWrapper, responseData } from "../helpers/apiHelpers";
import { achievements as service } from "../services";

const getAchievements = async (req, res) => {
  const { id } = req.user;
  const result = await service.achievements(id);

  res.json(
    responseData(
      {
        result,
      },
      200
    )
  );
};

export const get = asyncWrapper(getAchievements);
