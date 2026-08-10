"use client";

export default function RocketScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0d1117] to-[#0a0e1a]" />

      {/* Milky way glow */}
      <div
        className="absolute top-0 right-0 w-[80%] h-[50%] opacity-20"
        style={{
          background: "radial-gradient(ellipse at 70% 20%, rgba(180,160,220,0.4), transparent 60%)",
        }}
      />

      {/* Stars layers */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 120 }, (_, i) => {
          const x = ((i * 7919) % 1000) / 10;
          const y = ((i * 6271) % 700) / 10;
          const r = ((i * 3) % 3 === 0) ? 1.5 : ((i * 5) % 2 === 0 ? 1 : 0.6);
          const opacity = 0.3 + ((i * 17) % 70) / 100;
          return (
            <circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r={r}
              fill="white"
              opacity={opacity}
              className={i % 4 === 0 ? "animate-pulse" : ""}
            />
          );
        })}
      </svg>

      {/* Ground / launch pad */}
      <div className="absolute bottom-0 left-0 right-0 h-[35%]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a20] via-[#15151d] to-transparent" />
        {/* Pad surface */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#22222a] to-[#1a1a22]" />
        {/* Pad markings */}
        <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[300px] h-[4px] bg-white/5 rounded-full" />
        <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[200px] h-[3px] bg-white/3 rounded-full" />
        {/* Trench left */}
        <div className="absolute bottom-0 left-[25%] w-[10%] h-[20%] bg-black/40 rounded-t-lg" />
        {/* Trench right */}
        <div className="absolute bottom-0 right-[25%] w-[10%] h-[20%] bg-black/40 rounded-t-lg" />
      </div>

      {/* Flood lights */}
      {[30, 70].map((x) => (
        <div key={x} className="absolute bottom-[30%]" style={{ left: `${x}%` }}>
          <div className="w-[3px] h-[60px] bg-white/10 mx-auto" />
          <div className="w-2 h-2 bg-white rounded-full mx-auto shadow-[0_0_15px_5px_rgba(255,255,255,0.4)]" />
          <div
            className="absolute -top-[40px] left-1/2 -translate-x-1/2 w-[80px] h-[120px] opacity-15"
            style={{
              background: "conic-gradient(from 170deg, transparent, rgba(255,255,255,0.3), transparent 40deg)",
            }}
          />
        </div>
      ))}

      {/* Tower */}
      <div className="absolute bottom-[22%] left-1/2 translate-x-[15px]">
        <div className="w-[8px] h-[220px] bg-gradient-to-t from-[#555] to-[#888] rounded-t-sm" />
        {/* Tower arm */}
        <div className="absolute top-[30px] -left-[25px] w-[30px] h-[4px] bg-[#777] rounded" />
        <div className="absolute top-[60px] -left-[20px] w-[25px] h-[3px] bg-[#666] rounded" />
        {/* Tower lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[4px] h-[4px] bg-red-500 rounded-full shadow-[0_0_8px_3px_rgba(255,0,0,0.5)] animate-pulse" />
      </div>

      {/* ROCKET */}
      <div className="rocket-body absolute bottom-[22%] left-1/2 -translate-x-[22px]">
        {/* Nose cone */}
        <div
          className="w-[20px] h-[40px] mx-auto"
          style={{
            background: "linear-gradient(to right, #ccc, #fff, #ccc)",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />
        {/* Upper stage - white */}
        <div
          className="w-[24px] h-[50px] mx-auto -mt-[1px]"
          style={{ background: "linear-gradient(to right, #bbb, #f0f0f0, #eee, #bbb)" }}
        />
        {/* Core stage - orange */}
        <div
          className="w-[28px] h-[90px] mx-auto -mt-[1px]"
          style={{ background: "linear-gradient(to right, #8B5E1A, #D4882A, #E8A435, #D4882A, #8B5E1A)" }}
        />
        {/* Engine section */}
        <div
          className="w-[32px] h-[15px] mx-auto -mt-[1px]"
          style={{ background: "linear-gradient(to right, #666, #999, #888, #666)" }}
        />
        {/* Side boosters left */}
        <div className="absolute bottom-[15px] -left-[8px]">
          <div
            className="w-[10px] h-[70px]"
            style={{ background: "linear-gradient(to right, #aaa, #ddd, #aaa)" }}
          />
          <div
            className="w-[10px] h-[8px] -mt-[1px]"
            style={{ background: "linear-gradient(to right, #666, #888, #666)" }}
          />
        </div>
        {/* Side boosters right */}
        <div className="absolute bottom-[15px] -right-[8px]">
          <div
            className="w-[10px] h-[70px]"
            style={{ background: "linear-gradient(to right, #aaa, #ddd, #aaa)" }}
          />
          <div
            className="w-[10px] h-[8px] -mt-[1px]"
            style={{ background: "linear-gradient(to right, #666, #888, #666)" }}
          />
        </div>
      </div>

      {/* Ground light glow */}
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[400px] h-[60px] bg-white/[0.04] rounded-full blur-xl" />
    </div>
  );
}
