import React from 'react';
import { Star, BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useToast } from '../hooks/use-toast';

const UserCard = ({ user, onRequestSwap }) => {
  const { toast } = useToast();

  const handleRequestSwap = () => {
    toast({
      title: "🎉 Swap Request Sent!",
      description: `Your skill swap request has been sent to ${user.name}.`,
    });
    if (onRequestSwap) {
      onRequestSwap(user);
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-gray-100 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 rounded-2xl">
      <CardContent className="pt-6">
        {/* User Info */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <Avatar className="w-14 h-14 ring-2 ring-transparent group-hover:ring-indigo-200 transition-all duration-300">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors duration-300">
              {user.name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-semibold">{user.rating}</span>
              <span className="text-slate-400">•</span>
              <span>{user.swapsCompleted} swaps</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-slate-600 mb-5 line-clamp-3 leading-relaxed">{user.bio}</p>

        {/* Teaching Skills */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-700">Can teach:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.teachSkills.slice(0, 3).map((skill, index) => (
              <Badge key={index} className="text-xs bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 rounded-lg font-medium">
                {skill}
              </Badge>
            ))}
            {user.teachSkills.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600 rounded-lg">
                +{user.teachSkills.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Learning Skills */}
        <div className="mb-5">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-700">Wants to learn:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.learnSkills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-all duration-300 rounded-lg font-medium">
                {skill}
              </Badge>
            ))}
            {user.learnSkills.length > 3 && (
              <Badge variant="outline" className="text-xs border-slate-200 text-slate-600 rounded-lg">
                +{user.learnSkills.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-6">
        <Button 
          onClick={handleRequestSwap}
          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-200 rounded-xl font-semibold py-2.5"
        >
          Request Swap ✨
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;