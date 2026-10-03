# DATA247 — Changelog

---

## April 2026 — Project Initiation

- DATA247 idea conceived and documented
- Initial market research conducted — India data job preparation gap identified
- Product vision established — From College to Cabin
- Target audience defined — college students, freshers and early-career professionals in India
- Specific focus identified — learners from tier-2, tier-3 cities and rural India who lack access to structured, affordable preparation
- Competitor landscape reviewed — InterviewBit, GeeksforGeeks, Adda247, Filo
- Gap identified — no bilingual (English + Hinglish) preparation platform existed for data analytics roles
- GitHub repository created
- Early feature architecture planned

---

## May 2026 — Planning, Compliance and Development Phase

- Pre-build product scrutiny completed — 20 issues identified and resolved
- Master planning document prepared — product overview, legal compliance, brand standards
- DPDP Act 2023 compliance requirements reviewed and incorporated into product design
- Brand standards finalised — colours, language strategy, identity
- Bilingual language strategy confirmed — English and Hinglish — deliberate design decision for pan-India accessibility across tier-1, tier-2, tier-3 cities and rural learners
- MVP development initiated and completed — solo founder, no technical team
- Admin panel built — full content management system for real-time updates without app deployment
- Telegram community launched — t.me/data247prep
- LinkedIn company page created
- Data Analyst and Data Scientist question banks structured and uploaded — 720+ questions across 12 modules
- Interview Guides built — HR, Technical, Behavioural and Managerial rounds
- Morning Drill workflow built and content uploaded
- Flashcards and progress tracking modules built and live
- All legal pages built — Privacy Policy and Terms of Service — DPDP Act 2023 compliant
- Security audit completed — all 14 database tables protected with Row Level Security

---

## June 2026 — Version 1.0 Mobile App Launch

- App published and live — https://data247.co.in
- 900+ pieces of content live — MCQ questions, Flashcards, Morning Drill, Interview Guides, Job Ready Quiz
- Full feature set live — MCQ Practice, Flashcards, Morning Drill, Salary Calculator, Learning Roadmap, Interview Guides, Job Ready Quiz, Referral System, Bookmarks
- 48 structured study PDFs created — SQL (10 notes) and Python (14 notes) — each available in English and Hinglish
- SQL notes covering: Fundamentals, DDL/DML/DQL, Aggregates, GROUP BY, JOINs, Subqueries, CASE WHEN, String Functions, Date Functions, Top 30 Interview Questions
- Python notes covering: Basics, Collections, Loops, Functions, File Handling, Pandas, Merge, Data Cleaning, NumPy, Matplotlib, Seaborn, EDA, Top 30 Interview Questions
- All study notes made available in both English and Hinglish — first data analytics preparation content of this kind in India
- App icon designed and updated — brand identity established
- External security audit completed — MobSF v4.5.0 — Score 52/100 — no critical vulnerabilities found
- Privacy Policy page live — data247.co.in/privacy-policy — DPDP Act 2023 compliant
- Delete Account page live — data247.co.in/delete-account
- Landing page launched — data247.co.in — standalone marketing website
- Custom domain connected — data247.co.in — Hostinger DNS configuration
- Google Play Store — Closed Testing (Alpha) — Active
  - Package name: app.data247.prep
  - PWA packaged as TWA — Google Play Store submission complete
  - Available on 20,149+ Android devices
  - Closed Testing started — June 8, 2026
  - Play Store — India — targeted country set
- Be10X AI Generalist Hackathon — submission completed — AI Resume Reviewer and AI Salary Booster highlighted as primary AI features

---

## June 2026 — Version 2.0 Planning

- Expanded role structure and content hierarchy planned — Business Analyst, ML Engineer, Data Engineer tracks
- Advanced feature roadmap documented — Pro subscription at Rs 99/month
- Feature segregation between V1.0 and V2.0 completed
- Product scalability and user experience improvements planned
- AI Chatbot — in-app data career assistant — planned for V2.0
- Company Packs planned — TCS, Infosys, Wipro, Accenture, GIFT City Fintech
- Mock Interview and Battle Arena features planned for V2.0
- National Leaderboard planned — post 5000 active users milestone
- Campus Ambassador Programme planned — Mid to Late 2027
- Enterprise Licensing (B2B) — college placement cells — planned for V2.0 onwards

---

## July 2026 — Version 1.5 Web Platform Launch

### Web Platform Foundation
- Full web application built and launched at data247.co.in — accessible from any browser on any device
- Web platform built in direct response to user feedback — mobile app users requested browser access and expert human support
- Authentication system built — Email + Password and Google OAuth — DPDP Act 2023 compliant with explicit consent and age verification checkboxes
- 7-day inactivity auto-logout implemented — user data protection
- Separate Supabase backend provisioned for web platform — Row Level Security on all tables
- All new web app database tables protected with RLS — consistent with mobile app security standards

### Web Platform — Core Features Replicated from Mobile App
- MCQ Practice — full role, module, difficulty selection — timer — bookmarks — results page — web-optimised
- Flashcards — 3D flip animation — role and topic filters — bookmark — completion screen
- Job Ready Quiz — 10-question diagnostic — skill gap analysis — strong and weak area identification
- Interview Guides — HR, Technical, Behavioural, Managerial rounds — expandable accordion — sample answers and tips
- Study Notes — SQL, Python, Excel — English and Hinglish language toggle — PDF download
- Learning Roadmap — role, level, and duration selection — week-by-week personalised plan
- Bookmarks — combined MCQ and flashcard bookmark view
- Progress Dashboard — streak, questions done, accuracy — real-time
- Profile Page — edit name and role — referral code — WhatsApp share — friend count

