/** Height of the toolbar, for what sticks under it (the schedule editor's tabs). */
export const PAGE_HEADER_PX = 56

/** Under a page sheet's toolbar in a session's sheet (#388): what's on the page. */
export const PAGE_BODY = 'mx-auto flex max-w-lg flex-col px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]'

/** A form's toolbar, from what it's in: all but its Save, which the form has (#388). */
export type Toolbar = Pick<Parameters<typeof PageHeader>[0], 'title' | 'subtitle' | 'onCancel'>

/**
 * Toolbar across the top of a page that slides up (#356, #368) — New event,
 * Edit details, Edit schedule, a car's: Cancel, the page's name (and the
 * event's under it), and Save. It stays put while the page scrolls. As tall
 * as an iOS sheet's, with its 17 pt type (#415).
 * Save submits `form` when given one, else calls `onClick`. Cancel and Save
 * keep the same width, so a long event name truncates rather than
 * pushing the title off center. Its sheet drags down by it (#387).
 */
export function PageHeader({ title, subtitle, onCancel, cancelLabel = 'Cancel', cancelDisabled, save }: {
  title: string
  subtitle?: string
  onCancel: () => void
  /** "Done" where there's nothing to cancel: saved laps, read-only (#388). */
  cancelLabel?: string
  cancelDisabled?: boolean
  /** None where the page's own buttons do it: a shared car's Accept and Decline (#410). */
  save?: { label: string; disabled?: boolean; onClick?: () => void; form?: string }
}) {
  return (
    // Held to drag its sheet down, however far the page is scrolled (#387).
    <div className="sticky top-0 z-20 border-b border-gray-500/20 bg-white shadow-[0_4px_15px_rgba(12,12,13,0.05)]" data-sheet-grab>
      <div className="mx-auto grid max-w-lg grid-cols-[minmax(5rem,1fr)_minmax(0,max-content)_minmax(5rem,1fr)] items-center gap-2 px-2" style={{ height: PAGE_HEADER_PX }}>
        {/* Disabled while saving: the sheet doesn't drag away then either. */}
        <button onClick={onCancel} disabled={cancelDisabled} data-sheet-cancel className="justify-self-start rounded-lg px-2 py-2 text-[17px] text-blue-600 hover:text-blue-700 disabled:text-gray-300">
          {cancelLabel}
        </button>
        <div className="min-w-0 text-center">
          <h1 className="truncate text-[17px] font-semibold leading-[22px] text-gray-900">{title}</h1>
          {subtitle && <p className="truncate text-[13px] leading-4 text-gray-500">{subtitle}</p>}
        </div>
        {save ? (
          <button
            type={save.form ? 'submit' : 'button'}
            form={save.form}
            onClick={save.onClick}
            disabled={save.disabled}
            className="justify-self-end rounded-lg px-2 py-2 text-[17px] font-semibold text-blue-600 hover:text-blue-700 disabled:text-gray-300"
          >
            {save.label}
          </button>
        ) : <span />}
      </div>
    </div>
  )
}
