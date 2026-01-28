import { Router } from 'express'
import { downloadSampleReport } from '../controllers/report.controller'

const router = Router()

router.get('/sample', downloadSampleReport)

export default router
