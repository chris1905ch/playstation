import { useState, useEffect } from 'react';
import { mockFriends, mockFriendRequests, mockMessages, mockUser } from '../data/mockData';

// Utility functions for localStorage
const getFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export const useFriends = () => {
  const [friends, setFriends] = useState(() => 
    getFromStorage('ps_friends', mockFriends)
  );
  const [friendRequests, setFriendRequests] = useState(() => 
    getFromStorage('ps_friend_requests', mockFriendRequests)
  );
  const [loading, setLoading] = useState(false);

  // Save to localStorage whenever friends change
  useEffect(() => {
    saveToStorage('ps_friends', friends);
  }, [friends]);

  // Save to localStorage whenever friend requests change
  useEffect(() => {
    saveToStorage('ps_friend_requests', friendRequests);
  }, [friendRequests]);

  const acceptFriendRequest = (requestId) => {
    setLoading(true);
    setTimeout(() => {
      const request = friendRequests.find(req => req.id === requestId);
      if (request) {
        // Add to friends list
        const newFriend = {
          ...request,
          status: 'online',
          lastSeen: null,
          currentGame: null
        };
        setFriends(prev => [...prev, newFriend]);
        
        // Remove from requests
        setFriendRequests(prev => prev.filter(req => req.id !== requestId));
      }
      setLoading(false);
    }, 1000);
  };

  const rejectFriendRequest = (requestId) => {
    setLoading(true);
    setTimeout(() => {
      setFriendRequests(prev => prev.filter(req => req.id !== requestId));
      setLoading(false);
    }, 500);
  };

  const removeFriend = (friendId) => {
    setLoading(true);
    setTimeout(() => {
      setFriends(prev => prev.filter(friend => friend.id !== friendId));
      setLoading(false);
    }, 500);
  };

  const sendFriendRequest = (username) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would send a request to the server
      console.log(`Friend request sent to ${username}`);
      setLoading(false);
    }, 1000);
  };

  return {
    friends,
    friendRequests,
    loading,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    sendFriendRequest
  };
};

export const useMessages = () => {
  const [conversations, setConversations] = useState(() => 
    getFromStorage('ps_conversations', mockMessages)
  );
  const [loading, setLoading] = useState(false);

  // Save to localStorage whenever conversations change
  useEffect(() => {
    saveToStorage('ps_conversations', conversations);
  }, [conversations]);

  const sendMessage = (friendId, content) => {
    setLoading(true);
    setTimeout(() => {
      const newMessage = {
        id: Date.now(),
        senderId: mockUser.id,
        content,
        timestamp: new Date().toISOString(),
        read: true
      };

      setConversations(prev => {
        const existingConv = prev.find(conv => conv.friendId === friendId);
        
        if (existingConv) {
          return prev.map(conv => 
            conv.friendId === friendId 
              ? { ...conv, messages: [...conv.messages, newMessage] }
              : conv
          );
        } else {
          const friend = mockFriends.find(f => f.id === friendId);
          return [...prev, {
            id: Date.now(),
            friendId,
            friendName: friend?.username || 'Unknown',
            messages: [newMessage]
          }];
        }
      });
      setLoading(false);
    }, 500);
  };

  const markAsRead = (friendId) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.friendId === friendId
          ? {
              ...conv,
              messages: conv.messages.map(msg => ({ ...msg, read: true }))
            }
          : conv
      )
    );
  };

  const getUnreadCount = (friendId) => {
    const conversation = conversations.find(conv => conv.friendId === friendId);
    if (!conversation) return 0;
    
    return conversation.messages.filter(
      msg => msg.senderId !== mockUser.id && !msg.read
    ).length;
  };

  const getTotalUnreadCount = () => {
    return conversations.reduce((total, conv) => {
      return total + conv.messages.filter(
        msg => msg.senderId !== mockUser.id && !msg.read
      ).length;
    }, 0);
  };

  return {
    conversations,
    loading,
    sendMessage,
    markAsRead,
    getUnreadCount,
    getTotalUnreadCount
  };
};

// Custom hook for user profile with localStorage
export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(() => 
    getFromStorage('ps_user_profile', mockUser)
  );

  // Save to localStorage whenever user profile changes
  useEffect(() => {
    saveToStorage('ps_user_profile', userProfile);
  }, [userProfile]);

  const updateProfile = (updates) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const addTrophies = (count) => {
    setUserProfile(prev => ({ 
      ...prev, 
      trophies: prev.trophies + count 
    }));
  };

  const levelUp = () => {
    setUserProfile(prev => ({ 
      ...prev, 
      level: prev.level + 1 
    }));
  };

  return {
    userProfile,
    updateProfile,
    addTrophies,
    levelUp
  };
};

// Utility to reset all localStorage data (for testing)
export const resetAllData = () => {
  localStorage.removeItem('ps_friends');
  localStorage.removeItem('ps_friend_requests');
  localStorage.removeItem('ps_conversations');
  localStorage.removeItem('ps_user_profile');
  window.location.reload();
};
