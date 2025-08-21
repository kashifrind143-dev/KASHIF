export default function ClaimButton({ onClaim }) {
  return (
    <button
      onClick={onClaim}
      className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg hover:scale-105 transition"
    >
      Claim ROAR
    </button>
  );
}
