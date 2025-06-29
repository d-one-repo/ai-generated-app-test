import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import {
  Users, TrendingUp, Target, Brain, MessageSquare, BarChart3, Settings,
  User, ChevronRight, ArrowUp, ArrowDown, Eye, Clock, DollarSign,
  Zap, Filter, Search, Bell, Menu, X, Star, ThumbsUp, Share2,
  Calendar, Mail, Phone, MapPin, Award, Briefcase, AlertCircle,
  CheckCircle, RefreshCw, Download, Upload, Plus, Edit, Trash2,
  PlayCircle, PauseCircle, StopCircle, MoreHorizontal
} from 'lucide-react';

// Types
interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  size: number;
  avgLifetimeValue: number;
  engagementRate: number;
  demographics: {
    ageRange: string;
    income: string;
    location: string;
    interests: string[];
  };
  behavior: {
    purchaseFrequency: string;
    preferredChannels: string[];
    avgOrderValue: number;
  };
  color: string;
}

interface CampaignMetrics {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'draft' | 'paused';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  reach: number;
  engagement: number;
  conversions: number;
  roi: number;
  channels: string[];
  targetSegments: string[];
}

interface CustomerInsight {
  id: string;
  type: 'trend' | 'opportunity' | 'risk' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  category: string;
  actionable: boolean;
  createdAt: string;
  metadata: Record<string, any>;
}

interface PersonalizationRule {
  id: string;
  name: string;
  description: string;
  conditions: {
    segment: string;
    behavior: string;
    value: string;
  }[];
  actions: {
    messageTemplate: string;
    channel: string;
    timing: string;
  };
  status: 'active' | 'inactive' | 'testing';
  performance: {
    openRate: number;
    clickRate: number;
    conversionRate: number;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark';
    dashboardLayout: string;
  };
}

interface AnalyticsData {
  date: string;
  visitors: number;
  engagement: number;
  conversions: number;
  revenue: number;
  segments: Record<string, number>;
}

// Hooks
const useAnalytics = () => {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData: AnalyticsData[] = Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          visitors: Math.floor(Math.random() * 1000) + 500,
          engagement: Math.floor(Math.random() * 50) + 25,
          conversions: Math.floor(Math.random() * 100) + 20,
          revenue: Math.floor(Math.random() * 10000) + 5000,
          segments: {
            'luxury-enthusiasts': Math.floor(Math.random() * 200) + 100,
            'occasional-buyers': Math.floor(Math.random() * 300) + 150,
            'high-value-customers': Math.floor(Math.random() * 150) + 75,
          }
        }));
        
        setData(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch analytics data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

const useCustomerSegments = () => {
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSegments = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockSegments: CustomerSegment[] = [
        {
          id: '1',
          name: 'Luxury Enthusiasts',
          description: 'High-income customers with strong preference for premium brands',
          size: 2547,
          avgLifetimeValue: 12500,
          engagementRate: 78,
          demographics: {
            ageRange: '35-55',
            income: '$150K+',
            location: 'Urban Metro Areas',
            interests: ['Fashion', 'Travel', 'Fine Dining', 'Art']
          },
          behavior: {
            purchaseFrequency: 'Monthly',
            preferredChannels: ['Email', 'Instagram', 'Website'],
            avgOrderValue: 850
          },
          color: '#8B5CF6'
        },
        {
          id: '2',
          name: 'Occasional Buyers',
          description: 'Price-conscious customers who purchase during sales and promotions',
          size: 8934,
          avgLifetimeValue: 3200,
          engagementRate: 45,
          demographics: {
            ageRange: '25-45',
            income: '$50K-$100K',
            location: 'Suburban Areas',
            interests: ['Fashion', 'Deals', 'Social Media']
          },
          behavior: {
            purchaseFrequency: 'Quarterly',
            preferredChannels: ['Email', 'SMS', 'Social Media'],
            avgOrderValue: 180
          },
          color: '#06B6D4'
        },
        {
          id: '3',
          name: 'High-Value VIPs',
          description: 'Ultra-high net worth individuals with exclusive purchasing patterns',
          size: 456,
          avgLifetimeValue: 45000,
          engagementRate: 92,
          demographics: {
            ageRange: '45-65',
            income: '$500K+',
            location: 'Global Elite',
            interests: ['Luxury Travel', 'Fine Art', 'Exclusive Events', 'Investment']
          },
          behavior: {
            purchaseFrequency: 'Weekly',
            preferredChannels: ['Personal Concierge', 'Private Events', 'Phone'],
            avgOrderValue: 2500
          },
          color: '#F59E0B'
        }
      ];
      
      setSegments(mockSegments);
      setLoading(false);
    };

    fetchSegments();
  }, []);

  return { segments, loading };
};

