export default function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M7 7h10M7 17h10M7 7v10M17 7v10M7 12h10" />
        <circle cx="7" cy="7" r="1.35" />
        <circle cx="17" cy="7" r="1.35" />
        <circle cx="12" cy="12" r="1.35" />
        <circle cx="7" cy="17" r="1.35" />
        <circle cx="17" cy="17" r="1.35" />
      </svg>
    </span>
  );
}
