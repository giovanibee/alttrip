import { Grommet as GrommetGrommet, GrommetExtendedProps } from 'grommet'

// TODO: migrate styles here
const mainTheme = {
  global: {
  },
  checkBox: {
    border: {
      color: 'white',
    },
    color: 'white',
    hover: {
      border: {
        color: 'yellow',
      },
    },
  },
}

export default function Grommet(props: GrommetExtendedProps) {
  return <GrommetGrommet {...props} theme={mainTheme} />
}