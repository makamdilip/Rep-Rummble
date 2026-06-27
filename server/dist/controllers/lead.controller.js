"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLead = void 0;
const Lead_model_1 = require("../models/Lead.model");
const database_1 = require("../config/database");
const memoryLeads = [];
// @desc    Create or record a lead
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
    try {
        const { email, source } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }
        if ((0, database_1.isDBConnected)()) {
            const existing = await Lead_model_1.Lead.findOne({ email: String(email).toLowerCase() });
            if (existing) {
                return res.status(200).json({
                    success: true,
                    message: 'You are already on the list.',
                    data: existing
                });
            }
            const lead = await Lead_model_1.Lead.create({ email, source });
            return res.status(201).json({
                success: true,
                message: 'Thanks! We will reach out soon.',
                data: lead
            });
        }
        const lowerEmail = String(email).toLowerCase();
        const exists = memoryLeads.some((lead) => lead.email === lowerEmail);
        if (!exists) {
            memoryLeads.push({
                email: lowerEmail,
                source,
                createdAt: new Date().toISOString()
            });
        }
        return res.status(201).json({
            success: true,
            message: 'Thanks! We will reach out soon.'
        });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({
            success: false,
            message: err.message || 'Server error'
        });
    }
};
exports.createLead = createLead;
//# sourceMappingURL=lead.controller.js.map