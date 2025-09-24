import { prisma } from '#app/client/index.js';
import { accessTokenSecret } from '#app/config.js';
import { compareHash } from '#app/crypto/hash.js';
import jwt from 'jsonwebtoken';
import type { Context } from 'koa';

export const getUser = async (ctx: Context) => {
  const { params: { username } } = ctx;
  const user = await prisma.user.findFirst({
    where: {
      email: username,
    },
  });

  ctx.body = user;
};

export const signin = async (ctx: Context) => {
  const { username, password } = (ctx.request as any).body;
  const user = await prisma.user.findFirst({
    select: {
      id: true,
      userCredential: {
        select: {
          password: true,
        },
      },
    },
    where: {
      email: username,
    },
  });

  if (!user) {
    ctx.status = 404; // NOT FOUND
    return;
  }

  // Validate password against stored hash
  const hashPassword = user.userCredential!.password;
  const isValid = compareHash(password, hashPassword);

  if (isValid) {
    // Credentials are valid, so return a JWT
    const token = jwt.sign({ username }, accessTokenSecret, {
      expiresIn: '1h',
    });

    ctx.body = { token, userId: user.id };
    return;
  }

  ctx.status = 401; // UNAUTHORIZED
};

export const signout = (ctx: Context) => {
  jwt.sign({}, accessTokenSecret!, {
    expiresIn: '1s', // Expire the token immediately
  });

  ctx.body = { success: true };
};
