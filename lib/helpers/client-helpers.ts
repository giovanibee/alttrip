'use client'

export const getScreenSize = (width: number) => {
  if (isNaN(width)) return 'unknown'

  if (width < 375) {
    return 'xsmall'
  } else if (width < 568) {
    return 'small'
  } else if (width < 768) {
    return 'medium'
  } else if (width < 1024) {
    return 'large'
  } else if (width < 1366) {
    return 'xlarge'
  }

  return 'xxlarge'
}