### Career Tools — Web Exclusive
- ATS Resume Builder — form-based resume builder with AI review via Claude — ATS compatibility score — strengths, weaknesses, and quick wins — full page result
- Salary + Growth Guide — India 2026 salary data by role, city tier, experience, and tools — AI salary booster — growth timeline — top companies hiring by city tier

### Tutor Marketplace — New Feature (Accelerated from V2.0)
- Tutor marketplace built and launched — accelerated from planned V2.0 feature based on direct user feedback
- Open to any professional from any domain — not limited to data roles
- Tutor registration system — LinkedIn PDF export upload — AI parsing for auto-fill of name, bio, experience, certifications, companies
- Teaching Specialisation — autocomplete skill tags — searchable keywords for filtering
- Interview Preparation roles — separate section — dropdown selection — filterable
- Past Companies — individual chips — filterable and searchable
- Certifications — one-at-a-time tag input
- Fixed session rate — Rs 150 per 15 minutes for all new tutors — Rs 300 per 30 minutes — Rs 450 per 45 minutes — Rs 600 per 1 hour
- Rate upgrade system — tutors eligible after 3 calendar months — admin approval workflow — caps: Rs 500/15min, Rs 1000/30min, Rs 1500/45min, Rs 2000/1hr
- Tutor Portal — sign in and registration at /tutor-portal — Google OAuth and email/password
- Tutor edit page — full profile editing — rate upgrade request form
- Unique shareable tutor URL — data247.co.in/t/[slug] — shareable on LinkedIn and WhatsApp
- Admin approval workflow — Tutor Approvals panel — Pending, Approved, Rejected tabs — full profile view before approval
- Founding Tutor badge — first tutors marked as Founding Tutors — displayed on profile and listing
- Public tutor listing page — /tutors — search by skill, company, university, name — filters by service type, duration, experience, language, interview prep role
- Individual tutor profile pages — /tutors/[id] and /t/[slug] — skills, interview prep roles, bio, certifications, companies, session rates, booking
- Star rating system — 1 to 5 stars — booking-verified only (learner must confirm session before rating) — aggregate display — average rating on tutor card
- Review system — text reviews — booking-verified — admin moderation before publishing — first name and initial only for privacy
- Rate upgrade requests — admin panel tab — full message view — mailto link for Gmail reply — Unlock Rates and Mark Reviewed actions

### Viral Growth Feature
- Career Story Maker — photo upload or illustrated avatar selection — career story card generator — 1080x1920px — WhatsApp Status and Instagram Story compatible — all processing client-side, photo never uploaded to server
- Shareable story card — user problem, old way vs DATA247 way, DATA247 branding — downloadable PNG
- Integrated into hero section of landing page — prominent placement above hero cards

### Admin Panel — Web Platform
- Tutor Approvals tab — Pending, Approved, Rejected — view full profile — Approve and Reject buttons — manual Add New Tutor
- Rate Upgrade Requests tab — table view — full message — mailto link — Unlock Rates action
- Reviews tab — pending review moderation — Approve and Reject per review
- Questions tab — MCQ question management — CSV bulk import — filters — edit and delete — undo last upload — CSV template download
- Job Ready Quiz tab — quiz question management — CSV import — active/inactive toggle — edit and delete
- Flashcards tab — flashcard management — CSV import — role and topic filters — edit and delete
- Notes Manager tab — PDF upload per note — subject, note number, language, title — updates study_notes table directly — admin-set title shown to learners
- Interview Guides tab — CSV import — role and category filters — active toggle — edit and delete

### Landing Page — Major Redesign
- Full visual overhaul — conversion-focused layout — hero, stats, features, tutor section, poll, how it works, V2.0 section, footer
- Community Poll section added — "We Asked 500+ Learners" — animated bar fill on scroll
- Career Story Maker card added to hero — shimmering animated trigger card
- "Your Data Career in Your Pocket" section — mobile app steps — 4-step timeline
- Split panel layout — Community Poll and Built for Every Indian Learner — side by side on desktop, stacked on mobile
- Glassmorphism V2.0 cards — dark navy background — hover glow effect
- Count-up animation on stats — 720+, 12, 2, 48+ — scroll triggered
- Scroll-triggered entrance animations throughout — fade up, slide in, stagger effects
- Custom scrollbar — orange brand colour
- prefers-reduced-motion support — animations disabled for users who prefer it
- Tutor marketplace integrated into hero — primary CTA — Book a 1-on-1 Tutor card — alongside Download App card
- "Tutor Sign In / Register" button in navbar — for existing and new tutors
- "India's Most Affordable Data Career Platform" eyebrow badge

### Security Updates — Web Platform
- RLS tightened on tutor_appreciations — aggregate counts only publicly readable — individual ratings protected
- SECURITY DEFINER trigger EXECUTE permission revoked from anon and authenticated roles
- Server-side functions for restricted operations — photo upload, dropdown option addition, email duplicate check — no direct client access to sensitive operations
- PII protected via tutors_public view — email, phone, UPI ID not exposed to public
- Admin access gated by email check in RLS policies — data247official@gmail.com only

### Google Play Store — Production
- Play Store Production submission completed — July 16, 2026
- Under Google review — expected within 7 days
- Progressed from Closed Testing (12 testers) to Production submission

---

*Changelog maintained by Vijetasingh Rajput — Founder, DATA247*

*© 2026 DATA247. All rights reserved.*
