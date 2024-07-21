import { useQueryClient, useMutation } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import { useCard } from 'app/data/hooks'
import { toast } from 'react-hot-toast'

const updateCardStatus = async ({ cardId, status }) => {
  console.log(`update card status,`, cardId, status)
  const { data, error } = await supabase
    .from('user_card')
    .update({
      status,
    })
    .eq('id', cardId)
    .select()
  if (error) throw error
  return data[0]
}

export default function EditCardStatusButtons({ cardId }) {
  const queryClient = useQueryClient()
  const { data: card } = useCard(cardId)
  const updateStatus = useMutation({
    // mutationFn: status => editExistingCard(status, card.id)
    mutationFn: updateCardStatus,
    onSuccess: data => {
      toast.success(`Card successfully updated with status: "${data.status}"`)
      queryClient.setQueryData(['card', cardId], data)
    },
  })
  const isLearned = card?.status === 'learned'
  const isActive = card?.status === 'active'
  const isSkipped = card?.status === 'skipped'
  return (
    <>
      <div className="mx-auto mt-6 flex max-w-80 flex-col justify-center gap-2 @md:flex-row">
        <button
          onClick={() => updateStatus.mutate({ cardId, status: 'learned' })}
          className={`btn btn-success ${isLearned && 'btn-outline'}`}
          disabled={updateStatus.isSubmitting || isLearned}
        >
          {isLearned ? 'Finished learning' : 'Mark complete'}
        </button>
        <button
          onClick={() => updateStatus.mutate({ cardId, status: 'active' })}
          className={`btn btn-info ${isActive && 'btn-outline'}`}
          disabled={updateStatus.isSubmitting || isActive}
        >
          {isActive ? 'Actively learning' : 'Add to my deck'}
        </button>
        <button
          onClick={() => updateStatus.mutate({ cardId, status: 'skipped' })}
          className={`btn btn-warning ${isSkipped && 'btn-outline'}`}
          disabled={updateStatus.isSubmitting || isSkipped}
        >
          Skip this card
        </button>
      </div>
      <div className="mx-auto my-2 text-center text-sm text-base-content/70">
        <p>
          {isLearned && (
            <>
              You&apos;ve marked this card <code>&ldquo;learned&rdquo;</code>{' '}
              (it won&apos;t show up in your daily reviews).
            </>
          )}
          {isActive && <>This card is part of your active deck.</>}
          {isSkipped && (
            <>
              You&apos;ve marked this card <code>&ldquo;skipped&rdquo;</code> so
              you won&apos;t be asked to learn it.
            </>
          )}
          <br />
          Use these buttons to change card status.
        </p>
      </div>
    </>
  )
}
