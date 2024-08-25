import { v } from "convex/values";

import { internalMutation, mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    subcategoryId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }
    // withIndex is the .index() we defined inside the schema for users
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique(); // will return one/ null or if more than one user throws error

    if (user === null) {
      return;
    }

    const gigId = await ctx.db.insert("gigs", {
      title: args.title,
      description: args.description,
      subcategoryId: args.subcategoryId as Id<"subcategories">,
      sellerId: user._id!,
      published: false,
      clicks: 0,
    });

    return gigId;
  },
});
