import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const userActivityData = [
  { time: '00:00', users: 45, followers: 12 },
  { time: '04:00', users: 23, followers: 8 },
  { time: '08:00', users: 156, followers: 45 },
  { time: '12:00', users: 234, followers: 78 },
  { time: '16:00', users: 189, followers: 65 },
  { time: '20:00', users: 267, followers: 92 }, 
  { time: '23:59', users: 98, followers: 34 },
];

const dailyStatsData = [
  { day: 'Mon', active: 1200, new: 45 },
  { day: 'Tue', active: 1350, new: 67 },
  { day: 'Wed', active: 1100, new: 32 },
  { day: 'Thu', active: 1450, new: 78 },
  { day: 'Fri', active: 1600, new: 89 },
  { day: 'Sat', active: 1200, new: 56 },
  { day: 'Sun', active: 1050, new: 43 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 backdrop-blur-lg border border-white/20 rounded-lg p-3 shadow-lg">
        <p className="text-white font-medium">{`Time: ${label}`}</p>
        <p className="text-blue-400">{`Active Users: ${payload[0]?.value}`}</p>
        {payload[1] && (
          <p className="text-green-400">{`New Followers: ${payload[1]?.value}`}</p>
        )}
      </div>
    );
  }
  return null;
};

export const AnalyticsCard = () => {
  const [activeTab, setActiveTab] = useState('activity');

  const stats = [
    { icon: Users, label: 'Total Users', value: '1,247', change: '+12%', color: 'from-blue-400 to-blue-600' },
    { icon: Eye, label: 'Page Views', value: '24.5K', change: '+8%', color: 'from-green-400 to-green-600' },
    { icon: TrendingUp, label: 'Engagement', value: '89%', change: '+5%', color: 'from-purple-400 to-purple-600' },
    { icon: BarChart3, label: 'Active Now', value: '267', change: '+15%', color: 'from-orange-400 to-orange-600' },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Analytics Dashboard</h3>
            <p className="text-gray-400 text-sm">Real-time user activity and engagement</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'activity'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            User Activity
          </button>
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'daily'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Daily Stats
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">{stat.change}</span>
            </div>
            <p className="text-white text-2xl font-bold">{stat.value}</p>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h4 className="text-white font-semibold mb-4">
          {activeTab === 'activity' ? 'User Activity (24h)' : 'Weekly Overview'}
        </h4>
        
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            {activeTab === 'activity' ? (
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="time" 
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#1E40AF' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="followers" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: '#047857' }}
                />
              </LineChart>
            ) : (
              <BarChart data={dailyStatsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="day" 
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="active" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="new" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
