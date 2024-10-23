import slugify from "slugify";

export default function slugifyMongoose(text) {
  return slugify(text, {
    lower: true,
    trim: true,
    locale: 'vi',
  });
}