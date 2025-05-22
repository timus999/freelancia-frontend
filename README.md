freelancia-frontend/
├── public/                        # Static assets
│   ├── favicon.ico
│   └── logo.png                  # App logo
├── src/                          # Source code
│   ├── api/                      # API client and service functions
│   │   ├── auth.js               # Auth API calls (login, logout, me)
│   │   ├── jobs.js               # Job API calls (create, list, get)
│   │   ├── proposals.js          # Proposal API calls (create, update, list)
│   │   ├── client.js             # Axios instance with JWT interceptor
│   │   └── types.js              # API response/request types
│   ├── assets/                   # Images, fonts, etc.
│   │   └── images/
│   │       └── placeholder.svg
│   ├── components/               # Reusable UI components
│   │   ├── common/               # Generic components
│   │   │   ├── Button.jsx        # Button with variants
│   │   │   ├── Input.jsx         # Form input
│   │   │   ├── Modal.jsx         # Modal dialog
│   │   │   ├── Spinner.jsx       # Loading spinner
│   │   │   └── Toast.jsx         # Notification component
│   │   ├── layout/               # Layout components
│   │   │   ├── Header.jsx        # Navbar with wallet connect
│   │   │   ├── Footer.jsx        # Footer
│   │   │   └── Sidebar.jsx       # Optional sidebar for dashboard
│   │   ├── auth/                 # Auth-specific components
│   │   │   ├── LoginForm.jsx     # Login form
│   │   │   └── RegisterForm.jsx  # Registration form
│   │   ├── jobs/                 # Job-related components
│   │   │   ├── JobCard.jsx       # Job preview card
│   │   │   ├── JobForm.jsx       # Create/edit job form
│   │   │   └── JobList.jsx       # List of jobs
│   │   ├── proposals/            # Proposal-related components
│   │   │   ├── ProposalCard.jsx  # Proposal preview card
│   │   │   ├── ProposalForm.jsx  # Create proposal form
│   │   │   └── ProposalList.jsx  # List of proposals
│   │   └── escrow/               # Escrow-related components
│   │       ├── EscrowStatus.jsx  # Display escrow status
│   │       └── EscrowActions.jsx # Actions (e.g., release, dispute)
│   ├── contexts/                 # React Context for state
│   │   └── AuthContext.jsx       # Auth state (user, token)
│   ├── hooks/                    # Custom hooks
│   │   ├── useAuth.js            # Auth state and actions
│   │   ├── useJobs.js            # Fetch and manage jobs
│   │   ├── useProposals.js       # Fetch and manage proposals
│   │   ├── useWallet.js          # Solana wallet connection
│   │   └── useToast.js           # Toast notifications
│   ├── pages/                    # Page components (route-specific)
│   │   ├── Home.jsx              # Landing page
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Registration page
│   │   ├── Jobs.jsx              # Jobs listing page
│   │   ├── JobDetail.jsx         # Job details and proposals
│   │   ├── Dashboard.jsx         # User dashboard (client/freelancer)
│   │   ├── Proposals.jsx         # User’s proposals
│   │   └── NotFound.jsx          # 404 page
│   ├── routes/                   # Routing configuration
│   │   ├── AppRoutes.jsx         # Main router setup
│   │   └── ProtectedRoute.jsx    # Route guard for auth
│   ├── services/                 # Business logic and Solana integration
│   │   ├── solana.js             # Solana wallet and escrow interactions
│   │   └── storage.js            # Local storage (e.g., JWT)
│   ├── styles/                   # Tailwind CSS and global styles
│   │   ├── index.css             # Tailwind imports and global styles
│   │   └── tailwind.config.js    # Tailwind configuration
│   ├── types/                    # TypeScript types
│   │   ├── auth.js               # Auth types (User, Token)
│   │   ├── job.js                # Job types
│   │   ├── proposal.js           # Proposal types
│   │   └── escrow.js             # Escrow types
│   ├── utils/                    # Utility functions
│   │   ├── format.js             # Formatting (dates, currency)
│   │   ├── validation.js         # Form validation
│   │   └── constants.js          # App constants (API URLs, etc.)
│   ├── App.jsx                   # Root component
│   ├── main.jsx                  # Entry point
│   └── vite-env.d.js             # Vite TypeScript env types
├── .gitignore                    # Ignore node_modules, build/, etc.
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── vite.config.js                # Vite configuration
└── README.md                     # Project overview