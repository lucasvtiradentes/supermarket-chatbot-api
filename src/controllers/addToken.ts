import jwt from 'jsonwebtoken'

export default function generateAccessToken(req, res) {
  res.json({ generatedToken: jwt.sign(req.body.username, process.env.ACCESS_TOKEN_SECRET) });
}
