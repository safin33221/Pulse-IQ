import { Button } from "@/components/ui/button";

type SegmentedControlOption = {
    label: string;
    value: string;
};

type SegmentedControlProps = {
    options: SegmentedControlOption[];
    value: string;
    onChange: (value: string) => void;
};

function SegmentedControl({
    options,
    value,
    onChange,
}: SegmentedControlProps) {
    return (
        <div className="flex h-7 w-full items-center rounded-full border bg-muted/50 p-0.5">
            {options.map((option) => {
                const active = option.value === value;

                return (
                    <Button
                        key={option.value}
                        type="button"
                        variant={active ? "default" : "ghost"}
                        size="sm"
                        onClick={() => onChange(option.value)}
                        className={[
                            "h-full flex-1 rounded-full px-2 text-[10px] font-medium transition-all",
                            active
                                ? "bg-card text-foreground shadow-sm hover:bg-card"
                                : "text-muted-foreground hover:bg-transparent hover:text-foreground",
                        ].join(" ")}
                    >
                        {option.label}
                    </Button>
                );
            })}
        </div>
    );
}

export default SegmentedControl;