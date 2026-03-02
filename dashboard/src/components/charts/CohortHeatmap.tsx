import type { CohortRow } from "../../types";

interface Props {
  data: CohortRow[];
}

function getColor(value: number): string {
  if (value >= 50) return "#C9A96E";
  if (value >= 35) return "#8A7346";
  if (value >= 20) return "#4A3F28";
  if (value >= 10) return "#2A2520";
  if (value > 0) return "#1E1C18";
  return "transparent";
}

export default function CohortHeatmap({ data }: Props) {
  const maxMonths = Math.max(...data.map((r) => r.months.length));
  const headers = Array.from({ length: maxMonths }, (_, i) => `M${i}`);

  return (
    <div className="bg-bg-card border border-border rounded-lg p-5 overflow-x-auto">
      <h3 className="text-sm font-medium text-text-secondary mb-4">Client Retention Cohorts</h3>
      <table className="w-full text-xs">
        <thead>
          <tr>
            <th className="text-left text-text-muted py-2 px-2 font-medium">Cohort</th>
            {headers.map((h) => (
              <th key={h} className="text-center text-text-muted py-2 px-2 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.cohort}>
              <td className="text-text-secondary py-1 px-2 whitespace-nowrap">{row.cohort}</td>
              {row.months.map((val, i) => (
                <td key={i} className="text-center py-1 px-2">
                  <div
                    className="rounded px-2 py-1 text-text-primary font-medium"
                    style={{ backgroundColor: getColor(val) }}
                  >
                    {val > 0 ? `${val}%` : ""}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
