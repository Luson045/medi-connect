const { z } = require("zod");

const hospitalSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 characters long"),
  address: z.object({
    street: z.string().min(3, "Street should be at least 3 characters long"),
    city: z.string().min(2, "City should be at least 2 characters long"),
    state: z.string().min(2, "State should be at least 2 characters long"),
  }),
  phone: z.string().optional(),
});

module.exports = { hospitalSchema };
