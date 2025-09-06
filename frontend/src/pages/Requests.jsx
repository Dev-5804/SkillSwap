import React, { useState } from 'react';
import { Bell, ArrowUpDown, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import RequestCard from '../components/RequestCard';
import { mockRequests } from '../mock/data';

const Requests = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter and sort requests
  const filterRequests = (requests, type) => {
    return requests
      .filter(req => {
        const matchesType = req.type === type;
        const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
        return matchesType && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'oldest':
            return new Date(a.createdAt) - new Date(b.createdAt);
          case 'status':
            const statusOrder = { 'pending': 0, 'accepted': 1, 'rejected': 2 };
            return statusOrder[a.status] - statusOrder[b.status];
          default:
            return 0;
        }
      });
  };

  const incomingRequests = filterRequests(mockRequests, 'incoming');
  const outgoingRequests = filterRequests(mockRequests, 'outgoing');

  const handleAcceptRequest = (requestId) => {
    console.log('Accepted request:', requestId);
  };

  const handleRejectRequest = (requestId) => {
    console.log('Rejected request:', requestId);
  };

  const getStatusCount = (requests, status) => {
    return requests.filter(req => status === 'all' || req.status === status).length;
  };

  const RequestsTab = ({ requests, type }) => (
    <div className="space-y-6">
      {requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map(request => (
            <RequestCard
              key={request.id}
              request={request}
              onAccept={handleAcceptRequest}
              onReject={handleRejectRequest}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {type} requests
          </h3>
          <p className="text-gray-600">
            {type === 'incoming' 
              ? "You don't have any pending requests right now."
              : "You haven't sent any requests yet."
            }
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Skill Swap Requests</h1>
        <p className="text-gray-600 mt-2">Manage your incoming and outgoing skill exchange requests</p>
      </div>

      {/* Filters and Sorting */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="incoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="incoming" className="flex items-center space-x-2">
            <span>Incoming</span>
            <Badge variant="secondary" className="ml-2">
              {getStatusCount(mockRequests.filter(r => r.type === 'incoming'), statusFilter)}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="outgoing" className="flex items-center space-x-2">
            <span>Outgoing</span>
            <Badge variant="secondary" className="ml-2">
              {getStatusCount(mockRequests.filter(r => r.type === 'outgoing'), statusFilter)}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incoming">
          <RequestsTab requests={incomingRequests} type="incoming" />
        </TabsContent>

        <TabsContent value="outgoing">
          <RequestsTab requests={outgoingRequests} type="outgoing" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Requests;