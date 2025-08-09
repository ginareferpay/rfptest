import { supabase } from '@/integrations/supabase/client';

// Types for AI responses
export interface AIResponse {
  content: string;
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Gemini API service class
class GeminiService {
  private apiKey: string | null = null;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  constructor() {
    this.loadApiKey();
  }

  private async loadApiKey(): Promise<void> {
    try {
      // Try to get from Supabase user metadata first
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.gemini_api_key) {
        this.apiKey = user.user_metadata.gemini_api_key;
        return;
      }

      // Fallback to localStorage for now
      const stored = localStorage.getItem('gemini_api_key');
      if (stored) {
        this.apiKey = this.decrypt(stored);
      }
    } catch (error) {
      console.error('Error loading API key:', error);
    }
  }

  private encrypt(text: string): string {
    // Simple encryption for localStorage (not production-ready)
    return btoa(text);
  }

  private decrypt(encryptedText: string): string {
    try {
      return atob(encryptedText);
    } catch {
      return encryptedText; // Return as-is if not encrypted
    }
  }

  async setApiKey(key: string): Promise<boolean> {
    try {
      // Store in localStorage with simple encryption
      localStorage.setItem('gemini_api_key', this.encrypt(key));
      this.apiKey = key;

      // Also try to store in Supabase user metadata
      await supabase.auth.updateUser({
        data: { gemini_api_key: key }
      });

      return true;
    } catch (error) {
      console.error('Error storing API key:', error);
      return false;
    }
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  async generateContent(prompt: string, context?: string): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('API key not configured');
    }

    const fullPrompt = context ? `${context}\n\n${prompt}` : prompt;

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

      return {
        content,
        usage: {
          inputTokens: data.usageMetadata?.promptTokenCount || 0,
          outputTokens: data.usageMetadata?.candidatesTokenCount || 0,
        }
      };
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }

  async chat(messages: ChatMessage[]): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('API key not configured');
    }

    try {
      const contents = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

      return {
        content,
        usage: {
          inputTokens: data.usageMetadata?.promptTokenCount || 0,
          outputTokens: data.usageMetadata?.candidatesTokenCount || 0,
        }
      };
    } catch (error) {
      console.error('Gemini Chat Error:', error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();