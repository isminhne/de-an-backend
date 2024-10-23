import slugifyMongoose from "../../helpers/slugifyMongoose.js";


const slugifyPlugin = (schema, options = {}) => {
  const { sourceField = "title", slugField = "slug", maxTries = 10 } = options;

  schema.pre("save", async function(next) {
    try {
      if (!this.isModified(sourceField)) return next();

      let slug = slugifyMongoose(this[sourceField]); // Generate slug based on sourceField
      let i = 0;
      let existingSlug = await this.constructor.exists({ [slugField]: slug });

      // Loop to ensure uniqueness of the slug
      while (existingSlug && i < maxTries) {
        const titleAppended = `${this[sourceField]} ${i}`;
        slug = slugifyMongoose(titleAppended);
        existingSlug = await this.constructor.exists({ [slugField]: slug });
        i++;
      }

      if (i === maxTries) {
        throw new Error('Generated slug is too generic, try a different string.');
      }

      this[slugField] = slug; // Assign the final unique slug to the document

      next();
    } catch (error) {
      next(error); // Pass any error to the next middleware
    }
  });
};

export default slugifyPlugin;