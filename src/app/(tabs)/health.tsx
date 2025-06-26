import ComingSoon from '@/components/coming-soon'
import ScreenTransition from '@/components/transistions/screen-transition'

const Home = () => {
  return (
    <ScreenTransition>
      <ComingSoon pagename='health' />
    </ScreenTransition>
  )
}

export default Home
