import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDownToLine,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Briefcase,
  CalendarDays,
  Car,
  CloudSun,
  Clock3,
  CheckSquare,
  ChevronDown,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  Files,
  GitPullRequest,
  Headset,
  House,
  Laptop,
  LayoutDashboard,
  Mail,
  MapPin,
  Menu,
  Newspaper,
  Plane,
  Plus,
  ListChecks,
  Search,
  ShieldCheck,
  Sparkles,
  Droplets,
  UserRound,
  Users,
  Vote,
  Wallet,
  Workflow,
  X,
} from 'lucide-react'
import logo from './assets/images/logo.png'
import heroImage from './assets/images/hero.jpg';
import newsImage from './assets/images/news.jpg';

const primaryNav = [
  { label: 'Home', page: 'Home', icon: House },
  { label: 'News & Announcements', page: 'News & Announcements', icon: Newspaper },
  { label: 'Policies', page: 'Policies', icon: ShieldCheck },
  { label: 'Upcoming Events', page: 'Events', icon: CalendarDays },
  { label: 'Polls', page: 'Polls', icon: Vote },
  { label: 'Documents', page: 'Documents', icon: Files },
  { label: 'Calendar', page: 'Calendar', icon: CalendarDays },
  { label: 'Tasks', page: 'Tasks', icon: CheckSquare, count: '7' },
  { label: 'Workflows & Approvals', page: 'Workflows & Approvals', icon: GitPullRequest, count: '3' },
]

const serviceRequestNav = [
  { label: 'Payment / Finance', icon: Wallet, count: '5' },
  { label: 'Vehicle Request', icon: Car, count: '4' },
  { label: 'Procurement', icon: Briefcase, count: '4' },
  { label: 'IT Helpdesk', icon: Headset, count: '2' },
  { label: 'HR Services', icon: Users, count: '3' },
]

const corporateNav = [
  { label: 'Staff Directory', page: 'Staff Directory', icon: Users },
  { label: 'Knowledge Hub', page: 'Knowledge Hub', icon: BookOpen },
]

const workplaceModules = [
  { name: 'Correspondence', icon: Mail, tone: 'blue' },
  { name: 'Documents', icon: Files, tone: 'green' },
  { name: 'E-Leave', icon: CalendarDays, tone: 'teal' },
  { name: 'E-Registry', icon: FileText, tone: 'violet' },
  { name: 'HR Services', icon: Users, tone: 'pink' },
  { name: 'Imprest', icon: Wallet, tone: 'amber' },
  { name: 'IT Help Desk', icon: Laptop, tone: 'sky' },
  { name: 'Memo & Dispatch', icon: ClipboardList, tone: 'indigo' },
  { name: 'Procurement', icon: Briefcase, tone: 'rose' },
  { name: 'Reimbursement', icon: Wallet, tone: 'orange' },
  { name: 'Reports', icon: BarChart3, tone: 'emerald' },
  { name: 'Travel', icon: Plane, tone: 'cyan' },
]

const moduleToneClasses = {
  sky: 'bg-sky-50 text-sky-700 ring-sky-100',
  violet: 'bg-violet-50 text-violet-700 ring-violet-100',
  blue: 'bg-blue-50 text-blue-700 ring-blue-100',
  indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-100',
  teal: 'bg-teal-50 text-teal-700 ring-teal-100',
  amber: 'bg-amber-50 text-amber-700 ring-amber-100',
  orange: 'bg-orange-50 text-orange-700 ring-orange-100',
  rose: 'bg-rose-50 text-rose-700 ring-rose-100',
  pink: 'bg-pink-50 text-pink-700 ring-pink-100',
  cyan: 'bg-cyan-50 text-cyan-700 ring-cyan-100',
  green: 'bg-[#e8f5ec] text-[#168c42] ring-[#d4eadc]',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
}

function describeWeather(code) {
  if (code === 0) return 'Clear sky'
  if (code === 1) return 'Mainly clear'
  if (code === 2) return 'Partly cloudy'
  if (code === 3) return 'Overcast'
  if (code === 45 || code === 48) return 'Fog'
  if (code >= 51 && code <= 57) return 'Drizzle'
  if (code >= 61 && code <= 67) return 'Rain'
  if (code >= 71 && code <= 77) return 'Snow'
  if (code >= 80 && code <= 82) return 'Rain showers'
  if (code === 85 || code === 86) return 'Snow showers'
  if (code >= 95) return 'Thunderstorm'
  return 'Current conditions'
}

