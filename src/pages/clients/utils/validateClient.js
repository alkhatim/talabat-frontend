import Joi from "joi";

export default (client) => {
  const schema = Joi.object()
    .keys({
      _id: Joi.string().min(24).max(24).allow(""),
      name: Joi.string().min(3).required(),
      gender: Joi.string().valid("MALE","FEMALE").allow(""),
      age: Joi.string().allow(""),
      phone: Joi.string().min(8).max(12).required(),
      phone2: Joi.string().min(8).max(12).allow(""),
      address: Joi.string().allow(""),
    })
    .unknown(true);

  return Joi.validate(client, schema);
};
