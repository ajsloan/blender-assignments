import { useState, useRef, useEffect } from "react";

const STEPS = [
  {
    id: 1,
    label: "STEP 1A",
    color: "#f4a231",
    textColor: "#0d3b47",
    title: "Draw the Pitcher Profile",
    subtitle: "Add a Bezier Curve and draw the half-outline of your pitcher",
    checklist: [
      "Added a Bezier Curve (Add > Curve > Bezier)",
      "Entered Edit Mode (Tab)",
      "Selected the Draw Tool (T key)",
      "Drew the pitcher half-profile",
      "Snapped both ends to the Z axis",
    ],
    instructions: [
      { n: 1, title: "Add a Bezier Curve", body: "Go to Add > Curve > Bezier. Then press Tab to enter Edit Mode." },
      { n: 2, title: "Select the Draw Tool", body: "Press T to open the Toolbar. Click the Draw Tool (pencil icon) at the top." },
      { n: 3, title: "Draw the Pitcher Profile", body: "Click along the right side of the viewport to draw the half-outline of a pitcher — from bottom to rim." },
      { n: 4, title: "Snap Ends to the Z Axis", body: "Turn on Snapping (Shift+Tab). Move the top and bottom points so they land exactly on the center Z axis (red vertical line)." },
    ],
    tip: "Only draw ONE side of the pitcher — from base to rim. Think of it like drawing the right half of a vase.",
    screenshot: "Screenshot #1 — Your curve in Edit Mode with both ends on the Z axis",
    diagram: "curve",
  },
  {
    id: 2,
    label: "STEP 1B",
    color: "#f4a231",
    textColor: "#0d3b47",
    title: "Apply the Screw Modifier",
    subtitle: "Spin your profile curve into a full 3D pitcher body",
    checklist: [
      "Exited Edit Mode (Tab)",
      "Opened Modifier Properties (wrench icon)",
      "Added the Screw Modifier",
      "Set Axis to Z",
      "Clicked Apply",
    ],
    instructions: [
      { n: 1, title: "Exit Edit Mode", body: "Press Tab to return to Object Mode. Your curve should still be selected." },
      { n: 2, title: "Open Modifier Properties", body: "Click the blue wrench icon 🔧 in the Properties panel on the right." },
      { n: 3, title: "Add the Screw Modifier", body: "Click Add Modifier, then choose Screw from the list. Watch your 3D pitcher body appear!" },
      { n: 4, title: "Adjust and Apply", body: "Set Axis to Z. Increase Steps for a smoother shape. When it looks good, click Apply." },
    ],
    tip: "The Screw Modifier spins your profile curve around the Z axis — like a potter's wheel! If the shape looks wrong, Ctrl+Z and edit your curve.",
    screenshot: "Screenshot #2 — Full 3D pitcher body in Object Mode",
    diagram: "screw",
  },
  {
    id: 3,
    label: "STEP 2",
    color: "#1a6b7c",
    textColor: "#ffffff",
    title: "Create the Handle",
    subtitle: "Extrude a curve along a path to build a 3D handle",
    checklist: [
      "Drew the handle path curve",
      "Added a circle curve for cross-section",
      "Set the Bevel Object to the circle",
      "Positioned handle on the pitcher",
      "Both objects named in Outliner",
    ],
    instructions: [
      { n: 1, title: "Draw the Handle Path", body: "Add a new Bezier Curve (Add > Curve > Bezier). Shape it into a curved arc on the side of the pitcher." },
      { n: 2, title: "Draw the Cross-Section", body: "Add a small circle curve (Add > Curve > Circle). This becomes the thickness and shape of the handle." },
      { n: 3, title: "Set the Bevel Object", body: "Select your handle path. In Properties > Curve > Geometry > Bevel > Object, pick your circle curve." },
      { n: 4, title: "Adjust and Position", body: "Edit the handle path in Edit Mode until it fits neatly against the pitcher body." },
    ],
    tip: "Extrude Along a Path is like squeezing clay through a cookie cutter along a track. The circle is the cutter — the path is the track!",
    screenshot: "Screenshot #3 — Pitcher body and handle both visible, both named in Outliner",
    diagram: "handle",
  },
  {
    id: 4,
    label: "STEP 3",
    color: "#27ae60",
    textColor: "#ffffff",
    title: "Finish, Name, Parent & Save",
    subtitle: "Convert to mesh, name your objects, parent them together, and save",
    checklist: [
      "Converted both objects to mesh (F3 > Convert to Mesh)",
      "Named objects: Pitcher_Body and Pitcher_Handle",
      "Parented handle to pitcher body (Ctrl+P)",
      "Saved the file (Ctrl+S)",
    ],
    instructions: [
      { n: 1, title: "Convert Curves to Meshes", body: "Select each object. Press F3, search Convert to Mesh, click it. Do this for both the pitcher body and the handle." },
      { n: 2, title: "Name Your Objects", body: "Click an object, then in Properties > Object Properties, type Pitcher_Body or Pitcher_Handle." },
      { n: 3, title: "Parent the Handle", body: "Click the handle, then Shift+click the pitcher body. Press Ctrl+P and choose Object." },
      { n: 4, title: "Save Your File", body: "Press Ctrl+S or File > Save As. Give it a clear filename, then take your final screenshot!" },
    ],
    tip: "Parenting means when you move the pitcher, the handle follows automatically. Good naming + parenting = professional 3D workflow.",
    screenshot: "Screenshot #4 — Completed pitcher with Outliner showing named, parented objects",
    diagram: "final",
  },
];

