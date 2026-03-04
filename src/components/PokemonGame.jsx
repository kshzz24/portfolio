import { useReducer, useEffect, useRef, useCallback, useState } from "react";
import {
  playerMoves,
  enemies,
  GAME_W,
  GAME_H,
  PLAYER_MAX_HP,
  COLORS,
} from "../data/pokemonData";

/* ── helpers ───────────────────────────────────────────── */
function roll([min, max]) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ── state machine ─────────────────────────────────────── */
const initialState = () => {
  const enemy = pickRandom(enemies);
  return {
    phase: "intro",
    playerHp: PLAYER_MAX_HP,
    enemyHp: enemy.maxHp,
    enemy,
    log: [enemy.intro],
    typewriterDone: false,
  };
};

function reducer(state, action) {
  switch (action.type) {
    case "TYPEWRITER_DONE":
      return { ...state, typewriterDone: true };

    case "ADVANCE_INTRO":
      return { ...state, phase: "select-move", log: ["What will you do?"], typewriterDone: false };

    case "PLAYER_ATTACK": {
      const move = action.move;
      const dmg = move.type === "heal" ? 0 : roll(move.damage);
      const heal = move.type === "heal" ? roll(move.damage) : 0;

      const newEnemyHp = Math.max(0, state.enemyHp - dmg);
      const newPlayerHp = Math.min(PLAYER_MAX_HP, state.playerHp + heal);

      const msg =
        move.type === "heal"
          ? `You used ${move.name}! Restored ${heal} HP!`
          : `You used ${move.name}! ${dmg} damage!`;

      if (newEnemyHp <= 0) {
        return {
          ...state,
          phase: "result",
          enemyHp: 0,
          playerHp: newPlayerHp,
          log: [msg, state.enemy.defeat, "YOU WIN!"],
          typewriterDone: false,
        };
      }

      return {
        ...state,
        phase: "enemy-turn",
        enemyHp: newEnemyHp,
        playerHp: newPlayerHp,
        log: [msg],
        typewriterDone: false,
      };
    }

    case "ENEMY_ATTACK": {
      const move = pickRandom(state.enemy.moves);
      const dmg = roll(move.damage);
      const newPlayerHp = Math.max(0, state.playerHp - dmg);

      const msg = `${state.enemy.name} used ${move.name}! ${dmg} damage!`;

      if (newPlayerHp <= 0) {
        return {
          ...state,
          phase: "result",
          playerHp: 0,
          log: [...state.log, msg, "You fainted... GAME OVER"],
          typewriterDone: false,
        };
      }

      return {
        ...state,
        phase: "select-move",
        playerHp: newPlayerHp,
        log: [...state.log, msg, "What will you do?"],
        typewriterDone: false,
      };
    }

    case "RESTART":
      return initialState();

    default:
      return state;
  }
}

