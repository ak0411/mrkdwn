import { platformAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'

export const usePlatform = () => {
  const platform = useAtomValue(platformAtom)

  return {
    platform,
    isMacOS: platform === 'darwin'
  }
}
