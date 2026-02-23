# Leader Standard Work

A mobile-first daily management tool for manufacturing leaders.  
Supports Team Member → Team Leader → Supervisor → Manager levels.  
Full English / Spanish (EN/ES) toggle.

## Features
- **Log Tasks** — capture every activity with firefighting root cause and disposition
- **My LSW** — assembled standard work schedule with layered audit verification
- **Required Activities** — non-negotiables with standards, frequency, and audit ownership
- **Critical Watch** — SQDC monitoring items that build your layered audit structure
- **Guide** — Lean consultant prompts with AI coaching on your reflections
- **Analyze** — time breakdown by category and cross-level view
- **Action Plan** — push-down assignments, eliminate list, firefighting analysis
- Pre-loaded Supervisor template based on real fenestration industry LSW

---

## Deploy to GitHub Pages

### First time setup

1. **Create a GitHub repo** named `leader-standard-work` (or update `vite.config.js` base path to match your repo name)

2. **Clone and install**
   ```bash
   git clone https://github.com/YOUR_USERNAME/leader-standard-work.git
   cd leader-standard-work
   npm install
   ```

3. **Add your files** — copy all files from this package into the repo

4. **Set homepage in package.json** — add this line:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/leader-standard-work"
   ```

5. **Deploy**
   ```bash
   npm run deploy
   ```
   This builds the app and pushes to the `gh-pages` branch automatically.

6. **Enable GitHub Pages** — go to repo Settings → Pages → Source: `gh-pages` branch

Your app will be live at:  
`https://YOUR_USERNAME.github.io/leader-standard-work`

---

### Subsequent updates

```bash
npm run deploy
```

That's it. One command rebuilds and pushes.

---

## Local development

```bash
npm run dev
```

Opens at `http://localhost:5173`

---

## AI Coaching

The AI coaching features use the Anthropic API via the Claude.ai artifact sandbox.  
When running standalone (outside Claude.ai), the AI coach buttons will return a fallback message.  
To enable AI coaching in standalone mode, you would need to add an Anthropic API key via a backend proxy — do not expose API keys in frontend code.

---

## Customizing the Supervisor Template

Edit `SUPERVISOR_TEMPLATE_EN` and `SUPERVISOR_TEMPLATE_ES` arrays in `src/App.jsx`.  
Each item follows this shape:

```js
{
  id: "t1",
  text: "Activity description",
  freq: "Each Shift",        // Each Shift | Daily | 2x Daily | Weekly | Monthly | As Needed
  dayOfWeek: "Friday",       // for Weekly items
  dayOfMonth: "1",           // for Monthly items
  timeOfDay: "06:30",
  duration: "15",            // minutes
  owner: "Supervisor",
  standard: "What good looks like — the audit criteria",
  auditTier: ["Manager"],    // levels that verify this was done
  timeBin: "Start of Shift"  // Start of Shift | Morning | Mid-Shift | End of Shift | Weekly | Monthly
}
```
