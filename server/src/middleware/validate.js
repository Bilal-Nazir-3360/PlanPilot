export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] || "body";
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      }

      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    req.body = result.data;
    return next();
  };
}
