
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample mining data
const generateMiningData = (days: number) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Create a fluctuating mining value with general upward trend
    const baseValue = 0.025 + (days - i) * 0.005;
    const randomFactor = Math.random() * 0.02 - 0.01; // Random variation +/- 0.01
    
    data.push({
      date: date.toISOString().substring(0, 10),
      tokens: Number((baseValue + randomFactor).toFixed(4)),
    });
  }
  
  return data;
};

export default function MiningStats() {
  const [timeRange, setTimeRange] = useState<7 | 14 | 30>(7);
  const [miningData, setMiningData] = useState(() => generateMiningData(7));
  
  // Update data when time range changes
  useEffect(() => {
    setMiningData(generateMiningData(timeRange));
  }, [timeRange]);
  
  return (
    <div className="bg-dark-card rounded-lg border border-white/10 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Mining Performance</h3>
        <div className="flex space-x-2">
          {[7, 14, 30].map((days) => (
            <button
              key={days}
              onClick={() => setTimeRange(days as 7 | 14 | 30)}
              className={`text-xs px-3 py-1 rounded-full ${
                timeRange === days
                  ? "bg-cyber-blue text-white"
                  : "bg-dark-accent text-gray-400"
              }`}
            >
              {days}d
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={miningData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }}
              axisLine={{ stroke: '#334155' }}
              tickLine={{ stroke: '#334155' }}
            />
            <YAxis 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={{ stroke: '#334155' }}
              tickLine={{ stroke: '#334155' }}
              width={35}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.375rem'
              }}
              labelStyle={{ color: '#e2e8f0' }}
              itemStyle={{ color: '#22d3ee' }}
              formatter={(value: number) => [`${value} tokens`, 'Mined']}
              labelFormatter={(label) => {
                const date = new Date(label);
                return date.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                });
              }}
            />
            <Line 
              type="monotone" 
              dataKey="tokens" 
              stroke="#22d3ee" 
              strokeWidth={2}
              dot={{ r: 3, fill: '#22d3ee', stroke: '#22d3ee', strokeWidth: 1 }}
              activeDot={{ r: 5, fill: '#22d3ee', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="p-3 rounded-lg bg-dark-bg border border-white/5">
          <p className="text-xs text-gray-400">Today</p>
          <p className="text-lg font-semibold text-white">
            {miningData[miningData.length - 1].tokens} <span className="text-xs text-cyber-green">+2.4%</span>
          </p>
        </div>
        <div className="p-3 rounded-lg bg-dark-bg border border-white/5">
          <p className="text-xs text-gray-400">Average</p>
          <p className="text-lg font-semibold text-white">
            {(miningData.reduce((sum, day) => sum + day.tokens, 0) / miningData.length).toFixed(4)}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-dark-bg border border-white/5">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-lg font-semibold text-white">
            {miningData.reduce((sum, day) => sum + day.tokens, 0).toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  );
}
