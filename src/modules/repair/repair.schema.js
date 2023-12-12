import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const repairSchema = z.object({
  date: z.string(),
  motorsNumber: z
    .string()
    .min(8, { message: 'Motors Number is too short' })
    .max(16, { message: 'Motors Number is too long' }),
  description: z
    .string()
    .min(5, { message: 'Description is too short' })
    .max(100, { message: 'Description is too long' }),
  userId: z.number(),
});

export const validateRepair = (data) => {
  const result = repairSchema.safeParse(data);
  const {
    hasError,
    errorMessage,
    data: repairData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    repairData,
  };
};
