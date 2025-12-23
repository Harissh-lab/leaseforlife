# 🎮 LeaseForLife - Prototype Setup Guide

## ✅ What's Ready

- **Agent ID:** `agent_5901kcrqm2sterw86sg30w5s9kf6` (in `.env.local`)
- **Allowlist:** `leaseforlife.vercel.app` ✓
- **5 Kitchen Levels:** Configured and ready
- **Dynamic Prompts:** Injecting level data automatically
- **Characters:** Xylax (levels 1-4), Toaster (level 5)

---

## 🟡 Complete These 2 Tasks (5 minutes)

### Task 1: Configure First Message in ElevenLabs

**Go to:** Your Agent → Settings → Configuration → First Message

**Paste this template:**

```
You are {{persona}}.

Your objective: {{objective}}

Start: "{{hook}}"

Level {{level_id}}/5
```

**Variables that auto-fill from level data:**

- `{{persona}}` - Character role (e.g., "Friendly Chef")
- `{{objective}}` - Learning goal
- `{{hook}}` - Opening dialogue
- `{{level_id}}` - Current level (1-5)

---

### Task 2: Add complete_level Tool

**Go to:** Your Agent → Settings → Tools → Add Tool

**Fill in:**

| Field           | Value                                    |
| --------------- | ---------------------------------------- |
| **Name**        | `complete_level`                         |
| **Description** | Call when user completes level objective |

**Parameters (copy-paste):**

```json
{
  "type": "object",
  "properties": {
    "level_id": { "type": "integer" }
  },
  "required": ["level_id"]
}
```

---

## 🚀 Test Locally

```bash
npm install
npm run dev
# Opens http://localhost:5173
```

Then click **🎤 Start** button (top-right corner)

---

## How It Works

1. User clicks 🎤 Start
2. App loads current level from `src/data/levels.json`
3. First Message template injects level variables
4. Agent speaks the unique greeting for that level
5. User responds via voice
6. Agent recognizes completion and calls `complete_level` tool
7. App automatically advances to next level
8. Process repeats for levels 2-5

---

## Your 5 Levels

| Level | Character | Role              | Task                          |
| ----- | --------- | ----------------- | ----------------------------- |
| **1** | Xylax     | 👨‍🍳 Chef           | Identify kitchen utensils     |
| **2** | Xylax     | 🎂 Baker          | Measure ingredients correctly |
| **3** | Xylax     | 🚨 Safety Manager | Identify kitchen hazards      |
| **4** | Xylax     | 🔪 Master Chef    | Learn proper knife skills     |
| **5** | Toaster   | 🥗 Nutritionist   | Categorize food by nutrition  |

---

## Key Files

| File                            | Purpose                       |
| ------------------------------- | ----------------------------- |
| `.env.local`                    | Stores Agent ID               |
| `src/data/levels.json`          | 5 level definitions           |
| `src/components/XylaxVoice.jsx` | Voice integration logic       |
| `src/App.jsx`                   | Main app (limited to level 5) |
| `src/utils/gameHelpers.js`      | Storage & character logic     |

---

## Troubleshooting

**Issue:** "Agent ID not configured"

- Agent ID is in `.env.local` ✓
- Restart dev server with `npm run dev`

**Issue:** Agent doesn't speak

- Verify Agent ID matches ElevenLabs
- Check `complete_level` tool is defined
- Open browser console (F12) for error messages

**Issue:** "Allowlist errors"

- Ensure `leaseforlife.vercel.app` is in ElevenLabs allowlist
- Check if domain is spelled correctly

---

## Code Structure

```
src/
├── App.jsx                 # Main app with level management
├── components/
│   ├── LevelMap.jsx       # Visual level selection (kitchen only)
│   ├── XylaxVoice.jsx     # Voice integration
│   ├── VoiceController.jsx
│   └── UI/                # UI components
├── hooks/
│   ├── useUIEffects.js    # Glitch & transition effects
│   └── index.js
├── utils/
│   └── gameHelpers.js     # Storage & character selection
├── constants/
│   └── config.js          # Game config & assets
├── data/
│   └── levels.json        # 5 level definitions
└── styles/                # CSS files
```

---

## Environment Variables

See `.env.local`:

```env
VITE_REACT_APP_ELEVENLABS_AGENT_ID=agent_5901kcrqm2sterw86sg30w5s9kf6
VITE_APP_URL=https://leaseforlife.vercel.app
```

Agent ID ✓ is already set. No changes needed here unless you use a different agent.

---

## Next Steps After Testing

- Deploy to Vercel: `git push origin main`
- Test at production URL: `https://leaseforlife.vercel.app`
- Everything works the same as local testing

---

**Need help?** Check the code comments in `src/App.jsx` and `src/components/XylaxVoice.jsx`
