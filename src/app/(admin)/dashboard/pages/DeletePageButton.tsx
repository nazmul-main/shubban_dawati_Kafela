'use client';

import React, { useTransition } from 'react';
import { deletePage } from '@/actions/pages';
import { Trash2 } from 'lucide-react';

export default function DeletePageButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      startTransition(async () => {
        const res = await deletePage(id);
        if (res.error) {
          alert(res.error);
        }
      });
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isPending}
      className="btn btn-sm btn-outline"
      style={{ color: 'red', borderColor: 'red', padding: '0.25rem 0.5rem' }}
      title="Delete Page"
    >
      <Trash2 size={14} /> {isPending ? '...' : ''}
    </button>
  );
}
