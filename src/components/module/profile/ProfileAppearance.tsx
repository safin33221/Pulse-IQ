import SegmentedControl from "@/components/shared/SegmentedControl";
import { ProfileSection } from "@/components/module/profile/ProfileSection";
export function ProfileAppearance({ theme, onThemeChange }: { theme: string; onThemeChange: (value: string) => void }) { return <ProfileSection label="APPEARANCE"><SegmentedControl options={[{ label: "Light", value: "light" }, { label: "Dark", value: "dark" }]} value={theme} onChange={onThemeChange} /></ProfileSection>; }
