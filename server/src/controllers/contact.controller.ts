import { Request, Response } from 'express'
import { Contact } from '../models/Contact.model'
import { isDBConnected } from '../config/database'
import { ApiError } from '../types'

type ContactEntry = {
  name: string
  email: string
  message: string
  createdAt: string
}

const memoryContacts: ContactEntry[] = []

// @desc    Create contact message
// @route   POST /api/contact
// @access  Public
export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      })
    }

    if (isDBConnected()) {
      const contact = await Contact.create({ name, email, message })
      return res.status(201).json({
        success: true,
        message: 'Message sent. We will reply soon.',
        data: contact
      })
    }

    memoryContacts.push({
      name,
      email: String(email).toLowerCase(),
      message,
      createdAt: new Date().toISOString()
    })

    return res.status(201).json({
      success: true,
      message: 'Message sent. We will reply soon.'
    })
  } catch (error) {
    const err = error as ApiError
    return res.status(500).json({
      success: false,
      message: err.message || 'Server error'
    })
  }
}
