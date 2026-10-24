"use client";

import { useMemo, useState } from "react";
import {
  filterProposalsByName,
  normalizeProposalRows,
} from "./proposalRows";

export function TableRowsPanel(props: {
  label: string;
  rows: unknown[] | null;
  onPickProposalName?: (name: string) => void;
}) {
  const [query, setQuery] = useState("");
  const normalized = useMemo(
    () => (props.rows ? normalizeProposalRows(props.rows) : []),
    [props.rows]
  );
  const filtered = useMemo(
    () => filterProposalsByName(normalized, query),
    [normalized, query]
  );

  if (!props.rows) return null;

  return (
    <details className="text-[10px] opacity-80" open>
      <summary>
        On-chain {props.label} · raw {props.rows.length} · named{" "}
        {normalized.length}
        {query.trim() ? ` · shown ${filtered.length}` : ""}
      </summary>
      {props.label === "proposal" && normalized.length > 0 && (
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter proposal name"
          className="mt-2 w-full bg-black/60 border border-white/10 rounded px-2 py-1 font-mono text-[10px]"
        />
      )}
      {props.label === "proposal" && filtered.length > 0 ? (
        <ul className="mt-2 space-y-1 font-mono">
          {filtered.map((r) => (
            <li key={r.proposalName} className="border-b border-white/5 py-1">
              <button
                type="button"
                className="text-emerald-400 underline"
                onClick={() => props.onPickProposalName?.(r.proposalName)}
              >
                {r.proposalName}
              </button>
              {r.packedTransaction && (
                <span className="opacity-40 ml-2">
                  packed {r.packedTransaction.slice(0, 16)}…
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : null}
      <pre className="overflow-x-auto mt-2 max-h-40 opacity-50">
        {JSON.stringify(props.rows, null, 2)}
      </pre>
    </details>
  );
}
