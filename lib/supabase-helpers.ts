import { supabase } from "./supabase"

export interface UserProfile {
  id: string
  email: string
  first_name?: string
  last_name?: string
  mobile?: string
  city_of_birth?: string
  date_of_birth?: string
  address?: string
  education_level?: "secondary" | "specialised" | "higher"
  diplomas_certificates?: string
  work_experience?: string
  language_skills?: string
  about_me?: string
  application_status?: "received" | "under_review" | "resolved"
  created_at?: string
  updated_at?: string
}

export interface Document {
  id: string
  user_id: string
  name: string
  type: string
  category: "migration" | "personal"
  file_path?: string
  file_size?: number
  mime_type?: string
  status: "pending" | "valid" | "needs_review" | "expired"
  expiry_date?: string
  uploaded_at: string
  updated_at: string
}

export interface Job {
  id: string
  title: string
  company: string
  profile?: string
  location: string
  country: string
  industry: string
  salary_min?: number
  salary_max?: number
  process_time: "fast" | "average" | "slow"
  job_type: "full_time" | "part_time" | "contract"
  description?: string
  requirements?: string
  is_urgent: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface JobApplication {
  id: string
  user_id: string
  job_id: string
  status: "received" | "under_review" | "resolved"
  cover_letter?: string
  resume_path?: string
  applied_at: string
  updated_at: string
  job?: Job
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: "document_expiry" | "application_update" | "job_match" | "system"
  is_read: boolean
  created_at: string
}

// Auth helpers
export const authHelpers = {
  async signUp(email: string, password: string, userData: Partial<UserProfile>) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) return { success: false, error: error.message }

    if (data.user) {
      // Create user profile
      const profileResult = await userHelpers.createProfile({
        id: data.user.id,
        email,
        ...userData,
      })

      if (!profileResult.success) {
        return { success: false, error: profileResult.error }
      }
    }

    return { success: true, data }
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) return { success: false, error: error.message }
    return { success: true }
  },

  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) return { success: false, error: error.message }
    return { success: true, data: user }
  },
}

// User profile helpers
export const userHelpers = {
  async createProfile(profile: UserProfile) {
    const { data, error } = await supabase.from("user_profiles").insert([profile]).select().single()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase.from("user_profiles").update(updates).eq("id", userId).select().single()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async updateApplicationStatus(userId: string, status: "received" | "under_review" | "resolved") {
    return this.updateProfile(userId, { application_status: status })
  },
}

// Document helpers
export const documentHelpers = {
  async uploadDocument(userId: string, file: File, documentData: Partial<Document>) {
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}/${Date.now()}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage.from("documents").upload(fileName, file)

      if (uploadError) return { success: false, error: uploadError.message }

      // Save document metadata
      const { data, error } = await supabase
        .from("documents")
        .insert([
          {
            user_id: userId,
            name: file.name,
            file_path: uploadData.path,
            file_size: file.size,
            mime_type: file.type,
            ...documentData,
          },
        ])
        .select()
        .single()

      if (error) return { success: false, error: error.message }
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async getUserDocuments(userId: string, category?: "migration" | "personal") {
    let query = supabase.from("documents").select("*").eq("user_id", userId).order("uploaded_at", { ascending: false })

    if (category) {
      query = query.eq("category", category)
    }

    const { data, error } = await query

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async updateDocumentStatus(documentId: string, status: Document["status"]) {
    const { data, error } = await supabase.from("documents").update({ status }).eq("id", documentId).select().single()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async deleteDocument(documentId: string) {
    // First get the document to get file path
    const { data: doc, error: fetchError } = await supabase
      .from("documents")
      .select("file_path")
      .eq("id", documentId)
      .single()

    if (fetchError) return { success: false, error: fetchError.message }

    // Delete file from storage
    if (doc.file_path) {
      await supabase.storage.from("documents").remove([doc.file_path])
    }

    // Delete document record
    const { error } = await supabase.from("documents").delete().eq("id", documentId)

    if (error) return { success: false, error: error.message }
    return { success: true }
  },

  async getDocumentUrl(filePath: string) {
    const { data } = supabase.storage.from("documents").getPublicUrl(filePath)

    return data.publicUrl
  },
}

// Job helpers
export const jobHelpers = {
  async getAllJobs(filters?: {
    country?: string
    industry?: string
    search?: string
    urgent?: boolean
  }) {
    let query = supabase.from("jobs").select("*").eq("is_active", true).order("created_at", { ascending: false })

    if (filters?.country) {
      query = query.eq("country", filters.country)
    }

    if (filters?.industry) {
      query = query.eq("industry", filters.industry)
    }

    if (filters?.urgent) {
      query = query.eq("is_urgent", true)
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,company.ilike.%${filters.search}%`)
    }

    const { data, error } = await query

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async getJobsByCategory(industry: string) {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("industry", industry)
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async getJob(jobId: string) {
    const { data, error } = await supabase.from("jobs").select("*").eq("id", jobId).single()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async createJob(jobData: Omit<Job, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("jobs").insert([jobData]).select().single()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },
}

// Job application helpers
export const applicationHelpers = {
  async applyForJob(
    userId: string,
    jobId: string,
    applicationData: {
      cover_letter?: string
      resume_path?: string
    },
  ) {
    const { data, error } = await supabase
      .from("job_applications")
      .insert([
        {
          user_id: userId,
          job_id: jobId,
          ...applicationData,
        },
      ])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async getUserApplications(userId: string) {
    const { data, error } = await supabase
      .from("job_applications")
      .select(`
        *,
        job:jobs(*)
      `)
      .eq("user_id", userId)
      .order("applied_at", { ascending: false })

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async updateApplicationStatus(applicationId: string, status: JobApplication["status"]) {
    const { data, error } = await supabase
      .from("job_applications")
      .update({ status })
      .eq("id", applicationId)
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },
}

// Saved jobs helpers
export const savedJobsHelpers = {
  async saveJob(userId: string, jobId: string) {
    const { data, error } = await supabase
      .from("saved_jobs")
      .insert([{ user_id: userId, job_id: jobId }])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async unsaveJob(userId: string, jobId: string) {
    const { error } = await supabase.from("saved_jobs").delete().eq("user_id", userId).eq("job_id", jobId)

    if (error) return { success: false, error: error.message }
    return { success: true }
  },

  async getSavedJobs(userId: string) {
    const { data, error } = await supabase
      .from("saved_jobs")
      .select(`
        *,
        job:jobs(*)
      `)
      .eq("user_id", userId)
      .order("saved_at", { ascending: false })

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async isJobSaved(userId: string, jobId: string) {
    const { data, error } = await supabase
      .from("saved_jobs")
      .select("id")
      .eq("user_id", userId)
      .eq("job_id", jobId)
      .single()

    if (error && error.code !== "PGRST116") return { success: false, error: error.message }
    return { success: true, data: !!data }
  },
}

// Notification helpers
export const notificationHelpers = {
  async createNotification(userId: string, notification: Omit<Notification, "id" | "user_id" | "created_at">) {
    const { data, error } = await supabase
      .from("notifications")
      .insert([
        {
          user_id: userId,
          ...notification,
        },
      ])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async getUserNotifications(userId: string, unreadOnly = false) {
    let query = supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (unreadOnly) {
      query = query.eq("is_read", false)
    }

    const { data, error } = await query

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async markAsRead(notificationId: string) {
    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId)
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async markAllAsRead(userId: string) {
    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", userId)
      .eq("is_read", false)

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },
}