// ── Pitcher diagram components ────────────────────────────────────────────────

function DiagramCurve({ active }) {
  return (
    <div style={{ background: "#0d1117", borderRadius: 8, overflow: "hidden", fontFamily: "monospace" }}>
      <div style={{ background: "#1a1f2e", padding: "4px 10px", fontSize: 10, color: "#4a6a7a", borderBottom: "1px solid #2a3540" }}>
        Blender · Edit Mode — Bezier Curve
      </div>
      <svg width="100%" viewBox="0 0 220 200" style={{ display: "block", background: "#0d1117" }}>
        {/* Grid */}
        {[44,88,132,176].map(x => <line key={x} x1={x} y1={0} x2={x} y2={200} stroke="#1a2530" strokeWidth={1}/>)}
        {[40,80,120,160].map(y => <line key={y} x1={0} y1={y} x2={220} y2={y} stroke="#1a2530" strokeWidth={1}/>)}
        {/* Z axis */}
        <line x1={110} y1={0} x2={110} y2={200} stroke="#8b3030" strokeWidth={2}/>
        <text x={113} y={14} fill="#c04040" fontSize={10} fontFamily="monospace">Z</text>
        {/* Profile curve */}
        <path d="M110,18 Q130,18 148,32 Q168,55 172,100 Q168,145 148,168 Q130,182 110,182"
          fill="none" stroke={active ? "#f4a231" : "#dc5050"} strokeWidth={2.5}
          style={{ transition: "stroke 0.3s" }}/>
        {/* Snap dots */}
        <circle cx={110} cy={18} r={6} fill="#27ae60" stroke="#fff" strokeWidth={1.5}/>
        <circle cx={110} cy={182} r={6} fill="#27ae60" stroke="#fff" strokeWidth={1.5}/>
        <text x={117} y={15} fill="#27ae60" fontSize={8} fontFamily="monospace">snapped</text>
        <text x={117} y={185} fill="#27ae60" fontSize={8} fontFamily="monospace">snapped</text>
        {/* Control points */}
        {[[148,32],[172,100],[148,168]].map(([x,y],i) =>
          <circle key={i} cx={x} cy={y} r={4} fill="#f4a231" stroke="#fff" strokeWidth={1}/>
        )}
      </svg>
      <div style={{ background: "#f4a231", padding: "6px 10px", textAlign: "center", fontSize: 10, fontWeight: "bold", color: "#0d3b47", letterSpacing: 1 }}>
        EXAMPLE · Curve Profile in Edit Mode
      </div>
    </div>
  );
}

