import { Link } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { lessonCategories, lessons, type LessonCategory } from '../data'
import { formatChapterNumber } from '../lib/chapters'
import { cn } from '../lib/utils'

interface CategoryLinkProps {
  category: LessonCategory
  variant: 'bookmark' | 'index'
  active?: boolean
}

const bookmarkColors = [
  'bookmark-paper',
  'bookmark-sage',
  'bookmark-clay',
  'bookmark-sea',
]

export function CategoryLink({
  category,
  variant,
  active = false,
}: CategoryLinkProps) {
  const bookmark = variant === 'bookmark'
  const index = lessonCategories.indexOf(category)
  const lessonCount = lessons[category].length

  return (
    <Link
      to="/categoria/$category"
      params={{ category }}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex items-center',
        bookmark
          ? [
              'bookmark gap-[10px] min-h-[65px] rounded-[0_4px_4px_0] py-3 pl-6 pr-[14px] text-[#354638]',
              'compact:gap-2 compact:pl-[18px] bookmarks:min-h-[62px] bookmarks:rounded-[3px] bookmarks:p-[11px] tiny:gap-[7px] tiny:p-[9px]',
              bookmarkColors[index % bookmarkColors.length],
            ]
          : [
              'gap-3 border-t border-[#d8d2c3] px-[10px] py-[15px] text-[#8f9082] hover:bg-[#e8e5d9] hover:text-book-selected-ink',
              'tablet:flex-1 tablet:justify-center tablet:gap-[5px] tablet:border-0 tablet:px-[6px] tablet:py-[10px] mobile:gap-1',
              active &&
                'bg-book-selected text-book-selected-ink shadow-[inset_2px_0_#637a62]',
            ],
      )}
    >
      <span
        className={cn(
          'text-[9px]',
          bookmark ? 'tabular-nums text-[#627054]' : 'mobile:text-[7px]',
        )}
      >
        {formatChapterNumber(index + 1)}
      </span>
      <span
        className={cn(
          'flex-1 text-[12px]',
          bookmark
            ? 'bookmarks:text-[11px] tiny:text-[10px]'
            : 'tablet:flex-initial tablet:text-[10px] mobile:text-[9px]',
        )}
      >
        {category}
        <small
          className={cn(
            'block text-[8px] leading-[1.5]',
            bookmark
              ? 'mt-[3px] text-[#5f6a58] compact:text-[7px]'
              : 'mt-1 tablet:hidden',
          )}
        >
          {lessonCount === 1 ? '1 conteúdo' : `${lessonCount} conteúdos`}
        </small>
      </span>
      {bookmark ? (
        <ArrowUpRight
          size={16}
          strokeWidth={1.5}
          className="shrink-0 bookmarks:w-[13px]"
        />
      ) : (
        <ArrowRight size={15} className="shrink-0 tablet:hidden" />
      )}
    </Link>
  )
}
