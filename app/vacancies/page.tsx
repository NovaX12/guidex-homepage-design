import { jobHelpers } from "@/lib/supabase-helpers"
import VacancyCard from "@/components/VacancyCard"

async function getVacancies() {
  try {
    const vacancies = await jobHelpers.getAllVacancies()
    return vacancies
  } catch (error) {
    console.error("Error fetching vacancies:", error)
    return []
  }
}

export default async function VacanciesPage() {
  const vacancies = await getVacancies()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Vacancies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vacancies.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))}
      </div>
    </div>
  )
}
