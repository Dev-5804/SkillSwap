import React from 'react';
import { Clock, CheckCircle, XCircle, ArrowRight, Sparkles, Heart, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useToast } from '../hooks/use-toast';

const RequestCard = ({ request, onAccept, onReject }) => {
  const { toast } = useToast();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-gradient-to-r from-yellow-50 to-orange-100 text-yellow-700 border-yellow-200';
      case 'accepted':
        return 'bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200';
      case 'rejected':
        return 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleAccept = () => {
    toast({
      title: "🎉 Request Accepted!",
      description: `You've accepted the skill swap with ${request.fromUser.name}.`,
    });
    if (onAccept) {
      onAccept(request.id);
    }
  };

  const handleReject = () => {
    toast({
      title: "Request Declined",
      description: `You've declined the skill swap with ${request.fromUser.name}.`,
    });
    if (onReject) {
      onReject(request.id);
    }
  };

  const otherUser = request.type === 'incoming' ? request.fromUser : request.toUser;
  const isIncoming = request.type === 'incoming';

  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-100 rounded-2xl overflow-hidden group">
      <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="w-12 h-12 ring-2 ring-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white font-semibold">
                  {otherUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <CardTitle className="text-lg text-slate-800 group-hover:text-indigo-600 transition-colors duration-300">
                {otherUser.name}
              </CardTitle>
              <p className="text-sm text-slate-600 font-medium">
                {isIncoming ? '💌 Wants to swap with you' : '📤 You requested a swap'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
              {getStatusIcon(request.status)}
            </div>
            <Badge className={`${getStatusStyle(request.status)} rounded-xl font-semibold px-3 py-1`}>
              {request.status}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Skill Exchange */}
        <div className="relative">
          <div className="flex items-center justify-center space-x-4 py-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-emerald-50 rounded-2xl border border-indigo-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg mb-3 mx-auto">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 mb-2 rounded-lg font-semibold">
                {isIncoming ? '🎓 They teach' : '📚 You teach'}
              </Badge>
              <p className="text-sm font-bold text-slate-800">
                {isIncoming ? request.teachSkill : request.learnSkill}
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <ArrowRight className="w-6 h-6 text-indigo-400 mb-2" />
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg mb-3 mx-auto">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <Badge variant="outline" className="border-indigo-200 text-indigo-800 hover:bg-indigo-50 mb-2 rounded-lg font-semibold">
                {isIncoming ? '📚 You teach' : '🎓 They teach'}
              </Badge>
              <p className="text-sm font-bold text-slate-800">
                {isIncoming ? request.learnSkill : request.teachSkill}
              </p>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="bg-gradient-to-r from-slate-50 to-indigo-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-slate-400 to-slate-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-xs font-bold">💬</span>
            </div>
            <p className="text-sm text-slate-700 italic leading-relaxed">"{request.message}"</p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Clock className="w-4 h-4" />
          <span className="font-medium">
            {new Date(request.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>

        {/* Actions */}
        {isIncoming && request.status === 'pending' && (
          <div className="flex space-x-3 pt-2">
            <Button
              onClick={handleAccept}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Accept ✨
            </Button>
            <Button
              onClick={handleReject}
              variant="outline"
              className="flex-1 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 rounded-xl font-semibold py-3 transition-all duration-300"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Decline
            </Button>
          </div>
        )}

        {request.status === 'accepted' && (
          <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Heart className="w-4 h-4 mr-2" />
            Start Chat 💬
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default RequestCard;