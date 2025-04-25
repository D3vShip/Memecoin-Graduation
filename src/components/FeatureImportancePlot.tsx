import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Feature {
  name: string;
  importance: number;
}

interface FeatureImportancePlotProps {
  features: Feature[];
}

const FeatureImportancePlot: React.FC<FeatureImportancePlotProps> = ({ features }) => {
  // Sort features by importance
  const sortedFeatures = [...features].sort((a, b) => b.importance - a.importance);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-crypto-dark p-3 border border-crypto-gray rounded-md">
          <p className="font-mono text-sm">{`${label}`}</p>
          <p className="font-mono text-sm text-crypto-purple">{`Importance: ${payload[0].value.toFixed(3)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Feature Importance</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedFeatures}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
          >
            <XAxis type="number" domain={[0, 'dataMax']} tickFormatter={(value) => value.toFixed(2)} />
            <YAxis 
              type="category"
              dataKey="name"
              tick={{ fill: '#CBD5E1', fontSize: 12, fontFamily: 'JetBrains Mono' }}
              width={70}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
              {sortedFeatures.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index % 3 === 0 ? '#8B5CF6' : index % 3 === 1 ? '#3B82F6' : '#10B981'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FeatureImportancePlot;