const useCampaignMetrics = () => {
  const [campaigns, setCampaigns] = useState<CampaignMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const mockCampaigns: CampaignMetrics[] = [
        {
          id: '1',
          name: 'Spring Luxury Collection Launch',
          status: 'active',
          startDate: '2024-03-01',
          endDate: '2024-04-30',
          budget: 150000,
          spent: 89000,
          reach: 245000,
          engagement: 18500,
          conversions: 1250,
          roi: 3.2,
          channels: ['Instagram', 'Email', 'Influencer'],
          targetSegments: ['luxury-enthusiasts', 'high-value-customers']
        },
        {
          id: '2',
          name: 'Summer Sale Campaign',
          status: 'completed',
          startDate: '2024-06-01',
          endDate: '2024-07-15',
          budget: 75000,
          spent: 73000,
          reach: 450000,
          engagement: 32000,
          conversions: 2100,
          roi: 4.1,
          channels: ['Email', 'SMS', 'Social Media'],
          targetSegments: ['occasional-buyers']
        },
        {
          id: '3',
          name: 'VIP Exclusive Preview',
          status: 'active',
          startDate: '2024-07-20',
          endDate: '2024-08-20',
          budget: 50000,
          spent: 12000,
          reach: 15000,
          engagement: 8900,
          conversions: 156,
          roi: 8.7,
          channels: ['Personal Concierge', 'Private Events'],
          targetSegments: ['high-value-customers']
        }
      ];
      
      setCampaigns(mockCampaigns);
      setLoading(false);
    };

    fetchCampaigns();
  }, []);

  return { campaigns, loading };
};

const useInsights = () => {
  const [insights, setInsights] = useState<CustomerInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      await new Promise(resolve => setTimeout(resolve, 900));
      
      const mockInsights: CustomerInsight[] = [
        {
          id: '1',
          type: 'opportunity',
          title: 'Emerging Trend: Sustainable Luxury',
          description: 'Customer sentiment analysis shows 73% increased interest in sustainable luxury products among high-value segments.',
          impact: 'high',
          confidence: 92,
          category: 'Market Trends',
          actionable: true,
          createdAt: '2024-07-15T10:30:00Z',
          metadata: { trend_growth: '45%', segment_impact: ['luxury-enthusiasts', 'high-value-customers'] }
        },
        {
          id: '2',
          type: 'risk',
          title: 'Declining Engagement in Millennial Segment',
          description: 'Engagement rates have dropped 15% in the 28-35 age group over the past quarter.',
          impact: 'medium',
          confidence: 87,
          category: 'Customer Behavior',
          actionable: true,
          createdAt: '2024-07-14T15:45:00Z',
          metadata: { engagement_drop: '15%', affected_segment: 'millennial-luxury' }
        },
        {
          id: '3',
          type: 'recommendation',
          title: 'Optimize Email Send Times',
          description: 'Analysis suggests sending emails at 2 PM on Tuesdays could increase open rates by 23%.',
          impact: 'medium',
          confidence: 85,
          category: 'Campaign Optimization',
          actionable: true,
          createdAt: '2024-07-13T09:20:00Z',
          metadata: { optimal_time: '2PM Tuesday', potential_increase: '23%' }
        }
      ];
      
      setInsights(mockInsights);
      setLoading(false);
    };

    fetchInsights();
  }, []);

  return { insights, loading };
};

