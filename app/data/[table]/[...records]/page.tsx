import { Navbar,Footer,Copyright } from "@/app/components";
import { notFound } from "next/navigation";
import {
  Person as PersonIcon,
  Cake,
  Phone,
  FamilyRestroom,
  LocationOn,
  LocalHospital,
  School,
  Business,
  Work,
  CalendarToday,
  Call,
} from "@mui/icons-material";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function calculateAge(dob: string): number {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}


interface Contact {
    id: string;
    contact_number: string;
    type: string;
}

interface Education {
    id: string;
    school_name: string;
    school_address: string;
    notes: string;
    start_date: string;
    end_date: string;
}

interface Employment {
    id: string;
    company_name: string;
    company_type: string;
    position: string;
    start_date: string;
    end_date: string;
}

interface Person {
    name: string;
    dob: string;
    no_of_family_members: number;
    jurisdiction_name: string;
    birth_hospital: string;
    current_company: string | null;
    contacts: Contact[];
    education_history: Education[];
    employment_history: Employment[];
    created_at: string;
    updated_at: string;
}

// Now this works ✅
async function getPerson(id: string): Promise<Person> {
    const res = await fetch(`http://localhost:5000/api/persons/${parseInt(id)}`,{
        headers:{
            "Authorization":`Bearer ${process.env.API_TOKEN}`
        },
    });
    if (!res.ok) notFound();
    const json = await res.json();
    return json.data;
}

export default async function PersonRecord({ params }: { params: Promise<{ table: string, records: string[] }> }) {
    const {table, records } = await params;

    if (table !== "people") notFound();

    const person = await getPerson(records[0]);
    const age = calculateAge(person.dob);

    const contacts = person.contacts ?? [];
    const education = person.education_history ?? [];
    const employment = person.employment_history ?? [];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <p className="text-sm text-gray-500">
                Data1/1
            </p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Person Record
            </h1>
          </div>

          {/* Hero Summary */}
          <div className="mb-10 overflow-hidden rounded-2xl bg-white shadow border border-gray-300">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="shrink-0">
                  <div className="h-24 w-24 rounded-full border-4 border-gray-300 bg-gray-200 flex items-center justify-center shadow">
                    <PersonIcon className="h-12 w-12 text-gray-600" />
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {person.name}
                  </h2>
                  <p className="mt-2 text-lg text-gray-700">
                    Age {age} • Born {formatDate(person.dob)}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 text-sm">
                <QuickFact icon={<Cake fontSize="small" />} label="DOB" value={formatDate(person.dob)} />
                <QuickFact icon={<FamilyRestroom fontSize="small" />} label="Family" value={`${person.no_of_family_members} members`} />
                <QuickFact icon={<LocationOn fontSize="small" />} label="Jurisdiction" value={person.jurisdiction_name} />
                <QuickFact icon={<LocalHospital fontSize="small" />} label="Birth Hospital" value={person.birth_hospital} />
                <QuickFact icon={<Business fontSize="small" />} label="Company" value={person.current_company ?? "—"} />
              </div>
            </div>
          </div>

          <Section title="Contacts" icon={<Phone className="!w-7 !h-7" />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between rounded-xl border border-gray-300 bg-white p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-gray-200 p-2.5">
                      <Phone fontSize="small" className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{contact.contact_number}</p>
                      <p className="text-xs text-gray-600">{contact.type}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Call ${contact.type} number`}
                    className="rounded-full p-2 hover:bg-gray-200 transition"
                  >
                    <Call fontSize="small" className="text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Education History" icon={<School className="!w-7 !h-7" />}>
            <div className="space-y-4">
              {education.map((edu) => (
                <HistoryItem
                  key={edu.id}
                  title={edu.school_name}
                  subtitle={edu.school_address}
                  description={edu.notes}
                  period={`${formatDate(edu.start_date)} — ${formatDate(edu.end_date)}`}
                />
              ))}
            </div>
          </Section>

          <Section title="Employment History" icon={<Work className="!w-7 !h-7" />}>
            <div className="space-y-4">
              {employment.map((emp) => (
                <HistoryItem
                  key={emp.id}
                  title={emp.company_name}
                  subtitle={emp.company_type}
                  description={
                    <span className="inline-flex items-center rounded-full border border-gray-400 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                      {emp.position}
                    </span>
                  }
                  period={`${formatDate(emp.start_date)} — ${formatDate(emp.end_date)}`}
                />
              ))}
            </div>
          </Section>

          <div className="mt-10 rounded-2xl bg-white border border-gray-300 shadow p-6">
            <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-gray-900">
              <CalendarToday className="!w-6 !h-6 text-gray-600" />
              Record Metadata
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-600">Created At</p>
                <p className="mt-1 font-medium text-gray-900">{formatDate(person.created_at)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Last Updated</p>
                <p className="mt-1 font-medium text-gray-900">{formatDate(person.updated_at)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Uncomment if you want to add footer later */}
      <Footer />
      <Copyright />
    </>
  );
}

// ── Reusable Components ─────────────────────────────────────────────────────

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function Section({ title, icon, children }: SectionProps) {
  return (
    <div className="mb-10 rounded-2xl bg-white shadow border border-gray-300 p-6 sm:p-8">
      <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
        {icon}
        {title}
      </h2>
      {children}
    </div>
  );
}

interface QuickFactProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function QuickFact({ icon, label, value }: QuickFactProps) {
  return (
    <div className="text-center sm:text-left">
      <div className="flex justify-center sm:justify-start text-gray-600 mb-1">{icon}</div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 font-medium text-gray-900">{value}</p>
    </div>
  );
}

interface HistoryItemProps {
  title: string;
  subtitle: string;
  description: React.ReactNode;
  period: string;
}

function HistoryItem({ title, subtitle, description, period }: HistoryItemProps) {
  return (
    <div className="rounded-xl border border-gray-300 bg-gray-50 p-5 hover:bg-gray-100 transition">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
          <p className="text-sm text-gray-700">{subtitle}</p>
          <div className="mt-2">{description}</div>
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700">
          <CalendarToday fontSize="small" />
          {period}
        </div>
      </div>
    </div>
  );
}