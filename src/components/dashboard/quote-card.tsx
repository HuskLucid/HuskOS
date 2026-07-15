'use client';

import { useMemo } from 'react';

const QUOTES = [
  { t: 'The secret of getting ahead is getting started.', a: 'Mark Twain' },
  { t: 'It always seems impossible until it’s done.', a: 'Nelson Mandela' },
  { t: 'Focus is a matter of deciding what things you’re not going to do.', a: 'John Carmack' },
  { t: 'Small deeds done are better than great deeds planned.', a: 'Peter Marshall' },
  { t: 'Discipline equals freedom.', a: 'Jocko Willink' },
];

export function QuoteCard() {
  const q = useMemo(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]!, []);
  return (
    <div className="card-elevated flex flex-col justify-between p-6">
      <p className="text-lg font-medium leading-snug tracking-tight">“{q.t}”</p>
      <p className="mt-4 text-sm text-muted-foreground">— {q.a}</p>
    </div>
  );
}