function DiagramScrew({ active }) {
  return (
    <div style={{ background: "#0d1117", borderRadius: 8, overflow: "hidden", fontFamily: "monospace" }}>
      <div style={{ background: "#1a1f2e", padding: "4px 10px", fontSize: 10, color: "#4a6a7a", borderBottom: "1px solid #2a3540" }}>
        Blender · Object Mode — Screw Modifier
      </div>
      <svg width="100%" viewBox="0 0 220 200" style={{ display: "block", background: "#0d1117" }}>
        {[44,88,132,176].map(x => <line key={x} x1={x} y1={0} x2={x} y2={200} stroke="#1a2530" strokeWidth={1}/>)}
        {[50,100,150].map(y => <line key={y} x1={0} y1={y} x2={220} y2={y} stroke="#1a2530" strokeWidth={1}/>)}
        {/* Pitcher body ellipses */}
        <ellipse cx={110} cy={175} rx={40} ry={6} fill="#1a6b7c" stroke="#28a0b5" strokeWidth={1.5}/>
        {[145,115,87,62,42].map((y,i) => {
          const rx = 38 - i * 1.5;
          return <ellipse key={i} cx={110} cy={y} rx={rx} ry={5} fill="none" stroke="#28a0b5" strokeWidth={1} strokeDasharray={i===4?"4,2":"none"}/>;
        })}
        {/* Body sides */}
        <path d="M70,175 Q68,140 72,100 Q74,60 90,42" fill="none" stroke="#28a0b5" strokeWidth={2}/>
        <path d="M150,175 Q152,140 148,100 Q146,60 130,42" fill="none" stroke="#28a0b5" strokeWidth={2}/>
        {/* Fill */}
        <path d="M70,175 Q68,140 72,100 Q74,60 90,42 Q100,38 110,38 Q120,38 130,42 Q146,60 148,100 Q152,140 150,175 Z"
          fill="#1a6b7c" fillOpacity={0.4} stroke="none"/>
        {/* Modifier panel */}
        <rect x={130} y={10} width={82} height={78} rx={4} fill="#1e2228" stroke={active ? "#f4a231" : "#28a0b5"} strokeWidth={1}
          style={{ transition: "stroke 0.3s" }}/>
        <text x={136} y={24} fill="#28a0b5" fontSize={8} fontFamily="monospace" fontWeight="bold">⚙ Modifier Props</text>
        <text x={136} y={36} fill="#ffffff" fontSize={8} fontFamily="monospace">▼ Screw</text>
        <text x={144} y={47} fill="#8ab8c5" fontSize={7.5} fontFamily="monospace">Axis: Z</text>
        <text x={144} y={57} fill="#8ab8c5" fontSize={7.5} fontFamily="monospace">Steps: 32</text>
        <rect x={138} y={63} width={44} height={14} rx={2} fill="#27ae60"/>
        <text x={152} y={73} fill="#fff" fontSize={8} fontFamily="monospace" fontWeight="bold">Apply</text>
      </svg>
      <div style={{ background: "#f4a231", padding: "6px 10px", textAlign: "center", fontSize: 10, fontWeight: "bold", color: "#0d3b47", letterSpacing: 1 }}>
        EXAMPLE · Pitcher Body After Screw Modifier
      </div>
    </div>
  );
}

function DiagramHandle({ active }) {
  return (
    <div style={{ background: "#0d1117", borderRadius: 8, overflow: "hidden", fontFamily: "monospace" }}>
      <div style={{ background: "#1a1f2e", padding: "4px 10px", fontSize: 10, color: "#4a6a7a", borderBottom: "1px solid #2a3540" }}>
        Blender · Object Mode — Handle Added
      </div>
      <svg width="100%" viewBox="0 0 220 200" style={{ display: "block", background: "#0d1117" }}>
        {[44,88,132,176].map(x => <line key={x} x1={x} y1={0} x2={x} y2={200} stroke="#1a2530" strokeWidth={1}/>)}
        {[50,100,150].map(y => <line key={y} x1={0} y1={y} x2={220} y2={y} stroke="#1a2530" strokeWidth={1}/>)}
        {/* Pitcher body */}
        <path d="M62,175 Q60,140 64,100 Q66,60 82,42 Q92,38 100,38 Q108,38 118,42 Q134,60 136,100 Q140,140 138,175 Z"
          fill="#1a6b7c" fillOpacity={0.5}/>
        <path d="M62,175 Q60,140 64,100 Q66,60 82,42" fill="none" stroke="#28a0b5" strokeWidth={2}/>
        <path d="M138,175 Q140,140 136,100 Q134,60 118,42" fill="none" stroke="#28a0b5" strokeWidth={2}/>
        <ellipse cx={100} cy={175} rx={38} ry={5} fill="#1a6b7c" stroke="#28a0b5" strokeWidth={1.5}/>
        {/* Handle */}
        <path d="M138,75 Q178,75 178,110 Q178,145 138,145"
          fill="none" stroke={active ? "#f4a231" : "#e8941a"} strokeWidth={10} strokeLinecap="round"
          style={{ transition: "stroke 0.3s" }}/>
        <path d="M138,75 Q178,75 178,110 Q178,145 138,145"
          fill="none" stroke="#0d1117" strokeWidth={4} strokeLinecap="round"/>
        {/* Outliner */}
        <rect x={4} y={8} width={80} height={54} rx={3} fill="#1e2228" stroke="#1a6b7c" strokeWidth={1}/>
        <text x={9} y={20} fill="#4a6a7a" fontSize={7.5} fontFamily="monospace">⊞ Scene Collection</text>
        <text x={13} y={31} fill="#28a0b5" fontSize={7.5} fontFamily="monospace">▷ Pitcher_Body</text>
        <text x={13} y={42} fill="#f4a231" fontSize={7.5} fontFamily="monospace">▷ Pitcher_Handle</text>
        <text x={9} y={55} fill="#27ae60" fontSize={7} fontFamily="monospace">Both named ✓</text>
      </svg>
      <div style={{ background: "#1a6b7c", padding: "6px 10px", textAlign: "center", fontSize: 10, fontWeight: "bold", color: "#fff", letterSpacing: 1 }}>
        EXAMPLE · Handle Added — Both Objects Visible
      </div>
    </div>
  );
}

