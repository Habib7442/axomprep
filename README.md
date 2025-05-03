# MathQuest

MathQuest is an interactive, gamified learning platform designed for math students in grades 8–12 (ages ~13–18). It delivers engaging lessons, practice problems, and quests for topics like algebra, geometry, and trigonometry.

## Features

- **Interactive Lessons**: Structured content with explanations, examples, and problems.
- **Practice Problems**: Various question types including input-based and multiple-choice questions.
- **Progress Tracking**: Dashboard showing XP, completed lessons, and recommendations.
- **Authentication**: Secure user authentication with Supabase.

## Tech Stack

- **Frontend**: Next.js (React), Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Realtime, Storage)
- **Math Rendering**: KaTeX (to be implemented)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/maths-quest.git
cd maths-quest
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Set up the Supabase database:

- Create a new Supabase project
- Run the SQL script in `supabase/schema.sql` to set up the database schema

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js app router pages
- `components/`: Reusable React components
- `lib/`: Utility functions and Supabase client
- `supabase/`: Database schema and migrations

## Development Phases

This project is being developed in phases:

### Phase 1: Foundation and MVP (Current)

- Basic platform with lessons, problems, and authentication
- Simple UI components and layouts
- Database schema setup

### Future Phases

- Enhanced gameplay and question types
- Monetization and practice mode
- Community features
- Polish and scale

## License

This project is licensed under the MIT License - see the LICENSE file for details.
