import { isMFSContext } from '@utils/context/isMFSContext'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'

export function navFunc() {
  const isMFS = useContext(isMFSContext)
  const location = useLocation()
  const currentPath = location.pathname

  const navDefs: any[] = isMFS
    ? [
        {
          text: 'Mes échanges',
          linkProps: {
            to: '/home',
          },
          isActive: currentPath === '/home',
        },
        {
          text: 'Poser une nouvelle question',
          linkProps: {
            to: '/meeting',
          },
          isActive: currentPath === '/meeting',
        },
        {
          text: 'Aide',
          linkProps: {
            to: '/FAQ',
          },
          isActive: currentPath === '/FAQ',
        },
        {
          text: 'Contact',
          linkProps: {
            to: '/contact',
          },
          isActive: currentPath === '/contact',
        },
      ]
    : [
        {
          text: 'Accueil',
          linkProps: {
            to: '/home',
          },
          isActive: currentPath === '/home',
        },
        {
          text: 'Mes outils',
          isActive: currentPath === '/chat',
          menuLinks: [
            {
              text: 'Poser une question',
              linkProps: {
                to: '/chat',
              },
              isActive: currentPath === '/chat',
            },
          ],
        },
        {
          text: 'Contact',
          linkProps: {
            to: '/contact',
          },
          isActive: currentPath === '/contact',
        },
      ]

  return navDefs
}
