"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFoods = void 0;
const axios_1 = __importDefault(require("axios"));
const USDA_BASE_URL = 'https://api.nal.usda.gov/fdc/v1';
const getApiKey = () => {
    const apiKey = process.env.USDA_API_KEY;
    if (!apiKey) {
        throw new Error('USDA_API_KEY is not configured');
    }
    return apiKey;
};
const nutrientAliases = {
    calories: { ids: [1008], names: ['Energy', 'Energy (Atwater General Factors)'] },
    protein: { ids: [1003], names: ['Protein'] },
    carbs: { ids: [1005], names: ['Carbohydrate, by difference'] },
    fat: { ids: [1004], names: ['Total lipid (fat)'] },
    fiber: { ids: [1079], names: ['Fiber, total dietary'] },
    sugar: { ids: [2000], names: ['Sugars, total including NLEA'] },
    sodium: { ids: [1093], names: ['Sodium, Na'] }
};
const toNumber = (value) => {
    if (typeof value === 'number' && Number.isFinite(value))
        return value;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
};
const round = (value) => Math.round(value * 10) / 10;
const findNutrient = (nutrients, ids, names) => {
    if (!nutrients)
        return 0;
    const byId = nutrients.find((n) => n.nutrientId && ids.includes(n.nutrientId));
    if (byId?.value !== undefined)
        return toNumber(byId.value);
    const byName = nutrients.find((n) => n.nutrientName && names.includes(n.nutrientName));
    if (byName?.value !== undefined)
        return toNumber(byName.value);
    return 0;
};
const normalizeNutrients = (nutrients) => {
    return {
        calories: round(findNutrient(nutrients, nutrientAliases.calories.ids, nutrientAliases.calories.names)),
        protein: round(findNutrient(nutrients, nutrientAliases.protein.ids, nutrientAliases.protein.names)),
        carbs: round(findNutrient(nutrients, nutrientAliases.carbs.ids, nutrientAliases.carbs.names)),
        fat: round(findNutrient(nutrients, nutrientAliases.fat.ids, nutrientAliases.fat.names)),
        fiber: round(findNutrient(nutrients, nutrientAliases.fiber.ids, nutrientAliases.fiber.names)),
        sugar: round(findNutrient(nutrients, nutrientAliases.sugar.ids, nutrientAliases.sugar.names)),
        sodium: round(findNutrient(nutrients, nutrientAliases.sodium.ids, nutrientAliases.sodium.names))
    };
};
const searchFoods = async (query, pageSize = 12) => {
    const apiKey = getApiKey();
    const response = await axios_1.default.get(`${USDA_BASE_URL}/foods/search`, {
        params: {
            api_key: apiKey,
            query,
            pageSize,
            pageNumber: 1
        }
    });
    const foods = response.data?.foods || [];
    return foods.map((food) => ({
        fdcId: food.fdcId,
        name: food.description || 'Unknown food',
        brand: food.brandName || null,
        dataType: food.dataType || 'Unknown',
        nutrientsPer100g: normalizeNutrients(food.foodNutrients)
    }));
};
exports.searchFoods = searchFoods;
exports.default = {
    searchFoods: exports.searchFoods
};
//# sourceMappingURL=usda.service.js.map