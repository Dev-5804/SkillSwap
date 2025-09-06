import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, Sparkles, Users } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import UserCard from '../components/UserCard';
import { mockUsers, skillOptions } from '../mock/data';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeachSkill, setSelectedTeachSkill] = useState('');
  const [selectedLearnSkill, setSelectedLearnSkill] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  // Filter users based on search criteria
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.teachSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         user.learnSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTeachSkill = !selectedTeachSkill || user.teachSkills.includes(selectedTeachSkill);
    const matchesLearnSkill = !selectedLearnSkill || user.learnSkills.includes(selectedLearnSkill);
    
    return matchesSearch && matchesTeachSkill && matchesLearnSkill;
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'swaps':
        return b.swapsCompleted - a.swapsCompleted;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleRequestSwap = (user) => {
    console.log('Requesting swap with:', user.name);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTeachSkill('');
    setSelectedLearnSkill('');
    setSortBy('rating');
  };

  const activeFiltersCount = [selectedTeachSkill, selectedLearnSkill].filter(Boolean).length;

  return (
    <div className="space-y-8" style={{backgroundColor: '#F9FAFB'}}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Explore Skills ✨
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Discover talented people ready to share their knowledge and learn something amazing together
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full -translate-y-16 translate-x-16"></div>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <Input
            type="text"
            placeholder="Search by name, skills, or bio... 🔍"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 text-lg rounded-2xl border-gray-200 focus:border-indigo-300 focus:ring-indigo-200 bg-gray-50/50 hover:bg-white transition-all duration-300"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 rounded-xl border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="font-semibold">Filters</span>
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold text-slate-600">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 rounded-xl border-gray-200 hover:border-indigo-300 transition-colors duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="rating">⭐ Highest Rating</SelectItem>
                <SelectItem value="swaps">🔥 Most Swaps</SelectItem>
                <SelectItem value="name">📝 Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="border-t border-gray-100 pt-6 space-y-6 animate-in slide-in-from-top duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  🎓 Can teach:
                </label>
                <Select value={selectedTeachSkill} onValueChange={setSelectedTeachSkill}>
                  <SelectTrigger className="rounded-xl border-gray-200 hover:border-emerald-300 transition-colors duration-300">
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {skillOptions.map(skill => (
                      <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  📚 Wants to learn:
                </label>
                <Select value={selectedLearnSkill} onValueChange={setSelectedLearnSkill}>
                  <SelectTrigger className="rounded-xl border-gray-200 hover:border-indigo-300 transition-colors duration-300">
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {skillOptions.map(skill => (
                      <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="ghost" 
                onClick={clearFilters} 
                className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          <p className="text-slate-700">
            Found <span className="font-bold text-indigo-600 text-xl">{sortedUsers.length}</span> talented people
          </p>
        </div>
        {(searchTerm || selectedTeachSkill || selectedLearnSkill) && (
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-slate-500">Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <Badge className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-lg">
                  🔍 "{searchTerm}"
                </Badge>
              )}
              {selectedTeachSkill && (
                <Badge className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 rounded-lg">
                  🎓 {selectedTeachSkill}
                </Badge>
              )}
              {selectedLearnSkill && (
                <Badge className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 rounded-lg">
                  📚 {selectedLearnSkill}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Users Grid */}
      {sortedUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedUsers.map(user => (
            <UserCard 
              key={user.id} 
              user={user} 
              onRequestSwap={handleRequestSwap}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">No users found 🔍</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Try adjusting your search criteria or filters to discover more talented people
          </p>
          <Button 
            onClick={clearFilters}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Explore;