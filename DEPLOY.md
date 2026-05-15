# Deploy LeadFlow Live (for your client)

Use **MongoDB Atlas** + **Render** (API) + **Vercel** (website).

Estimated time: **30–45 minutes**.

---

## Part A — Push code to GitHub

1. Create a repo on [github.com](https://github.com) (e.g. `leadflow`).
2. In PowerShell, from the project folder:

```powershell
cd c:\Users\DELL\Desktop\loflix
git init
git add .
git commit -m "Initial commit - LeadFlow"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub details.

---

## Part B — MongoDB Atlas (cloud database)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas/register) → sign up (free).
2. Create a **free cluster** (M0).
3. **Database Access** → Add user → username + password → save password somewhere safe.
4. **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`) — needed for Render.
5. **Database** → **Connect** → **Drivers** → copy connection string.  
   Example: `mongodb+srv://user:PASSWORD@cluster0.xxxxx.mongodb.net/leadgen?retryWrites=true&w=majority`
6. Replace `<password>` with your real password (URL-encode special characters if needed).

Keep this URI — you will use it as `MONGO_URI` on Render.

---

## Part C — Render (backend API)

1. Go to [render.com](https://render.com) → sign up → connect GitHub.
2. **New +** → **Web Service** → select your repo.
3. Settings:

| Setting | Value |
|--------|--------|
| **Name** | `leadflow-api` (or any name) |
| **Root Directory** | `server` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

4. **Environment Variables** (add each):

| Key | Value |
|-----|--------|
| `MONGO_URI` | Your Atlas connection string |
| `JWT_SECRET` | Long random string (e.g. 32+ characters) |
| `CLIENT_URL` | Leave empty for now — fill after Vercel deploy |
| `ADMIN_EMAIL` | `admin@example.com` (or your email) |
| `ADMIN_PASSWORD` | Strong password for admin login |
| `NODE_ENV` | `production` |

5. Click **Create Web Service** → wait until **Live**.
6. Copy your API URL, e.g. `https://leadflow-api.onrender.com`

### Seed production database (once)

**Option 1 — From your PC** (easiest):

Temporarily set in a terminal:

```powershell
cd c:\Users\DELL\Desktop\loflix\server
$env:MONGO_URI="your-atlas-connection-string-here"
$env:ADMIN_EMAIL="admin@example.com"
$env:ADMIN_PASSWORD="your-chosen-password"
npm run seed
```

**Option 2 — Render Shell:** Dashboard → your service → **Shell** → run `npm run seed`

---

## Part D — Vercel (website)

1. Go to [vercel.com](https://vercel.com) → sign up → connect GitHub.
2. **Add New Project** → import the same repo.
3. Settings:

| Setting | Value |
|--------|--------|
| **Framework Preset** | Vite |
| **Root Directory** | `client` |
| **Build Command** | `npm run build` (default) |
| **Output Directory** | `dist` (default) |

4. **Environment Variables:**

| Key | Value |
|-----|--------|
| `VITE_API_URL` | `https://YOUR-RENDER-URL.onrender.com/api` |

Example: `https://leadflow-api.onrender.com/api`

5. Click **Deploy** → wait for success.
6. Copy your site URL, e.g. `https://leadflow.vercel.app`

---

## Part E — Connect frontend and backend

1. Go back to **Render** → your API service → **Environment**.
2. Set `CLIENT_URL` to your Vercel URL (no trailing slash):  
   `https://leadflow.vercel.app`
3. **Save** → Render will redeploy automatically.

---

## Part F — Test for your client

1. Open your **Vercel URL** — home page should load with content.
2. Submit a lead on **Contact** → check **Admin → Leads** on live site.
3. Log in at `https://your-site.vercel.app/admin/login` with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
4. Edit pricing or services → refresh public page → changes should appear.

**Share with client:** only the Vercel URL (the website). They do not need Render or Atlas links.

---

## Troubleshooting

| Problem | Fix |
|--------|-----|
| Blank data / API errors | Check `VITE_API_URL` on Vercel ends with `/api` |
| CORS error in browser console | Set `CLIENT_URL` on Render to exact Vercel URL, redeploy |
| Admin login fails | Re-run `npm run seed` with Atlas `MONGO_URI` and same admin password |
| First load very slow | Render free tier sleeps after ~15 min idle — wait ~30s, refresh |
| 404 on `/admin` routes | `client/vercel.json` must be deployed (included in repo) |

---

## Custom domain (optional)

- **Vercel:** Project → Settings → Domains → add `www.yourclient.com`
- Update Render `CLIENT_URL` to that domain after DNS is connected.
