import { useMutation } from '@tanstack/react-query'

function cacheRelation(): void {}
async function postInsertRelation() {}
export function useInsertRelation() {
  return useMutation({
    mutationKey: [],
    mutationFn: () => {},
  })
}
