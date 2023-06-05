export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      language: {
        Row: {
          alias_of: string | null
          lang: string
          name: string
        }
        Insert: {
          alias_of?: string | null
          lang: string
          name: string
        }
        Update: {
          alias_of?: string | null
          lang?: string
          name?: string
        }
      }
      phrase: {
        Row: {
          added_by: string | null
          id: string
          lang: string
          text: string
        }
        Insert: {
          added_by?: string | null
          id?: string
          lang: string
          text: string
        }
        Update: {
          added_by?: string | null
          id?: string
          lang?: string
          text?: string
        }
      }
      phrase_see_also: {
        Row: {
          added_by: string | null
          from_phrase_id: string | null
          id: string
          to_phrase_id: string | null
        }
        Insert: {
          added_by?: string | null
          from_phrase_id?: string | null
          id?: string
          to_phrase_id?: string | null
        }
        Update: {
          added_by?: string | null
          from_phrase_id?: string | null
          id?: string
          to_phrase_id?: string | null
        }
      }
      phrase_translation: {
        Row: {
          added_by: string | null
          id: string
          lang: string
          literal: string | null
          phrase_id: string
          text: string
        }
        Insert: {
          added_by?: string | null
          id?: string
          lang: string
          literal?: string | null
          phrase_id: string
          text: string
        }
        Update: {
          added_by?: string | null
          id?: string
          lang?: string
          literal?: string | null
          phrase_id?: string
          text?: string
        }
      }
      user_card: {
        Row: {
          id: string
          phrase_id: string
          status: string
          uid: string
          updated_at: string | null
          user_deck_id: string
        }
        Insert: {
          id?: string
          phrase_id: string
          status?: string
          uid?: string
          updated_at?: string | null
          user_deck_id: string
        }
        Update: {
          id?: string
          phrase_id?: string
          status?: string
          uid?: string
          updated_at?: string | null
          user_deck_id?: string
        }
      }
      user_deck: {
        Row: {
          id: string
          lang: string
          uid: string
        }
        Insert: {
          id?: string
          lang: string
          uid?: string
        }
        Update: {
          id?: string
          lang?: string
          uid?: string
        }
      }
      user_profile: {
        Row: {
          avatar_url: string | null
          created_at: string
          language_primary: string
          languages_spoken: string[]
          uid: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          language_primary?: string
          languages_spoken?: string[]
          uid: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          language_primary?: string
          languages_spoken?: string[]
          uid?: string
          updated_at?: string | null
          username?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_card: {
        Args: {
          phrase_text: string
          phrase_lang: string
          translation_text: string
          translation_lang: string
          deck_id: number
          auth_user_id: string
          status: string
        }
        Returns: {
          added_by: string | null
          id: string
          lang: string
          text: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
