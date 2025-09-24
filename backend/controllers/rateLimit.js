import { Ratelimit } from "@upstash/ratelimit";
import redis from "../Cong/upstash.js";


const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(20, "1 m")
})


export default async function handler(req, res, next) {
    try {
        const identifier = req.ip || 'anonymous'


        const { success } = await ratelimit.limit(identifier)

        if (!success) {
            return res.status(429).json({ error: 'Too many requests' })
        }
        next()
            //res.status(200).json({ message: 'Success' })
    } catch (error) {
        return res.status(429).json(error)
    }
}