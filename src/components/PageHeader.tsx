/** Height of the toolbar, for what sticks under it (the schedule editor's tabs). */
export const PAGE_HEADER_PX = 52

/**
 * Toolbar across the top of a page that slides up (#356, #368) — New event,
 * Edit details, Edit schedule, a car's: Cancel, the page's name (and the
 * event's under it), and Save. It stays put while the page scrolls.
 * Save submits `form` when given one, else calls `onClick`. Cancel and Save
 * keep the same width, so a long event name truncates rather than
 * pushing the title off center.
 */
export function PageHeader({ title, subtitle, onCancel, cancelDisabled, save }: {
  title: string
  subtitle?: string
  onCancel: () => void
  cancelDisabled?: boolean
  /** None where the page's own buttons do it: a shared car's Accept and Decline (#410). */
  save?: { label: string; disabled?: boolean; onClick?: () => void; form?: string }
}) {
  return (
    <div className="sticky top-0 z-20 border-b border-gray-500/20 bg-white shadow-[0_4px_15px_rgba(12,12,13,0.05)]">
      <div className="mx-auto grid max-w-lg grid-cols-[minmax(5rem,1fr)_minmax(0,max-content)_minmax(5rem,1fr)] items-center gap-2 px-2" style={{ height: PAGE_HEADER_PX }}>
        <button onClick={onCancel} disabled={cancelDisabled} className="justify-self-start rounded-lg px-2 py-2 text-[15px] text-blue-600 hover:text-blue-700 disabled:text-gray-300">
          Cancel
        </button>
        <div className="min-w-0 text-center">
          <h1 className="truncate text-[15px] font-semibold leading-5 text-gray-900">{title}</h1>
          {subtitle && <p className="truncate text-xs text-gray-500">{subtitle}</p>}
        </div>
        {save ? (
          <button
            type={save.form ? 'submit' : 'button'}
            form={save.form}
            onClick={save.onClick}
            disabled={save.disabled}
            className="justify-self-end rounded-lg px-2 py-2 text-[15px] font-semibold text-blue-600 hover:text-blue-700 disabled:text-gray-300"
          >
            {save.label}
          </button>
        ) : <span />}
      </div>
    </div>
  )
}
