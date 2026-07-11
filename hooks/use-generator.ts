import { useState, useRef } from "react";
import { DevCard, ApiResponse } from "../types";
import { logger } from "../core/logger/logger";

export type LoadingPhase =
  | "IDLE"
  | "SCOUTING"       // ⚽ Scouting Player...
  | "LEAGUE_RECORD"  // Checking League Records...
  | "ANALYZING"      // Analyzing Performance...
  | "CALCULATING"    // Calculating Overall Rating...
  | "FORGING"        // Forging Ultimate Card...
  | "READY";

const PHASES: LoadingPhase[] = [
  "SCOUTING",
  "LEAGUE_RECORD",
  "ANALYZING",
  "CALCULATING",
  "FORGING",
];

const PHASE_MESSAGES: Record<LoadingPhase, string> = {
  IDLE: "",
  SCOUTING: "⚽ Scouting Player...",
  LEAGUE_RECORD: "Checking League Records...",
  ANALYZING: "Analyzing Performance...",
  CALCULATING: "Calculating Overall Rating...",
  FORGING: "Forging Ultimate Card...",
  READY: "Scouting Complete!",
};

export function useGenerator() {
  const [phase, setPhase] = useState<LoadingPhase>("IDLE");
  const [error, setError] = useState<{ code: string; message: string } | null>(null);
  const [card, setCard] = useState<DevCard | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const getPhaseMessage = () => PHASE_MESSAGES[phase];

  const scout = async (username: string) => {
    // 1. Reset states & abort active requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    
    setError(null);
    setCard(null);

    // 2. Start Phase transitions in parallel with fetch
    let activePhaseIndex = 0;
    setPhase(PHASES[0]);

    const intervalId = setInterval(() => {
      if (activePhaseIndex < PHASES.length - 1) {
        activePhaseIndex++;
        setPhase(PHASES[activePhaseIndex]);
      }
    }, 900); // Shift phase every 900ms

    try {
      const response = await fetch(`/api/scout/${encodeURIComponent(username)}`, {
        signal: abortControllerRef.current.signal,
      });

      const payload = (await response.json()) as ApiResponse<DevCard>;

      // Clear interval once fetch settles
      clearInterval(intervalId);

      if (!payload.success) {
        setPhase("IDLE");
        setError(payload.error);
        return;
      }

      // Finish remaining phases quickly before showing card
      for (let i = activePhaseIndex; i < PHASES.length; i++) {
        setPhase(PHASES[i]);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      setCard(payload.data);
      setPhase("READY");
    } catch (err: unknown) {
      clearInterval(intervalId);
      setPhase("IDLE");

      if (err instanceof Error && err.name === "AbortError") {
        logger.info("Request aborted by user");
        return;
      }

      logger.error("Scouting error in generator hook:", err);
      setError({
        code: "NETWORK_ERROR",
        message: "Unable to connect to the scout server. Check your internet connection.",
      });
    }
  };

  const reset = () => {
    setPhase("IDLE");
    setError(null);
    setCard(null);
  };

  return {
    phase,
    error,
    card,
    scout,
    reset,
    message: getPhaseMessage(),
  };
}
