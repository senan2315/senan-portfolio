"use client";

type Props = {
  action: () => Promise<void>;
  label?: string;
  confirmMessage?: string;
};

export default function DeleteLink({
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
        className="text-xs text-rose-400 hover:underline"
      >
        {label}
      </button>
    </form>
  );
}