/* ── pixel sprite drawing ──────────────────────────────── */
function drawSprite(ctx, type, x, y, scale) {
  const s = scale;

  if (type === "player") {
    ctx.fillStyle = "#f0c48a";
    ctx.fillRect(x + 4 * s, y, 8 * s, 8 * s);
    ctx.fillStyle = "#2b2d30";
    ctx.fillRect(x + 3 * s, y - 2 * s, 10 * s, 3 * s);
    ctx.fillStyle = "#56a8f5";
    ctx.fillRect(x + 5 * s, y + 3 * s, 2 * s, 2 * s);
    ctx.fillRect(x + 9 * s, y + 3 * s, 2 * s, 2 * s);
    ctx.fillStyle = "#393b40";
    ctx.fillRect(x + 3 * s, y + 8 * s, 10 * s, 10 * s);
    ctx.fillStyle = "#56a8f5";
    ctx.fillRect(x + 5 * s, y + 11 * s, 3 * s, 1 * s);
    ctx.fillStyle = "#6aab73";
    ctx.fillRect(x + 5 * s, y + 13 * s, 5 * s, 1 * s);
  } else if (type === "bug") {
    ctx.fillStyle = "#e06c75";
    ctx.fillRect(x + 3 * s, y + 2 * s, 10 * s, 8 * s);
    ctx.fillStyle = "#2b2d30";
    ctx.fillRect(x + 5 * s, y + 4 * s, 2 * s, 2 * s);
    ctx.fillRect(x + 9 * s, y + 4 * s, 2 * s, 2 * s);
    ctx.fillStyle = "#e06c75";
    ctx.fillRect(x + 1 * s, y + 5 * s, 2 * s, 1 * s);
    ctx.fillRect(x + 13 * s, y + 5 * s, 2 * s, 1 * s);
    ctx.fillRect(x + 1 * s, y + 8 * s, 2 * s, 1 * s);
    ctx.fillRect(x + 13 * s, y + 8 * s, 2 * s, 1 * s);
    ctx.fillRect(x + 5 * s, y, 1 * s, 2 * s);
    ctx.fillRect(x + 10 * s, y, 1 * s, 2 * s);
  } else if (type === "legacy") {
    ctx.fillStyle = "#f0a732";
    ctx.fillRect(x + 2 * s, y + 1 * s, 12 * s, 14 * s);
    ctx.fillStyle = "#2b2d30";
    ctx.fillRect(x + 4 * s, y + 3 * s, 8 * s, 1 * s);
    ctx.fillRect(x + 4 * s, y + 5 * s, 6 * s, 1 * s);
    ctx.fillRect(x + 4 * s, y + 7 * s, 7 * s, 1 * s);
    ctx.fillRect(x + 4 * s, y + 9 * s, 5 * s, 1 * s);
    ctx.fillStyle = "#e06c75";
    ctx.fillRect(x + 6 * s, y + 11 * s, 4 * s, 3 * s);
  } else {
    ctx.fillStyle = "#bcbec4";
    ctx.fillRect(x + 3 * s, y + 1 * s, 10 * s, 10 * s);
    ctx.fillStyle = "#1e1f22";
    ctx.fillRect(x + 5 * s, y + 4 * s, 2 * s, 3 * s);
    ctx.fillRect(x + 9 * s, y + 4 * s, 2 * s, 3 * s);
    ctx.fillRect(x + 7 * s, y + 8 * s, 2 * s, 2 * s);
    ctx.fillStyle = "#e06c75";
    ctx.fillRect(x + 4 * s, y + 11 * s, 8 * s, 2 * s);
    ctx.fillStyle = "#bcbec4";
    ctx.fillRect(x + 5 * s, y + 11 * s, 1 * s, 2 * s);
    ctx.fillRect(x + 7 * s, y + 11 * s, 1 * s, 2 * s);
    ctx.fillRect(x + 9 * s, y + 11 * s, 1 * s, 2 * s);
  }
}

/* ── draw HP bar ───────────────────────────────────────── */
function drawHpBar(ctx, x, y, label, hp, maxHp) {
  const barW = 160;
  const barH = 10;
  const pct = Math.max(0, hp / maxHp);

  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText(label, x, y + 2);

  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(x, y + 8, barW, barH);

  ctx.fillStyle = pct > 0.5 ? COLORS.green : pct > 0.2 ? COLORS.yellow : COLORS.red;
  ctx.fillRect(x, y + 8, barW * pct, barH);

  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y + 8, barW, barH);

  ctx.fillStyle = COLORS.text;
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.fillText(`${Math.max(0, hp)}/${maxHp}`, x + barW + 6, y + 17);
}

