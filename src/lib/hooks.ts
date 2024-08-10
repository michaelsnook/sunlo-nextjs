'use client'

import { useParams } from 'next/navigation'

export const useLang = () => useParams<{ lang: string }>()?.lang

