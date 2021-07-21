import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import remark from "remark";
import remarkHtml from "remark-html";

export function getMarkdownSlugs(folderPath) {
  return fs.readdirSync(join(process.cwd(), folderPath));
}

export function getMarkdownBySlug(slug, folderPath, fields = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(folderPath, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (data[field]) {
      items[field] = data[field];
    }
  });
  return items;
}

export function getAllMarkdowns(folderPath = "", fields = []) {
  const slugs = getMarkdownSlugs(folderPath);
  const markdowns = slugs
    .map((slug) => {
      if (slug === "assets") return null; // assets folder
      return getMarkdownBySlug(slug, folderPath, fields);
    })
    .filter((markdown) => !!markdown);

  return markdowns;
}

export default function markdownToHtml(markdown) {
  const result = remark().use(remarkHtml, { sanitize: true }).processSync(markdown);
  return result.toString();
}
