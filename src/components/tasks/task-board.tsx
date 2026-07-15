'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Check, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'doing' | 'done';
  priority: 'low' | 'medium' | 'high';
}

async function fetchTasks(): Promise<Task[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('tasks')
    .select('id, title, status, priority')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Task[];
}

export function TaskBoard() {
  const qc = useQueryClient();
  const [title, setTitle] = useState('');
  const { data: tasks = [], isLoading } = useQuery({ queryKey: ['tasks'], queryFn: fetchTasks });

  const add = useMutation({
    mutationFn: async (t: string) => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');
      const { error } = await supabase.from('tasks').insert({ profile_id: user.id, title: t });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const toggle = useMutation({
    mutationFn: async (task: Task) => {
      const supabase = createClient();
      const next = task.status === 'done' ? 'todo' : 'done';
      const { error } = await supabase
        .from('tasks')
        .update({ status: next, completed_at: next === 'done' ? new Date().toISOString() : null })
        .eq('id', task.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const supabase = createClient();
      const { error } = await supabase.from('tasks').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    add.mutate(title.trim());
    setTitle('');
  }

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="flex gap-2">
        <Input
          placeholder="Add a task and press Enter…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit" disabled={add.isPending}>
          <Plus /> Add
        </Button>
      </form>

      <div className="card-elevated divide-y divide-border p-0">
        {isLoading ? (
          <p className="p-6 text-center text-sm text-muted-foreground">Loading…</p>
        ) : tasks.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted-foreground">
            No tasks yet. Add your first above.
          </p>
        ) : (
          <AnimatePresence initial={false}>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 px-4 py-3"
              >
                <button
                  onClick={() => toggle.mutate(task)}
                  className={cn(
                    'flex size-5 items-center justify-center rounded-md border transition-colors',
                    task.status === 'done'
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-border hover:border-accent',
                  )}
                >
                  {task.status === 'done' && <Check className="size-3.5" />}
                </button>
                <span
                  className={cn(
                    'flex-1 text-sm',
                    task.status === 'done' && 'text-muted-foreground line-through',
                  )}
                >
                  {task.title}
                </span>
                <button
                  onClick={() => remove.mutate(task.id)}
                  className="text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                >
                  <Trash2 className="size-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
