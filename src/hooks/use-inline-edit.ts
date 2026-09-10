"use client";

import { useState } from "react";

interface UseInlineEditOptions<T> {
  value: T;
  onSave: (value: T) => Promise<boolean>;
}

export function useInlineEdit<T>({ value, onSave }: UseInlineEditOptions<T>) {
  const [draft, setDraft] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const startEdit = () => {
    setDraft(value);
    setIsEditing(true);
  };

  const cancel = () => {
    setDraft(value);
    setIsEditing(false);
  };

  const save = async () => {
    setIsSaving(true);
    try {
      if (await onSave(draft)) {
        setIsEditing(false);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return { value: draft, setValue: setDraft, isEditing, isSaving, startEdit, cancel, save };
}
