import type { Session } from '@prisma/client';

declare module 'h3' {
  interface H3EventContext {
    session: Session;
  }
}
