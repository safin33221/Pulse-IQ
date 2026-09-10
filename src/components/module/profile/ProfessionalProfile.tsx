import { FormEvent } from "react";
import { Pencil } from "lucide-react";
import { InlineEditActions } from "@/components/module/profile/InlineEditActions";
import { Input } from "@/components/ui/input";
import { useInlineEdit } from "@/hooks/use-inline-edit";
import { IProfessionalProfile, IUser, UpdateMyProfileDto } from "@/types/user/user.type";

type EditableProfessionalProfile = Pick<IProfessionalProfile, "jobTitle" | "company" | "industry" | "location" | "yearsOfExperience" | "linkedinUrl">;

export function ProfessionalProfile({ user, onSave }: { user: IUser; onSave: (payload: UpdateMyProfileDto) => Promise<boolean> }) {
  const initial: EditableProfessionalProfile = {
    jobTitle: user.professionalProfile?.jobTitle ?? null,
    company: user.professionalProfile?.company ?? null,
    industry: user.professionalProfile?.industry ?? null,
    location: user.professionalProfile?.location ?? null,
    yearsOfExperience: user.professionalProfile?.yearsOfExperience ?? null,
    linkedinUrl: user.professionalProfile?.linkedinUrl ?? null,
  };
  const edit = useInlineEdit({ value: initial, onSave: (professionalProfile) => onSave({ professionalProfile }) });
  const update = <K extends keyof EditableProfessionalProfile>(key: K, value: EditableProfessionalProfile[K]) => edit.setValue({ ...edit.value, [key]: value });
  const submit = (event: FormEvent) => { event.preventDefault(); void edit.save(); };
  const values = [
    { label: "Job title", value: user.professionalProfile?.jobTitle },
    { label: "Company", value: user.professionalProfile?.company },
    { label: "Industry", value: user.professionalProfile?.industry },
    { label: "Location", value: user.professionalProfile?.location },
    { label: "Experience", value: user.professionalProfile?.yearsOfExperience == null ? undefined : `${user.professionalProfile.yearsOfExperience} years` },
    { label: "LinkedIn", value: user.professionalProfile?.linkedinUrl },
  ];
  return <section className="mt-8 border-t pt-6"><div className="mb-4 flex items-start justify-between"><div><h2 className="text-base font-semibold">Professional profile</h2><p className="mt-1 text-sm text-muted-foreground">Tell us about your professional background</p></div>{edit.isEditing ? <InlineEditActions isSaving={edit.isSaving} onCancel={edit.cancel} onSave={() => void edit.save()} /> : <button type="button" onClick={edit.startEdit} className="text-muted-foreground hover:text-foreground" aria-label="Edit professional profile"><Pencil className="size-4" /></button>}</div>
    {edit.isEditing ? <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2"><Input placeholder="Job title" value={edit.value.jobTitle ?? ""} onChange={(event) => update("jobTitle", event.target.value || null)} /><Input placeholder="Company" value={edit.value.company ?? ""} onChange={(event) => update("company", event.target.value || null)} /><Input placeholder="Industry" value={edit.value.industry ?? ""} onChange={(event) => update("industry", event.target.value || null)} /><Input placeholder="Location" value={edit.value.location ?? ""} onChange={(event) => update("location", event.target.value || null)} /><Input type="number" min={0} placeholder="Years of experience" value={edit.value.yearsOfExperience ?? ""} onChange={(event) => update("yearsOfExperience", event.target.value === "" ? null : Number(event.target.value))} /><Input type="url" placeholder="LinkedIn URL" value={edit.value.linkedinUrl ?? ""} onChange={(event) => update("linkedinUrl", event.target.value || null)} /></form> : <div className="grid gap-3 sm:grid-cols-2">{values.map((item) => <div key={item.label} className="rounded-xl border bg-card p-4"><p className="text-xs font-medium text-muted-foreground">{item.label}</p><p className="mt-1.5 truncate text-sm font-medium">{item.value || "Not added"}</p></div>)}</div>}
  </section>;
}