// Components
const MetricCard: React.FC<{
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center">
      {change > 0 ? (
        <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
      ) : (
        <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
      )}
      <span className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {Math.abs(change)}%
      </span>
      <span className="text-sm text-gray-500 ml-2">vs last month</span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { data: analyticsData, loading: analyticsLoading } = useAnalytics();
  const { segments, loading: segmentsLoading } = useCustomerSegments();
  const { campaigns, loading: campaignsLoading } = useCampaignMetrics();
  const { insights, loading: insightsLoading } = useInsights();

  const totalRevenue = useMemo(() => {
    return analyticsData.reduce((sum, item) => sum + item.revenue, 0);
  }, [analyticsData]);

  const totalConversions = useMemo(() => {
    return analyticsData.reduce((sum, item) => sum + item.conversions, 0);
  }, [analyticsData]);

  const avgEngagement = useMemo(() => {
    if (analyticsData.length === 0) return 0;
    return analyticsData.reduce((sum, item) => sum + item.engagement, 0) / analyticsData.length;
  }, [analyticsData]);

  const revenueData = useMemo(() => {
    return analyticsData.slice(-7).map(item => ({
      date: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
      revenue: item.revenue,
      conversions: item.conversions
    }));
  }, [analyticsData]);

  const segmentData = useMemo(() => {
    return segments.map(segment => ({
      name: segment.name,
      value: segment.size,
      color: segment.color
    }));
  }, [segments]);

  if (analyticsLoading || segmentsLoading || campaignsLoading || insightsLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">HERMES AI Insights Platform</h1>
        <p className="text-gray-600 mt-2">AI-driven analytics for luxury customer behavior and personalized campaigns</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Revenue"
          value={`$${(totalRevenue / 1000).toFixed(0)}K`}
          change={12.5}
          icon={<DollarSign className="h-6 w-6 text-white" />}
          color="bg-green-500"
        />
        <MetricCard
          title="Total Conversions"
          value={totalConversions.toLocaleString()}
          change={8.2}
          icon={<Target className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        <MetricCard
          title="Avg Engagement"
          value={`${avgEngagement.toFixed(1)}%`}
          change={-2.1}
          icon={<MessageSquare className="h-6 w-6 text-white" />}
          color="bg-purple-500"
        />
        <MetricCard
          title="Active Campaigns"
          value={campaigns.filter(c => c.status === 'active').length.toString()}
          change={15.8}
          icon={<BarChart3 className="h-6 w-6 text-white" />}
          color="bg-orange-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Segments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={segmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {segmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Generated Insights</h3>
        <div className="space-y-4">
          {insights.slice(0, 3).map(insight => (
            <div key={insight.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-full ${
                insight.type === 'opportunity' ? 'bg-green-100' :
                insight.type === 'risk' ? 'bg-red-100' :
                insight.type === 'recommendation' ? 'bg-blue-100' :
                'bg-yellow-100'
              }`}>
                {insight.type === 'opportunity' && <TrendingUp className="h-4 w-4 text-green-600" />}
                {insight.type === 'risk' && <AlertCircle className="h-4 w-4 text-red-600" />}
                {insight.type === 'recommendation' && <Brain className="h-4 w-4 text-blue-600" />}
                {insight.type === 'trend' && <BarChart3 className="h-4 w-4 text-yellow-600" />}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{insight.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    insight.impact === 'high' ? 'bg-red-100 text-red-800' :
                    insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {insight.impact.toUpperCase()} IMPACT
                  </span>
                  <span className="text-xs text-gray-500">
                    {insight.confidence}% confidence
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;