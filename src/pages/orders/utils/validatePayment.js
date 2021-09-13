import Joi from "joi";

export default (payment) => {
	const schema = Joi.object()
		.keys({
			amount: Joi.number().required(),
			currency: Joi.string()
				.valid("USD", "SDG", "AED", "SAR")
				.required(),

		})

	return Joi.validate(payment, schema);
};
