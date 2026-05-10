import { AnimatePresence, motion } from 'framer-motion'
import { useSessionStore } from './store/sessionStore'
import { CategoryScreen } from './screens/CategoryScreen'
import { GraspScreen } from './screens/GraspScreen'
import { DiscoveryScreen } from './screens/DiscoveryScreen'

export default function App() {
  const screen = useSessionStore((s) => s.screen)

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      {/* Constrain to phone-width on desktop */}
      <div
        className="mx-auto relative overflow-hidden min-h-screen"
        style={{ maxWidth: '430px', boxShadow: '0 0 60px rgba(0,0,0,0.12)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="min-h-screen"
          >
            {screen === 'category'  && <CategoryScreen />}
            {screen === 'grasp'     && <GraspScreen />}
            {screen === 'discovery' && <DiscoveryScreen />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
