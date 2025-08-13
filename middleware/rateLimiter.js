const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis"); // dikkat: destructure ile

const Redis = require("ioredis");
const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

const apiLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redisClient.call(...args)
    }),
    windowMs: 60 * 1000,
    max: 10,
    message: "Çok fazla istek yaptınız. Lütfen daha sonra tekrar deneyin.",
    handler: (req, res) => {
        const ip = req.ip;
        redisClient.sadd(`blocked_ips`, ip, 'EX', 60);
        res.status(429).json({
            message: "Çok fazla istek yaptınız. Lütfen daha sonra tekrar deneyin."
        });
    }
});

module.exports = apiLimiter;
