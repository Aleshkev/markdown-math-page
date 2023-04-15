import { defineCollection, z } from 'astro:content';

const cheatsheets = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		authors: z.string().transform((val) => val.split(", ")),
	}),
});

export const collections = { cheatsheets: cheatsheets };
