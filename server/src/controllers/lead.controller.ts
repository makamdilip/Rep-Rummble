import { Request, Response } from 'express'
import { Lead } from '../models/Lead.model'
import { isDBConnected } from '../config/database'
import { ApiError } from '../types'

type LeadEntry = {
  email: string
  source?: string
  createdAt: string
}

const memoryLeads: LeadEntry[] = []

// @desc    Create or record a lead
// @route   POST /api/leads
// @access  Public
export const createLead = async (req: Request, res: Response) => {
  try {
    const { email, source } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      })
    }

    if (isDBConnected()) {
      const existing = await Lead.findOne({ email: String(email).toLowerCase() })
      if (existing) {
        return res.status(200).json({
          success: true,
          message: 'You are already on the list.',
          data: existing
        })
      }

      const lead = await Lead.create({ email, source })
      return res.status(201).json({
        success: true,
        message: 'Thanks! We will reach out soon.',
        data: lead
      })
    }

    const lowerEmail = String(email).toLowerCase()
    const exists = memoryLeads.some((lead) => lead.email === lowerEmail)
    if (!exists) {
      memoryLeads.push({
        email: lowerEmail,
        source,
        createdAt: new Date().toISOString()
      })
    }

    return res.status(201).json({
      success: true,
      message: 'Thanks! We will reach out soon.'
    })
  } catch (error) {
    const err = error as ApiError
    return res.status(500).json({
      success: false,
      message: err.message || 'Server error'
    })
  }
}
