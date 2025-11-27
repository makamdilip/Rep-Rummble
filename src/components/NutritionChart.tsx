import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

interface NutritionChartProps {
  carbs: number
  protein: number
  fat: number
}

export function NutritionChart({ carbs, protein, fat }: NutritionChartProps) {
  const data = [
    { name: 'Carbs', value: carbs, color: '#FBBF24' },
    { name: 'Protein', value: protein, color: '#00FF88' },
    { name: 'Fat', value: fat, color: '#60A5FA' },
  ]

  const totalMacros = carbs + protein + fat

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card-glass p-6"
    >
      <h3 className="text-lg font-semibold text-app mb-4">
        Macro Distribution
      </h3>
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => {
                const macroClass =
                  entry.name === "Carbs"
                    ? "macro-carb"
                    : entry.name === "Protein"
                    ? "macro-protein"
                    : "macro-fat";
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className={`${macroClass} pie-cell-shadow`}
                  />
                );
              })}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={36}
              content={({ payload }) => (
                <div className="flex justify-center gap-6 mt-4">
                  {payload?.map((entry, index) => {
                    const name = (entry as any)?.payload?.name as
                      | string
                      | undefined;
                    const macroClass =
                      name === "Carbs"
                        ? "macro-carb"
                        : name === "Protein"
                        ? "macro-protein"
                        : "macro-fat";
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`legend-dot ${macroClass}`} />
                        <span className="text-sm text-gray-300">
                          {entry.value}:{" "}
                          <span className="font-semibold text-app">
                            {((data[index].value / totalMacros) * 100).toFixed(
                              0
                            )}
                            %
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
