import ComingSoon from '@/components/coming-soon'
import ScreenTransition from '@/components/transistions/screen-transition'

const Chat = () => {
  return (
    <ScreenTransition>
      <ComingSoon pagename='chat' />
    </ScreenTransition>
  )
}

export default Chat
