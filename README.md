### Just expirenting NEXTJS
## Todo app with edit and delect functionality

Create a supabase account, and in the SQL editor, past the the SQL code below!

CREATE TABLE todolist (
    id SERIAL PRIMARY KEY,
    todo TEXT,
    created_at TIMESTAMP(0) DEFAULT NOW()
);
