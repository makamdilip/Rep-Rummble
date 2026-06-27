"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meal_controller_1 = require("../controllers/meal.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.protect); // All routes require authentication
router.route('/')
    .get(meal_controller_1.getMeals)
    .post(meal_controller_1.createMeal);
router.get('/stats', meal_controller_1.getMealStats);
router.route('/:id')
    .get(meal_controller_1.getMeal)
    .delete(meal_controller_1.deleteMeal);
exports.default = router;
//# sourceMappingURL=meal.routes.js.map