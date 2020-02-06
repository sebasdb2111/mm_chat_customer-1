import axios from 'axios';
import { apiUrl } from './global-variables.js';
import authHeader from './auth-header';

class ChatSessionService {
  createChatSession(data) {
    return axios
      .post(`${apiUrl}/chat-session`, data, { headers: authHeader() })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
    async chatSessionList() {
        return axios
            .get(`${apiUrl}/chat-session`, { headers: authHeader() })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getConversation(chatSessionId) {
        return axios
            .get(
                `${apiUrl}/chat-session-message/by-chat-session/${chatSessionId}`,
                { headers: authHeader() }
            )
            .then(function(response) {
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    sendMessage(messageData) {
        return axios
            .post(`${apiUrl}/chat-session-message`, messageData, { headers: authHeader() })
            .then(function(response) {
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

export default new ChatSessionService();
