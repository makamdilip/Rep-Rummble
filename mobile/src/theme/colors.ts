// Midnight Blue + Purple — Trident theme
export const colors = {
  // Backgrounds
  bg:         '#0d0f1a',  // main screen background
  bgDeep:     '#080b14',  // deepest dark (auth, overlays)
  card:       '#161b2e',  // card / section background
  cardAlt:    '#1a2040',  // slightly lighter card variant
  border:     '#2d3561',  // borders, dividers
  borderSoft: '#1e2a4a',  // subtle borders

  // Text
  textPrimary:   '#f1f5f9',  // headings, primary text
  textSecondary: '#94a3b8',  // subtext, labels
  textMuted:     '#6b7280',  // placeholder, disabled

  // Brand accent
  accent:      '#7c3aed',  // violet — primary accent
  accentLight: '#a78bfa',  // light violet — highlights

  // Semantic colors (keep fitness meaning)
  green:  '#22c55e',  // nutrition / success
  orange: '#f97316',  // streak / fire
  yellow: '#eab308',  // XP / star
  red:    '#ef4444',  // error / danger
  blue:   '#6366f1',  // info / secondary

  // Leaderboard medals
  gold:   '#ffd700',
  silver: '#c0c0c0',
  bronze: '#cd7f32',
} as const;
