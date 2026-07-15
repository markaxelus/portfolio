"use client";

import { useEngine } from "../_engine/engine-context";

/** the bottom-right corner tab: SEE THE MESS ↔ OK, ENOUGH */
export default function ProofToggle() {
  const { proofOn, setProof } = useEngine();
  return (
    <button
      className="corner br mono"
      id="proof-btn"
      type="button"
      aria-pressed={proofOn}
      onClick={() => setProof(!proofOn)}
    >
      {proofOn ? <>OK,&nbsp;ENOUGH</> : <>SEE&nbsp;THE&nbsp;MESS</>}
    </button>
  );
}
