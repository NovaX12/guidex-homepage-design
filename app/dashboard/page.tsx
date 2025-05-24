import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { userHelpers, documentHelpers, applicationHelpers, savedJobsHelpers, notificationHelpers } from '@/lib/supabase-helpers'
import DashboardHeader from '@/components/dashboard/dashboard-header';
import DashboardShell from '@/components/dashboard/dashboard-shell';
import RecentDocuments from '@/components/dashboard/recent-documents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function getDashboardData(userId: string) {
  try {
    const user = await userHelpers.getUserById(userId);
    const documents = await documentHelpers.getDocumentsByUserId(userId);
    const applications = await applicationHelpers.getApplicationsByUserId(userId);
    const savedJobs = await savedJobsHelpers.getSavedJobsByUserId(userId);
    const notifications = await notificationHelpers.getNotificationsByUserId(userId);

    return {
      user,
      documents,
      applications,
      savedJobs,
      notifications,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      user: null,
      documents: [],
      applications: [],
      savedJobs: [],
      notifications: [],
    };
  }
}


export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const { user, documents, applications, savedJobs, notifications } = await getDashboardData(session.user.id);

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome to your dashboard." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
            <p className="text-muted-foreground">Total documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-muted-foreground">Total applications</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Saved Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savedJobs.length}</div>
            <p className="text-muted-foreground">Total saved jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
            <p className="text-muted-foreground">Total notifications</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentDocuments documents={documents} />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            {user ? (
              <div>
                <p><strong>Name:</strong> {user.full_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>ID:</strong> {user.id}</p>
                <Link href="/account">
                  <Button>Edit Account</Button>
                </Link>
              </div>
            ) : (
              <p>No user information available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
