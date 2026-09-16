import type { InstructorEval, InstructorEvalSkills } from '../types'

const SKILL_LABELS: { key: keyof InstructorEvalSkills; label: string }[] = [
  { key: 'flags', label: 'Calls out all flags' },
  { key: 'passing', label: 'Clean passing & signals' },
  { key: 'smoothInputs', label: 'Smooth inputs' },
  { key: 'looksAhead', label: 'Looks ahead' },
  { key: 'consistency', label: 'Consistency' },
  { key: 'carControl', label: 'Car control' },
  { key: 'pace', label: 'Pace with group' },
  { key: 'referencePoints', label: 'Uses reference points' },
  { key: 'trackAwareness', label: 'Track location awareness' },
]

function SkillBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-0.5 flex items-baseline justify-between text-xs">
        <span className="text-gray-600">{label}</span>
        <span className="font-mono font-semibold text-gray-900">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100">
        <div
          className="h-1.5 rounded-full bg-gray-900"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  )
}

interface Props {
  evaluation: InstructorEval
}

export function InstructorEvalCard({ evaluation }: Props) {
  const { track, instructor, student, car, skills, aggressivenessEqualsSkill, aidsOveractivatedPct, recommend, notes } = evaluation

  const hasHeader = track || instructor || student || car
  const hasSkills = skills && SKILL_LABELS.some(s => skills[s.key] !== undefined)
  const hasAssessment = aggressivenessEqualsSkill !== undefined || aidsOveractivatedPct !== undefined
  const hasRecommend = recommend && (recommend.sameDirection || recommend.newDirection || recommend.newTrack)

  return (
    <div className="flex flex-col gap-3">
      {hasHeader && (
        <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
          {track && (
            <div>
              <dt className="text-gray-400">Track</dt>
              <dd className="font-medium text-gray-900">{track}</dd>
            </div>
          )}
          {instructor && (
            <div>
              <dt className="text-gray-400">Instructor</dt>
              <dd className="font-medium text-gray-900">{instructor}</dd>
            </div>
          )}
          {student && (
            <div>
              <dt className="text-gray-400">Student</dt>
              <dd className="font-medium text-gray-900">{student}</dd>
            </div>
          )}
          {car && (
            <div>
              <dt className="text-gray-400">Car</dt>
              <dd className="font-medium text-gray-900">{car}</dd>
            </div>
          )}
        </dl>
      )}

      {hasSkills && (
        <div className="flex flex-col gap-2">
          {SKILL_LABELS.map(({ key, label }) => {
            const value = skills?.[key]
            if (value === undefined) return null
            return <SkillBar key={key} label={label} value={value} />
          })}
        </div>
      )}

      {hasAssessment && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {aggressivenessEqualsSkill !== undefined && (
            <span className="text-gray-600">
              Aggressiveness = Skill: <span className="font-medium text-gray-900">{aggressivenessEqualsSkill ? 'Yes' : 'No'}</span>
            </span>
          )}
          {aidsOveractivatedPct !== undefined && (
            <span className="text-gray-600">
              Car aids over-activated: <span className="font-medium text-gray-900">{aidsOveractivatedPct}%</span>
            </span>
          )}
        </div>
      )}

      {hasRecommend && (
        <div className="rounded-lg bg-gray-50 p-2.5 text-xs">
          <div className="mb-1 font-semibold text-gray-500">Recommended run group</div>
          <div className="flex flex-col gap-0.5 text-gray-700">
            {recommend?.sameDirection && <div>This track, same direction: <span className="font-medium text-gray-900">{recommend.sameDirection}</span></div>}
            {recommend?.newDirection && <div>This track, new direction: <span className="font-medium text-gray-900">{recommend.newDirection}</span></div>}
            {recommend?.newTrack && <div>New track: <span className="font-medium text-gray-900">{recommend.newTrack}</span></div>}
          </div>
        </div>
      )}

      {notes && <p className="text-xs italic text-gray-500">{notes}</p>}
    </div>
  )
}
