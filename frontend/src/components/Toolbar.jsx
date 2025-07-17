import React from "react";

const symbolGroups = [
  {
    heading: "Math Symbols",
    symbols: [
      { label: "∑", latex: "\\sum" },
      { label: "∫", latex: "\\int" },
      { label: "√", latex: "\\sqrt{}" },
      { label: "π", latex: "\\pi" },
      { label: "lim", latex: "\\lim_{x \\to 0}" },
      { label: "→", latex: "\\to" },
      { label: "⇌", latex: "\\rightleftharpoons" },
      { label: "∞", latex: "\\infty" },
      { label: "±", latex: "\\pm" },
      { label: "≠", latex: "\\neq" },
      { label: "≤", latex: "\\leq" },
      { label: "≥", latex: "\\geq" },
      { label: "≈", latex: "\\approx" },
      { label: "→", latex: "\\rightarrow" },
      { label: "←", latex: "\\leftarrow" },
      { label: "⇔", latex: "\\Leftrightarrow" },
      { label: "α", latex: "\\alpha" },
      { label: "β", latex: "\\beta" },
      { label: "γ", latex: "\\gamma" },
      { label: "θ", latex: "\\theta" },
      { label: "μ", latex: "\\mu" },
      { label: "Σ", latex: "\\Sigma" },
      { label: "Δ", latex: "\\Delta" },
      { label: "Ω", latex: "\\Omega" },
      { label: "Fraction", latex: "\\frac{}{}" },
      { label: "Superscript", latex: "^{}" },
      { label: "Subscript", latex: "_{}" },
      { label: "Matrix 2x2", latex: "\\begin{bmatrix} a & b \\ c & d \\end{bmatrix}" },
      { label: "Matrix 3x3", latex: "\\begin{bmatrix} a & b & c \\ d & e & f \\ g & h & i \\end{bmatrix}" },
    ],
  },
  {
    heading: "Chemistry Symbols",
    symbols: [
      { label: "H₂O", latex: "H_2O" },
      { label: "CO₂", latex: "CO_2" },
      { label: "O₂", latex: "O_2" },
      { label: "N₂", latex: "N_2" },
      { label: "→ (rxn)", latex: "\\rightarrow" },
      { label: "⇌ (eq)", latex: "\\rightleftharpoons" },
      { label: "Δ (heat)", latex: "\\Delta" },
      { label: "Catalyst", latex: "\\xrightarrow{\text{cat.}}" },
      { label: "Precipitate", latex: "\\downarrow" },
      { label: "Gas", latex: "\\uparrow" },
      { label: "aq", latex: "_{(aq)}" },
      { label: "s", latex: "_{(s)}" },
      { label: "l", latex: "_{(l)}" },
      { label: "g", latex: "_{(g)}" },
    ],
  },
];

export default function Toolbar({ onInsert }) {
  return (
    <div className="mb-6 flex flex-col gap-6 max-h-80 overflow-y-auto px-2 py-3 bg-gray-800/80 rounded-2xl shadow-xl border border-gray-700">
      {symbolGroups.map((group, idx) => (
        <div key={group.heading} className="mb-2">
          <div className="text-xs text-blue-300 font-bold mb-2 pl-1 tracking-wide uppercase letter-spacing-wider">
            {group.heading}
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-3">
            {group.symbols.map((sym, i) => (
              <button
                key={sym.label + sym.latex + i}
                type="button"
                onClick={() => onInsert(sym.latex)}
                className="w-24 h-14 flex items-center justify-center border border-gray-700 bg-gray-900 text-gray-100 rounded-xl shadow hover:bg-blue-800/70 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95 transition-all duration-150 text-base font-semibold select-none px-2"
                style={{ boxShadow: '0 2px 8px 0 rgba(30,41,59,0.12)' }}
              >
                <div className="w-full text-center whitespace-normal break-words leading-tight truncate">
                  {sym.label}
                </div>
              </button>
            ))}
          </div>
          {idx !== symbolGroups.length - 1 && (
            <div className="my-4 border-b border-gray-700 opacity-40"></div>
          )}
        </div>
      ))}
    </div>
  );
}
