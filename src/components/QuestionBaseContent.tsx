import type { QuestionBase } from '../data/quiz'

export function QuestionBaseContent({ base }: { base?: QuestionBase }) {
  if (!base) return null

  return (
    <figure className="my-6 rounded-lg border border-[#d5d0c1] bg-[#f5f1e7] p-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#58645b]">
        Texto base
      </p>
      {base.type === 'text' ? (
        <blockquote className="whitespace-pre-wrap break-words text-justify text-base leading-relaxed">
          {base.text}
        </blockquote>
      ) : (
        <img
          src={base.src}
          alt={base.alt}
          className="mx-auto h-auto max-w-full rounded"
        />
      )}
      {base.source && (
        <figcaption className="mt-4 whitespace-pre-wrap break-words text-xs leading-relaxed text-[#58645b]">
          Fonte: {base.source}
        </figcaption>
      )}
    </figure>
  )
}
