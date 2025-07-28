import { createDecorator, getContext } from '@getcronit/pylon';
import { verify } from 'hono/jwt';

export const requireAuth = createDecorator(async () => {
  const ctx = getContext();

  const authHeader = ctx.req.header('Authorization');

  if (!authHeader) {
    throw new Error('Authorization header is missing');
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new Error('Invalid Authorization header format');
  }

  if (!ctx.env.AUTH_KEY) {
    throw new Error('AUTH_KEY environment variable is not set');
  }

  const claims = (await verify(token, ctx.env.AUTH_KEY)) as { sub: string };

  ctx.set('user', claims);
});
