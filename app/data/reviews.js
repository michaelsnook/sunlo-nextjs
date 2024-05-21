'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import { useEffect } from 'react'

export function useRecentReviews(lang) {
  const [priorTime, setPriorTime] = useState()
  useEffect(() => {
    let dt = new Date()
    dt.setHours(0, 0, 0, 0)
    dt.setDate(dt.getDate() - 7)
    setPriorTime(dt.toISOString())
  }, [])

  return useQuery({
    queryKey: ['reviews', lang, priorTime],
    queryFn: async qkey => {
      const { data, error } = await supabase
        .from('user_card_review_plus')
        .select(`id, created_at, card_id, score`)
        .eq('lang', lang)
        .gt('created_at', priorTime)
      if (error) throw Error(error.message)
      return data
    },
    enabled: !!priorTime,
  })
}
