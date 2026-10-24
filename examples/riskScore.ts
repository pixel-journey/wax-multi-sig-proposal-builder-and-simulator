import type { Risk, RiskLevel } from "./types";

const POINTS: Record<RiskLevel, number> = {
  high: 25,
  medium: 12,
  low: 0,
};

/** Additive heuristic 0–100 from risk list (baseline 10 if any high/medium). */
export function aggregateRiskScore(risks: Risk[]): {
  score: number;
  label: "low" | "moderate" | "high" | "critical";
} {
  const structural = risks.filter((r) => r.id !== "ok");
  let score = structural.some((r) => r.level !== "low") ? 10 : 0;
  for (const r of structural) score += POINTS[r.level] ?? 0;
  score = Math.min(100, score);

  let label: "low" | "moderate" | "high" | "critical" = "low";
  if (score >= 75) label = "critical";
  else if (score >= 55) label = "high";
  else if (score >= 35) label = "moderate";

  return { score, label };
}
