import { motion } from 'framer-motion'
import { Flame, Wheat, Drumstick, Droplet } from 'lucide-react'

interface NutritionCardProps {
  calories: number
  carbs: number
  protein: number
  fat: number
  fiber?: number
}

export function NutritionCard({ calories, carbs, protein, fat }: NutritionCardProps) {
  const macros = [
    {
      icon: <Flame className="text-secondary" size={20} />,
      label: 'Calories',
      value: calories,
      unit: 'kcal',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: <Wheat className="text-amber-400" size={20} />,
      label: 'Carbs',
      value: carbs,
      unit: 'g',
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10',
    },
    {
      icon: <Drumstick className="text-primary" size={20} />,
      label: 'Protein',
      value: protein,
      unit: 'g',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: <Droplet className="text-blue-400" size={20} />,
      label: 'Fat',
      value: fat,
      unit: 'g',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {macros.map((macro, idx) => (
        <motion.div
          key={macro.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className={`${macro.bgColor} rounded-xl p-4 border border-card backdrop-blur-sm`}
        >
          <div className="flex items-center gap-2 mb-2">
            {macro.icon}
            <span className="text-xs text-gray-400 font-medium">
              {macro.label}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-bold ${macro.color}`}>
              {macro.value}
            </span>
            <span className="text-xs text-gray-500">{macro.unit}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

interface DetailedNutritionProps {
  foodName: string
  calories: number
  carbs: number
  protein: number
  fat: number
  fiber: number
  servingSize: string
  confidence: number
}

export function DetailedNutrition({
  foodName,
  calories,
  carbs,
  protein,
  fat,
  fiber,
  servingSize,
  confidence,
}: DetailedNutritionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card-glass p-6 space-y-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-app mb-1">{foodName}</h3>
          <p className="text-sm text-gray-400">{servingSize}</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">AI Confidence</div>
          <div className="text-sm font-semibold text-primary">
            {confidence}%
          </div>
        </div>
      </div>

      <NutritionCard
        calories={calories}
        carbs={carbs}
        protein={protein}
        fat={fat}
        fiber={fiber}
      />

      {fiber > 0 && (
        <div className="pt-3 border-t border-card">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Fiber</span>
            <span className="text-app font-semibold">{fiber}g</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