function DiagramFinal({ active }) {
  return (
    <div style={{ background: "#0d1117", borderRadius: 8, overflow: "hidden", fontFamily: "monospace" }}>
      <div style={{ background: "#1a1f2e", padding: "4px 10px", fontSize: 10, color: "#4a6a7a", borderBottom: "1px solid #2a3540" }}>
        Blender · Object Mode — Final Pitcher
      </div>
      <svg width="100%" viewBox="0 0 220 200" style={{ display: "block", background: "#0d1117" }}>
        {[44,88,132,176].map(x => <line key={x} x1={x} y1={0} x2={x} y2={200} stroke="#1a2530" strokeWidth={1}/>)}
        {[50,100,150].map(y => <line key={y} x1={0} y1={y} x2={220} y2={y} stroke="#1a2530" strokeWidth={1}/>)}
        {/* Pitcher body — orange outline = selected */}
        <path d="M62,175 Q60,140 64,100 Q66,60 82,42 Q92,38 100,38 Q108,38 118,42 Q134,60 136,100 Q140,140 138,175 Z"
          fill="#1a6b7c" fillOpacity={0.5}/>
        {[145,115,87,62].map((y,i) => (
          <line key={i} x1={62+i} y1={y} x2={138-i} y2={y} stroke="#28a0b5" strokeWidth={1} strokeOpacity={0.7}/>
        ))}
        <path d="M62,175 Q60,140 64,100 Q66,60 82,42" fill="none" stroke="#f4a231" strokeWidth={2.5}/>
        <path d="M138,175 Q140,140 136,100 Q134,60 118,42" fill="none" stroke="#f4a231" strokeWidth={2.5}/>
        <ellipse cx={100} cy={175} rx={38} ry={5} fill="#1a6b7c" stroke="#f4a231" strokeWidth={2.5}/>
        <ellipse cx={100} cy={38} rx={18} ry={4} fill="#1a6b7c" stroke="#f4a231" strokeWidth={2.5}/>
        {/* Handle */}
        <path d="M138,75 Q178,75 178,110 Q178,145 138,145"
          fill="none" stroke="#f4a231" strokeWidth={10} strokeLinecap="round"/>
        <path d="M138,75 Q178,75 178,110 Q178,145 138,145"
          fill="none" stroke="#0d1117" strokeWidth={4} strokeLinecap="round"/>
        {/* Outliner with parenting */}
        <rect x={4} y={6} width={86} height={70} rx={3} fill="#1e2228" stroke={active ? "#f4a231" : "#27ae60"} strokeWidth={1.5}
          style={{ transition: "stroke 0.3s" }}/>
        <text x={9} y={18} fill="#4a6a7a" fontSize={7.5} fontFamily="monospace">⊞ Scene Collection</text>
        <text x={13} y={29} fill="#28a0b5" fontSize={7.5} fontFamily="monospace">▼ Pitcher_Body ✓</text>
        <text x={20} y={40} fill="#f4a231" fontSize={7.5} fontFamily="monospace">└ Pitcher_Handle ✓</text>
        <text x={24} y={50} fill="#27ae60" fontSize={7} fontFamily="monospace">(parented)</text>
        <text x={9} y={61} fill="#27ae60" fontSize={7} fontFamily="monospace">Mesh ✓  Saved ✓</text>
      </svg>
      <div style={{ background: "#27ae60", padding: "6px 10px", textAlign: "center", fontSize: 10, fontWeight: "bold", color: "#fff", letterSpacing: 1 }}>
        EXAMPLE · Final Pitcher — Named &amp; Parented
      </div>
    </div>
  );
}

