import { Id } from "./_generated/dataModel.d";
import { mutation, query } from "./_generated/server";

const categories = [
  { name: "Web Development" },
  { name: "Mobile Development" },
  { name: "Design" },
  { name: "Writing" },
  { name: "Marketing" },
  { name: "Data Science" },
  { name: "Artificial Intelligence" },
  { name: "Game Development" },
  { name: "Finance" },
  { name: "Photography" },
];

export const create = mutation({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const categories = await ctx.db.query("categories").collect();
    if (categories.length > 0) return;

    categories.map(async (category) => {
      await ctx.db.insert("categories", {
        name: category.name,
      });
    });

    return;
  },
});
