import { prisma } from "@/lib/prisma"
import { ActionType } from "@prisma/client"
import { ipAddress } from "@vercel/functions"
import { NextRequest } from "next/server"

export const CreateLog = async (message: string, level: "INFO" | "WARN" | "ERROR" = "INFO", email: string, request?: NextRequest, action?: ActionType, userAgent?: string) => {
    return await prisma.user.update({
        where: {
            email: email
        },
        data: {
            logs: {
                create: {
                    message,
                    level,
                    ip: request ? (ipAddress(request) || request.headers.get('x-forwarded-for')) : null,
                    userAgent,
                    action
                }
            }
        }
    })
}