const { z } = require("zod");

const appointmentSchema = z.object({
  userId: z.string().length(24, "Invalid user ID"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  reason: z.string().min(5, "Reason should be at least 5 characters long"),
});

const updateAppointmentSchema = z.object({
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  reason: z.string().optional(),
  status: z.enum(["pending", "confirmed", "canceled"]),
});

module.exports = { appointmentSchema, updateAppointmentSchema };
