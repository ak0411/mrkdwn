import { useEffect, useState } from 'react'

export const usePlatform = () => {
  const [platform, setPlatform] = useState<NodeJS.Platform>()

  useEffect(() => {
    window.context.getPlatform().then((platform: string) => {
      setPlatform(platform as NodeJS.Platform)
    })
  }, [])

  return {
    platform,
    isMacOS: platform === 'darwin',
    isWindows: platform === 'win32',
    isLinux: platform === 'linux'
  }
}
