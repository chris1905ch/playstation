import { useState, useRef, useEffect } from 'react';
import { Send, Search, Phone, VideoIcon, MoreVertical, Smile } from 'lucide-react';
import { getStatusColor, getStatusText } from '../data/mockData';

const Messages = ({ conversations, friends, loading, sendMessage, markAsRead, getUnreadCount }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      sendMessage(selectedConversation.friendId, newMessage);
      setNewMessage('');
    }
  };

  const selectConversation = (conversation) => {
    setSelectedConversation(conversation);
    markAsRead(conversation.friendId);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ayer';
    } else {
      return date.toLocaleDateString('es-ES');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.friendName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedFriend = selectedConversation ? 
    friends.find(f => f.id === selectedConversation.friendId) : null;

  return (
    <div className="messages-page">
      <div className="messages-sidebar">
        <div className="messages-header">
          <h3>Mensajes</h3>
          <div className="search-container">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar conversaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="conversations-list">
          {filteredConversations.map(conversation => {
            const friend = friends.find(f => f.id === conversation.friendId);
            const lastMessage = conversation.messages[conversation.messages.length - 1];
            const unreadCount = getUnreadCount(conversation.friendId);

            return (
              <div
                key={conversation.id}
                className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
                onClick={() => selectConversation(conversation)}
              >
                <div className="conversation-avatar-container">
                  <img 
                    src={friend?.avatar || 'https://via.placeholder.com/50x50'} 
                    alt={conversation.friendName}
                    className="conversation-avatar"
                  />
                  {friend && (
                    <div 
                      className="status-indicator"
                      style={{ backgroundColor: getStatusColor(friend.status) }}
                    ></div>
                  )}
                </div>

                <div className="conversation-info">
                  <div className="conversation-header">
                    <h4 className="conversation-name">{conversation.friendName}</h4>
                    <span className="conversation-time">
                      {formatTime(lastMessage.timestamp)}
                    </span>
                  </div>
                  <div className="conversation-preview">
                    <span className={`last-message ${unreadCount > 0 ? 'unread' : ''}`}>
                      {lastMessage.content}
                    </span>
                    {unreadCount > 0 && (
                      <span className="unread-count">{unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredConversations.length === 0 && searchTerm && (
            <div className="empty-state">
              <p>No se encontraron conversaciones</p>
            </div>
          )}

          {conversations.length === 0 && (
            <div className="empty-state">
              <h4>No hay conversaciones</h4>
              <p>Inicia una conversación con tus amigos</p>
            </div>
          )}
        </div>
      </div>

      <div className="messages-main">
        {selectedConversation ? (
          <>
            <div className="chat-header">
              <div className="chat-friend-info">
                <img 
                  src={selectedFriend?.avatar || 'https://via.placeholder.com/40x40'} 
                  alt={selectedConversation.friendName}
                  className="chat-avatar"
                />
                <div className="chat-details">
                  <h3 className="chat-name">{selectedConversation.friendName}</h3>
                  {selectedFriend && (
                    <span className="chat-status" style={{ color: getStatusColor(selectedFriend.status) }}>
                      {getStatusText(selectedFriend.status)}
                      {selectedFriend.currentGame && ` • Jugando ${selectedFriend.currentGame}`}
                    </span>
                  )}
                </div>
              </div>

              <div className="chat-actions">
                <button className="btn btn-ghost">
                  <Phone size={18} />
                </button>
                <button className="btn btn-ghost">
                  <VideoIcon size={18} />
                </button>
                <button className="btn btn-ghost">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            <div className="chat-messages">
              {selectedConversation.messages.map((message, index) => {
                const prevMessage = selectedConversation.messages[index - 1];
                const showDate = !prevMessage || 
                  formatDate(message.timestamp) !== formatDate(prevMessage.timestamp);
                const isOwnMessage = message.senderId === 1; // mockUser.id

                return (
                  <div key={message.id}>
                    {showDate && (
                      <div className="date-separator">
                        <span>{formatDate(message.timestamp)}</span>
                      </div>
                    )}
                    <div className={`message ${isOwnMessage ? 'own' : 'other'}`}>
                      <div className="message-content">
                        {message.content}
                      </div>
                      <div className="message-time">
                        {formatTime(message.timestamp)}
                        {isOwnMessage && (
                          <span className={`message-status ${message.read ? 'read' : 'sent'}`}>
                            {message.read ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-container">
              <button type="button" className="btn btn-ghost emoji-btn">
                <Smile size={20} />
              </button>
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="chat-input"
              />
              <button 
                type="submit" 
                className="btn btn-primary send-btn"
                disabled={loading || !newMessage.trim()}
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  <Send size={18} />
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="no-conversation-selected">
            <div className="empty-state">
              <h3>Selecciona una conversación</h3>
              <p>Elige una conversación de la lista para comenzar a chatear</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
