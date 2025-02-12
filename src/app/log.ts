import { prisma } from "@/lib/prisma"
import { realIP } from "@/utils/constants"
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
                    ip: realIP(request!, true) || ipAddress(request!),
                    userAgent,
                    action
                }
            }
        }
    })
}