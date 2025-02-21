import { defineSchema, defineTable, } from 'convex/server';
import { v } from "convex/values"

const s = v;
export default defineSchema({

    users: defineTable({
        id: v.string(),
        name: v.optional(v.string()),
        email: v.string(),
        emailVerified: v.optional(v.string()),
        image: v.optional(v.string()),
        createdAt: v.string(),
        updatedAt: v.string(),
        isDeleted: v.boolean(),
    }),
    logs: defineTable({
        id: s.string(),
        createdAt: v.string(),
        userId: s.string(),
        message: s.string(),
        level: s.string(),
        ip: s.optional(s.string()),
        userAgent: s.optional(s.string()),
        action: s.optional(s.string()),
    }),
    projects: defineTable({
        id: s.string(),
        name: s.string(),
        description: s.string(),
        image: s.optional(s.string()),
        type: s.string(),
        createdAt: s.string(),
        updatedAt: s.string(),
        userId: s.string(),
        scheduleConfig: s.optional(s.object({
            id: s.string(),
            schedule: s.string(),
            timezone: s.string(),
            enabled: s.boolean(),
            createdAt: s.string(),
            updatedAt: s.string(),
        })),
        serverCode: s.optional(s.string()),
        visibleCode: s.optional(s.string()),
        nodes: s.array(s.string()),
        edges: s.array(s.string()),
        status: s.string(),
        flowCount: s.number(),
    }),
});