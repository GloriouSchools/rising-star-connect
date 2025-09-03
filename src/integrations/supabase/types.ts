export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      classes: {
        Row: {
          academic_year: string | null
          class_teacher_id: string | null
          created_at: string | null
          id: string
          level: string
          name: string
          room_number: string | null
          student_count: number | null
          updated_at: string | null
        }
        Insert: {
          academic_year?: string | null
          class_teacher_id?: string | null
          created_at?: string | null
          id?: string
          level: string
          name: string
          room_number?: string | null
          student_count?: number | null
          updated_at?: string | null
        }
        Update: {
          academic_year?: string | null
          class_teacher_id?: string | null
          created_at?: string | null
          id?: string
          level?: string
          name?: string
          room_number?: string | null
          student_count?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_class_teacher_id_fkey"
            columns: ["class_teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      grades: {
        Row: {
          created_at: string | null
          created_by: string | null
          grade: string | null
          id: string
          marks: number | null
          remarks: string | null
          student_id: string | null
          subject: string
          teacher_id: string | null
          term: string
          updated_at: string | null
          year: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          grade?: string | null
          id?: string
          marks?: number | null
          remarks?: string | null
          student_id?: string | null
          subject: string
          teacher_id?: string | null
          term: string
          updated_at?: string | null
          year: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          grade?: string | null
          id?: string
          marks?: number | null
          remarks?: string | null
          student_id?: string | null
          subject?: string
          teacher_id?: string | null
          term?: string
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "grades_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grades_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_operations: {
        Row: {
          created_at: string | null
          entity_data: Json
          entity_type: string
          id: string
          operation_type: string
          original_data: Json | null
          reason: string | null
          requested_by: string
          requester_name: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          entity_data: Json
          entity_type: string
          id?: string
          operation_type: string
          original_data?: Json | null
          reason?: string | null
          requested_by: string
          requester_name: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          entity_data?: Json
          entity_type?: string
          id?: string
          operation_type?: string
          original_data?: Json | null
          reason?: string | null
          requested_by?: string
          requester_name?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_status: string | null
          address: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          department: string | null
          email: string
          emergency_contact: string | null
          emergency_phone: string | null
          experience: string | null
          first_name: string
          gender: string | null
          id: string
          join_date: string | null
          last_name: string
          middle_name: string | null
          next_steps: string | null
          phone: string | null
          qualification: string | null
          role: string
          status_date: string | null
          status_reason: string | null
          status_updated_by: string | null
          subject: string | null
          suspension_end_date: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          account_status?: string | null
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          department?: string | null
          email: string
          emergency_contact?: string | null
          emergency_phone?: string | null
          experience?: string | null
          first_name: string
          gender?: string | null
          id: string
          join_date?: string | null
          last_name: string
          middle_name?: string | null
          next_steps?: string | null
          phone?: string | null
          qualification?: string | null
          role: string
          status_date?: string | null
          status_reason?: string | null
          status_updated_by?: string | null
          subject?: string | null
          suspension_end_date?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          account_status?: string | null
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          emergency_contact?: string | null
          emergency_phone?: string | null
          experience?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          join_date?: string | null
          last_name?: string
          middle_name?: string | null
          next_steps?: string | null
          phone?: string | null
          qualification?: string | null
          role?: string
          status_date?: string | null
          status_reason?: string | null
          status_updated_by?: string | null
          subject?: string | null
          suspension_end_date?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          address: string | null
          created_at: string | null
          created_by: string | null
          department: string | null
          email: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          id: string
          join_date: string | null
          name: string
          phone: string
          role: string
          staff_id: string
          status: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          email?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          id?: string
          join_date?: string | null
          name: string
          phone: string
          role: string
          staff_id: string
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          email?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          id?: string
          join_date?: string | null
          name?: string
          phone?: string
          role?: string
          staff_id?: string
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          address: string | null
          age: number
          class: string
          created_at: string | null
          created_by: string | null
          email: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          enrollment_date: string | null
          gender: string | null
          id: string
          medical_info: string | null
          name: string
          parent: string
          phone: string
          status: string | null
          student_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          address?: string | null
          age: number
          class: string
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          enrollment_date?: string | null
          gender?: string | null
          id?: string
          medical_info?: string | null
          name: string
          parent: string
          phone: string
          status?: string | null
          student_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          address?: string | null
          age?: number
          class?: string
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          enrollment_date?: string | null
          gender?: string | null
          id?: string
          medical_info?: string | null
          name?: string
          parent?: string
          phone?: string
          status?: string | null
          student_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      teachers: {
        Row: {
          address: string | null
          classes_taught: string[] | null
          created_at: string | null
          created_by: string | null
          department: string | null
          email: string
          emergency_contact: string | null
          emergency_phone: string | null
          experience: string | null
          id: string
          is_class_teacher: boolean | null
          is_department_head: boolean | null
          join_date: string | null
          name: string
          phone: string
          qualification: string | null
          status: string | null
          subject: string
          subjects_taught: string[] | null
          teacher_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          address?: string | null
          classes_taught?: string[] | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          email: string
          emergency_contact?: string | null
          emergency_phone?: string | null
          experience?: string | null
          id?: string
          is_class_teacher?: boolean | null
          is_department_head?: boolean | null
          join_date?: string | null
          name: string
          phone: string
          qualification?: string | null
          status?: string | null
          subject: string
          subjects_taught?: string[] | null
          teacher_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          address?: string | null
          classes_taught?: string[] | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          email?: string
          emergency_contact?: string | null
          emergency_phone?: string | null
          experience?: string | null
          id?: string
          is_class_teacher?: boolean | null
          is_department_head?: boolean | null
          join_date?: string | null
          name?: string
          phone?: string
          qualification?: string | null
          status?: string | null
          subject?: string
          subjects_taught?: string[] | null
          teacher_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_public_profile_info: {
        Args: { profile_id: string }
        Returns: {
          department: string
          first_name: string
          id: string
          last_name: string
          role: string
          subject: string
        }[]
      }
      get_user_display_name: {
        Args: { user_id: string }
        Returns: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
