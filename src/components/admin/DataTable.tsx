import Link from "next/link";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
  editPath?: string;
  onDelete?: (id: string) => void;
  deleteAction?: (formData: FormData) => Promise<void>;
}

export default function DataTable<T extends { id: string }>({
  data,
  columns,
  editPath,
  deleteAction,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="text-left py-3 px-4 text-slate-400 font-medium"
              >
                {col.label}
              </th>
            ))}
            {(editPath || deleteAction) && (
              <th className="text-right py-3 px-4 text-slate-400 font-medium">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (editPath || deleteAction ? 1 : 0)}
                className="py-8 text-center text-slate-500"
              >
                No data found
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-800 hover:bg-slate-800/50"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="py-3 px-4">
                    {col.render
                      ? col.render(item)
                      : String((item as Record<string, unknown>)[col.key as string] ?? "")}
                  </td>
                ))}
                {(editPath || deleteAction) && (
                  <td className="py-3 px-4 text-right space-x-2">
                    {editPath && (
                      <Link
                        href={`${editPath}/${item.id}/edit`}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        Edit
                      </Link>
                    )}
                    {deleteAction && (
                      <form action={deleteAction} className="inline">
                        <input type="hidden" name="id" value={item.id} />
                        <button
                          type="submit"
                          className="text-red-400 hover:text-red-300 transition-colors"
                          onClick={(e) => {
                            if (!confirm("Are you sure you want to delete this?")) {
                              e.preventDefault();
                            }
                          }}
                        >
                          Delete
                        </button>
                      </form>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
