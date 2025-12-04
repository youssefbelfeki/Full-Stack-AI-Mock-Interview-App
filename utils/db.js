import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon("postgresql://neondb_owner:npg_uZQTV5rmt7Rh@ep-twilight-tooth-a4zn7jgu-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
//const sql = neon(NEXT_PUBLIC_DATABASE_URL)
export const db = drizzle({ client: sql });
