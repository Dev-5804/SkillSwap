import React, { useState } from 'react';
import { Edit2, Save, X, Plus, Trash2, Calendar, Star, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { currentUser, skillOptions } from '../mock/data';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(currentUser);
  const [newTeachSkill, setNewTeachSkill] = useState('');
  const [newLearnSkill, setNewLearnSkill] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Profile Updated!",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData(currentUser);
    setIsEditing(false);
  };

  const addTeachSkill = () => {
    if (newTeachSkill && !profileData.teachSkills.includes(newTeachSkill)) {
      setProfileData({
        ...profileData,
        teachSkills: [...profileData.teachSkills, newTeachSkill]
      });
      setNewTeachSkill('');
    }
  };

  const addLearnSkill = () => {
    if (newLearnSkill && !profileData.learnSkills.includes(newLearnSkill)) {
      setProfileData({
        ...profileData,
        learnSkills: [...profileData.learnSkills, newLearnSkill]
      });
      setNewLearnSkill('');
    }
  };

  const removeTeachSkill = (skillToRemove) => {
    setProfileData({
      ...profileData,
      teachSkills: profileData.teachSkills.filter(skill => skill !== skillToRemove)
    });
  };

  const removeLearnSkill = (skillToRemove) => {
    setProfileData({
      ...profileData,
      learnSkills: profileData.learnSkills.filter(skill => skill !== skillToRemove)
    });
  };

  const availableTeachSkills = skillOptions.filter(skill => !profileData.teachSkills.includes(skill));
  const availableLearnSkills = skillOptions.filter(skill => !profileData.learnSkills.includes(skill));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your skills and information</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
          className="flex items-center space-x-2"
        >
          {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profileData.avatar} alt={profileData.name} />
                  <AvatarFallback className="text-2xl">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    {isEditing ? (
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="max-w-md"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-gray-900">{profileData.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="max-w-md"
                      />
                    ) : (
                      <p className="text-gray-600">{profileData.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    placeholder="Tell others about yourself..."
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                )}
              </div>

              {isEditing && (
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Teaching Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Skills I Can Teach</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profileData.teachSkills.map((skill, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center space-x-1">
                      <span>{skill}</span>
                      {isEditing && (
                        <button onClick={() => removeTeachSkill(skill)} className="ml-1 hover:bg-green-300 rounded-full p-1">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>

                {isEditing && (
                  <div className="flex space-x-2">
                    <Select value={newTeachSkill} onValueChange={setNewTeachSkill}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Add a skill you can teach" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTeachSkills.map(skill => (
                          <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={addTeachSkill} size="sm" disabled={!newTeachSkill}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Learning Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-700">Skills I Want to Learn</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profileData.learnSkills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 flex items-center space-x-1">
                      <span>{skill}</span>
                      {isEditing && (
                        <button onClick={() => removeLearnSkill(skill)} className="ml-1 hover:bg-blue-100 rounded-full p-1">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>

                {isEditing && (
                  <div className="flex space-x-2">
                    <Select value={newLearnSkill} onValueChange={setNewLearnSkill}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Add a skill you want to learn" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableLearnSkills.map(skill => (
                          <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={addLearnSkill} size="sm" disabled={!newLearnSkill}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-xl font-bold text-gray-900">{profileData.rating}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed Swaps</p>
                  <p className="text-xl font-bold text-gray-900">{profileData.swapsCompleted}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(profileData.joinedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="ghost">
                View My Reviews
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                Download Profile
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;