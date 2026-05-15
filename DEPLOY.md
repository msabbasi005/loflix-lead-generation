# Deploy LeadFlow Live

**Stack:** MongoDB Atlas + **Railway** (API) + **Vercel** (website)

Your repo: `https://github.com/BasitAli618/lofix_lead_generation`

---

## 1. MongoDB Atlas (already done)

- Use your **standard** `mongodb://` URI in env vars (not `mongodb+srv` if you get `querySrv ECONNREFUSED`).
- **Network Access** → Allow `0.0.0.0/0` so Railway can connect.
- Seed from your PC: `cd server` → `npm run seed`

---

## 2. Railway (backend API)

### Sign up & deploy

1. Go to [railway.app](https://railway.app) → **Login with GitHub**.
2. **New Project** → **Deploy from GitHub repo**.
3. Select **`lofix_lead_generation`**.
4. Click the new service → **Settings**:
   - **Root Directory:** `server` ← important
   - **Start Command:** `npm start` (default is fine)
5. **Variables** tab → add:

| Variable | Value |
|----------|--------|
| `MONGO_URI` | Your full Atlas `mongodb://...` connection string |
| `JWT_SECRET` | Long random string (32+ chars) |
| `CLIENT_URL` | Leave empty until Vercel is live, then your Vercel URL |
| `ADMIN_EMAIL` | `admin@example.com` |
| `ADMIN_PASSWORD` | Your admin password |
| `NODE_ENV` | `production` |

> Railway sets `PORT` automatically — do not hardcode it.

6. **Settings** → **Networking** → **Generate Domain**  
   Copy the URL, e.g. `https://lofix-lead-generation-production.up.railway.app`

7. Wait until deploy shows **Active / Success**.

### Test API

Open in browser:

```text
https://YOUR-RAILWAY-URL.up.railway.app/api/health
```

You should see: `{"status":"ok"}`

### Seed (if Atlas is empty)

From your PC (same `MONGO_URI` as Railway):

```powershell
cd c:\Users\DELL\Desktop\loflix\server
npm run seed
```

---

## 3. Vercel (frontend)

1. [vercel.com](https://vercel.com) → Import GitHub repo **`lofix_lead_generation`**.
2. Settings:

| Setting | Value |
|---------|--------|
| **Root Directory** | `client` |
| **Framework** | Vite |

3. **Environment variable:**

| Key | Value |
|-----|--------|
| `VITE_API_URL` | `https://YOUR-RAILWAY-URL.up.railway.app/api` |

4. Deploy → copy site URL, e.g. `https://lofix-lead-generation.vercel.app`

---

## 4. Link frontend ↔ backend

1. Railway → **Variables** → set `CLIENT_URL` to your **Vercel URL** (no trailing slash).
2. Railway redeploys automatically.
3. Open Vercel URL → test site, forms, and `/admin/login`.

---

## Railway pricing (short)

- New accounts often get **trial credit** (e.g. $5).
- Small Node APIs usually cost a few dollars/month after trial if always on.
- Check [railway.app/pricing](https://railway.app/pricing) for current plans.
- You can set a **usage limit** in Railway billing to avoid surprises.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails | Root Directory must be `server` |
| API 502 / crash | Check Railway **Deploy Logs**; verify `MONGO_URI` |
| CORS error | Set `CLIENT_URL` to exact Vercel URL |
| Empty site data | Run `npm run seed` with Atlas URI |
| `querySrv ECONNREFUSED` | Use standard `mongodb://` URI, not `mongodb+srv` |

---

## Share with client

Send only the **Vercel** website URL.
