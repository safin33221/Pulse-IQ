type ToggleProps = {
    enabled: boolean;
    onClick: () => void;
};

export function Toggle({ enabled, onClick }: ToggleProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={enabled}
            aria-label={enabled ? "Disable" : "Enable"}
            onClick={onClick}
            className={[
                "relative h-4 w-7 shrink-0 rounded-full transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                enabled ? "bg-primary" : "bg-muted",
            ].join(" ")}
        >
            <span
                aria-hidden="true"
                className={[
                    "absolute top-0.5 left-0.5 size-3 rounded-full",
                    "bg-background shadow-sm transition-transform duration-200",
                    enabled ? "translate-x-3" : "translate-x-0",
                ].join(" ")}
            />
        </button>
    );
}