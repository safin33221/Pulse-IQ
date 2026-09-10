import { Pencil } from "lucide-react";
import { FormEvent } from "react";
import { InlineEditActions } from "@/components/module/profile/InlineEditActions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useInlineEdit } from "@/hooks/use-inline-edit";
import { UpdateMyProfileDto, IUser } from "@/types/user/user.type";

export function ProfileHeader({ user, onSave }: { user: IUser; onSave: (payload: UpdateMyProfileDto) => Promise<boolean> }) {
  const fullName = user.name || user.username || "Pulse IQ User";
  const name = useInlineEdit({ value: fullName, onSave: (value) => onSave({ name: value.trim() }) });
  const bio = useInlineEdit({ value: user.bio ?? "", onSave: (value) => onSave({ bio: value.trim() }) });
  const submit = (event: FormEvent, save: () => Promise<void>) => { event.preventDefault(); void save(); };
  return <div className="min-w-0 flex-1">
    {name.isEditing ? <form onSubmit={(event) => submit(event, name.save)} className="flex items-center gap-2"><Input value={name.value} onChange={(event) => name.setValue(event.target.value)} autoFocus maxLength={50} className="h-9 min-w-0 flex-1 px-2 text-xl font-semibold sm:h-10 sm:text-2xl" /><InlineEditActions isSaving={name.isSaving} onCancel={name.cancel} /></form> : <div className="flex items-center gap-1.5"><h1 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">{fullName}</h1><button type="button" onClick={name.startEdit} className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Edit name"><Pencil className="size-3.5" /></button></div>}
    {bio.isEditing ? <form onSubmit={(event) => submit(event, bio.save)} className="mt-2 flex items-start gap-2"><Textarea value={bio.value} onChange={(event) => bio.setValue(event.target.value)} autoFocus maxLength={500} placeholder="Tell us about yourself..." className="min-h-16 min-w-0 flex-1 resize-none px-2.5 py-2 text-sm leading-6 sm:text-base" /><InlineEditActions isSaving={bio.isSaving} onCancel={bio.cancel} /></form> : <div className="mt-1.5 flex items-start gap-1.5"><p className="min-w-0 flex-1 text-sm leading-6 text-muted-foreground sm:text-base">{user.bio || "Tell us about yourself..."}</p><button type="button" onClick={bio.startEdit} className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Edit bio"><Pencil className="size-3.5" /></button></div>}
    <p className="mt-1.5 truncate text-xs leading-5 text-muted-foreground sm:text-sm">{user.email}</p><div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground sm:text-xs"><span>{user.role.toLowerCase()}</span><span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-muted-foreground/40" /><span>27 read this week</span></div>
  </div>;
}
