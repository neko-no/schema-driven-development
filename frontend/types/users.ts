import { z } from 'zod';

// User schema
export const userSchema = z.object({
	id: z.number(),
	name: z.string(),
	username: z.string(),
	email: z.string().email(),
	address: z.object({
		street: z.string(),
		suite: z.string(),
		city: z.string(),
		zipcode: z.string(),
		geo: z.object({
			lat: z.string(),
			lng: z.string(),
		}),
	}),
	phone: z.string(),
	website: z.string(),
	company: z.object({
		name: z.string(),
		catchPhrase: z.string(),
		bs: z.string(),
	}),
});

export type User = z.infer<typeof userSchema>;

// GetUserOptions schema
export const getUserOptionsSchema = z.object({
	page: z.number().optional(),
	limit: z.number().optional(),
});

export type GetUserOptions = z.infer<typeof getUserOptionsSchema>;

// UserPagination schema
export const userPaginationSchema = z.object({
	users: z.array(userSchema),
	pagination: z.object({
		currentPage: z.number(),
		totalPages: z.number(),
		totalItems: z.number(),
		hasMore: z.boolean(),
	}),
});

export type UserPagination = z.infer<typeof userPaginationSchema>;
