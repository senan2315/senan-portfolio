"use client";

type Props = {
  action: () => Promise<void>;
  label?: string;
  confirmMessage?: string;
};

export default function DeleteButton({
  action,
  label = "Slet",
  confirmMessage = "Er du sikker?"
}: Props) {
  return (
    <form
      action={async () => {
        if (confirm(confirmMessage)) {
          await action();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-400 transition hover:bg-rose-500/20"
      >
        {label}
      </button>
    </form>
  );
}
