import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST() {
  try {
    const supabase = createServerClient()

    // Test user account
    const { data: testUser, error: testUserError } = await supabase.auth.admin.createUser({
      email: "testuser@altroway.com",
      password: "testpass123",
      email_confirm: true,
      user_metadata: {
        first_name: "John",
        last_name: "Doe",
      },
    })

    if (testUserError) {
      console.error("Error creating test user:", testUserError)
      return NextResponse.json({ success: false, error: testUserError.message }, { status: 400 })
    }

    // Create profile for test user
    if (testUser.user) {
      const testUserProfile = {
        id: testUser.user.id,
        email: "testuser@altroway.com",
        first_name: "John",
        last_name: "Doe",
        mobile: "+370 612 34567",
        city_of_birth: "Vilnius",
        date_of_birth: "1990-05-15",
        address: "Gedimino pr. 15, Vilnius, Lithuania",
        education_level: "higher" as const,
        diplomas_certificates:
          "Bachelor of Computer Science from Vilnius University, AWS Cloud Practitioner Certificate",
        work_experience:
          "Software Developer at TechCorp (2018-2023) - Developed web applications using React and Node.js. Led a team of 3 developers on multiple projects.",
        language_skills: "English (Fluent), Lithuanian (Native), Russian (Intermediate), German (Basic)",
        about_me:
          "Experienced software developer looking to expand career opportunities in Western Europe. Passionate about technology and innovation.",
        application_status: "under_review" as const,
      }

      const { error: profileError } = await supabase.from("user_profiles").insert([testUserProfile])
      if (profileError) {
        console.error("Error creating test user profile:", profileError)
      }
    }

    // Admin user account
    const { data: adminUser, error: adminUserError } = await supabase.auth.admin.createUser({
      email: "admin@altroway.com",
      password: "adminpass123",
      email_confirm: true,
      user_metadata: {
        first_name: "Sarah",
        last_name: "Admin",
        role: "admin",
      },
    })

    if (adminUserError) {
      console.error("Error creating admin user:", adminUserError)
      return NextResponse.json({ success: false, error: adminUserError.message }, { status: 400 })
    }

    // Create profile for admin user
    if (adminUser.user) {
      const adminUserProfile = {
        id: adminUser.user.id,
        email: "admin@altroway.com",
        first_name: "Sarah",
        last_name: "Admin",
        mobile: "+370 698 76543",
        city_of_birth: "Kaunas",
        date_of_birth: "1985-03-22",
        address: "Laisvės al. 25, Kaunas, Lithuania",
        education_level: "higher" as const,
        diplomas_certificates: "Master of Business Administration, HR Management Certificate",
        work_experience:
          "HR Manager at Global Corp (2015-2023) - Managed international recruitment and employee relations. Specialized in EU migration processes.",
        language_skills: "English (Native), Lithuanian (Fluent), German (Fluent), French (Intermediate)",
        about_me: "Experienced HR professional with expertise in international migration and recruitment processes.",
        application_status: "resolved" as const,
      }

      const { error: adminProfileError } = await supabase.from("user_profiles").insert([adminUserProfile])
      if (adminProfileError) {
        console.error("Error creating admin user profile:", adminProfileError)
      }
    }

    // Add some sample documents for the test user
    if (testUser?.user) {
      const sampleDocuments = [
        {
          user_id: testUser.user.id,
          name: "Passport_John_Doe.pdf",
          type: "Passport",
          category: "migration" as const,
          file_size: 2048000,
          mime_type: "application/pdf",
          status: "valid" as const,
          expiry_date: "2030-05-15",
        },
        {
          user_id: testUser.user.id,
          name: "University_Diploma.pdf",
          type: "Educational Certificate",
          category: "personal" as const,
          file_size: 1536000,
          mime_type: "application/pdf",
          status: "valid" as const,
        },
        {
          user_id: testUser.user.id,
          name: "Work_Experience_Letter.pdf",
          type: "Work Certificate",
          category: "personal" as const,
          file_size: 1024000,
          mime_type: "application/pdf",
          status: "needs_review" as const,
        },
      ]

      const { error: docsError } = await supabase.from("documents").insert(sampleDocuments)

      if (docsError) {
        console.error("Error creating sample documents:", docsError)
      }
    }

    // Add some saved jobs for the test user
    if (testUser?.user) {
      // First get some job IDs
      const { data: jobs } = await supabase.from("jobs").select("id").limit(3)

      if (jobs && jobs.length > 0) {
        const savedJobs = jobs.map((job) => ({
          user_id: testUser.user.id,
          job_id: job.id,
        }))

        const { error: savedJobsError } = await supabase.from("saved_jobs").insert(savedJobs)

        if (savedJobsError) {
          console.error("Error creating saved jobs:", savedJobsError)
        }
      }
    }

    // Add some notifications for the test user
    if (testUser?.user) {
      const notifications = [
        {
          user_id: testUser.user.id,
          title: "Document Review Complete",
          message: "Your passport has been reviewed and approved.",
          type: "document_expiry" as const,
          is_read: false,
        },
        {
          user_id: testUser.user.id,
          title: "New Job Match",
          message: "We found 3 new jobs that match your profile.",
          type: "job_match" as const,
          is_read: false,
        },
        {
          user_id: testUser.user.id,
          title: "Application Status Update",
          message: "Your migration application is now under review.",
          type: "application_update" as const,
          is_read: true,
        },
      ]

      const { error: notifError } = await supabase.from("notifications").insert(notifications)

      if (notifError) {
        console.error("Error creating notifications:", notifError)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Test accounts created successfully",
      accounts: {
        testUser: {
          email: "testuser@altroway.com",
          password: "testpass123",
          role: "user",
        },
        adminUser: {
          email: "admin@altroway.com",
          password: "adminpass123",
          role: "admin",
        },
      },
    })
  } catch (error) {
    console.error("Error setting up test accounts:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create test accounts",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
