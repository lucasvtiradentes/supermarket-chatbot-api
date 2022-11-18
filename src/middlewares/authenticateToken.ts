import jwt from 'jsonwebtoken'

export default function authenticateToken(req, res, next) {

  const token = req.body.token;

  if (!token) { res.sendStatus(401); }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log('user not authenticated');
      return res.sendStatus(403);
    }

    req.user = user;
    console.log(`${user} is authenticated`);
    next();

  });
}

