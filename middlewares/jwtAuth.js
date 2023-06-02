import { expressjwt } from 'express-jwt';

const secretKey = process.env.JWT_SECRET;


export function jwtMiddleware(req, res, next) {
    expressjwt({
        secret: secretKey,
        algorithms: ['HS256']
    }).unless({
        path: [
            {url: '/users', methods: ['POST']},
            '/login',
        ]
    })
        (req, res, next);
}