const moduleDetails = {
  Tasks: {
    description: 'Stay on top of your priorities and track what needs your attention.',
    rows: [
      ['Approve leave request', 'Awaiting your review', 'Overdue'],
      ['Review procurement document', 'Procurement · Due today', 'Today'],
      ['Provide feedback on UAT', 'Digital Services · Due today', 'Today'],
      ['Review policy document', 'Human Resources · Due Thursday', 'Upcoming'],
      ['Submit weekly report', 'Operations · Due Friday', 'Upcoming'],
    ],
    icon: CheckSquare,
  },
  'Workflows & Approvals': {
    description: 'Review pending approvals and follow the progress of your workflows.',
    rows: [
      ['Manager approval', 'Leave request · Ama Mensah', '4 pending'],
      ['Finance approval', 'Q3 procurement · Operations', '2 pending'],
      ['Final approval', 'Staff reimbursement · Finance', '1 pending'],
    ],
    icon: Workflow,
  },
  'Service Requests': {
    description: 'Create a request or check the status of support you have already requested.',
    rows: [
      ['IT Helpdesk', 'Laptop support · Updated today', 'In progress'],
      ['Vehicle', 'Pool vehicle booking · Submitted Sep 12', 'Pending'],
      ['Reimbursement', 'Travel expenses · Closed Sep 10', 'Done'],
    ],
    icon: ClipboardList,
  },
  Events: {
    description: 'Discover upcoming NITA events, learning sessions, and staff gatherings.',
    rows: [
      ['Digital Skills Day', 'Sep 15 · NITA Head Office', 'Register'],
      ['Procurement Workshop', 'Sep 18 · Online (Teams)', 'Register'],
      ['Service Improvement Forum', 'Sep 22 · Conference Room A', 'View details'],
    ],
    icon: CalendarDays,
  },
  Calendar: {
    description: 'Your schedule for today, all in one place.',
    rows: [
      ['Team stand-up', '09:00 · Microsoft Teams', 'Today'],
      ['UAT feedback session', '11:30 · Digital Services', 'Today'],
      ['Procurement review', '14:00 · Meeting Room 2', 'Today'],
    ],
    icon: CalendarDays,
  },
  'News & Announcements': {
    description: 'The latest updates and announcements from across NITA.',
    rows: [
      ['Welcome to your Smart Workplace', 'All NITA digital services in one place.', 'New'],
      ['Reimbursement module is live', 'Submit and track requests online.', 'Sep 11'],
      ['Quarterly town hall', 'Details to be confirmed.', 'Sep 08'],
    ],
    icon: Newspaper,
  },
  Policies: {
    description: 'Find the policies and guidance you need to work confidently.',
    rows: [
      ['Staff Handbook', 'People & Culture · Updated Sep 10', 'Updated'],
      ['IT Policy & Guidelines', 'Information Security · PDF', 'Open'],
      ['HR Policy Manual', 'People & Culture · PDF', 'Open'],
    ],
    icon: ShieldCheck,
  },
  Documents: {
    description: 'Browse frequently used forms, reports, and learning resources.',
    rows: [
      ['Forms & Templates', 'Shared resources · 18 files', 'Browse'],
      ['Q3 Operations Report', 'Operations · PDF · 2.4 MB', 'Download'],
      ['Training Resources', 'Learning & Development · 12 files', 'Browse'],
    ],
    icon: Files,
  },
  Polls: {
    description: 'Share your voice in current staff polls and see the results.',
    rows: [
      ['Preferred day for the staff wellness walk?', 'Friday 62% · Saturday 38%', 'Vote'],
      ['Ideas for our next staff social', 'Poll closes Sep 20', 'Open'],
    ],
    icon: Vote,
  },
  'Staff Directory': {
    description: 'Find colleagues across NITA and view contact details.',
    rows: [
      ['Yaw Boateng', 'Systems Administrator · Digital Services', 'View'],
      ['Ama Mensah', 'Director, Administration', 'View'],
      ['Kofi Boateng', 'HR Officer · People & Culture', 'View'],
    ],
    icon: Users,
  },
  'Knowledge Hub': {
    description: 'Guides, FAQs, and learning resources for everyday work.',
    rows: [
      ['Getting started with the workplace', 'Onboarding · Updated Oct 2026', 'Open'],
      ['ICT security guidelines', 'Information Security · PDF', 'Open'],
      ['Procurement process overview', 'Finance · Guide', 'Open'],
    ],
    icon: BookOpen,
  },
}

const initialTasks = [
  { title: 'Approve leave request', due: 'Overdue', tone: 'red' },
  { title: 'Review procurement document', due: 'Today', tone: 'amber' },
  { title: 'Provide feedback on UAT', due: 'Today', tone: 'amber' },
  { title: 'Review policy document', due: 'Thu', tone: 'green' },
  { title: 'Submit weekly report', due: 'Fri', tone: 'green' },
]