/* ── canvas renderer ───────────────────────────────────── */
function renderCanvas(ctx, state, dpr, typewriterText) {
  const w = GAME_W;
  const h = GAME_H;

  ctx.save();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Background
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  // Battle area
  ctx.fillStyle = COLORS.panel;
  ctx.fillRect(0, 0, w, h * 0.6);

  // Ground line
  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.55);
  ctx.lineTo(w, h * 0.55);
  ctx.stroke();

  // Player platform
  ctx.fillStyle = COLORS.border;
  ctx.beginPath();
  ctx.ellipse(120, h * 0.54, 50, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Enemy platform
  ctx.beginPath();
  ctx.ellipse(360, h * 0.38, 50, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Sprites
  const spriteScale = 4;
  drawSprite(ctx, "player", 88, h * 0.54 - 18 * spriteScale, spriteScale);
  if (state.enemyHp > 0) {
    drawSprite(ctx, state.enemy.sprite, 328, h * 0.38 - 18 * spriteScale, spriteScale);
  }

  // HP bars
  drawHpBar(ctx, 20, h * 0.6 + 10, "YOU", state.playerHp, PLAYER_MAX_HP);
  drawHpBar(ctx, w - 200, 15, state.enemy.name, state.enemyHp, state.enemy.maxHp);

  // Text box
  ctx.fillStyle = COLORS.panel;
  ctx.strokeStyle = COLORS.accent;
  ctx.lineWidth = 2;
  const textBoxY = h * 0.6 + 40;
  ctx.fillRect(10, textBoxY, w - 20, h - textBoxY - 10);
  ctx.strokeRect(10, textBoxY, w - 20, h - textBoxY - 10);

  // Typewriter text
  ctx.fillStyle = COLORS.text;
  ctx.font = '13px "JetBrains Mono", monospace';
  const lines = typewriterText.split("\n");
  lines.forEach((line, i) => {
    ctx.fillText(line, 24, textBoxY + 22 + i * 18);
  });

  ctx.restore();
}

/* ── main component ────────────────────────────────────── */
export default function PokemonGame({ onClose }) {
  const [state, dispatch] = useReducer(reducer, null, initialState);
  const canvasRef = useRef(null);
  const [typewriterText, setTypewriterText] = useState("");

  const fullText = state.log.join("\n");

  // Typewriter effect
  useEffect(() => {
    let idx = 0;
    setTypewriterText("");

    const interval = setInterval(() => {
      if (idx < fullText.length) {
        idx++;
        setTypewriterText(fullText.slice(0, idx));
      } else {
        clearInterval(interval);
        dispatch({ type: "TYPEWRITER_DONE" });
      }
    }, 30);

    return () => clearInterval(interval);
  }, [fullText]);

  // Render canvas whenever state or typewriter text changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;

    // Set internal resolution to match DPR every render
    // (React JSX props don't set width/height since we omit them)
    if (canvas.width !== GAME_W * dpr || canvas.height !== GAME_H * dpr) {
      canvas.width = GAME_W * dpr;
      canvas.height = GAME_H * dpr;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    renderCanvas(ctx, state, dpr, typewriterText);
  }, [state, typewriterText]);

  // Enemy turn auto-trigger
  useEffect(() => {
    if (state.phase !== "enemy-turn" || !state.typewriterDone) return;
    const timer = setTimeout(() => dispatch({ type: "ENEMY_ATTACK" }), 800);
    return () => clearTimeout(timer);
  }, [state.phase, state.typewriterDone]);

  const handleMove = useCallback(
    (move) => {
      if (state.phase !== "select-move") return;
      dispatch({ type: "PLAYER_ATTACK", move });
    },
    [state.phase],
  );

  return (
    <div className="pokemon-overlay">
      <div className="pokemon-frame">
        <div className="pokemon-header">
          <span className="pokemon-title">DEV BATTLE v1.0</span>
          <button className="pokemon-close" onClick={onClose}>
            ×
          </button>
        </div>

        <canvas
          ref={canvasRef}
          className="pokemon-canvas"
        />

        <div className="pokemon-controls">
          {state.phase === "intro" && state.typewriterDone && (
            <button
              className="pokemon-btn pokemon-btn-full"
              onClick={() => dispatch({ type: "ADVANCE_INTRO" })}
            >
              FIGHT →
            </button>
          )}

          {state.phase === "select-move" &&
            playerMoves.map((move) => (
              <button
                key={move.name}
                className={`pokemon-btn ${move.type === "heal" ? "pokemon-btn-heal" : ""}`}
                onClick={() => handleMove(move)}
                title={move.description}
              >
                {move.name}
              </button>
            ))}

          {state.phase === "enemy-turn" && (
            <div className="pokemon-waiting">Enemy is attacking...</div>
          )}

          {state.phase === "result" && state.typewriterDone && (
            <button
              className="pokemon-btn pokemon-btn-full"
              onClick={() => dispatch({ type: "RESTART" })}
            >
              PLAY AGAIN
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
