import { prisma } from "@/lib/prisma";
import { deleteMessage } from "../actions/messages";
import DeleteLink from "@/components/admin/DeleteLink";

async function getMessages() {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Beskeder</h1>
        <p className="mt-1 text-slate-400">
          Kontaktbeskeder fra besøgende ({messages.length} i alt)
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
          <p className="text-slate-400">Ingen beskeder modtaget endnu</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">{message.name}</p>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-sm text-sky-400 hover:underline"
                  >
                    {message.email}
                  </a>
                </div>
                <div className="text-right">
                  <time className="text-xs text-slate-500">
                    {new Date(message.createdAt).toLocaleDateString("da-DK", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </time>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-slate-800/50 p-4">
                <p className="whitespace-pre-wrap text-sm text-slate-300">
                  {message.message}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <a
                  href={`mailto:${message.email}?subject=Re: Besked fra ${message.name}`}
                  className="text-sm text-sky-400 hover:underline"
                >
                  Svar via email
                </a>
                <DeleteLink
                  action={deleteMessage.bind(null, message.id)}
                  label="Slet besked"
                  confirmMessage="Er du sikker på at du vil slette denne besked?"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