function Card({ title, action, children, className = '' }) {
  return (
    <section className={`homepage-card rounded-2xl border border-[#dce9df] bg-white p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-[16px] font-bold tracking-[-0.02em] text-[#172a20]">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

function CardAction({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 text-[13px] font-medium text-[#13803b] transition hover:text-[#0b5729] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21a652]"
    >
      {children}
    </button>
  )
}

function SidebarNavButton({ label, icon: Icon, count, active, collapsed, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      title={collapsed ? label : undefined}
      className={`group relative flex w-full min-h-[34px] items-center gap-2 rounded-lg px-2 text-left text-[8px] font-bold leading-[1.15] transition ${
        active
          ? 'bg-white text-[#0D4B2B]'
          : 'text-white hover:bg-white/10'
      } ${collapsed ? 'justify-center px-0' : ''}`}
    >
      <Icon
        size={18}
        strokeWidth={2.25}
        className={`shrink-0 ${active ? 'text-[#0D4B2B]' : 'text-white/90'}`}
        aria-hidden="true"
      />
      {!collapsed && (
        <>
          <span className="min-w-0 flex-1">{label}</span>
          {count && (
            <span
              className={`flex h-[17px] min-w-[17px] items-center justify-center rounded-full px-0.5 text-[7.5px] font-bold ${
                active ? 'bg-[#0D4B2B] text-white' : 'bg-white/20 text-white'
              }`}
            >
              {count}
            </span>
          )}
        </>
      )}
      {collapsed && count && (
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#21a652] ring-2 ring-[#0D4B2B]" aria-hidden="true" />
      )}
    </button>
  )
}

function SidebarSectionLabel({ children, collapsed }) {
  if (collapsed) return null
  return (
    <p className="mb-1.5 mt-5 px-2.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white/55 first:mt-0">
      {children}
    </p>
  )
}

function ModulePage({ page, onNewRequest, onHome }) {
  const module = moduleDetails[page]
  if (!module) {
    return (
      <div className="space-y-4">
        <h1 className="text-[28px] font-bold text-[#14271d]">{page}</h1>
        <p className="text-[#607168]">This section is coming soon.</p>
        <button
          type="button"
          onClick={onHome}
          className="inline-flex items-center gap-2 rounded-xl border border-[#dce9df] bg-white px-4 py-3 text-sm font-semibold text-[#286a41] hover:bg-[#f7faf8]"
        >
          <LayoutDashboard size={17} /> Dashboard
        </button>
      </div>
    )
  }
  const ModuleIcon = module.icon

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold leading-tight tracking-[-0.035em] text-[#14271d]">{page}</h1>
          <p className="mt-1 text-[14px] text-[#607168]">{module.description}</p>
        </div>
        {page === 'Service Requests' ? (
          <button
            type="button"
            onClick={onNewRequest}
            className="inline-flex items-center gap-2 rounded-xl bg-[#21a652] px-4 py-3 text-sm font-semibold text-[#07391c] transition hover:bg-[#1b9448]"
          >
            <Plus size={17} /> New request
          </button>
        ) : (
          <button
            type="button"
            onClick={onHome}
            className="inline-flex items-center gap-2 rounded-xl border border-[#dce9df] bg-white px-4 py-3 text-sm font-semibold text-[#286a41] hover:bg-[#f7faf8]"
          >
            <LayoutDashboard size={17} /> Dashboard
          </button>
        )}
      </div>
      <section className="overflow-hidden rounded-2xl border border-[#dce9df] bg-white">
        <div className="flex items-center gap-3 border-b border-[#e9efeb] px-5 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f4eb] text-[#15803d]">
            <ModuleIcon size={20} />
          </span>
          <div>
            <h2 className="font-bold text-[#172a20]">{page} overview</h2>
            <p className="text-sm text-[#718076]">{module.rows.length} items to explore</p>
          </div>
        </div>
        <ul className="divide-y divide-[#e9efeb]">
          {module.rows.map(([title, description, status], index) => {
            const rowIcon = page === 'Documents'
              ? [FileSpreadsheet, FileText, BookOpen][index % 3]
              : page === 'Tasks'
                ? CheckSquare
                : page === 'Policies'
                  ? ShieldCheck
                  : page === 'Events' || page === 'Calendar'
                    ? CalendarDays
                    : page === 'News & Announcements'
                      ? Newspaper
                      : ModuleIcon
            const RowIcon = rowIcon
            return (
              <li key={title} className="flex flex-wrap items-center gap-3 px-5 py-4 transition hover:bg-[#fbfdfb] sm:gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f1f7f3] text-[#21854a]">
                  <RowIcon size={18} />
                </span>
                <div className="min-w-[180px] flex-1">
                  <p className="text-sm font-semibold text-[#1b3023]">{title}</p>
                  <p className="mt-1 text-[13px] text-[#718076]">{description}</p>
                </div>
                <span className="rounded-full bg-[#e8f5ec] px-3 py-1.5 text-xs font-semibold text-[#286a41]">{status}</span>
                {page === 'Documents' && (
                  <button aria-label={`Download ${title}`} className="rounded-lg p-2 text-[#66786d] hover:bg-[#eaf5ed] hover:text-[#15803d]">
                    <ArrowDownToLine size={17} />
                  </button>
                )}
                {page !== 'Documents' && (
                  <ArrowRight size={16} className="text-[#91a097]" aria-hidden="true" />
                )}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

function App() {
  const [activePage, setActivePage] = useState('Home')
  const [tasks, setTasks] = useState(initialTasks)
  const [query, setQuery] = useState('')
  const [requestOpen, setRequestOpen] = useState(false)
  const [requestType, setRequestType] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [weather, setWeather] = useState(null)
  const [weatherError, setWeatherError] = useState(false)
  const [requests, setRequests] = useState([
    { name: 'IT Helpdesk', status: 'In progress', tone: 'green' },
    { name: 'Vehicle', status: 'Pending', tone: 'amber' },
    { name: 'Reimbursement', status: 'Done', tone: 'green' },
  ])

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.title.toLowerCase().includes(query.toLowerCase())),
    [query, tasks],
  )

  useEffect(() => {
    const controller = new AbortController()

    async function loadWeather() {
      const weatherUrl = new URL('https://api.open-meteo.com/v1/forecast')
      weatherUrl.search = new URLSearchParams({
        latitude: '5.6037',
        longitude: '-0.1870',
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code',
        timezone: 'Africa/Accra',
      })

      try {
        const response = await fetch(weatherUrl, { signal: controller.signal })
        if (!response.ok) throw new Error(`Weather service returned ${response.status}`)
        const data = await response.json()
        const current = data.current
        const values = [
          current?.temperature_2m,
          current?.relative_humidity_2m,
          current?.apparent_temperature,
          current?.weather_code,
        ]
        if (!values.every(Number.isFinite)) {
          throw new Error('Weather service returned incomplete current conditions')
        }

        setWeather({
          temperature: Math.round(current.temperature_2m),
          humidity: Math.round(current.relative_humidity_2m),
          feelsLike: Math.round(current.apparent_temperature),
          condition: describeWeather(current.weather_code),
        })
      } catch (error) {
        if (error.name !== 'AbortError') setWeatherError(true)
      }
    }

    loadWeather()
    return () => controller.abort()
  }, [])

  function addRequest(event) {
    event.preventDefault()
    if (!requestType.trim()) return
    setRequests((current) => [
      { name: requestType.trim(), status: 'Pending', tone: 'amber' },
      ...current,
    ])
    setRequestType('')
    setRequestOpen(false)
    setActivePage('Service Requests')
  }

  function toggleTask(index) {
    setTasks((current) =>
      current.map((task, taskIndex) =>
        taskIndex === index ? { ...task, done: !task.done } : task,
      ),
    )
  }

  const sidebarWidth = sidebarCollapsed ? 'md:w-[72px]' : 'md:w-[248px]'

  return (
    <div className="min-h-screen bg-[#f4f8f5] text-[#182c21] md:flex">
      <aside
        className={`flex shrink-0 flex-col bg-[#0D4B2B] md:sticky md:top-0 md:h-[100dvh] md:border-r md:border-[#0a3d24] ${sidebarWidth} transition-[width] duration-200`}
      >
        <div className="hidden shrink-0 p-2.5 md:block">
          <button
            type="button"
            onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Menu size={21} strokeWidth={2.25} aria-hidden="true" />
          </button>
        </div>

        {!sidebarCollapsed && (
          <div className="hidden shrink-0 border-b border-white/10 px-4 pb-4 md:block">
            <p className="text-[9px] font-bold leading-4 text-white/60">NITA and Republic of Ghana</p>
            <p className="mt-0.5 text-[13px] font-bold tracking-[-0.02em] text-white">NITA Workplace</p>
            <p className="text-[10px] font-bold text-[#7dd4a0]">Smart Space</p>
          </div>
        )}

        <div
          className={`hidden min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-2.5 py-3 md:block ${sidebarCollapsed ? 'px-1.5' : ''}`}
        >
          <nav aria-label="Main navigation" className="w-full space-y-0.5">
            {primaryNav.map(({ label, page, count, icon }) => (
              <SidebarNavButton
                key={page}
                label={label}
                icon={icon}
                count={count}
                collapsed={sidebarCollapsed}
                active={activePage === page}
                onClick={() => setActivePage(page)}
              />
            ))}
          </nav>

          {sidebarCollapsed && <div className="my-3 border-t border-white/15" aria-hidden="true" />}
          <SidebarSectionLabel collapsed={sidebarCollapsed}>Service requests</SidebarSectionLabel>
          <nav aria-label="Service requests" className="w-full space-y-0.5">
            {serviceRequestNav.map(({ label, count, icon }) => (
              <SidebarNavButton
                key={label}
                label={label}
                icon={icon}
                count={count}
                collapsed={sidebarCollapsed}
                active={activePage === 'Service Requests'}
                onClick={() => setActivePage('Service Requests')}
              />
            ))}
          </nav>

          {sidebarCollapsed && <div className="my-3 border-t border-white/15" aria-hidden="true" />}
          <SidebarSectionLabel collapsed={sidebarCollapsed}>Corporate</SidebarSectionLabel>
          <nav aria-label="Corporate" className="w-full space-y-0.5">
            {corporateNav.map(({ label, page, icon }) => (
              <SidebarNavButton
                key={page}
                label={label}
                icon={icon}
                collapsed={sidebarCollapsed}
                active={activePage === page}
                onClick={() => setActivePage(page)}
              />
            ))}
          </nav>
        </div>

        <nav aria-label="Main navigation mobile" className="flex gap-2 overflow-x-auto bg-[#0D4B2B] p-3 md:hidden">
          {primaryNav.slice(0, 6).map(({ label, page, icon: NavIcon }) => (
            <button
              key={page}
              type="button"
              onClick={() => setActivePage(page)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-[8px] font-bold ${
                activePage === page ? 'bg-white text-[#0D4B2B]' : 'bg-white/10 text-white'
              }`}
            >
              <NavIcon size={18} />
              {label.split(' ')[0]}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
      <main className="min-w-0 flex-1 px-5 pb-8 md:px-8">
        <header className="sticky top-0 z-40 -mx-5 mb-5 grid grid-cols-1 items-center gap-4 border-b border-[#e3ebe5]/80 bg-[#f4f8f5]/95 px-5 py-4 backdrop-blur-md lg:grid-cols-[minmax(140px,200px)_1fr_auto] md:-mx-8 md:px-8">
          <div className="flex items-center gap-3 lg:justify-start">
            <img
              className="h-14 w-auto max-w-[220px] object-contain object-left"
              src={logo}
              alt="NITA Ghana and Republic of Ghana"
            />
          </div>
          <label className="relative mx-auto w-full max-w-[560px] lg:justify-self-center">
            <span className="sr-only">Search services, documents, people or actions</span>
            <Search aria-hidden="true" size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#809187]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search services, documents, people or type an action..."
              className="h-[47px] w-full rounded-xl border border-[#d9e5dc] bg-white pl-11 pr-4 text-[14px] text-[#26392e] outline-none placeholder:text-[#77877d] focus:border-[#21a652] focus:ring-2 focus:ring-[#21a652]/15"
            />
          </label>
          <div className="flex shrink-0 items-center justify-end gap-3 lg:justify-self-end">
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
                onClick={() => {
                  setNotificationsOpen((open) => !open)
                  setProfileOpen(false)
                }}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#dce9df] bg-white text-[#506257] transition hover:border-[#b9d8c3] hover:text-[#15803d]"
              >
                <Bell size={19} />
                <span className="absolute right-[8px] top-[7px] h-2 w-2 rounded-full border-2 border-white bg-[#e54b3c]" />
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 top-12 z-20 w-[min(320px,calc(100vw-2rem))] rounded-xl border border-[#dce9df] bg-white p-4 shadow-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-bold">Notifications</h2>
                    <button onClick={() => setNotificationsOpen(false)} aria-label="Close notifications" className="rounded p-1 text-[#718076] hover:bg-[#f2f6f3]"><X size={16} /></button>
                  </div>
                  <div className="space-y-3 text-sm">
                    <p className="rounded-lg bg-[#f4f8f5] p-3"><strong className="block">Approval needed</strong><span className="text-[#718076]">A leave request is waiting for review.</span></p>
                    <p className="rounded-lg bg-[#f4f8f5] p-3"><strong className="block">Upcoming event</strong><span className="text-[#718076]">Digital Skills Day is coming up on Sep 15.</span></p>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                aria-label="Open Yaw's profile menu"
                aria-expanded={profileOpen}
                onClick={() => {
                  setProfileOpen((open) => !open)
                  setNotificationsOpen(false)
                }}
                className="flex items-center gap-2 rounded-full border border-[#dce9df] bg-white py-1 pl-1 pr-2 text-left transition hover:border-[#b9d8c3]"
              >
                <img src={heroImage} alt="" className="h-8 w-8 rounded-full object-cover object-[35%_25%]" />
                <span className="hidden text-left leading-tight sm:block">
                  <span className="block text-xs font-semibold text-[#21372a]">Yaw Boateng</span>
                  <span className="block text-[10px] text-[#718076]">Systems Administrator</span>
                </span>
                <ChevronDown size={15} className="text-[#718076]" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-12 z-20 w-56 rounded-xl border border-[#dce9df] bg-white p-2 shadow-xl">
                  <div className="border-b border-[#e9efeb] px-3 py-2">
                    <p className="text-sm font-semibold">Yaw Boateng</p>
                    <p className="text-xs text-[#718076]">yaw.boateng@nita.gov.gh</p>
                  </div>
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#405247] hover:bg-[#f4f8f5]"><UserRound size={16} /> My profile</button>
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#405247] hover:bg-[#f4f8f5]"><Sparkles size={16} /> Preferences</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {activePage !== 'Home' && activePage !== 'Documents' && activePage !== 'Polls' && (
          <div className="mb-5">
            <p className="text-sm text-[#607168]">Good morning, Yaw · You have 7 open tasks and 3 approvals waiting today.</p>
          </div>
        )}
        {activePage === 'Home' ? (
          <div className="homepage-interactive">
            <section className="mb-6 grid grid-cols-1 gap-3 xl:grid-cols-4">
              <div className="relative min-h-[218px] overflow-hidden rounded-2xl bg-[#0d4b2b] shadow-sm md:min-h-[236px] xl:col-span-3">
                <img src={heroImage} alt="NITA colleagues working together" className="absolute inset-0 h-full w-full object-cover object-[45%_42%]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07391f]/95 via-[#07391f]/70 to-[#07391f]/15" />
                <div className="relative flex min-h-[218px] max-w-xl flex-col items-start justify-center p-6 text-white md:min-h-[236px] md:p-9">
                  <h1 className="max-w-lg text-3xl font-bold leading-tight tracking-[-0.035em] md:text-[38px]">Good morning, Yaw</h1>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/85 md:text-[15px]">
                    You have 7 open tasks and 3 approvals waiting for your review today.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActivePage('Service Requests')}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#21a652] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#168c42]"
                  >
                    Explore services <ArrowRight size={16} />
                  </button>
                </div>
              </div>
              <section className="weather-card homepage-card flex min-h-[218px] flex-col justify-between rounded-2xl border border-[#c6e2ce] bg-gradient-to-br from-[#e8f5ec] via-[#f5faf6] to-[#d8eedf] p-5 shadow-sm md:min-h-[236px] xl:col-span-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#718076]">Weather</p>
                    <h2 className="mt-1 text-sm font-bold text-[#21372a]">Accra, Ghana</h2>
                  </div>
                  <CloudSun size={27} className="text-[#d99b1d]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[42px] font-bold leading-none tracking-[-0.05em] text-[#172a20]">{weather ? `${weather.temperature}°` : '--°'}</p>
                  <p aria-live="polite" className="mt-2 text-sm font-semibold text-[#405247]">
                    {weather?.condition ?? (weatherError ? 'Current conditions unavailable' : 'Loading weather…')}
                  </p>
                </div>
                <div className="flex items-center gap-2 border-t border-[#e9efeb] pt-3 text-xs text-[#718076]">
                  <Droplets size={15} className="text-[#21854a]" aria-hidden="true" />
                  {weather ? (
                    <>
                      <span>Humidity {weather.humidity}%</span>
                      <span aria-hidden="true">·</span>
                      <span>Feels like {weather.feelsLike}°</span>
                    </>
                  ) : (
                    <span>{weatherError ? 'Weather data temporarily unavailable' : 'Fetching local conditions'}</span>
                  )}
                </div>
              </section>
            </section>

            <section className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[17px] font-bold tracking-[-0.02em] text-[#172a20]">My Priorities</h2>
                <span className="text-xs font-medium text-[#718076]">A quick look at what needs you</span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { label: 'Tasks', count: '7', detail: 'Pending tasks', icon: ListChecks, color: 'green', page: 'Tasks' },
                  { label: 'Workflows & Approvals', count: '3', detail: 'Pending approvals', icon: Workflow, color: 'amber', page: 'Workflows & Approvals' },
                  { label: 'Service Requests', count: '5', detail: 'Open requests', icon: Headset, color: 'red', page: 'Service Requests' },
                ].map(({ label, count, detail, icon: PriorityIcon, color, page }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActivePage(page)}
                    className="group flex min-h-[132px] items-center gap-4 rounded-2xl border border-[#e3ebe5] bg-white p-4 text-left shadow-[0_2px_10px_rgba(20,45,29,0.025)] transition hover:-translate-y-0.5 hover:border-[#b8d9c2] hover:shadow-md sm:p-5"
                  >
                    <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                      color === 'green' ? 'bg-[#e8f5ec] text-[#168c42]' : color === 'amber' ? 'bg-[#fff5df] text-[#d99300]' : 'bg-[#fff0ef] text-[#df4949]'
                    }`}>
                      <PriorityIcon size={29} strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold leading-5 text-[#26382d]">{label}</span>
                      <span className={`mt-1 block text-[27px] font-bold leading-8 tracking-[-0.03em] ${
                        color === 'green' ? 'text-[#168c42]' : color === 'amber' ? 'text-[#d99300]' : 'text-[#d94343]'
                      }`}>{count}</span>
                      <span className="mt-0.5 block text-xs text-[#718076]">{detail}</span>
                    </span>
                    <span className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-[#21854a] group-hover:flex">
                      View all <ArrowRight size={14} />
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-[17px] font-bold tracking-[-0.02em] text-[#172a20]">Workplace Modules</h2>
                <button
                  type="button"
                  onClick={() => setActivePage('Service Requests')}
                  className="text-[13px] font-medium text-[#13803b] transition hover:text-[#0b5729]"
                >
                  View all modules
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {workplaceModules.map(({ name, icon: ModuleIcon, tone }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setActivePage(name === 'Documents' ? 'Documents' : 'Service Requests')}
                    className="group flex flex-col items-center gap-2.5 rounded-2xl border border-[#e3ebe5] bg-white px-3 py-4 text-center transition duration-200 hover:-translate-y-1 hover:border-[#b8d9c2] hover:bg-[#f4faf6] hover:shadow-lg hover:shadow-[#155c2e]/10 active:scale-[0.98]"
                  >
                    <span
                      className={`module-icon flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset transition duration-200 ${moduleToneClasses[tone]}`}
                    >
                      <ModuleIcon size={20} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="text-[12px] font-semibold leading-4 text-[#26382d] transition-colors group-hover:text-[#0d4b2b]">{name}</span>
                  </button>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-6">
          <Card
            title="My Tasks"
            action={<CardAction onClick={() => setActivePage('Tasks')}>View all</CardAction>}
            className="border-t-[3px] border-t-[#21a652] lg:col-span-2"
          >
            <ul className="divide-y divide-[#e9efeb]">
              {filteredTasks.length > 0 ? filteredTasks.map((task) => {
                const taskIndex = tasks.indexOf(task)
                return (
                  <li key={task.title} className="flex min-h-[44px] items-center gap-3 py-2">
                    <input
                      type="checkbox"
                      checked={Boolean(task.done)}
                      onChange={() => toggleTask(taskIndex)}
                      aria-label={`Mark ${task.title} complete`}
                      className="h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-[6px] border-2 border-[#21a652] checked:bg-[#21a652] checked:before:block checked:before:text-center checked:before:text-[12px] checked:before:font-bold checked:before:leading-[14px] checked:before:text-white checked:before:content-['✓']"
                    />
                    <span className={`min-w-0 flex-1 text-[14px] ${task.done ? 'text-[#829087] line-through' : ''}`}>
                      {task.title}
                    </span>
                    <span className={`rounded-full px-[11px] py-[4px] text-[12px] font-medium ${
                      task.tone === 'red'
                        ? 'bg-[#ffe6e3] text-[#bd1c10]'
                        : task.tone === 'amber'
                          ? 'bg-[#fff1d8] text-[#8d5a00]'
                          : 'bg-[#e5f4eb] text-[#286a41]'
                    }`}>
                      {task.due}
                    </span>
                  </li>
                )
              }) : (
                <li className="py-5 text-sm text-[#708076]">
                  {query ? 'No matching tasks.' : 'All tasks are complete.'}
                </li>
              )}
            </ul>
          </Card>

          <Card
            title="Workflows & Approvals"
            action={<CardAction onClick={() => setActivePage('Workflows & Approvals')}>Open</CardAction>}
            className="border-t-[3px] border-t-[#21a652] lg:col-span-2"
          >
            <div className="space-y-[14px]">
              {[['Manager approval', '4', '70%'], ['Finance approval', '2', '40%'], ['Final approval', '1', '20%']].map(([label, number, width]) => (
                <div key={label}>
                  <div className="mb-[6px] flex justify-between text-[13px] font-medium">
                    <span>{label}</span><span>{number}</span>
                  </div>
                  <div className="h-[8px] overflow-hidden rounded-full bg-[#e6efe9]">
                    <div className="h-full rounded-full bg-[#21a652]" style={{ width }} />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActivePage('Workflows & Approvals')}
              className="mt-5 rounded-[10px] bg-[#21a652] px-4 py-[10px] text-[14px] font-semibold text-[#07391c] transition hover:bg-[#1b9448]"
            >
              Review pending (3)
            </button>
          </Card>

          <Card title="Service Requests" className="border-t-[3px] border-t-[#21a652] lg:col-span-2">
            <button
              type="button"
              onClick={() => setRequestOpen(true)}
              className="mb-4 w-full rounded-[10px] bg-[#21a652] py-[10px] text-[14px] font-semibold text-[#07391c] transition hover:bg-[#1b9448]"
            >
              + New request
            </button>
            <ul className="divide-y divide-[#e9efeb]">
              {requests.map(({ name, status, tone }) => (
                <li key={name} className="flex min-h-[44px] items-center justify-between gap-2 py-2 text-[14px]">
                  <span>{name}</span>
                  <span className={`rounded-full px-[11px] py-[4px] text-[12px] font-medium ${
                    tone === 'amber' ? 'bg-[#fff1d8] text-[#8d5a00]' : 'bg-[#e5f4eb] text-[#286a41]'
                  }`}>{status}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card
            title="Upcoming Events"
            action={<CardAction onClick={() => setActivePage('Calendar')}>View calendar</CardAction>}
            className="border-t-[3px] border-t-[#21a652] lg:col-span-6"
          >
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {[
                ['15', 'Digital Skills Day', '09:00 AM – 12:00 PM', 'NITA Head Office'],
                ['18', 'Procurement Workshop', '10:00 AM – 12:30 PM', 'Online (Teams)'],
                ['22', 'Service Improvement Forum', '02:00 PM – 03:30 PM', 'Conference Room A'],
              ].map(([date, title, time, place]) => (
                <li key={title} className="flex min-h-[124px] items-start gap-3 rounded-xl border border-[#e6eee8] bg-[#fcfdfc] p-3.5 transition hover:border-[#b8d9c2] hover:bg-[#f8fcf9]">
                  <div className="flex h-[58px] w-[54px] shrink-0 flex-col items-center justify-center rounded-xl border border-[#e3ebe5] bg-white text-[#178344] shadow-sm">
                    <span className="text-[23px] font-bold leading-6">{date}</span>
                    <span className="mt-0.5 text-[10px] font-bold tracking-wide">SEP</span>
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[14px] font-semibold leading-5 text-[#1c3024]">{title}</p>
                    <p className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-[#596b60]">
                      <Clock3 size={13} className="shrink-0 text-[#21854a]" /> {time}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-[12px] text-[#718076]">
                      <MapPin size={13} className="shrink-0" /> {place}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <section className="homepage-card overflow-hidden rounded-2xl border border-[#dce9df] bg-white lg:col-span-2">
            <div className="relative flex min-h-[150px] items-end overflow-hidden bg-[#0d4b2b] p-4">
              <img src={newsImage} alt="" className="absolute inset-0 h-full w-full object-cover object-[68%_35%]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07391f]/90 via-[#07391f]/65 to-[#07391f]/20" />
              <div className="relative">
                <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                  <Newspaper size={12} /> NITA updates
                </span>
                <h2 className="max-w-[260px] text-[18px] font-bold leading-6 text-white">News & Announcements</h2>
                <button
                  type="button"
                  onClick={() => setActivePage('News & Announcements')}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white/90 hover:text-white"
                >
                  Read the latest <ArrowRight size={14} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                {[
                  ['Welcome to your Smart Workplace', 'All NITA digital services in one place.', 'NEW'],
                  ['Reimbursement module is live', 'Submit and track requests online.', 'UPDATE'],
                  ['Quarterly town hall', 'Details to be confirmed.', 'NOTICE'],
                ].map(([title, text, tag], index) => (
                  <li key={title} className={`flex gap-3 ${index < 2 ? 'border-b border-[#e9efeb] pb-3' : ''}`}>
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eaf5ed] text-[#21854a]">
                      {index === 0 ? <Sparkles size={15} /> : index === 1 ? <ClipboardList size={15} /> : <CalendarDays size={15} />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[13px] font-semibold leading-5 text-[#24372b]">{title}</p>
                        <span className="rounded-full bg-[#f0f7f2] px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-[#21854a]">{tag}</span>
                      </div>
                      <p className="mt-0.5 text-[12px] leading-4 text-[#718076]">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <Card
            title="Calendar"
            action={<CardAction onClick={() => setActivePage('Calendar')}>Open</CardAction>}
            className="lg:col-span-2"
          >
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-[#f3f8f4] p-3">
              <span className="flex h-11 w-11 flex-col items-center justify-center rounded-lg bg-white text-[#178344] shadow-sm">
                <span className="text-[18px] font-bold leading-5">12</span>
                <span className="text-[9px] font-bold tracking-wide">OCT</span>
              </span>
              <div>
                <p className="text-sm font-semibold">Today’s agenda</p>
                <p className="text-xs text-[#718076]">Monday · 3 meetings</p>
              </div>
            </div>
            <ul className="space-y-2">
              {[
                ['09:00', 'Team stand-up', 'Microsoft Teams'],
                ['11:30', 'UAT feedback session', 'Digital Services'],
                ['14:00', 'Procurement review', 'Meeting Room 2'],
              ].map(([time, title, location]) => (
                <li key={title} className="flex gap-3 rounded-xl border border-[#edf1ee] p-3 text-[13px]">
                  <div className="w-[46px] shrink-0 pt-0.5 text-xs font-semibold text-[#21854a]">{time}</div>
                  <div className="min-w-0 border-l-2 border-[#a9d9b8] pl-3">
                    <p className="font-semibold text-[#26382d]">{title}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#718076]"><MapPin size={12} />{location}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Policies" className="lg:col-span-2">
            <ul className="divide-y divide-[#e9efeb]">
              {['Staff Handbook', 'IT Policy & Guidelines', 'HR Policy Manual'].map((item, index) => (
                <li key={item} className="flex min-h-[44px] items-center justify-between gap-2 py-2 text-[14px]">
                  <span>{item}</span>
                  {index === 0 && <span className="rounded-full bg-[#e5f4eb] px-[11px] py-[4px] text-[12px] font-medium text-[#286a41]">Updated</span>}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Documents" action={<CardAction onClick={() => setActivePage('Documents')}>Browse</CardAction>} className="lg:col-span-2">
            <ul className="divide-y divide-[#e9efeb]">
              {[
                { name: 'Forms & Templates', icon: FileSpreadsheet },
                { name: 'Q3 Operations Report', icon: FileText },
                { name: 'Training Resources', icon: BookOpen },
              ].map(({ name, icon: DocumentIcon }) => (
                <li key={name} className="flex min-h-[44px] items-center gap-3 py-2 text-[14px]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eaf5ed] text-[#21854a]"><DocumentIcon size={17} /></span>
                  <span className="flex-1">{name}</span>
                  <ArrowDownToLine size={15} className="text-[#8b9a90]" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Poll" className="lg:col-span-2">
            <p className="mb-2 text-[14px] font-semibold">Preferred day for the staff wellness walk?</p>
            <div className="mb-1 h-[26px] overflow-hidden rounded-lg bg-[#e5efe9]">
              <div className="h-full bg-[#21a652]" style={{ width: '62%' }} />
            </div>
            <p className="mb-2 text-[13px] text-[#65776c]">Friday 62%</p>
            <div className="mb-1 h-[26px] overflow-hidden rounded-lg bg-[#e5efe9]">
              <div className="h-full bg-[#9bd5af]" style={{ width: '38%' }} />
            </div>
            <p className="text-[13px] text-[#65776c]">Saturday 38%</p>
          </Card>
            </div>
          </div>
        ) : (
          <ModulePage
            page={activePage}
            onNewRequest={() => setRequestOpen(true)}
            onHome={() => setActivePage('Home')}
          />
        )}
      </main>
      </div>

      {requestOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#092817]/50 p-4">
          <form onSubmit={addRequest} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Create a service request</h2>
              <button
                type="button"
                onClick={() => setRequestOpen(false)}
                aria-label="Close"
                className="rounded-md p-2 text-[#65776c] hover:bg-[#f2f6f3]"
              >
                <X size={18} />
              </button>
            </div>
            <label className="mb-4 block text-sm font-medium">
              Request type
              <input
                autoFocus
                value={requestType}
                onChange={(event) => setRequestType(event.target.value)}
                placeholder="e.g. Equipment support"
                className="mt-2 h-11 w-full rounded-lg border border-[#d9e5dc] px-3 font-normal outline-none focus:border-[#21a652] focus:ring-2 focus:ring-[#21a652]/15"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#21a652] py-3 font-semibold text-[#07391c] hover:bg-[#1b9448]"
            >
              Submit request
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default App
