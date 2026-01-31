import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { AuthRequest } from "../middleware/auth.middleware"
import { ApiError } from "../types"
import * as supabaseService from "../services/supabase.service"
import * as oracleService from "../services/oracle.service"

// Generate JWT Token (fallback for non-Supabase auth)
const generateToken = (id: string): string => {
  const options = {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  } as jwt.SignOptions
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret", options)
}

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, displayName } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      })
    }

    // Use Supabase for registration
    const result = await supabaseService.signUpWithEmail(email, password, { displayName })

    if (!result.success || !result.user) {
      return res.status(400).json({
        success: false,
        message: result.error || "Registration failed",
      })
    }

    // Create user in Oracle Database
    if (oracleService.isOracleConnected()) {
      await oracleService.createUser({
        id: result.user.id,
        email: result.user.email!,
        displayName: displayName || undefined,
      })
    }

    // Generate our own token as well
    const token = generateToken(result.user.id)

    return res.status(201).json({
      success: true,
      data: {
        user: {
          id: result.user.id,
          email: result.user.email,
          displayName: displayName || result.user.user_metadata?.displayName,
        },
        token,
      },
    })
  } catch (error) {
    const err = error as ApiError
    console.error("Register error:", err)
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    })
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      })
    }

    // Use Supabase for login
    const result = await supabaseService.signInWithEmail(email, password)

    if (!result.success || !result.user) {
      return res.status(401).json({
        success: false,
        message: result.error || "Invalid credentials",
      })
    }

    // Get additional user data from Oracle if available
    let userData: any = {
      id: result.user.id,
      email: result.user.email,
      displayName: result.user.user_metadata?.displayName,
    }

    if (oracleService.isOracleConnected()) {
      const oracleUser = await oracleService.getUserById(result.user.id)
      if (oracleUser) {
        userData = { ...userData, ...oracleUser }
      }
    }

    return res.json({
      success: true,
      data: {
        user: userData,
        token: result.session?.access_token || generateToken(result.user.id),
        refreshToken: result.session?.refresh_token,
      },
    })
  } catch (error) {
    const err = error as ApiError
    console.error("Login error:", err)
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    })
  }
}

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      })
    }

    // Get user from Supabase
    const supabaseResult = await supabaseService.getUserById(userId)

    // Get additional data from Oracle
    let oracleData: any = null
    if (oracleService.isOracleConnected()) {
      oracleData = await oracleService.getUserById(userId)
    }

    const userData = {
      id: userId,
      email: supabaseResult.user?.email,
      displayName: supabaseResult.user?.user_metadata?.displayName || oracleData?.display_name,
      ...oracleData,
    }

    return res.json({
      success: true,
      data: userData,
    })
  } catch (error) {
    const err = error as ApiError
    console.error("GetMe error:", err)
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    })
  }
}

// @desc    Get OAuth URL
// @route   GET /api/auth/oauth/:provider
// @access  Public
export const getOAuthUrl = async (req: Request, res: Response) => {
  try {
    const provider = req.params.provider as 'google' | 'facebook' | 'apple' | 'twitter'
    const redirectTo = req.query.redirect as string || process.env.CLIENT_URL + '/auth/callback'

    const validProviders = ['google', 'facebook', 'apple', 'twitter']
    if (!validProviders.includes(provider)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OAuth provider",
      })
    }

    const result = await supabaseService.getOAuthUrl(provider, redirectTo)

    if (!result.url) {
      return res.status(500).json({
        success: false,
        message: result.error || "Failed to generate OAuth URL",
      })
    }

    // Redirect to OAuth provider
    return res.redirect(result.url)
  } catch (error) {
    const err = error as ApiError
    console.error("OAuth error:", err)
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    })
  }
}

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req: AuthRequest, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (token) {
      await supabaseService.signOut(token)
    }

    return res.json({
      success: true,
      message: "Logged out successfully",
    })
  } catch (error) {
    const err = error as ApiError
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    })
  }
}

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const { displayName, photoUrl, ...profileData } = req.body

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      })
    }

    // Update in Supabase
    if (displayName || photoUrl) {
      await supabaseService.updateUserMetadata(userId, { displayName, photoUrl })
    }

    // Update in Oracle
    if (oracleService.isOracleConnected()) {
      await oracleService.updateUser(userId, {
        display_name: displayName,
        photo_url: photoUrl,
        ...profileData,
      })
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
    })
  } catch (error) {
    const err = error as ApiError
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    })
  }
}
