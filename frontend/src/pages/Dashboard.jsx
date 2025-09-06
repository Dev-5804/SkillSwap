import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, MessageCircle, User, TrendingUp, Users, Star, BookOpen, CheckCircle, Sparkles, Zap, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { currentUser, mockRequests } from '../mock/data';

const Dashboard = () => {
  const pendingRequests = mockRequests.filter(req => req.status === 'pending' && req.type === 'incoming').length;
  const activeSwaps = mockRequests.filter(req => req.status === 'accepted').length;

  const quickStats = [
    { 
      title: 'Total Swaps', 
      value: currentUser.swapsCompleted, 
      icon: TrendingUp, 
      gradient: 'from-emerald-400 to-emerald-500',
      bgGradient: 'from-emerald-50 to-emerald-100'
    },
    { 
      title: 'Pending Requests', 
      value: pendingRequests, 
      icon: Bell, 
      gradient: 'from-yellow-400 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-100'
    },
    { 
      title: 'Active Chats', 
      value: activeSwaps, 
      icon: MessageCircle, 
      gradient: 'from-indigo-400 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-100'
    },
    { 
      title: 'Rating', 
      value: currentUser.rating, 
      icon: Star, 
      gradient: 'from-pink-400 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-100'
    }
  ];

  const quickActions = [
    {
      title: 'Find Skills',
      description: 'Discover people who can teach you new skills',
      icon: Search,
      link: '/explore',
      gradient: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
      emoji: '🔍'
    },
    {
      title: 'View Requests',
      description: 'Check your pending skill swap requests',
      icon: Bell,
      link: '/requests',
      gradient: 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
      emoji: '📬'
    },
    {
      title: 'Start Chatting',
      description: 'Continue conversations with your matches',
      icon: MessageCircle,
      link: '/chat',
      gradient: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      emoji: '💬'
    }
  ];

  return (
    <div className="space-y-8 min-h-screen" style={{backgroundColor: '#F9FAFB'}}>
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl shadow-sm border border-indigo-100 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-200/30 to-indigo-200/30 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="flex items-center space-x-6 relative">
          <div className="relative">
            <Avatar className="w-20 h-20 ring-4 ring-white shadow-xl">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white text-2xl font-bold">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Welcome back, {currentUser.name.split(' ')[0]}! 
              <span className="ml-2">👋</span>
            </h1>
            <p className="text-slate-600 text-lg">Ready to share knowledge and learn something amazing today?</p>
          </div>
          <Link to="/profile">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl px-6 py-3">
              <User className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-100 rounded-2xl overflow-hidden group">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-800 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.bgGradient} group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`w-8 h-8 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Skills Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teaching Skills */}
        <Card className="border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-emerald-200">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-slate-800">Skills You Teach</span>
              <Zap className="w-5 h-5 text-emerald-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              {currentUser.teachSkills.map((skill, index) => (
                <Badge key={index} className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 hover:from-emerald-200 hover:to-emerald-300 transition-all duration-300 hover:scale-105 rounded-xl px-3 py-1.5 font-semibold">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Skills */}
        <Card className="border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-100 border-b border-indigo-200">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-slate-800">Skills You Want to Learn</span>
              <Heart className="w-5 h-5 text-indigo-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              {currentUser.learnSkills.map((skill, index) => (
                <Badge key={index} variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-all duration-300 hover:scale-105 rounded-xl px-3 py-1.5 font-semibold">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
          <span>Quick Actions</span>
          <Sparkles className="w-6 h-6 text-indigo-500" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} to={action.link}>
                <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border-gray-100 rounded-2xl overflow-hidden">
                  <CardContent className="pt-8 pb-8 text-center space-y-6">
                    <div className="relative">
                      <div className={`inline-flex p-6 rounded-2xl text-white bg-gradient-to-r ${action.gradient} group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div className="absolute -top-2 -right-2 text-2xl">
                        {action.emoji}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors duration-300 mb-2">
                        {action.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{action.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border-gray-100 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-100">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">Skill swap request accepted! 🎉</p>
                <p className="text-xs text-slate-600">David Kim accepted your UX Design request</p>
              </div>
              <span className="text-xs text-slate-500 font-medium">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-100 rounded-2xl border border-indigo-200 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">New skill swap request ✨</p>
                <p className="text-xs text-slate-600">Marcus Rodriguez wants to learn React</p>
              </div>
              <span className="text-xs text-slate-500 font-medium">1 day ago</span>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-100 rounded-2xl border border-yellow-200 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">New message received 💬</p>
                <p className="text-xs text-slate-600">Emma Johnson sent you a message</p>
              </div>
              <span className="text-xs text-slate-500 font-medium">3 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;