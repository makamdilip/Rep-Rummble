import { Request, Response } from 'express'

const sampleRows = {
  monthly: [
    ['2026-01-01', '3', '2100', '140', '230', '70'],
    ['2026-01-08', '4', '2050', '135', '220', '65'],
    ['2026-01-15', '5', '2150', '150', '240', '68']
  ],
  yearly: [
    ['2025-01', '18', '62000', '4200', '6800', '2100'],
    ['2025-06', '20', '63000', '4300', '6900', '2200'],
    ['2025-12', '22', '64000', '4400', '7000', '2300']
  ],
  historical: [
    ['2024', '180', '720000', '48000', '72000', '24000'],
    ['2025', '210', '760000', '51000', '75000', '25500']
  ]
} as const

// @desc    Download sample report
// @route   GET /api/reports/sample
// @access  Public
export const downloadSampleReport = (req: Request, res: Response) => {
  const period = String(req.query.period || 'monthly') as keyof typeof sampleRows
  const rows = sampleRows[period] || sampleRows.monthly
  const header = ['Date', 'Workouts', 'Calories', 'Protein(g)', 'Carbs(g)', 'Fat(g)']

  const csv = [header, ...rows].map((row) => row.join(',')).join('\n')

  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', `attachment; filename="rep-rumble-${period}-report.csv"`)
  return res.status(200).send(csv)
}