const DIAGRAMS = { curve: DiagramCurve, screw: DiagramScrew, handle: DiagramHandle, final: DiagramFinal };

// ── AI Chat component ─────────────────────────────────────────────────────────

function AiChat({ currentStep }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: `Hi! I'm your Blender assistant for this project. I can help you with any step — just ask! You're currently on ${currentStep.label}: ${currentStep.title}.` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages(prev => [...prev, {
      role: "assistant",
      text: `You moved to ${currentStep.label}: ${currentStep.title}. Ask me anything about this step!`
    }]);
  }, [currentStep.id]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    const systemPrompt = `You are a friendly, encouraging Blender 3D modeling assistant helping a middle school student complete Project 4.07 "What Will You Have to Drink?" — a pitcher modeling assignment.

The student is currently on: ${currentStep.label} — ${currentStep.title}
Step instructions: ${currentStep.instructions.map(i => `${i.n}. ${i.title}: ${i.body}`).join(" | ")}
Tip: ${currentStep.tip}

The full project has 4 steps:
1A: Draw a Bezier curve profile of the pitcher half, snap both ends to Z axis
1B: Apply Screw Modifier (Axis=Z) to create 3D pitcher body
2: Create handle using Extrude Along a Path (Bevel Object method with a circle curve)
3: Convert to mesh, name objects Pitcher_Body and Pitcher_Handle, parent handle to body, save file

Students submit ONE PowerPoint with 4 screenshots showing each step.

Keep answers short (2-4 sentences), encouraging, and specific to Blender. Use simple language for middle schoolers. If they're stuck, give a specific actionable hint. Never be negative.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [
            ...messages.filter(m => m.role !== "assistant" || messages.indexOf(m) > 0).map(m => ({
              role: m.role,
              content: m.text
            })),
            { role: "user", content: userMsg }
          ]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response. Try again!";
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Hmm, I had trouble connecting. Check your internet and try again!" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#0d1117", borderRadius: 12, overflow: "hidden", border: "1px solid #1e3040" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0d3b47, #1a6b7c)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f4a231", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
        <div>
          <div style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>Blender AI Assistant</div>
          <div style={{ color: "#8ab8c5", fontSize: 11 }}>Ask me anything about this project</div>
        </div>
        <div style={{ marginLeft: "auto", width: 8, height: 8, background: "#27ae60", borderRadius: "50%" }}></div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "85%",
              padding: "9px 13px",
              borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: m.role === "user" ? "#f4a231" : "#1a2535",
              color: m.role === "user" ? "#0d3b47" : "#c8dde8",
              fontSize: 13,
              lineHeight: 1.55,
              fontWeight: m.role === "user" ? 600 : 400,
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 5, padding: "10px 14px" }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 7, height: 7, background: "#28a0b5", borderRadius: "50%",
                animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }}/>
            ))}
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Quick prompts */}
      <div style={{ padding: "8px 14px 4px", display: "flex", gap: 6, flexWrap: "wrap" }}>
        {["I'm stuck 🆘", "Give me a hint 💡", "What's next?", "Why do this?"].map(q => (
          <button key={q} onClick={() => { setInput(q); }}
            style={{ background: "#1a2535", border: "1px solid #2a3f52", color: "#8ab8c5", padding: "4px 10px",
              borderRadius: 20, fontSize: 11, cursor: "pointer" }}>
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: "10px 14px 14px", display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask a question about this step..."
          style={{ flex: 1, background: "#1a2535", border: "1px solid #2a3f52", borderRadius: 24,
            padding: "9px 14px", color: "#c8dde8", fontSize: 13, outline: "none" }}
        />
        <button onClick={send} disabled={loading || !input.trim()}
          style={{ width: 40, height: 40, borderRadius: "50%", background: input.trim() ? "#f4a231" : "#2a3f52",
            border: "none", cursor: input.trim() ? "pointer" : "default", fontSize: 18, transition: "background 0.2s" }}>
          ↑
        </button>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [checked, setChecked] = useState({});
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const step = STEPS[currentStepIdx];
  const DiagramComp = DIAGRAMS[step.diagram];

  const stepChecked = (step.checklist || []).filter((_, i) => checked[`${step.id}-${i}`]).length;
  const stepTotal = (step.checklist || []).length;
  const allChecked = stepChecked === stepTotal;

  const toggleCheck = (stepId, idx) => {
    const key = `${stepId}-${idx}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completeStep = () => {
    setCompletedSteps(prev => new Set([...prev, step.id]));
    if (currentStepIdx < STEPS.length - 1) setCurrentStepIdx(i => i + 1);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#070d14", fontFamily: "'Trebuchet MS', Arial, sans-serif", color: "#c8dde8" }}>
      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #2a3f52; borderRadius: 3px; }
        button:hover { opacity: 0.88; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ background: "linear-gradient(135deg, #0d3b47 0%, #061a22 100%)", borderBottom: "3px solid #f4a231", padding: "20px 24px 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: "bold", color: "#f4a231", letterSpacing: 3, marginBottom: 6 }}>UNIT 4 · ACTIVITY 1</div>
              <h1 style={{ margin: 0, fontSize: 26, color: "#fff", fontWeight: "bold", lineHeight: 1.2 }}>What Will You Have to Drink?</h1>
              <p style={{ margin: "6px 0 0", fontSize: 13, color: "#8ab8c5", fontStyle: "italic" }}>Create a 3D pitcher using NURBS, Curves &amp; Surfaces · Project 4.07</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[["🎯","40 Points"],["📸","4 Screenshots"],["📊","PowerPoint"]].map(([icon,label]) => (
                <div key={label} style={{ background: "#1a6b7c", padding: "7px 14px", borderRadius: 6, fontSize: 12, color: "#fff", fontWeight: 600 }}>
                  {icon} {label}
                </div>
              ))}
            </div>
          </div>

          {/* Step progress bar */}
          <div style={{ marginTop: 18, display: "flex", gap: 6 }}>
            {STEPS.map((s, i) => (
              <button key={s.id} onClick={() => setCurrentStepIdx(i)}
                style={{ flex: 1, padding: "8px 4px", border: "none", cursor: "pointer", borderRadius: 6, transition: "all 0.2s",
                  background: i === currentStepIdx ? s.color : completedSteps.has(s.id) ? "#1a3a2a" : "#1a2535",
                  color: i === currentStepIdx ? s.textColor : completedSteps.has(s.id) ? "#27ae60" : "#5a8a96",
                  fontWeight: "bold", fontSize: 11, letterSpacing: 0.5 }}>
                {completedSteps.has(s.id) ? "✓ " : ""}{s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 20px 40px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>

        {/* Left: step content */}
        <div style={{ minWidth: 0 }}>

          {/* Step card */}
          <div style={{ background: "#0d1117", border: `1px solid ${step.color}40`, borderRadius: 12, overflow: "hidden", marginBottom: 16, animation: "fadeIn 0.3s ease" }} key={step.id}>

            {/* Step header */}
            <div style={{ background: step.color, padding: "12px 20px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: "bold", color: step.textColor, letterSpacing: 1 }}>
                {step.label}
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: "bold", color: step.textColor }}>{step.title}</div>
                <div style={{ fontSize: 12, color: step.textColor, opacity: 0.75 }}>{step.subtitle}</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>

              {/* Diagram */}
              <div style={{ padding: 16, borderRight: "1px solid #1e3040" }}>
                <DiagramComp active={true}/>
              </div>

              {/* Instructions */}
              <div style={{ padding: 16 }}>
                <div style={{ marginBottom: 14 }}>
                  {step.instructions.map(inst => (
                    <div key={inst.n} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                      <div style={{ width: 24, height: 24, minWidth: 24, borderRadius: "50%", background: step.color,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
                        fontWeight: "bold", color: step.textColor }}>
                        {inst.n}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: "bold", color: "#e8f4f7", marginBottom: 2 }}>{inst.title}</div>
                        <div style={{ fontSize: 12, color: "#8ab8c5", lineHeight: 1.5 }}>{inst.body}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tip */}
                <div style={{ background: "#0d1a26", border: `1px solid ${step.color}60`, borderLeft: `4px solid ${step.color}`,
                  borderRadius: "0 6px 6px 0", padding: "10px 12px" }}>
                  <div style={{ fontSize: 12, color: "#c8dde8", lineHeight: 1.55 }}>
                    <span style={{ color: step.color, fontWeight: "bold" }}>💡 Tip: </span>{step.tip}
                  </div>
                </div>
              </div>
            </div>

            {/* Screenshot reminder */}
            <div style={{ background: "#0a1520", borderTop: `2px dashed ${step.color}60`, padding: "10px 20px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>📸</span>
              <span style={{ fontSize: 13, color: "#c8dde8" }}><strong>Take a screenshot now!</strong> {step.screenshot}</span>
            </div>
          </div>

          {/* Checklist */}
          <div style={{ background: "#0d1117", border: "1px solid #1e3040", borderRadius: 12, padding: 18, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: "bold", color: "#e8f4f7" }}>✅ Step Checklist</div>
              <div style={{ fontSize: 12, color: stepChecked === stepTotal ? "#27ae60" : "#5a8a96" }}>
                {stepChecked} / {stepTotal} done
              </div>
            </div>
            {/* Progress bar */}
            <div style={{ height: 4, background: "#1a2535", borderRadius: 2, marginBottom: 14, overflow: "hidden" }}>
              <div style={{ height: "100%", background: step.color, borderRadius: 2, transition: "width 0.4s",
                width: `${(stepChecked / stepTotal) * 100}%` }}/>
            </div>
            {step.checklist.map((item, i) => {
              const key = `${step.id}-${i}`;
              const done = !!checked[key];
              return (
                <div key={i} onClick={() => toggleCheck(step.id, i)}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 10px", borderRadius: 8,
                    cursor: "pointer", marginBottom: 4, background: done ? "#0d2018" : "#0d1117",
                    border: `1px solid ${done ? "#27ae60" : "#1e3040"}`, transition: "all 0.2s" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${done ? "#27ae60" : "#2a3f52"}`,
                    background: done ? "#27ae60" : "transparent", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 12, transition: "all 0.2s" }}>
                    {done && "✓"}
                  </div>
                  <span style={{ fontSize: 13, color: done ? "#7de0a0" : "#8ab8c5", textDecoration: done ? "line-through" : "none",
                    textDecorationColor: "#27ae60" }}>
                    {item}
                  </span>
                </div>
              );
            })}

            {/* Complete step button */}
            <button onClick={completeStep} disabled={!allChecked}
              style={{ width: "100%", marginTop: 14, padding: "12px", borderRadius: 8, border: "none",
                background: allChecked ? step.color : "#1a2535", color: allChecked ? step.textColor : "#3a5060",
                fontSize: 14, fontWeight: "bold", cursor: allChecked ? "pointer" : "not-allowed",
                transition: "all 0.3s", letterSpacing: 0.5 }}>
              {completedSteps.has(step.id) ? "✓ Step Complete" :
               allChecked ? (currentStepIdx < STEPS.length - 1 ? "Mark Complete & Go to Next Step →" : "🎉 Complete Project!") :
               `Complete all ${stepTotal} checklist items to continue`}
            </button>
          </div>

          {/* Final submit section — shown when all steps done */}
          {completedSteps.size === STEPS.length && (
            <div style={{ background: "linear-gradient(135deg, #0d3b47, #061a22)", border: "2px solid #f4a231",
              borderRadius: 12, padding: 20, animation: "fadeIn 0.4s ease" }}>
              <div style={{ fontSize: 20, fontWeight: "bold", color: "#f4a231", marginBottom: 8 }}>🏆 All Steps Complete!</div>
              <p style={{ margin: "0 0 14px", color: "#c8dde8", fontSize: 13 }}>
                You've finished all 4 steps. Make sure your PowerPoint has all 4 screenshots with captions, then submit!
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {["Pitcher body (Screw Modifier)","Handle (Extrude Along Path)","Both objects converted to mesh","Both named + handle parented"].map(item => (
                  <div key={item} style={{ background: "#0d2018", border: "1px solid #27ae60", borderRadius: 6, padding: "8px 12px",
                    fontSize: 12, color: "#7de0a0", display: "flex", gap: 8, alignItems: "center" }}>
                    ✓ {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: AI chat — sticky */}
        <div style={{ height: "calc(100vh - 160px)", position: "sticky", top: 20 }}>
          <AiChat currentStep={step}/>
        </div>
      </div>
    </div>
  );
}
