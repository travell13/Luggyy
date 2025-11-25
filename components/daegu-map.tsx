"use client"

export default function DaeguMap() {
  const universities = [
    { name: "Kyungpook National University", lat: 35.8898, lng: 128.6054, emoji: "🎓" },
    { name: "Keimyung University", lat: 35.8939, lng: 128.6457, emoji: "📚" },
    { name: "Dalseong University", lat: 35.8456, lng: 128.5678, emoji: "🏫" },
    { name: "Daegu Catholic University", lat: 35.9123, lng: 128.5734, emoji: "✨" },
  ]

  // Simple SVG-based map visualization
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="w-full max-w-2xl">
        {/* Map Container */}
        <svg
          viewBox="0 0 400 300"
          className="w-full h-auto border border-white/20 rounded-lg bg-gradient-to-br from-slate-900 to-black"
        >
          {/* Background shape representing Daegu */}
          <rect
            x="20"
            y="20"
            width="360"
            height="260"
            fill="rgba(0, 217, 255, 0.05)"
            stroke="rgba(0, 217, 255, 0.3)"
            strokeWidth="2"
            rx="8"
          />

          {/* Map Label */}
          <text x="200" y="45" textAnchor="middle" className="text-sm" fill="#00D9FF" fontWeight="600">
            Universities in Daegu
          </text>

          {/* University Pins */}
          {universities.map((uni, index) => {
            // Normalized positions for visualization
            const positions = [
              { x: 120, y: 100 }, // KNU
              { x: 240, y: 110 }, // Keimyung
              { x: 160, y: 200 }, // Dalseong
              { x: 280, y: 180 }, // Catholic
            ]
            const pos = positions[index]

            return (
              <g key={index}>
                {/* Pin circle */}
                <circle cx={pos.x} cy={pos.y} r="12" fill="#00D9FF" opacity="0.2" />
                <circle cx={pos.x} cy={pos.y} r="8" fill="#00D9FF" />

                {/* University name label */}
                <text x={pos.x} y={pos.y + 28} textAnchor="middle" className="text-xs" fill="#FFFFFF" fontWeight="500">
                  {uni.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* University List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
        {universities.map((uni) => (
          <div
            key={uni.name}
            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
          >
            <span className="text-lg">{uni.emoji}</span>
            <span className="text-sm text-white/80">{uni.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
